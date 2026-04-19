-- TapticoAI Portal — Phase 2 schema
-- Adds: organization_members (proper join table), onboarding fields on profiles,
-- Anthropic key columns on organizations, resources + playbook_requests tables,
-- Vault RPCs for per-org Anthropic secrets, RLS policies, and seeds the 4 playbooks.

-- ---------------------------------------------------------------------------
-- Extensions: Vault may or may not be installed by default; require it.
-- ---------------------------------------------------------------------------
create extension if not exists "supabase_vault";

-- ---------------------------------------------------------------------------
-- Organization members (join table)
-- ---------------------------------------------------------------------------
create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  unique (org_id, user_id)
);

create index if not exists organization_members_user_idx on public.organization_members(user_id);
create index if not exists organization_members_org_idx on public.organization_members(org_id);

-- Backfill from profiles (each existing profile becomes an owner of its org).
insert into public.organization_members (org_id, user_id, role)
select p.org_id, p.id, 'owner'
from public.profiles p
where p.org_id is not null
on conflict (org_id, user_id) do nothing;

-- ---------------------------------------------------------------------------
-- current_org_id: now reads from organization_members instead of profiles.
-- Kept SECURITY DEFINER so RLS policies can call without recursion.
-- ---------------------------------------------------------------------------
create or replace function public.current_org_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select org_id
  from public.organization_members
  where user_id = auth.uid()
  order by created_at asc
  limit 1;
$$;

-- ---------------------------------------------------------------------------
-- Profile extensions: role (collected in onboarding) + onboarding status.
-- ---------------------------------------------------------------------------
alter table public.profiles add column if not exists role text;
alter table public.profiles add column if not exists onboarded_at timestamptz;

-- ---------------------------------------------------------------------------
-- Organization extensions: Anthropic key reference + fallback flag.
-- uses_taptico_key defaults true so new orgs run on Taptico's key until they
-- set their own.
-- ---------------------------------------------------------------------------
alter table public.organizations add column if not exists anthropic_key_secret_id text;
alter table public.organizations add column if not exists anthropic_key_last4 text;
alter table public.organizations add column if not exists uses_taptico_key boolean not null default true;

-- Allow org members to update their own org's non-sensitive flags.
drop policy if exists "orgs: update own org" on public.organizations;
create policy "orgs: update own org"
  on public.organizations
  for update
  to authenticated
  using (id = public.current_org_id())
  with check (id = public.current_org_id());

-- ---------------------------------------------------------------------------
-- Update handle_new_user trigger: also write to organization_members.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_company text := coalesce(nullif(new.raw_user_meta_data ->> 'company', ''), 'My Workspace');
  v_name    text := coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1));
  v_org_id  uuid;
begin
  insert into public.organizations (name)
  values (v_company)
  returning id into v_org_id;

  insert into public.profiles (id, full_name, company, org_id)
  values (new.id, v_name, v_company, v_org_id);

  insert into public.organization_members (org_id, user_id, role)
  values (v_org_id, new.id, 'owner');

  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Resources: shared content catalog (playbooks, etc.)
