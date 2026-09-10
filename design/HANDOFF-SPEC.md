# Handoff: The Amber Hour website

## Overview

The Amber Hour is a strategy-counsel personal brand. The site does three jobs:

1. Explains the way of working — the three pillars **Think**, **Decide**, **Build**.
2. Sells digital tools (templates, frameworks, worksheets) from a **Library**.
3. Takes enquiries for one-to-one counsel (**Work With Me**).

Voice is "editorial studio" — a quiet magazine about thinking, not a template marketplace. Copy is sparse and dry. Photography and illustration carry the mood; text does not fill space.

**The site owner is not a developer.** Everything in the Content Management section below exists so she can publish essays, add tools, change prices and update the status line without touching code. Treat that as a hard requirement, not a nice-to-have.

---

## About the design files

The files in this bundle are **design references created in HTML**. They are prototypes showing intended look, layout and behaviour. They are **not production code to copy directly**.

They are authored as "Design Components" — each `*.dc.html` file is a single self-contained page with all styling inline. They open directly in a browser. Do not attempt to reuse their runtime (`support.js`) or their component format in the real build.

**The task is to recreate these designs in Next.js**, using the framework's own conventions: React components, the App Router, a real styling approach (CSS Modules or Tailwind — either is fine, match the tokens listed below exactly), and real data from a CMS.

## Fidelity

**High fidelity.** Colours, typography, spacing, layout and copy are final. Recreate the UI faithfully. Every hex value, font size and rule weight in these files is deliberate.

Two things are *not* final:

- **Imagery.** Every image is a drop-target placeholder. The owner will supply photography and commissioned illustrations. Treat each placeholder as a real image slot with the aspect ratio given in the spec.
- **Prices.** All prices read `£00`. Real prices come from the CMS.

---

## Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js** (App Router, React Server Components) | Owner's choice |
| Hosting | **Vercel** | Owner will connect the repo to Vercel directly |
| Content | **Sanity** (hosted Studio at `/studio`) | See Content Management |
| Payments | **Stripe** + **Razorpay** | Dual gateway, see Payments |
| Tax | **Stripe Tax** | Selling worldwide; digital goods |
| File storage | Private bucket (Vercel Blob, S3 or Sanity assets with signed access) | Purchased files must never be publicly addressable |
| Transactional email | **Resend** recommended | Email platform undecided — see Email |
| Newsletter | Undecided — see Email | Keep the integration behind one module so it can be swapped |

Language: TypeScript. Keep dependencies minimal.

---

## Content management (the most important section)

The owner must be able to do all of the following alone, from a browser, with no code and no deploy:

1. Write and publish an essay.
2. Add a new tool to the Library, upload its file, set its price, upload its cover image.
3. Change any price.
4. Change the status line in the header.
5. Create a bundle of two or more tools at a combined price.
6. Mark a tool as free (lead magnet) so it is delivered in exchange for an email address.

**Recommended: Sanity, with the Studio deployed at `/studio` on the same domain.** She logs in, sees plain labelled fields, uploads a file, hits Publish. Content changes appear without a redeploy (use `revalidateTag` / `revalidatePath` from a Sanity webhook).

Do not build a bespoke admin panel. Do not use a git-based CMS (MDX files in the repo) — it requires a commit, which she cannot do.

### Schema

**`note`** — an essay, observation or question
| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | required |
| `slug` | slug | auto from title |
| `kind` | string, enum | `Essay` \| `Observation` \| `Question` — shown as the label |
| `readingMinutes` | number | shown as "6 min" |
| `publishedAt` | datetime | drives ordering and the "Aug 2026" stamp |
| `standfirst` | text | the italic line under the headline |
| `leadImage` | image | 16:9, with alt text |
| `body` | portable text | headings, paragraphs, italics, pull quotes, inline images |
| `relatedTool` | reference → `tool` | optional; renders the sidebar card |
| `featured` | boolean | one featured note appears at the top of the Notes index |

Portable text needs a pull-quote block type and an image block. Nothing else.

**`tool`** — a Library item
| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | required |
| `slug` | slug | |
| `number` | number | the `01`, `02` displayed |
| `pillar` | string, enum | `Think` \| `Decide` \| `Build` — drives the filters |
| `summary` | text | one sentence, used on index and cards |
| `description` | portable text | the "What it is" block |
| `contents` | array of strings | the "What's inside" numbered list |
| `coverImage` | image | 4:3 |
| `previewImages` | array of images | 3:4, the "Look inside" row |
| `prices` | array of `{currency, amount}` | One entry per market currency. `0` means free — see Free tools. Set by hand, never converted at runtime. |
| `file` | file asset (private) | the deliverable |
| `notionUrl` | url | optional duplicate link, if the tool is a Notion template |
| `status` | string, enum | `Available` \| `In progress` — in-progress items render greyed with "Soon" and no buy button |

