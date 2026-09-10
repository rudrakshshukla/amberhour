# Design handoff (reference only)

This folder is the original design handoff, kept for reference while the
site is built — it is **not** part of the app and nothing here is imported
by the code.

- **`HANDOFF-SPEC.md`** — the full specification: every screen, design
  token, the CMS schema, and how payments, delivery and content editing
  should work. This is the source of truth for anything the code should
  do; consult it before each build stage.
- **`brief.txt`** — the owner's original content/voice brief.
- **`START-HERE.md`** — the non-developer's guide to this handoff (accounts
  needed, how content editing will work day to day).
- **`*.dc.html`** — the original design prototypes. Useful to open in a
  browser for a pixel reference, but their fonts/images won't load from
  here (relative `fonts/` and `assets/` paths were left out to avoid
  duplicating ~8MB already copied into the app — see `src/fonts/` and
  `public/assets/`). Do not copy their markup or CSS directly; they're
  prototyping output, not production code (see `HANDOFF-SPEC.md` →
  "About the design files").

## Build status

Tracking against `HANDOFF-SPEC.md` → "Suggested build order":

- [x] 1. Next.js on Vercel, fonts self-hosted, tokens and shared layout
      (header, status line, footer). Static copy.
- [x] 2. Home page, complete, with placeholder imagery.
- [ ] 3. Sanity schema and Studio at `/studio`. Wire Notes and the Library
      to real content.
- [ ] 4. Remaining pages.
- [ ] 5. Stripe: multi-currency price model, bag, checkout, Stripe Tax,
      webhook, signed download links, receipt page, emails. GBP only.
- [ ] 6. Currency switcher, geo routing, additional Stripe currencies,
      Razorpay for India.
- [ ] 7. Bundles and the free-tool opt-in flow.
- [ ] 8. Newsletter integration once the platform is chosen.
- [ ] 9. Performance, SEO, accessibility pass.
