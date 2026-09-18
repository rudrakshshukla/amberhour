import { groq } from "next-sanity";
import type { NextRequest } from "next/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SANITY_TAGS } from "@/sanity/lib/tags";

/**
 * Currency/gateway routing (HANDOFF-SPEC.md → build stages 5–6: "The
 * currency switcher and geo routing... Razorpay for India"). Reads the
 * `currency` documents the owner manages in the Studio — each one
 * already carries `{code, symbol, gateway, countries, active}`
 * (schemaTypes/currency.ts: "Adding one and ticking its countries is
 * how the owner opens a new market herself") — so opening a new market
 * is a Studio edit, not a code change.
 */

export interface RoutedCurrency {
  code: string;
  symbol: string;
  gateway: "Stripe" | "Razorpay";
}

interface RawCurrency {
  code: string;
  symbol: string;
  gateway: "Stripe" | "Razorpay";
  countries: string[];
}

const activeCurrenciesQuery = groq`
  *[_type == "currency" && active == true] {
    code,
    symbol,
    gateway,
    countries
  }
`;

async function getActiveCurrencies(): Promise<RawCurrency[]> {
  return sanityFetch<RawCurrency[]>({
    query: activeCurrenciesQuery,
    tags: [SANITY_TAGS.currency],
    fallback: [],
  });
}

/** Used when no currency document matches (or none are configured yet). */
export const FALLBACK_CURRENCY: RoutedCurrency = { code: "GBP", symbol: "£", gateway: "Stripe" };

/**
 * Buyer's country from Vercel's geo header — reliable server-side,
 * unlike the client trying to guess its own location. Undefined locally
 * (no such header off Vercel's edge network) and in this cloud dev
 * shell, which is why local testing always falls back to GBP/Stripe.
 */
export function getCountryFromRequest(req: NextRequest): string | undefined {
  return req.headers.get("x-vercel-ip-country") ?? undefined;
}

/**
 * Matches the buyer's country against the active currencies' `countries`
 * lists and returns the one that claims it, falling back to GBP/Stripe
 * when nothing matches (no country, no active currencies yet, or a
 * country no active market has claimed) — never guesses a market.
 */
export async function resolveCurrency(country: string | undefined): Promise<RoutedCurrency> {
  if (!country) return FALLBACK_CURRENCY;

  const currencies = await getActiveCurrencies();
  const match = currencies.find((c) => c.countries?.includes(country));
  if (!match) return FALLBACK_CURRENCY;

  return { code: match.code, symbol: match.symbol, gateway: match.gateway };
}