**`bundle`**
| Field | Type | Notes |
| --- | --- | --- |
| `title`, `slug`, `summary`, `coverImage` | as above | |

**`currency`** — the markets that are live
| Field | Type | Notes |
| --- | --- | --- |
| `code` | string | ISO 4217, e.g. `GBP`, `AED`, `USD`, `EUR`, `SGD`, `INR` |
| `symbol` | string | e.g. `£`, `AED`, `$`, `€` |
| `gateway` | string, enum | `Stripe` \| `Razorpay` |
| `countries` | array of strings | ISO country codes routed to this currency |
| `active` | boolean | Turning a currency on makes that market live |

This is how the owner opens a new market herself: add a currency, tick the countries, then fill in that currency's price on each tool. Nothing ships without a price in an active currency — validate that in the Studio.
| `tools` | array of references → `tool` | 2+ |
| `prices` | array of `{currency, amount}` | the combined price per currency, set manually |

**`siteSettings`** — a singleton
| Field | Type | Notes |
| --- | --- | --- |
| `statusLine` | string | e.g. "Currently thinking about — whether a smaller offer would sell better" |
| `issueLabel` | string | e.g. "No. 014 · September" |
| `newsletterBlurb` | text | |

The status line is a plain text field she edits whenever she likes. It does **not** tick or animate.

---

## Payments

The owner is expanding market by market — UK first, then the UAE, the rest of Asia, the US, Europe, and onward. **Stripe is the platform of choice and handles all of it**; Razorpay sits alongside it for India only, where UPI and local cards matter.

So the routing is:

- **India → Razorpay**, charged in INR.
- **Everywhere else → Stripe**, charged in the currency mapped to the buyer's country.

Detect country server-side from the Vercel geo header (`x-vercel-ip-country`) and look it up against the `currency` documents. Fall back to GBP for any country not yet mapped. Let the buyer override with a small currency switcher — geo detection is a default, not a verdict — and persist the choice in a cookie.

Do not convert currencies at runtime, and do not use a live FX rate. Every price is set by hand per currency in the CMS, so the owner controls exactly what each market sees and can price for local expectations rather than exchange rates.

Build this multi-currency structure in from the start even while only GBP is live. Retrofitting it later means touching every price, every product page and the whole checkout path.

### Flow (both gateways)

1. Buyer clicks **Add to bag** or **Buy now**. Bag state is client-side (localStorage), lines are `{toolId | bundleId, qty: 1}`.
2. **Checkout** posts the bag to a server route. The server re-reads prices from the CMS — never trust a price sent by the client.
3. **Stripe path:** create a Checkout Session (mode `payment`), `automatic_tax: { enabled: true }`, `customer_creation: 'always'`, redirect to Stripe's hosted page.
   **Razorpay path:** create an Order, open Razorpay Checkout, verify the payment signature server-side on return.
4. **Fulfilment happens on the webhook, not the redirect.**
   Stripe: `checkout.session.completed` at `/api/webhooks/stripe` — verify the signature with the webhook secret.
   Razorpay: `payment.captured` at `/api/webhooks/razorpay` — verify the HMAC signature.
5. Webhook handler: record the order, generate signed download URLs, send the delivery email, then redirect the buyer to the receipt page with the order reference.
6. Make webhook handlers **idempotent** — key on the gateway event ID. Both providers retry.

### Tax

Digital goods are taxed where the **buyer** is, at the buyer's local rate. Enable **Stripe Tax** — it identifies the buyer's jurisdiction, applies the correct rate, and produces the reports needed for filing.

What Stripe Tax does **not** do is register or file on the owner's behalf. She remains the seller of record, which means:

- **UK and EU:** VAT applies from the first sale of a digital product to a consumer — there is no small-seller threshold. The EU is one registration via the **VAT OSS** scheme rather than 27 separate ones.
- **UAE:** 5% VAT, with a registration threshold.
- **US:** sales tax on digital goods varies by state, each with its own economic nexus threshold.
- **Rest of Asia and beyond:** Singapore, Japan, Australia, Canada and others each have their own rules and thresholds.
- **India:** Razorpay collects GST, but registration is still hers if she crosses the threshold.

