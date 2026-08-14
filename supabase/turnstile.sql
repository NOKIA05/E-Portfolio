-- ============================================================================
--  Close the direct write path to `messages`
--
--  RUN THIS ONLY AFTER the submit-message Edge Function is deployed and the
--  live contact form works through it. From then on, the function (using the
--  service-role key, which bypasses RLS) is the only way to insert a message;
--  the public anon key can no longer write to the table at all.
--  Safe to re-run.
-- ============================================================================

-- 1. Revoke public inserts: drop the old policy. With RLS on and no insert
--    policy, anon and authenticated inserts are denied by default.
drop policy if exists "anon can submit messages" on public.messages;

-- 2. Update the rate-limit guard: the Edge Function passes the visitor's real
--    IP explicitly in sender_ip (trustworthy now, since only the service role
--    can insert). Fall back to request headers for any other path.
create or replace function public.messages_guard()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_headers   json;
  v_ip        text;
  v_ip_count  int;
  v_day_count int;
begin
  new.handled := false;

  -- Prefer the IP the Edge Function supplied; else read forwarded headers
  v_ip := new.sender_ip;
  if v_ip is null then
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
  end if;

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

-- Verify: this should now return ZERO insert policies for messages
-- select polname from pg_policies where tablename = 'messages';
