# TapticoAI Portal — Deployment (app.taptico.ai)

## Vercel project

1. Import the repo into Vercel (framework auto-detected as Next.js).
2. Set environment variables on the Vercel project:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GHL_API_KEY` (optional — legacy waitlist endpoint)
   - `GHL_LOCATION_ID` (optional)
3. Production branch: `main`.

## Domain: `app.taptico.ai`

1. Vercel → Project → Settings → Domains → **Add** `app.taptico.ai`.
2. In your DNS provider, add:

   | Type  | Name | Value                  |
   |-------|------|------------------------|
   | CNAME | app  | cname.vercel-dns.com   |

3. Vercel will issue the TLS certificate automatically.

## Supabase auth configuration

In Supabase → Authentication → URL Configuration:

- **Site URL:** `https://app.taptico.ai`
- **Additional redirect URLs:**
  - `https://app.taptico.ai/auth/callback`
  - `http://localhost:3000/auth/callback` (for local dev)

## Apply RLS policies

Run `supabase/migrations/0001_portal_rls.sql` against the Supabase project
(either via the SQL editor or `supabase db push`). See that file for details.