Practically: turn Stripe Tax on before the first sale, and use its reporting to watch thresholds as each market grows. Register in a jurisdiction when its threshold is close, not after.

**This is an accountant question, not an engineering one — but it blocks selling.** Flag it plainly to the owner. If the admin becomes unmanageable as more markets open, a merchant-of-record service (Paddle, Lemon Squeezy) would take over registration and filing entirely for a higher fee; she has considered and declined this for now, preferring to stay on Stripe.

### Refunds

Copy on the receipt page promises refunds are "not a fight". No self-serve refund UI is needed — she issues them from the Stripe or Razorpay dashboard.

---

## Delivery

**Emailed download link**, chosen by the owner.

- Store files privately. Never serve a purchased file from a public URL.
- On fulfilment, generate a **signed, expiring** URL per file and email it.
- The receipt page also shows a Download button, using the same signed URL.
- Copy states the link "stays live, so there's no rush" — so links must be **long-lived or renewable**. Either issue 30-day links, or make the receipt page a permanent record keyed by an unguessable order token that re-signs the URL on each visit. The second is better and matches the copy.
- If the tool has a `notionUrl`, include it in the email as well as the file.

## Free tools (lead magnet)

A tool with `priceGBP: 0` is free but **not** an open download:

1. Buyer submits an email address.
2. Double opt-in confirmation email.
3. On confirmation, subscribe them to the newsletter and send the download link.

Skip checkout entirely for these. The button reads "Get it free" rather than "Add to bag".

## Email

The owner has not chosen a newsletter platform. Recommendation: **Kit (ConvertKit)** — cleanest API and tagging for this use case; Buttondown if she prefers something plainer and cheaper.

Put every newsletter call behind a single module (`lib/newsletter.ts`) exposing `subscribe(email, tags)` so the platform can be swapped in one file.

Transactional email (receipts, download links, enquiry notifications) should go through **Resend** regardless of the newsletter choice — do not send receipts from a marketing platform.

Emails to build:
- Purchase receipt with download link(s)
- Free-tool double opt-in confirmation
- Free-tool delivery
- Enquiry notification to the owner (from Work With Me and Contact)
- Newsletter welcome

Match the site's typography where the email client allows, and fall back to Georgia. Keep them plain and text-led.

---

## Screens

Header, footer and status line are shared. All pages reflow to a single column below roughly 760px.

### Shared header
Full-width bar, 22px vertical padding, 4vw horizontal, hairline bottom border. Left: masked logo, 126px wide, aspect 500:154, `#0B2A20`, links home. Centre: nav links — Think, Decide, Build, Library, Notes — 11px, uppercase, letter-spacing .16em, 24px gap; the current section's link is `#798A5C`. Right: bag count (only on Library and Tool pages) plus a "Work with me" button, 1px `#0B2A20` border, transparent fill, 10.5px uppercase, 9px/16px padding. Wraps to multiple rows on narrow screens.

On the home page the header sits over the hero photograph: logo and links become `#EFE9C8`, and a top-down scrim (`rgba(11,42,32,.78)` → transparent over 150px) sits behind them for legibility.

### Shared status line
Full-width strip on `#E6E2D8`, 9px vertical padding, hairline bottom border. Left: `statusLine` from CMS. Right: `issueLabel`. Both 10px, uppercase, letter-spacing .18em, `#798A5C`, tabular numerals.

### Shared footer
Background `#3A2A22`. Padding clamps 36–52px vertical, 4vw horizontal. Flex, space-between, wraps. Left: masked logo in `#EFE9C8`, 170px. Right: two link columns — "The work" (Think, Decide, Build, Work with me) and "Elsewhere" (Library, Notes, About, Contact). Column headings 10px uppercase letter-spacing .18em; links 14px, `#EFE9C8`. Gap clamps 32–64px.

The home page footer additionally carries a "Have a question? Good." line in the display italic at 21px and a "Send a note" outlined button.

---

### 1. Home — `/`
*File: `Amber Hour Home v2.dc.html`*

The one page that must land the whole proposition. Eight movements.

