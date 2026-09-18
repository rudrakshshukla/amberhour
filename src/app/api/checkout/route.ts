import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { getCountryFromRequest, resolveCurrency } from "@/lib/checkout/currency";

/**
 * Creates a checkout session from the bag (HANDOFF-SPEC.md → "Payments",
 * "Flow (both gateways)": "Buyer clicks Add to bag or Buy now... Buyer
 * checks out. Server creates a Stripe Checkout Session or Razorpay
 * order, in the buyer's routed currency and gateway").
 *
 * GBP/Stripe is the only gateway actually wired to charge anything.
 * Razorpay is architecturally routed to (see lib/checkout/currency.ts,
 * which reads the owner's `currency` documents to decide Stripe vs
 * Razorpay by country) but stops with a clear error instead of
 * charging, because cart lines only carry a GBP price snapshot today —
 * there's no real INR (or other) amount to charge yet. Wiring that
 * means fetching every active currency's price into the cart, not just
 * GBP; see CartProvider.tsx's CartLine type.
 *
 * IMPORTANT — do not point production Stripe keys at this until build
 * stage 5's other half exists: the webhook that confirms payment,
 * signed expiring download links, the receipt page, and the purchase
 * email. Right now a successful Stripe payment redirects to
 * /checkout/success, which is an honest placeholder, not real
 * fulfilment — nothing unlocks a download yet.
 */
export async function POST(req: NextRequest) {
  let body: { lines?: { slug: string; title: string; priceGBP?: number }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lines = body.lines ?? [];
  if (lines.length === 0) {
    return NextResponse.json({ error: "The bag is empty." }, { status: 400 });
  }

  const country = getCountryFromRequest(req);
  const currency = await resolveCurrency(country);

  if (currency.gateway === "Razorpay") {
    return NextResponse.json(
      {
        error:
          "Checkout for this region isn't live yet — it needs its own currency's price wired into the cart before it can charge correctly.",
      },
      { status: 501 }
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe isn't configured yet. Add STRIPE_SECRET_KEY in Vercel to enable checkout." },
      { status: 501 }
    );
  }

  const missingPrice = lines.find((line) => line.priceGBP === undefined);
  if (missingPrice) {
    return NextResponse.json(
      { error: `"${missingPrice.title}" doesn't have a GBP price set yet in Sanity.` },
      { status: 400 }
    );
  }

  const stripe = new Stripe(secretKey);
  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // No `payment_method_types` — Stripe Checkout Sessions show
      // whichever methods are enabled in the Dashboard (card, Apple Pay,
      // Google Pay, …) automatically when it's left unset.
      line_items: lines.map((line) => ({
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: Math.round((line.priceGBP ?? 0) * 100),
          product_data: { name: line.title },
        },
      })),
      metadata: {
        // The webhook (not built yet — see the README note above) reads
        // this to know which tools to unlock once it exists.
        toolSlugs: lines.map((line) => line.slug).join(","),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancelled`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe didn't return a checkout URL." }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe checkout failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
