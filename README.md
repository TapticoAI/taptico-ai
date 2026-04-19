# TapticoAI — Client Portal

Authenticated client portal for [app.taptico.ai](https://app.taptico.ai).

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Brand: `#0A0A0A` / `#FFFFFF` / `#0D2B6B` on Poppins
- Supabase Auth (email/password + magic link) via `@supabase/ssr`
- Supabase Postgres + RLS for org-scoped data
- Supabase Vault for per-org Anthropic API key storage
- Resend for transactional email (admin notifications, welcome)
- Vercel hosting

## Routes

| Route                    | Access         | Purpose                                                    |
|--------------------------|----------------|------------------------------------------------------------|
| `/`                      | public         | Redirects to `/dashboard` (signed in) or `/login`          |
| `/login`, `/signup`      | public         | Email/password + magic-link auth                           |
| `/auth/callback`         | public         | Supabase OAuth / magic-link session exchange              |
| `/auth/logout`           | public (POST)  | Clears session                                             |
| `/onboarding`            | authed         | 4-step wizard (profile → API key → Discord → done)        |
| `/dashboard`             | authed+onboarded | Welcome header + playbook cards                          |
| `/playbooks`             | authed+onboarded | List of the 4 playbooks with status pills                |
| `/playbooks/[slug]`      | authed+onboarded | Detail page + intake form + status tracker               |
| `/account`               | authed+onboarded | Edit name + company, view org                            |
| `/settings`              | authed+onboarded | Manage Anthropic API key (own key ↔ Taptico's key)       |

`middleware.ts` refreshes the Supabase session cookie on every request and
gates non-public routes (with 401 JSON for unauthenticated API calls). Portal
pages use `requireOnboardedUser()` to bounce not-yet-onboarded users to
`/onboarding`.

## Local dev

```bash
cp .env.example .env.local
# Fill in Supabase URL / anon key / service role key, plus Resend + Anthropic keys
npm install
npm run dev
```

## Database / RLS / Vault

Apply in order:

1. `supabase/migrations/0001_portal_rls.sql` — base orgs + profiles + signup trigger
2. `supabase/migrations/0002_portal_phase2.sql` — `organization_members`, onboarding
   fields, `resources` + `playbook_requests`, Vault RPCs, and the 4 seeded playbooks

The Anthropic API key entered at onboarding (or in Settings) is written to
Supabase Vault via the `set_org_anthropic_secret` SECURITY DEFINER function.
Only the per-org Vault `secret_id` and the last 4 chars are stored on
`organizations` — the plaintext key never leaves Vault.

## Deploy

See [`DEPLOY.md`](./DEPLOY.md) for Vercel env vars, DNS for `app.taptico.ai`,
and Supabase auth / Vault / email configuration.

---

Built by TapticoOS
