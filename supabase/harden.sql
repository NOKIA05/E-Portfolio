-- ============================================================================
--  Contact form hardening: rate limits + handled-flag protection
--  Run in: Supabase dashboard → SQL Editor. Safe to re-run.
--
--  Limits enforced entirely inside Postgres (no new infrastructure):
--    * max 5 messages per hour per IP address
--    * max 40 messages per day total (protects your SendGrid quota)
--    * visitors can never mark their own message as already handled
-- ============================================================================

-- Record the sender's IP so the per-IP limit has something to key on.
-- PostgREST forwards the caller's real IP in the request headers.
alter table public.messages add column if not exists sender_ip text;

create or replace function public.messages_guard()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_headers  json;
  v_ip       text;
  v_ip_count int;
  v_day_count int;
begin
  -- Never allow a visitor to pre-mark their message as handled
  new.handled := false;

  -- Caller IP from PostgREST-forwarded headers (null when run from SQL editor)
  begin
    v_headers := current_setting('request.headers', true)::json;
    v_ip := coalesce(
      v_headers ->> 'cf-connecting-ip',
      split_part(v_headers ->> 'x-forwarded-for', ',', 1),
      v_headers ->> 'x-real-ip'
    );
  exception when others then
    v_ip := null;
  end;
  new.sender_ip := v_ip;

  -- Per-IP limit: 5 per rolling hour
  if v_ip is not null then
    select count(*) into v_ip_count
    from public.messages
    where sender_ip = v_ip
      and created_at > now() - interval '1 hour';
    if v_ip_count >= 5 then
      raise exception 'Too many messages from this address. Please try again later.'
        using errcode = 'P0001';
    end if;
  end if;

  -- Global limit: 40 per rolling day (protects the SendGrid quota)
  select count(*) into v_day_count
  from public.messages
  where created_at > now() - interval '1 day';
  if v_day_count >= 40 then
    raise exception 'The contact form is receiving unusually high traffic. Please email me directly.'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke execute on function public.messages_guard() from public, anon, authenticated;

drop trigger if exists messages_guard_trigger on public.messages;
create trigger messages_guard_trigger
  before insert on public.messages
  for each row execute function public.messages_guard();

-- Index so the rate-limit counts stay fast
create index if not exists messages_sender_ip_time_idx
  on public.messages (sender_ip, created_at desc);

-- NOTE: sender_ip is personal data you now store. It is used only for rate
-- limiting; this optional cleanup job is worth running occasionally to strip
-- IPs older than a week:
-- update public.messages set sender_ip = null
-- where created_at < now() - interval '7 days' and sender_ip is not null;
