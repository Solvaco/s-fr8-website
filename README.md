# Solvaco Freight — Website

Bilingual (FR/EN) marketing site for Solvaco Freight. Next.js + TypeScript + Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

## Email delivery (EmailJS)

The three forms (quote, carrier signup, tracking) send through [EmailJS](https://www.emailjs.com/), client-side, no backend.

1. Create an EmailJS account and an Email Service — note the **Service ID**.
2. Create three Email Templates (quote, carrier, tracking) — note each **Template ID**.
3. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_CARRIER`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_TRACKING`

Until these are set, submitting any form shows a "not configured" error instead of silently failing.

## Testing

```bash
npm run test
```

## Scope

Separate repo from `solvaco-website` (construction site) and `flatbed-broker` (internal ops/TMS) — no shared code, no shared deploy, no live connection between them. See `docs/superpowers/specs/2026-08-15-solvaco-freight-website-design.md`.
