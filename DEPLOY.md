# TapticoAI Portal — Deployment (app.taptico.ai)

## Vercel project

1. Import the repo into Vercel — framework auto-detected as Next.js.
2. Add the following environment variables (Production + Preview):

   | Var                              | Required | Notes                                                                 |
   |----------------------------------|----------|-----------------------------------------------------------------------|
   | `NEXT_PUBLIC_SUPABASE_URL`       | yes      | `https://<project-ref>.supabase.co`                                   |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | yes      | Safe to ship to the browser                                           |
   | `SUPABASE_SERVICE_ROLE_KEY`      | yes      | **Server-only.** Needed for Vault reads. Never prefix with NEXT_PUBLIC_. |
   | `ANTHROPIC_API_KEY`              | yes      | Taptico's fallback key (used when `organizations.uses_taptico_key = true`) |
   | `RESEND_API_KEY`                 | yes      | Transactional email                                                   |
   | `RESEND_FROM`                    | yes      | e.g. `TapticoAI <notifications@app.taptico.ai>` — must match a verified Resend domain |
   | `ADMIN_EMAIL`                    | yes      | Receives playbook request + new-signup notifications                  |
   | `NEXT_PUBLIC_DISCORD_INVITE_URL` | optional | Shown in onboarding Step 3                                            |
   | `GHL_API_KEY`, `GHL_LOCATION_ID` | optional | Legacy waitlist endpoint at `/api/waitlist`                           |

3. Production branch: `main`.

## Domain: `app.taptico.ai`

1. Vercel → Project → Settings → Domains → **Add** `app.taptico.ai`.
2. DNS:

   | Type  | Name | Value                  |
   |-------|------|------------------------|
   | CNAME | app  | cname.vercel-dns.com   |

3. Vercel issues the TLS cert automatically.

## Supabase — Auth

**Authentication → URL Configuration:**

- **Site URL:** `https://app.taptico.ai`
- **Additional redirect URLs:**
  - `https://app.taptico.ai/auth/callback`
  - `http://localhost:3000/auth/callback` (local dev)

**Authentication → Providers → Email:**

- Enable email + password
- Enable magic link
- (Optional) Disable email confirmation if you want new users logged in immediately after signup

**Authentication → Email Templates** (all templates target `{{ .ConfirmationURL }}` flowing through `/auth/callback`):

- Magic link
- Confirm signup (email verification)
- Optional: customize copy to match brand. Subject lines should reference TapticoAI.

If Supabase's default SMTP limits become a problem, wire Supabase Auth to send
through Resend via the custom SMTP integration (Authentication → SMTP Settings).

## Supabase — Database

Run both migrations in order, either via the SQL editor or `supabase db push`:

1. `supabase/migrations/0001_portal_rls.sql`
2. `supabase/migrations/0002_portal_phase2.sql`

Verify:

- `select * from public.resources where type = 'playbook';` returns 4 rows.
- `select routine_name from information_schema.routines where routine_schema = 'public' and routine_name in ('set_org_anthropic_secret','clear_org_anthropic_secret','current_org_id');` returns 3 rows.
- RLS is enabled on `profiles`, `organizations`, `organization_members`, `resources`, `playbook_requests`.

## Supabase — Vault

`supabase_vault` extension is enabled by the 0002 migration. Verify under
Database → Extensions if you want to double-check. The `set_org_anthropic_secret`
and `clear_org_anthropic_secret` RPCs are the only way the app writes to Vault;
they are SECURITY DEFINER and check org membership before touching it.

## Resend

1. Add and verify your sending domain at Resend (e.g. `app.taptico.ai` or
   `notifications.taptico.ai`).
2. Create an API key, copy it into `RESEND_API_KEY`.
3. Set `RESEND_FROM` to a `Name <address@verified-domain>` string.
4. Templates sent from the portal:
   - **Welcome** — fired from `/api/onboarding/complete` on finish.
   - **Playbook request notification (admin)** — fired from
     `/api/playbooks/[slug]/request`.
   - Supabase Auth handles **magic link** and **email verification** emails
     directly — either via Supabase's default SMTP or by wiring Supabase's
     Custom SMTP settings to Resend.