1. **Hero.** `min-height: 88vh`. Full-bleed portrait, `object-fit: cover`, on `#E6E2D8` while loading. Header over the top. Bottom block on a bottom-up gradient (`rgba(11,42,32,.92)` → `.74` at 55% → transparent), padding clamps 28–60px / 4vw: headline "Think before you build." in the display face at weight 200, `clamp(46px, 8vw, 112px)`, line-height .94, `#EFE9C8`, max 18ch. Below, a row (wraps): 42ch paragraph at `clamp(15px,1.4vw,19px)` line-height 1.6, and a solid `#EFE9C8` button with `#0B2A20` text reading "Start thinking".
2. **Status line.**
3. **Premise.** Centred, padding clamps 70–130px. Display 200 at `clamp(40px,6vw,80px)`, line-height 1.02, max 20ch: "You don't need more noise." Then a 46ch paragraph.
4. **Think.** Two columns, `repeat(auto-fit, minmax(min(100%,420px),1fr))`. Left: image slot, `min-height: min(58vh,520px)` — labelled for a witty illustration or photograph. Right: kicker "01 · Think" (10px uppercase, .2em, `#798A5C`, tabular), headline `clamp(34px,4.2vw,58px)` max 22ch, one 38ch paragraph, then an underlined uppercase link "Explore thinking".
5. **Decide.** Same construction, image on the right (`order: 3`, text `order: 2`), kicker "02 · Decide".
6. **Interruption.** Full-width `#0B2A20`. Flex, wraps, gap clamps 24–56px. Small cream kicker "A small interruption", then the display italic at weight 200, `clamp(28px,3.6vw,50px)`, line-height 1.16, `#EFE9C8`.
7. **Build.** As Think, image left, kicker "03 · Build". Includes a three-step line in the display face at 19px: "Start with what matters → make it work → make it better", arrows in `#798A5C`.
8. **Dissect.** Seven equal cells, `repeat(auto-fit, minmax(min(100%,150px),1fr))`. **Rules are drawn on the cells** (`border-right` + `border-bottom`, plus `border-top`/`border-left` on the container) — not with a background-colour gap — so a half-filled final row leaves page ground, not a grey slab. Each cell: tabular number, then the step name in the display face at 19px. Steps: De-escalate, Isolate, Specify, Set urgency, Examine intention, Compare solutions, Take action.
9. **Library.** On `#E6E2D8`. Section head plus "All tools" link. Three cards, `repeat(auto-fit, minmax(min(100%,280px),1fr))`, 24px gap. Each card: 1px hairline border, 220px cover image, then 26px/24px padding — kicker "01 · Think", title in display at 28px, 15px summary, then a hairline-topped row with price at display 22px and an underlined "View". The third card is a dashed-border placeholder reading "More tools are being written." with a "Tell me what you need" link.
10. **About.** Two columns. Left: the animated GIF, aspect ratio 270:480 (portrait), `object-fit: cover`, `max-height: 620px`. Right: kicker, headline `clamp(32px,3.8vw,52px)` max 24ch, then three belief statements in the display face at 22px separated by hairlines, then "More about me".
11. **Work with me.** Centred. Display 200 at `clamp(38px,5.4vw,68px)`, a 44ch paragraph, then the five-step process row (same cell-border technique as Dissect), then a solid `#0B2A20` button with cream text.
12. **Notes.** Section head plus "All notes" link. Three rows, hairline-separated: kind + reading time label, title in display at `clamp(22px,2vw,28px)`, date right-aligned tabular.
13. **Newsletter.** Full-width `#0B2A20`, two columns. Display 200 headline "A letter, occasionally.", 38ch paragraph, and an email field + solid cream "Join the list" button. Small print: "No schedule. No sequence. Unsubscribe whenever."
14. **Footer.**

Nav links are in-page anchors on this page (`#think`, `#decide`, `#build`, `#library`, `#notes`).

### 2. Pillar page — `/think`, `/decide`, `/build`
*File: `Think.dc.html`*

One template, three routes. Only the kicker, headline, pillar list and tools change.

- **Hero.** Padding clamps 56–120px top. Kicker "Pillar 01 · Think", display 200 headline `clamp(42px,6.6vw,92px)` line-height .98 max 22ch, one 46ch paragraph.
- **Full-bleed image**, aspect 21:8.
- **Pillar list.** Two columns. Left: kicker + a `clamp(28px,3.2vw,44px)` headline. Right: five hairline-separated rows, each a tabular number plus a display-face term. Think's five: The situation, The problem, The intention, The options, The consequences.
- **Pull quote** on `#0B2A20`, centred, display italic 200.
- **Two cross-links** to the other pillars, image-and-text, alternating sides. Decide's block carries four outlined chips: Starting, Changing, Stopping, Choosing.
- **Close** on `#E6E2D8`, centred: "Tools for all of this." plus a solid button to the Library.

