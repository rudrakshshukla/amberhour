# The Amber Hour

Website for The Amber Hour — a strategy-counsel personal brand. Built from
the design handoff in [`design/`](./design) (see `design/HANDOFF-SPEC.md`
for the full specification, and `design/README.md` for build status).

## Stack

Next.js (App Router) + TypeScript, deployed on Vercel. Content is managed
in Sanity, with the Studio embedded at `/studio`. Payments (Stripe +
Razorpay) come in a later build stage — see `design/HANDOFF-SPEC.md` for
the full plan.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs and
looks right without any setup — Sanity-backed sections (the status line,
the Library and Notes previews) render sensible fallback/empty states
until Sanity is configured.

**To connect real content:** see [`design/SANITY-SETUP.md`](./design/SANITY-SETUP.md)
— a one-time, ~10 minute setup (create a free Sanity project, add a few
environment variables). After that, publishing in the Studio at `/studio`
updates the live site within seconds, no redeploy.

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
sanity.config.ts, sanity.cli.ts   Sanity Studio + CLI config (project root)
src/
  app/
    layout.tsx          root layout — fonts + global tokens only
    globals.css           design tokens (colour, type, spacing) as CSS variables
    fonts.ts               self-hosted PP Editorial Old + Instrument Sans
    page.tsx                Home — composes its own chrome (see below)
    (site)/                 route group: every OTHER marketing page gets shared chrome
      layout.tsx             header, status line, footer
    studio/[[...tool]]/     embedded Sanity Studio (client-only — see code comments)
    api/webhooks/sanity/    revalidation webhook Sanity calls on publish
  components/
    Header/, StatusLine/, Footer/   shared chrome components
    ui/                    reusable atoms (Button, TextLink, Kicker, SectionHead, CellGrid, ImagePlaceholder, CmsImage)
    home/                  Home page sections (Hero, PillarBlock, Dissect, LibraryPreview, …)
  sanity/
    env.ts                 project id/dataset/api version from env vars
    schemaTypes/            note, tool, bundle, currency, siteSettings, homePage + shared objects
    structure.ts             Studio desk structure (pins homePage + siteSettings as singletons)
    lib/
      client.ts, fetch.ts    lazy Sanity client + unstable_cache/revalidateTag wrapper
      queries.ts              typed GROQ queries used by the Home page
      image.ts                 Sanity image URL builder
      tags.ts                   cache tag names shared with the webhook route
  lib/
    nav.ts                  shared nav link data
    site-settings.ts         siteSettings shape + fallback values
    get-site-settings.ts      resolves real Sanity data over the fallback
    home-content.ts           Home page content shape + the design copy used as fallback
    get-home-content.ts       merges the homePage singleton over that fallback
public/
  assets/                  logo files (masked with CSS, see Header/Footer)
```

Fonts are self-hosted from `src/fonts/` (originals in the design handoff).

Home (`app/page.tsx`) lives outside the `(site)` route group because its
header is embedded in the hero image rather than a standalone bar; every
other page renders through `(site)/layout.tsx`. The Studio route is
outside that group too, so it never gets the marketing chrome.
