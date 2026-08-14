-- ============================================================================
--  Email notification for new contact messages
--  Run in: Supabase dashboard → SQL Editor → New query → Run
--
--  What it does: every INSERT into public.messages fires a trigger that calls
--  the SendGrid API (via the pg_net extension), emailing you the message with
--  reply-to set to the sender - so you can answer them directly from Gmail.
--
--  ONE THING TO EDIT BEFORE RUNNING:
--  In section 2, replace PASTE_YOUR_SENDGRID_KEY_HERE with your real SendGrid
--  API key (the SG.… value from your old backend .env). It is stored in
--  Supabase Vault (encrypted) - NOT in this file and NOT in your git repo.
--  Don't save the key into this file afterwards.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. Extensions: pg_net makes async HTTP calls from Postgres
-- ----------------------------------------------------------------------------
create extension if not exists pg_net with schema extensions;


-- ----------------------------------------------------------------------------
-- 2. Store the SendGrid key in Vault (encrypted at rest)
--    Re-running with a new value updates the secret.
-- ----------------------------------------------------------------------------
do $$
declare
  v_id uuid;
begin
  select id into v_id from vault.secrets where name = 'sendgrid_api_key';
  if v_id is null then
    perform vault.create_secret('PASTE_YOUR_SENDGRID_KEY_HERE', 'sendgrid_api_key');
  else
    perform vault.update_secret(v_id, 'PASTE_YOUR_SENDGRID_KEY_HERE');
  end if;
end $$;


-- ----------------------------------------------------------------------------
-- 3. The trigger function
--    from  = aboododehqw10@gmail.com   (your verified SendGrid sender)
--    to    = abdelrahmanodeh50@gmail.com
--    Edit those two addresses below if they change.
-- ----------------------------------------------------------------------------
create or replace function public.notify_new_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_key text;
begin
  select decrypted_secret into v_key
  from vault.decrypted_secrets
  where name = 'sendgrid_api_key';

  -- If the key is missing, still accept the message - never block the insert.
  if v_key is null or v_key = 'PASTE_YOUR_SENDGRID_KEY_HERE' then
    return new;
  end if;

  perform net.http_post(
    url     := 'https://api.sendgrid.com/v3/mail/send',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || v_key,
      'Content-Type',  'application/json'
    ),
    body    := jsonb_build_object(
      'personalizations', jsonb_build_array(
        jsonb_build_object('to', jsonb_build_array(
          jsonb_build_object('email', 'abdelrahmanodeh50@gmail.com')
        ))
      ),
      'from', jsonb_build_object(
        'email', 'aboododehqw10@gmail.com',
        'name',  'Portfolio Contact Form'
      ),
      'reply_to', jsonb_build_object('email', new.email, 'name', new.name),
      'subject', 'Portfolio message from ' || new.name,
      'content', jsonb_build_array(
        jsonb_build_object(
          'type',  'text/plain',
          'value', 'From: ' || new.name || ' <' || new.email || '>'
                   || E'\nReceived: ' || to_char(new.created_at, 'YYYY-MM-DD HH24:MI UTC')
                   || E'\n\n' || new.message
                   || E'\n\n-\nReply to this email to answer them directly.'
        )
      )
    )
  );

  return new;
end;
$$;

-- Lock it down: only the trigger should run this, not API callers.
revoke execute on function public.notify_new_message() from public, anon, authenticated;


-- ----------------------------------------------------------------------------
-- 4. Wire the trigger to the messages table
-- ----------------------------------------------------------------------------
drop trigger if exists on_message_insert on public.messages;
create trigger on_message_insert
  after insert on public.messages
  for each row execute function public.notify_new_message();


-- ----------------------------------------------------------------------------
-- 5. TEST - run this after the above, then check your inbox (and spam folder):
-- ----------------------------------------------------------------------------
-- insert into public.messages (name, email, message)
-- values ('Test Person', 'test@example.com', 'If you are reading this in your inbox, the trigger works.');

-- If no email arrives, see what SendGrid answered (status 202 = accepted):
-- select id, status_code, content, error_msg
-- from net._http_response
-- order by id desc
-- limit 5;
