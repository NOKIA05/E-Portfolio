-- ============================================================================
--  E-Portfolio — Supabase schema
--  Run this once in the Supabase dashboard → SQL Editor → New query → Run.
--  Every statement is idempotent, so re-running it is safe.
-- ============================================================================


-- ----------------------------------------------------------------------------
--  1. CONTACT MESSAGES
--  The contact form writes straight into this table (no backend server).
--  RLS: anonymous visitors may INSERT only. Nobody can read the table with the
--  public anon key — you read your messages from the Supabase dashboard.
-- ----------------------------------------------------------------------------
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text        not null check (char_length(trim(name))     between 1 and 120),
  email       text        not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message     text        not null check (char_length(trim(message))  between 10 and 5000),
  handled     boolean     not null default false
);

comment on table public.messages is 'Submissions from the portfolio contact form.';

alter table public.messages enable row level security;

-- Anyone (anon key) can submit a message...
drop policy if exists "anon can submit messages" on public.messages;
create policy "anon can submit messages"
  on public.messages
  for insert
  to anon, authenticated
  with check (true);

-- ...but nobody can read them back through the API.
drop policy if exists "no public reads" on public.messages;
create policy "no public reads"
  on public.messages
  for select
  to authenticated
  using (false);

create index if not exists messages_created_at_idx
  on public.messages (created_at desc);


-- ----------------------------------------------------------------------------
--  2. PROJECTS
--  Already exists — this section just makes sure the shape matches what the
--  new front end renders, and that public reads are allowed.
-- ----------------------------------------------------------------------------

-- Optional column: a list of technologies rendered as pills on each card.
alter table public.projects add column if not exists tech text[];

alter table public.projects enable row level security;

drop policy if exists "projects are publicly readable" on public.projects;
create policy "projects are publicly readable"
  on public.projects
  for select
  to anon, authenticated
  using (true);


-- ----------------------------------------------------------------------------
--  3. RENDER → SUPABASE CLEANUP
--  The backend moved off Render, so scrub the old name from project copy.
--  Run the SELECT first if you want to preview what will change.
-- ----------------------------------------------------------------------------

-- Preview (optional):
-- select id, title, description
-- from public.projects
-- where title ilike '%render%' or description ilike '%render%';

-- Word-boundary replace so "rendering" / "rendered" are left alone.
update public.projects
set title = regexp_replace(title, '\mRender\M', 'Supabase', 'gi')
where title ~* '\mRender\M';

update public.projects
set description = regexp_replace(description, '\mRender\M', 'Supabase', 'gi')
where description ~* '\mRender\M';

-- Same swap inside the tech[] array, if you use it.
update public.projects
set tech = (
  select array_agg(
    case when t ~* '^render$' then 'Supabase' else t end
    order by ord
  )
  from unnest(tech) with ordinality as u(t, ord)
)
where tech is not null
  and exists (select 1 from unnest(tech) t where t ~* '^render$');

-- Any leftover onrender.com links point at the retired Flask backend.
update public.projects
set live_url = null
where live_url ilike '%onrender.com%';


-- ----------------------------------------------------------------------------
--  4. VERIFY
-- ----------------------------------------------------------------------------
-- select id, title, description, tech, live_url from public.projects order by created_at desc;
-- select count(*) from public.messages;
