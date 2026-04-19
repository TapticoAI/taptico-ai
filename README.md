# TapticoAI — Client Portal

Authenticated client portal for [app.taptico.ai](https://app.taptico.ai).

## Stack

- Next.js 14 (App Router)
- TypeScript + Tailwind CSS (brand: `#0A0A0A` / `#FFFFFF` / `#0D2B6B`, Poppins)
- Supabase Auth (email/password) via `@supabase/ssr`
- Supabase Postgres + RLS for org-scoped data
- Vercel deployment

## Routes

| Route        | Access       | Purpose                                         |
|--------------|--------------|-------------------------------------------------|
| `/`          | public       | Redirects to `/dashboard` or `/login`           |
| `/login`     | public       | Email/password login                            |
| `/signup`    | public       | Create account + workspace                      |
| `/dashboard` | authed       | Welcome, sidebar nav, workspace summary         |
| `/account`   | authed       | Edit name + company, view organization          |
| `/auth/*`    | public       | Session callback + logout handlers              |

All non-public routes are gated by `middleware.ts`, which refreshes the
Supabase session cookie on every request.

## Local dev

```bash
cp .env.example .env.local
# Fill in:
#   NEXT_PUBLIC_SUPABASE_URL
#   NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
```

## Database / RLS

Apply `supabase/migrations/0001_portal_rls.sql` to your Supabase project
(SQL editor or `supabase db push`). It sets up:

- `organizations`, `profiles`
- A signup trigger that creates an org + profile per new user
- RLS policies so each user only reads their own profile and own org

## Deploy

See [`DEPLOY.md`](./DEPLOY.md) for the Vercel + domain + Supabase auth
configuration checklist for `app.taptico.ai`.

---

Built by TapticoOS