### 3. Library index — `/library`
*File: `Library.dc.html`*

- **Hero.** Kicker, display 200 headline `clamp(44px,7vw,96px)` max 18ch, one 44ch paragraph.
- **Filters.** Strip on `#E6E2D8`, 18px/4vw. Four chips: All (active — solid `#0B2A20`, cream text), Think, Decide, Build (hairline border, transparent). Filtering is client-side; keep the active filter in the URL query so links are shareable.
- **Index rows.** One per tool, `repeat(auto-fit, minmax(min(100%,340px),1fr))`, **alternating image side** (odd rows image left, even rows image right via `order`). Image aspect 4:3. Text side, padding clamps 30–56px / 4vw: number + pillar label row, title in display `clamp(30px,3.6vw,50px)`, 46ch summary, then a hairline-topped row with price at display 26px and "View the tool". The whole row is one link.
- **In-progress tools** render at 55% opacity with "Soon" instead of a price and no link.
- **Closing block** on `#E6E2D8`, centred, display italic `clamp(26px,3vw,38px)`: "More tools are being written. Decision-making, offers, positioning, priorities." plus a link to Contact.
- **Newsletter** band on `#0B2A20`, copy "New tools land here first."

Bundles appear in this index alongside tools, styled identically, with the bundle price and a "Two tools" label in place of the pillar.

### 4. Tool page — `/library/[slug]`
*File: `Tool.dc.html`*

- **Breadcrumb.** 14px/4vw strip, hairline bottom: "Library · Tool 01 · Think", separators in `#798A5C`.
- **Hero.** Two columns, `repeat(auto-fit, minmax(min(100%,360px),1fr))`. Left: cover image, aspect 4:3. Right, padding clamps 36–72px: kicker, title in display 200 at `clamp(42px,5.6vw,78px)` line-height .98, 40ch summary, then a hairline-topped row with the price at display 38px and "Instant download". Two buttons: solid "Add to bag" and outlined "Buy now". Under them, 12.5px: "Secure checkout by Stripe. Card, Apple Pay, Google Pay." — **this line must reflect the active gateway**; for Indian buyers it should name Razorpay and its methods (UPI, cards, netbanking).
- **What's inside.** Two columns. Left: kicker + `clamp(28px,3.2vw,44px)` headline naming the count ("Seven moves, in order."). Right: the `contents` array as hairline-separated rows, tabular number plus display-face term at 22px.
- **Look inside.** On `#E6E2D8`. Three preview images, aspect 3:4, `repeat(auto-fit, minmax(min(100%,240px),1fr))`, 20px gap. Real page shots matter here — buyers hesitate without them.
- **Pull quote** on `#0B2A20`, display italic 200.
- **Bag.** Two columns: the bag panel (hairline border, header row, line items with 64×48 thumbnail, title, "Instant download", price; then a total row and a solid "Checkout with Stripe" button) and, beside it, the **empty state** shown dashed for reference: "Nothing in the bag. Not necessarily a problem." with a "Browse the library" link.
  The gateway named in this line must match the buyer's routed gateway, and the price shown must be in their routed currency.

  In the real build the bag is a **slide-over panel from the right**, not an inline section. It opens on add-to-bag, and buying never leaves the page until the gateway redirect.
- **Also in the library.** Two cards, one real, one dashed placeholder.

### 5. Work With Me — `/work-with-me`
*File: `Work-With-Me.dc.html`*

- **Hero.** Two columns. Left, padding clamps 56–110px: kicker, display 200 `clamp(42px,6vw,88px)` max 20ch, 42ch paragraph, solid button "Start a conversation" (anchors to the form). Right: portrait, aspect 3:4, `max-height: 660px`.
- **Process.** Kicker, `clamp(30px,3.6vw,48px)` headline "Five steps, no theatre.", then five cells (cell-border technique): Bring the situation, Dissect it, Think, Decide, Move.
- **Tone line** on `#0B2A20`, centred, display italic 200 `clamp(26px,3.4vw,46px)` max 30ch: "This isn't coaching theatre. There will be no dramatic breakthrough music. Just good questions, honest thinking and useful decisions."
- **Enquiry form.** Two columns. Left: kicker, `clamp(30px,3.4vw,46px)` headline, and "A reply usually takes a day or two." Right: Name, Email, and "What are you trying to figure out?" (5-row textarea, placeholder "The messy version is fine."), then a full-width primary button.

