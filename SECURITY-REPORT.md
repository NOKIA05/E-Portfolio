# E-Portfolio Security Audit

Date: 2026-08-14
Scope: React frontend, Supabase database (RLS policies, contact form, email trigger),
git repository and history, dependencies, hosting configuration, retired Flask backend.

What was actually done: full git-history search for leaked secret values, gitignore
verification, static scan of every frontend file for XSS/injection patterns, review of
all RLS policies and the pg_net email trigger, npm audit of production and dev
dependencies, and a review of the Vercel hosting configuration. One limitation: the
sandbox's network proxy blocks supabase.co, so the RLS conclusions come from the exact
SQL you ran rather than a live probe. A one-line self-test is included at the bottom.

Overall: the app is in good shape. No leaked secrets in git history, zero vulnerable
dependencies, no XSS patterns, and the database policies are correctly restrictive.
The real findings are below, worst first.

---

## HIGH-1: The contact form has no rate limiting

The old Flask backend limited submissions to 3 per minute per IP. The new Supabase
path has no limit at all. The anon key ships in your JavaScript bundle (that is normal
and by design), which means anyone can script direct INSERTs into `messages` at
whatever volume they want. The honeypot only stops naive bots; the DB CHECK
constraints cap message length but not message count.

This gets worse the moment the email trigger goes live: every insert becomes an email.
A hundred-line script mail-bombs your inbox and burns through the SendGrid free tier
(100 emails/day) in seconds, which then silently drops real messages.

Fix (ready to apply): a database trigger that reads the caller's IP from the request
headers PostgREST forwards, and enforces 5 messages/hour per IP plus 40/day globally.
Runs entirely in Postgres, no new infrastructure. See `supabase/harden.sql`.

## HIGH-2: The SendGrid API key should be rotated before use

The key was never committed to git (verified by searching every commit for the actual
value), but it has lived in a plaintext `.env` since the Flask days and is of unknown
age and scope. Before running `notify-email.sql`, mint a fresh key in SendGrid with
the minimal "Mail Send" permission only, use that in the Vault step, and delete the
old key in the SendGrid dashboard. The old Flask `SECRET_KEY` in the same file is
moot as long as the backend stays retired.

Related: if the old Render service is still deployed, it is a live, forgotten API
using the old key. Delete the service in the Render dashboard if you have not already.

## MEDIUM-1: No HTTP security headers

`vercel.json` only has the SPA rewrite. The site currently ships without
Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or
Permissions-Policy. Practical consequences: any site can iframe yours (clickjacking),
and there is no CSP backstop if an injection is ever found. HSTS is handled by Vercel
automatically.

Fix (ready to apply): headers block in `vercel.json` with a CSP tuned to exactly what
the site uses (Google Fonts, Supabase, inline styles for framer-motion).

## MEDIUM-2: Project links from the database render unvalidated

`ProjectCard` puts `github_url` / `live_url` straight into `<a href>`. If anyone ever
gains write access to the `projects` table (leaked service key, future policy
mistake), they could store `javascript:` URLs that execute code when a visitor clicks.
Low likelihood today, one-line defense: only render links whose scheme is http/https.
Fix included.

## MEDIUM-3: Supabase Auth signups are open but unused

Your Supabase project accepts new user signups by default, but the app has no login.
Right now an attacker who signs up gains nothing (verified: the `authenticated` role
has the same or less access than `anon` in every policy). But it is standing attack
surface, and any future policy granted `to authenticated` would be effectively public.
Fix: Supabase dashboard → Authentication → Sign In / Up → disable new user signups.
Dashboard-only setting; no SQL can do it.

## LOW-1: Visitors can set the `handled` flag on their own messages

The insert policy lets the caller supply any column, including `handled: true`, which
would make a message look already-read in your dashboard and easy to miss. The
hardening trigger forces `handled = false` on every insert. Fix included.

## LOW-2: `frontend/.gitignore` does not itself ignore `.env`

The root `.gitignore` covers it today, so nothing is exposed - but if the frontend
folder is ever split into its own repo, `frontend/.env` (with your Supabase keys)
would no longer be ignored. One line added to be safe. Fix included.

---

## Verified clean

- Git history: the actual SendGrid key value and Flask SECRET_KEY appear in no commit,
  in any branch. Only the environment-variable *names* appear in code, which is correct.
- `.env` files: untracked and ignored; the anon key exists only in `frontend/.env` and
  Vercel env vars, which is its intended, public-safe home.
- Dependencies: `npm audit` reports 0 vulnerabilities across all 505 modules.
- XSS: no `dangerouslySetInnerHTML`, `eval`, `innerHTML`, or `document.write`
  anywhere; React auto-escaping covers all rendered DB content (titles, descriptions).
- All 7 `target="_blank"` links carry `rel="noopener noreferrer"`.
- RLS as written: `messages` is insert-only for the public (no select, update, or
  delete path); `projects` is read-only for the public (no write path). The email
  trigger function is SECURITY DEFINER with a pinned search_path and EXECUTE revoked
  from API roles - all correct.
- The retired Flask backend's CORS was already restricted to your own origins, and the
  code never contained key material.

## One self-test to run (I could not reach supabase.co from the sandbox)

Paste in a terminal - it must return an empty array `[]`, never message rows:

    curl -s "https://xotsxwgkogwrzbtkfruq.supabase.co/rest/v1/messages?select=*" \
      -H "apikey: <your VITE_SUPABASE_ANON_KEY>"

If you ever see actual rows there, RLS is off - tell me immediately.

## Fix bundle

| File | What it does |
|---|---|
| `supabase/harden.sql` | Per-IP and global rate limits on `messages`, forces `handled=false` |
| `frontend/vercel.json` | Adds CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy |
| `frontend/src/components/ProjectCard.jsx` | Renders only http/https links from the DB |
| `frontend/.gitignore` | Ignores `.env` locally |

Plus two manual steps: rotate the SendGrid key (HIGH-2) and disable Supabase signups
(MEDIUM-3).
