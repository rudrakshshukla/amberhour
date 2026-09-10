# Start here

You said you're not a coder and you'll connect Vercel to Claude. This file is for you. `README.md` is for whoever writes the code — human or Claude.

## What's in this folder

Ten designed pages as HTML files. Double-click any of them to see it in a browser. They're designs, not the real website — the real website gets rebuilt from them in Next.js.

`README.md` is the instruction manual: every colour, size and behaviour, plus how payments, downloads and content editing should work. A developer who's never spoken to us can build the site from it alone.

## How to get this built with Claude Code

1. Create an empty folder on your computer for the project.
2. Copy this whole handoff folder into it.
3. Open Claude Code in that folder.
4. Paste the prompt at the bottom of this file.
5. Work through it in the order the README's "Suggested build order" section gives. Don't ask for everything at once — one stage per conversation works far better.
6. When there's something to look at, push it to GitHub and connect that repo to Vercel. Vercel gives you a live URL and redeploys every time the code changes.

You'll need accounts, and you'll need to paste keys from each into the project's environment variables (Claude will tell you where):

- **Vercel** — hosting
- **Sanity** — where you'll write essays and add tools
- **Stripe** — payments outside India
- **Razorpay** — payments in India
- **Resend** — sends receipts and download links
- A newsletter platform, once you pick one

## What you'll be able to do yourself, once it's built

Log in at `yoursite.com/studio` and:

- Write and publish an essay
- Add a tool: upload the file, upload a cover, set the price in pounds and rupees, list what's inside
- **Prices** — every page currently reads £00. You'll set one price per currency, per market, as you open them.
- **Where you're selling** — a `currency` list in the CMS. Adding a currency and ticking its countries is how you open a new market; no developer needed.
- Change the status line in the header
- Bundle two tools at a combined price
- Mark a tool free, so it's given away in exchange for an email address

No code, no deploy, no developer. That was the point of choosing this setup.

## What's still missing

1. **Prices** — every page currently reads £00. Launch with pounds; add a price per currency as each market opens.
2. **The tools themselves** — there's nothing to sell yet.
3. **Photography and illustrations** — every image is a placeholder.
4. **A transparent stacked logo** — the file you sent was the YouTube watermark, which has no transparency.
5. **A newsletter platform** — I've recommended Kit (ConvertKit).
6. **VAT and GST** — this is the one that catches people out. Digital goods are taxed where the buyer lives, and in the UK and EU that applies from your very first sale — there's no small-seller threshold. Stripe Tax will calculate and collect it correctly, but you still have to register and file. Get an accountant on this before you take real money. As you open more markets it becomes the biggest piece of admin in the whole operation.
7. **Font licence** — check your PP Editorial Old licence covers use on a website.

## Two technical notes worth acting on

- **The About GIF is 7.1MB.** That's slow on a phone. Ask for it as an MP4 and it'll be a few hundred KB and look better.
- **Keep the hero a photograph, not a video.** It's the first thing that loads and video would make the site feel slow. The GIF in the About section is enough motion for one page.

---

## Prompt to paste into Claude Code

```
I'm building a website from a design handoff. I'm not a developer, so explain
what you're doing in plain language and tell me exactly what to do whenever
you need something from me.

Read design_handoff_amber_hour/README.md first. It has the full specification:
every screen, all design tokens, the CMS schema, and how payments, delivery
and content editing should work. The HTML files in that folder are design
references — recreate them in Next.js, don't copy them.

Stack: Next.js (App Router) + TypeScript on Vercel, Sanity for content with
the Studio at /studio, Stripe for payments with Stripe Tax enabled, Razorpay
for India only, Resend for transactional email. Prices are multi-currency and
set by hand per market in the CMS — build that model in from the start, even
though we launch in GBP only.

Follow the README's "Suggested build order". Start with step 1 only —
the Next.js project, self-hosted fonts, design tokens, and the shared
header, status line and footer. Stop there and show me before moving on.

Two things to hold to throughout:
- The site owner must be able to publish essays, add tools, set prices,
  open a new market by adding a currency, and edit the status line herself
  in Sanity, with no code and no deploy.
- Prices are read from the CMS on the server at checkout time, never taken
  from the browser.
```