No price is stated. If counsel has a fee or a range, saying it here would filter enquiries — raise this with the owner.

### 6. About — `/about`
*File: `About.dc.html`*

- **Hero.** Two columns. Left: the GIF, aspect 270:480, `max-height: 660px`. Right: kicker, display 200 `clamp(38px,5vw,74px)` line-height 1 max 20ch, 40ch paragraph.
- **Beliefs.** Six statements, each on its own hairline-separated row, display face at `clamp(26px,3.4vw,44px)`, line-height 1.15. No supporting paragraphs — the statements are the content. Verbatim:
  - You don't need to scale everything.
  - Not every idea deserves a business.
  - Being busy is not a strategy.
  - A smaller business can be a very successful business.
  - Stopping can be progress.
  - Sometimes the smartest move is to do less—properly.
- **Full-bleed image**, aspect 21:8.
- **Close** on `#E6E2D8`, centred, display 200 `clamp(32px,4.4vw,58px)` plus a solid button to Work With Me.

### 7. Notes index — `/notes`
*File: `Notes.dc.html`*

- **Hero.** Kicker, display 200 `clamp(44px,7vw,96px)` max 18ch, 46ch paragraph.
- **Featured note.** Two columns: lead image (aspect 16:10) and, beside it, the label row ("Essay · 6 min · Aug 2026"), title at `clamp(30px,3.8vw,52px)`, the standfirst in display italic at `clamp(18px,1.8vw,24px)` max 34ch, and "Read the note".
- **Index.** One row per note, hairline-separated, 26px/4vw: three columns — kind + reading time label, title in display `clamp(24px,2.6vw,34px)`, date right-aligned tabular. Grid `minmax(140px,0.28fr) minmax(min(100%,260px),1fr) minmax(90px,0.16fr)`.
- **Newsletter** band on `#0B2A20`.

### 8. Note — `/notes/[slug]`
*File: `Note.dc.html`*

- **Breadcrumb** strip.
- **Head.** Max-width 1100px centred, padding clamps 46–96px. Kicker "Essay · August 2026", `<h1>` in display 200 at `clamp(38px,5.6vw,80px)` line-height 1 max 22ch, standfirst in display italic `clamp(20px,2.2vw,30px)` max 34ch.
- **Lead image**, aspect 16:9, margin clamps 34–56px.
- **Body.** Two columns: article column at max 64ch, and a sticky aside (`position: sticky; top: 24px`).
  - Paragraphs 18px, line-height 1.75, `#0B2A20`. Ranged left, **not justified**.
  - Emphasis is italic, never bold.
  - Section breaks are a hairline rule plus a display-face `<h2>` at `clamp(26px,3vw,38px)`.
  - Pull quotes sit in display italic at `clamp(24px,2.6vw,34px)` max 26ch, 34px vertical margin.
  - Aside: a "Tools for this" card (hairline border, 24px padding, tool title at display 24px, 14.5px summary, "View the tool") and a newsletter card.
- **More notes.** Three hairline-bordered cards, kind label plus title at display 26px.

### 9. Receipt — `/receipt/[orderToken]`
*File: `Receipt.dc.html`*

Reached after payment; the token is unguessable and the page is a permanent record.

- Max-width 900px centred, padding clamps 50–110px.
- Kicker "Order AH-0142 · Paid", display 200 headline `clamp(40px,5.6vw,78px)` max 20ch: "It's yours. Go and use it.", then a 44ch paragraph: "A copy of this is in your inbox. The download link stays live, so there's no rush."
- **Order panel**, hairline border: a header row (label + date, tabular), one row per purchased item (kicker, title at display 28px, format line, and a solid "Download" button), then a total row showing the payment method and the amount at display 24px.
- **Aside block** on `#E6E2D8`, display italic `clamp(20px,2.2vw,28px)`: "One suggestion: open it now, not later. Later is where good tools go to be forgotten."
- **Three next steps** in a hairline-topped row: browse the library, refunds ("Tell me. Refunds are not a fight."), and work with me.

### 10. Contact — `/contact`
*File: `Contact.dc.html`*

- Two columns. Left, padding clamps 56–110px: kicker, display 200 `clamp(44px,6.4vw,90px)` line-height .98 "Have a question? Good.", then a 42ch paragraph. Right, on `#E6E2D8` with a hairline left border: Name, Email, "What's on your mind?" (6-row textarea, placeholder "No need to tidy it up first."), primary button, and "A reply usually takes a day or two."
- Below, three redirect blocks for people in the wrong place: counsel → Work With Me, a tool → Library, and "Tell me what tool you need next."

