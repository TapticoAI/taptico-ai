-- TapticoAI Portal — baseline schema + RLS
-- Ensures each authenticated user can only access data within their own org.

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Organizations
-- ---------------------------------------------------------------------------
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Profiles: one row per auth.users, with the org they belong to.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company text,
  org_id uuid references public.organizations(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_org_id_idx on public.profiles(org_id);

-- ---------------------------------------------------------------------------
-- Auto-create profile + org on user signup.
-- Signup sends full_name + company in user_metadata (see SignupForm).
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

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Helper: current user's org_id. SECURITY DEFINER so RLS policies can call
-- it without recursion into profiles policies.
-- ---------------------------------------------------------------------------
create or replace function public.current_org_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select org_id from public.profiles where id = auth.uid();
$$;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profiles       enable row level security;
alter table public.organizations  enable row level security;

-- Profiles: a user can read + update their own row only.
drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own"
  on public.profiles
  for select
  using (id = auth.uid());

drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own"
  on public.profiles
  for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- Organizations: members of the org can read it. No client-side writes
-- (handled by the signup trigger / admin tooling).
drop policy if exists "orgs: read own org" on public.organizations;
create policy "orgs: read own org"
  on public.organizations
  for select
  using (id = public.current_org_id());

-- ---------------------------------------------------------------------------
-- Template for future org-scoped tables.
-- Uncomment and adapt when adding real portal resources.
-- ---------------------------------------------------------------------------
-- create table if not exists public.example_resource (
--   id uuid primary key default gen_random_uuid(),
--   org_id uuid not null references public.organizations(id) on delete cascade,
--   created_by uuid references auth.users(id) on delete set null,
--   created_at timestamptz not null default now()
-- );
-- alter table public.example_resource enable row level security;
-- create policy "example: read own org" on public.example_resource
--   for select using (org_id = public.current_org_id());
-- create policy "example: write own org" on public.example_resource
--   for all using (org_id = public.current_org_id())
--   with check (org_id = public.current_org_id());
