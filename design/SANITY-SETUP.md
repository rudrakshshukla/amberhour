# Setting up Sanity (one-time, ~10 minutes)

This is the thing only you can do — it needs your own account. Once it's
done, you'll be able to write essays and add tools yourself, forever,
without touching code.

## 1. Create your Sanity project

1. Go to **sanity.io** and sign up (free tier is fine to start).
2. Create a new project. Call it whatever you like — "The Amber Hour" is fine.
3. When asked for a dataset name, use **production**.
4. On the project's page, find the **Project ID** — a short string of
   letters and numbers. Copy it.

## 2. Add three values to Vercel

In your Vercel project → **Settings → Environment Variables**, add:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | the Project ID from step 1 |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-06-01` |

Apply them to all environments (Production, Preview, Development), then
redeploy — Vercel usually prompts you to.

## 3. Make up a webhook secret

Invent any random string (a password manager's "generate password" button
is fine) — this is `SANITY_REVALIDATE_SECRET`. It's what lets Sanity tell
your site "something changed, update yourself" without anyone else being
able to fake that message.

Add it to Vercel too:

| Name | Value |
| --- | --- |
| `SANITY_REVALIDATE_SECRET` | the string you made up |

## 4. Point Sanity at your site

Two things, both at **sanity.io/manage → your project**:

**CORS origins** (API → CORS Origins → Add CORS origin) — add your live
site's URL (e.g. `https://theamberhour.com`) and, if you'll ever run the
site on your own computer, `http://localhost:3000`. Tick "Allow
credentials."

**Webhook** (API → Webhooks → Create webhook):
- URL: `https://yoursite.com/api/webhooks/sanity`
- Trigger on: Create, Update, Delete
- Secret: the same string from step 3
- Everything else can stay as default.

This is what makes a change you publish appear on the live site within
seconds, with no redeploy.

## 5. Start writing

Once Vercel has redeployed with those variables, go to
**yoursite.com/studio** and log in with your Sanity account. You'll see
plain labelled fields for essays ("Note"), tools, bundles, currencies,
a "Home page" entry (every headline, paragraph, list and photo on the
home page — anything left blank keeps the design's wording), and one
"Site settings" entry for the status line — fill in whatever you
like, hit Publish, and it appears on the live site.

## If something looks wrong

- **Studio shows a red error screen about `projectId`** — step 2 hasn't
  taken effect yet. Double-check the variable name is exact and that
  Vercel redeployed after you added it.
- **You publish something and the site doesn't update** — check the
  webhook in step 4 is there and its secret matches Vercel's
  `SANITY_REVALIDATE_SECRET` exactly (no extra spaces).
- **The Studio won't load / a CORS error in the browser console** — add
  your site's exact URL under CORS origins in step 4.

## Local development (only if you're running the site on your own computer)

Copy `.env.local.example` to `.env.local` in the project folder, fill in
the same four values, then `npm run dev`.
