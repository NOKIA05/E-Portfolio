-- ============================================================================
--  Case study pages: schema + first case study
--  Run in: Supabase dashboard -> SQL Editor -> Run. Safe to re-run.
--
--  Adds `slug` (the URL: /projects/<slug>) and `case_study` (markdown text)
--  to the projects table, auto-generates slugs from titles, and fills in a
--  complete case study for the Personal Portfolio project.
--
--  To write case studies for other projects: Table Editor -> projects ->
--  edit the case_study cell. Supported markdown:
--    ## Heading   ### Subheading   - bullet   1. numbered
--    **bold**   `code`   [link](https://...)   ``` code block ```
-- ============================================================================

-- 1. Columns
alter table public.projects add column if not exists slug text;
alter table public.projects add column if not exists case_study text;

create unique index if not exists projects_slug_idx
  on public.projects (slug)
  where slug is not null;

-- 2. Auto-generate slugs from titles for rows that lack one
update public.projects
set slug = trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g'))
where slug is null or slug = '';

-- 3. First case study: the portfolio itself (edit freely in Table Editor)
update public.projects
set case_study = '## The goal

I wanted a portfolio that does more than list projects: one where the engineering itself is part of the pitch. As a cybersecurity student, the site had to demonstrate secure architecture, not just claim it.

## Architecture

The site is fully serverless. There is no backend server to patch, scale, or leave running:

- **React + Vite** front end, deployed on Vercel''s CDN
- **Supabase (Postgres)** stores projects and contact messages, protected by Row Level Security
- **A Supabase Edge Function** is the only write path into the database
- **Postgres triggers** handle rate limiting and email notifications inside the database itself

The original version ran a Flask backend on a hosting service. Retiring it removed an entire server from the attack surface and cut the moving parts roughly in half.

## Securing the contact form

A public form that writes to a database is the most attacked thing on any site, so it got defense in depth:

1. A **honeypot field** silently swallows naive bots
2. **Cloudflare Turnstile** is verified server-side in the Edge Function, where bots cannot skip it
3. A **Postgres trigger** enforces rate limits: 5 messages per hour per IP, 40 per day globally
4. **Row Level Security** denies all public reads; after hardening, public writes are revoked entirely, so the Edge Function (using the service role) is the single door in
5. `CHECK` constraints on the table validate lengths and email format even if every layer above fails

When a message lands, another trigger calls the Resend API through `pg_net` and emails it to me with reply-to set to the sender.

## Hardening the delivery

- Content-Security-Policy, X-Frame-Options, nosniff, and Referrer-Policy headers on every response
- URLs stored in the database are scheme-validated before rendering, so a compromised row cannot inject `javascript:` links
- Secrets live in Supabase Vault and function secrets, never in the repository: verified by searching the full git history
- GitHub Actions CI runs `npm audit` and a production build on every push

## What broke along the way

Real projects have surprises. The email provider ended its free tier mid-build, which forced a migration from SendGrid to Resend: one SQL function swap, zero downtime. Safari painted text selections across entire layout containers, which took three progressively stronger fixes to kill. Both taught me more than the parts that worked first try.'
where title ilike '%portfolio%';

-- 4. Verify: every project now has a slug you can visit at /projects/<slug>
select id, title, slug,
       case when case_study is not null then 'written' else 'todo' end as case_study_status
from public.projects
order by created_at desc;