-- Readable by any authenticated user (the portal's product catalog).
-- ---------------------------------------------------------------------------
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  slug text not null unique,
  title text not null,
  tagline text,
  body text not null,
  access_tier text not null default 'paid',
  tags text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.resources enable row level security;

drop policy if exists "resources: authenticated read" on public.resources;
create policy "resources: authenticated read"
  on public.resources
  for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Playbook requests: one row per "Request this playbook" click.
-- RLS scopes reads/writes to the requesting user's org.
-- ---------------------------------------------------------------------------
create table if not exists public.playbook_requests (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  playbook_slug text not null,
  status text not null default 'requested',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint playbook_requests_status_chk
    check (status in ('requested', 'in_progress', 'delivered'))
);

create index if not exists playbook_requests_org_idx on public.playbook_requests(org_id);
create index if not exists playbook_requests_slug_idx on public.playbook_requests(playbook_slug);

alter table public.playbook_requests enable row level security;

drop policy if exists "playbook_requests: select own org" on public.playbook_requests;
create policy "playbook_requests: select own org"
  on public.playbook_requests
  for select
  to authenticated
  using (
    org_id in (select om.org_id from public.organization_members om where om.user_id = auth.uid())
  );

drop policy if exists "playbook_requests: insert own org" on public.playbook_requests;
create policy "playbook_requests: insert own org"
  on public.playbook_requests
  for insert
  to authenticated
  with check (
    org_id in (select om.org_id from public.organization_members om where om.user_id = auth.uid())
    and user_id = auth.uid()
  );

-- No update/delete from clients — status transitions happen server-side (admin).

-- ---------------------------------------------------------------------------
-- Vault RPCs: set / clear the org's Anthropic API key.
-- Callable by an authenticated org member; everything else is service-role only.
-- ---------------------------------------------------------------------------
create or replace function public.set_org_anthropic_secret(
  p_org_id uuid,
  p_secret text,
  p_last4  text
)
returns uuid
language plpgsql
security definer
set search_path = public, vault
as $$
declare
  v_old   uuid;
  v_new   uuid;
  v_count int;
begin
  select count(*) into v_count
  from public.organization_members
  where org_id = p_org_id and user_id = auth.uid();
  if v_count = 0 then
    raise exception 'not_authorized';
  end if;

  select (anthropic_key_secret_id)::uuid into v_old
  from public.organizations where id = p_org_id;

  select vault.create_secret(
    p_secret,
    'org_' || p_org_id::text || '_anthropic_' || extract(epoch from now())::bigint::text,
    'Anthropic API key for org ' || p_org_id::text
  ) into v_new;

  update public.organizations
     set anthropic_key_secret_id = v_new::text,
         anthropic_key_last4     = p_last4,
         uses_taptico_key        = false
   where id = p_org_id;

  if v_old is not null then
    begin
      delete from vault.secrets where id = v_old;
    exception when others then
      -- Non-fatal: new secret is already in place.
      null;
    end;
  end if;

  return v_new;
end;
$$;

revoke all on function public.set_org_anthropic_secret(uuid, text, text) from public;
grant execute on function public.set_org_anthropic_secret(uuid, text, text) to authenticated;

create or replace function public.clear_org_anthropic_secret(p_org_id uuid)
returns void
language plpgsql
security definer
set search_path = public, vault
as $$
declare
  v_old   uuid;
  v_count int;
begin
  select count(*) into v_count
  from public.organization_members
  where org_id = p_org_id and user_id = auth.uid();
  if v_count = 0 then
    raise exception 'not_authorized';
  end if;

  select (anthropic_key_secret_id)::uuid into v_old
  from public.organizations where id = p_org_id;

  update public.organizations
     set anthropic_key_secret_id = null,
         anthropic_key_last4     = null,
         uses_taptico_key        = true
   where id = p_org_id;

  if v_old is not null then
    begin
      delete from vault.secrets where id = v_old;
    exception when others then
      null;
    end;
  end if;
end;
$$;

revoke all on function public.clear_org_anthropic_secret(uuid) from public;
grant execute on function public.clear_org_anthropic_secret(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Seed the 4 Leo-facing playbooks.
-- Upserts by slug so re-running the migration is safe.
-- ---------------------------------------------------------------------------
insert into public.resources (type, slug, title, tagline, body, access_tier, tags, sort_order) values
  ('playbook',
   'run-renewals',
   'Run My Renewals This Week',
   'Shadow quotes + retention emails for everything expiring in the next 45 days.',
   'Pull all policies expiring in the next 45 days, run shadow quotes across your appointed carriers, draft personalized retention emails for review, and deliver a renewal dashboard. You review and send — nothing auto-fires.',
   'paid',
   ARRAY['renewals', 'retention', 'automation', 'email'],
   10),
  ('playbook',
   'build-quote',
   'Build a Quote for [Client]',
   'Branded side-by-side quote PDF across 3–5 carriers in under 5 minutes.',
   'Speak client details once. Get a branded side-by-side quote PDF across 3-5 carriers plus a drafted client email ready to send — in under 5 minutes.',
   'paid',
   ARRAY['quoting', 'carriers', 'pdf', 'sales'],
   20),
  ('playbook',
   'daily-brief',
   'Prep Me for Today''s Calls',
   'A one-page brief for every meeting on your calendar, in your inbox by 7am.',
   'By 7am every day, get a one-page brief for every meeting on your calendar: client policy history, recent claims, life events, last touchpoint, and a recommended talking point.',
   'paid',
   ARRAY['briefing', 'calendar', 'crm', 'daily'],
   30),
  ('playbook',
   'inbox-triage',
   'Triage My Inbox',
   'Classified, prioritized, drafted replies for the last 24h of unread email.',
   'Every unread email from the last 24 hours gets classified, prioritized, and drafted with a response — logged to your CRM automatically. You review the queue, hit send on what you like.',
   'paid',
   ARRAY['email', 'inbox', 'crm', 'triage'],
   40)
on conflict (slug) do update set
  title       = excluded.title,
  tagline     = excluded.tagline,
  body        = excluded.body,
  tags        = excluded.tags,
  sort_order  = excluded.sort_order;
