# TapticoAI — Beta Waitlist

Public-facing beta waitlist landing page for [taptico.ai](https://taptico.ai).

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Go High Level CRM (lead capture)

## Local Dev

```bash
cp .env.example .env.local
# Fill in GHL_API_KEY
npm install
npm run dev
```

## Deploy to Vercel

1. Connect repo to Vercel
2. Add env vars: `GHL_API_KEY`, `GHL_LOCATION_ID`
3. Deploy — zero config needed (`vercel.json` handles it)

## DNS for taptico.ai

Point your domain to Vercel:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 76.76.21.21            |
| CNAME | www  | cname.vercel-dns.com   |

## Promo Code

- Code: `NicksFirst50`
- Offer: First 14 days free
- Limit: 50 uses (tracked via GHL tag `promo-nicks50`)

## GHL Tags Applied

| Scenario | Tags |
|----------|------|
| Standard signup | `beta-waitlist` |
| Valid promo code | `beta-waitlist`, `promo-nicks50`, `14-days-free` |

---

Built by TapticoOS
