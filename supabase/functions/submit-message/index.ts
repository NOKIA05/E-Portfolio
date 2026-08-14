// submit-message - Supabase Edge Function
//
// The contact form posts here instead of writing to the database directly.
// This function: checks the honeypot, verifies the Cloudflare Turnstile token
// server-side (where bots can't skip it), validates the fields, and inserts
// the row using the service-role key. After supabase/turnstile.sql revokes
// anon INSERT, this function is the ONLY write path into `messages`.
//
// Secrets (Edge Functions -> Secrets):
//   TURNSTILE_SECRET_KEY  - from the Cloudflare Turnstile dashboard.
//     If unset, Turnstile verification is skipped (useful before setup).
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.

import { createClient } from "npm:@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://abdalrhman-portfolio.vercel.app",
  "http://localhost:5173",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };
}

function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), { status, headers });
}

Deno.serve(async (req) => {
  const headers = corsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, headers);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400, headers);
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company ?? "");
  const token = String(body.turnstileToken ?? "");

  // Honeypot: bots fill it, humans never see it. Pretend success, save nothing.
  if (honeypot) return json({ ok: true }, 200, headers);

  // Server-side validation (mirrors the DB CHECK constraints)
  if (!name || name.length > 120) {
    return json({ error: "Please add your name." }, 400, headers);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: "That email address doesn't look right." }, 400, headers);
  }
  if (message.length < 10 || message.length > 5000) {
    return json({ error: "Message must be between 10 and 5000 characters." }, 400, headers);
  }

  // Caller's real IP (Supabase edge puts it in x-forwarded-for)
  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;

  // Turnstile verification - the part bots can't fake
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (secret) {
    if (!token) {
      return json({ error: "Please complete the verification." }, 400, headers);
    }
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
      },
    );
    const verdict = await verifyRes.json();
    if (!verdict.success) {
      return json({ error: "Verification failed. Refresh and try again." }, 403, headers);
    }
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { error } = await supabase
    .from("messages")
    .insert({ name, email, message, sender_ip: ip });

  if (error) {
    // Rate-limit rejections from the guard trigger carry a friendly message
    const friendly = error.message.includes("Too many") ||
      error.message.includes("high traffic");
    return json(
      { error: friendly ? error.message : "Couldn't save your message. Try again or email me directly." },
      friendly ? 429 : 500,
      headers,
    );
  }

  return json({ ok: true }, 200, headers);
});
