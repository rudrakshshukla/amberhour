# The Amber Hour

Website for The Amber Hour — a strategy-counsel personal brand. Built from
the design handoff in [`design/`](./design) (see `design/HANDOFF-SPEC.md`
for the full specification, and `design/README.md` for build status).

## Stack

Next.js (App Router) + TypeScript, deployed on Vercel. Content will be
managed in Sanity (Studio at `/studio`), payments via Stripe + Razorpay —
see `design/HANDOFF-SPEC.md` for the full plan.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
src/
  app/
    layout.tsx          root layout — fonts + global tokens only
    globals.css          design tokens (colour, type, spacing) as CSS variables
    fonts.ts              self-hosted PP Editorial Old + Instrument Sans
    (site)/               route group: every marketing page gets shared chrome
      layout.tsx           header, status line, footer
      page.tsx              home (placeholder — build stage 2 replaces this)
  components/
    Header/, StatusLine/, Footer/   shared chrome components
  lib/
    nav.ts                shared nav link data
    site-settings.ts       siteSettings shape + placeholder values (→ Sanity later)
public/
  assets/                logo files (masked with CSS, see Header/Footer)
```

Fonts are self-hosted from `src/fonts/` (originals in the design handoff).
The Sanity Studio, once built, is expected to live outside the `(site)`
route group so it renders without the marketing chrome.