### Also needed (not designed — build from the system)
- **404.** Use the site's voice. Suggested: "This page doesn't exist. Not everything needs to." plus links to Library and Notes.
- **Bundle page.** Reuse the Tool page layout with a list of the included tools in place of "What's inside".
- **Free tool page.** Tool page with the email-capture form in place of the buy buttons.

---

## Interactions & behaviour

- **Bag.** Slide-over from the right, 320–420px wide, hairline left border, `#F1EFEA` ground. Opens on add-to-bag. Persist in localStorage. Header count updates immediately. Empty state carries the dry line quoted above.
- **Filters.** Client-side, instant, no page load. Active filter mirrored in the URL query.
- **Motion.** Restrained. Fades and short translations only, 200–300ms, ease-out. No parallax, no scroll-jacking, no counters. The About GIF is the one moving thing on the page — do not add competing animation.
- **Hover.** Links: colour shifts to `#798A5C`. Outlined buttons: fill with a 6–8% `#0B2A20` tint. Solid buttons: darken one ramp step. Index rows: tint the row background 4%.
- **Focus.** `outline: 2px solid #0B2A20; outline-offset: 2px` on every interactive element. Never remove it.
- **Forms.** Validate on submit, not per keystroke. Errors sit under the field in 13px `#12382B` with a plain sentence. Buttons show a pending state and disable during submit. Success replaces the form with a short confirmation in the display italic — do not use a toast.
- **Images.** `next/image` throughout, with the aspect ratios given per screen. Lazy-load everything below the fold; the hero portrait is `priority`.
- **Reduced motion.** Honour `prefers-reduced-motion`: drop transitions, and offer a paused first frame in place of the GIF.

## Performance

- The hero is the largest contentful paint. Serve a **still portrait**, not video — a well-compressed WebP/AVIF at 1920px wide should land around 200–350KB.
- The About GIF as supplied is **7.1MB across 128 frames**. Convert it to MP4 + WebM (a few hundred KB, better quality) and render it as a muted, looped, `playsinline` video with a poster still. Do not ship the GIF as-is.
- Self-host the fonts (they are in `fonts/`), `font-display: swap`, subset to Latin, preload the two cuts used above the fold.
- Target LCP under 2.5s on 4G.

## SEO & metadata

- Per-page titles and descriptions from the CMS.
- Open Graph images: use the lead image for notes, the cover for tools; a branded fallback otherwise.
- `Article` structured data on notes, `Product` with `offers` on tools.
- Sitemap and RSS feed for Notes — the newsletter audience will want it.

## Accessibility

- Body text is at least 4.5:1 on its ground. Small labels use `#2C6049`, **not** `#798A5C` — sage at 10.5px only reaches about 3.3:1 on the cream ground and fails. Sage is for rules and large type.
- Cream on green and cream on espresso both pass.
- All images need alt text — make it a required field in the CMS.
- The nav must be keyboard-navigable with a visible skip link.
- Text over the hero photograph relies on the gradient scrim; keep it when the image is replaced.

---

## Design tokens

### Colour
| Token | Hex | Use |
| --- | --- | --- |
| Estate green | `#0B2A20` | Ink, rules, dark sections, primary buttons |
| Cream | `#EFE9C8` | Type and marks on green or espresso |
| Sage | `#798A5C` | Rules, kickers at 10px+, large type — **not** small body text |
| Espresso | `#3A2A22` | Footer, photographic warmth |
| Page ground | `#F1EFEA` | Default background |
| Surface | `#E6E2D8` | Alternate section background, image mats |
| Ink | `#1B1A16` | Base text colour |
| Divider | `color-mix(in srgb, #0B2A20 16%, transparent)` | Every hairline |

Green ramp: `#E9EFEB` `#CFDAD3` `#9BB0A5` `#567F6B` `#2C6049` `#12382B` `#0B2A20` `#082018` `#061A13` (100→900). Use 100–200 for tinted hovers, 500 for small labels and meta, 700 for ink.

### Type
- **Display:** PP Editorial Old — Ultralight (200), Regular (400), and both italics. Licensed from Pangram Pangram; files are in `fonts/`. **Confirm the licence covers web use before launch.**
- **Body:** Instrument Sans (400, 500, italic) from Google Fonts.
- The larger the display type sets, the lighter it goes: weight 200 above roughly 40px, 400 below.
- Kickers: 10–10.5px, uppercase, letter-spacing .18–.2em.
- Body: 15–18px, line-height 1.6–1.75, ranged left.
- Tabular numerals (`font-variant-numeric: tabular-nums`) on every number, price, date and kicker.
- Emphasis is italic. Never bold.

### Spacing & structure
- Horizontal page padding: `4vw`.
- Section padding: `clamp(46px, 6vw, 90px)` vertical; heroes go up to `clamp(56px, 8vw, 120px)`.
- Grid gaps: `clamp(24px, 4vw, 60px)`.
- Every border is 1px. Radius is 0 everywhere — nothing in this system is rounded.
- Shadows: none, except a `0 1px 3px rgba(27,26,22,.10)` page-edge shadow where a page floats on a darker ground.
- Two-column splits: `repeat(auto-fit, minmax(min(100%,420px),1fr))` so they stack cleanly.
- Cell grids draw rules on the cells, not via a background-colour gap.

---

## Assets

| Path | What | Status |
| --- | --- | --- |
| `assets/logo-full.png` | Primary lockup, transparent, 500×154 | Supplied. Used as a CSS mask so it can take green or cream. **Request an SVG** — PNG softens at large sizes. |
| `assets/logo-short.png` | Short "TAH" mark, transparent, 143×67 | Supplied. |
| `assets/logo-full-white.png` | White lockup | Supplied, currently unused (masking makes it unnecessary). |
| `assets/about.gif` | About-section animation, 270×480, 7.1MB | Supplied. Convert to video. |
| Stacked lockup | — | **Missing.** The file supplied had no transparency. Needs a transparent SVG/PNG. |
| Photography | — | **Missing.** Owner will supply. |
| Illustrations | — | **Missing.** Owner intends to commission dry line illustrations for the three pillar sections. |
| Tool covers and page previews | — | **Missing.** Uploaded per tool via the CMS. |

Logos are rendered by masking a coloured div with the PNG's alpha channel (`mask: url(...) center/contain no-repeat`), which is why a transparent source is essential. With SVGs, use `currentColor` fills instead.

Icons, if any are needed: Lucide.

## Files in this bundle

| File | Screen |
| --- | --- |
| `Amber Hour Home v2.dc.html` | Home (the chosen direction) |
| `Think.dc.html` | Pillar page template |
| `Library.dc.html` | Library index |
| `Tool.dc.html` | Tool detail, bag, empty state |
| `Work-With-Me.dc.html` | Work With Me |
| `About.dc.html` | About |
| `Notes.dc.html` | Notes index |
| `Note.dc.html` | Note detail |
| `Receipt.dc.html` | Post-purchase receipt |
| `Contact.dc.html` | Contact |
| `Amber Hour System.dc.html` | The design system — marks, palette, type scale, components |
| `Amber Hour Home.dc.html` | Both home directions side by side (1a rejected, 1b chosen) — kept for reference |
| `Amber Hour Wireframes.dc.html` | Stage 2 wireframes and site map |
| `brief.txt` | The owner's original content brief |
| `fonts/`, `assets/` | Fonts and supplied artwork |

Open any of them directly in a browser. Ignore `support.js` and the `.dc.html` format itself — they are prototyping scaffolding, not part of the build.

---

## Suggested build order

1. Next.js on Vercel, fonts self-hosted, tokens and shared layout (header, status line, footer). Static copy.
2. Home page, complete, with placeholder imagery.
3. Sanity schema and Studio at `/studio`. Wire Notes and the Library to real content. **Hand this to the owner early** so she can start loading content while the rest is built.
4. Remaining pages.
5. Stripe: the multi-currency price model, bag, checkout, Stripe Tax, webhook, signed download links, receipt page, emails. Launch with GBP only.
6. The currency switcher and geo routing, then additional Stripe currencies as each market opens. Razorpay for India.
7. Bundles and the free-tool opt-in flow.
8. Newsletter integration once the platform is chosen.
9. Performance, SEO, accessibility pass.

## Open questions for the owner

1. Real prices — GBP to launch, then one price per currency as each market opens.
2. The tool files themselves — nothing exists to sell yet.
3. Photography and illustrations.
4. A transparent stacked logo.
5. Newsletter platform.
6. Whether counsel has a stated fee or range.
7. Confirmation that the PP Editorial Old licence covers web use.
8. VAT/GST registration — an accountant question, but it blocks selling. UK/EU VAT applies from the very first sale, with no threshold.
