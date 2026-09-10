import { unstable_cache } from "next/cache";
import { isSanityConfigured } from "@/sanity/env";
import { getClient } from "./client";

/**
 * Query Sanity through Next's tag-based cache. Content changes appear
 * without a redeploy via `revalidateTag` from the Sanity webhook (see
 * app/api/webhooks/sanity/route.ts) — README.md → Content management.
 *
 * Sanity's client doesn't run on the native `fetch` API, so this follows
 * Next's documented pattern for non-`fetch` data sources (`unstable_cache`
 * + tags) rather than `fetch()`'s own cache options.
 *
 * Returns `fallback` without querying anything if Sanity isn't configured
 * yet (no project ID) — see env.ts — so pages render a graceful empty
 * state instead of failing before the owner has created a project.
 */
export function sanityFetch<Result>({
  query,
  params = {},
  tags,
  fallback,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags: string[];
  fallback: Result;
}): Promise<Result> {
  if (!isSanityConfigured) {
    return Promise.resolve(fallback);
  }

  const run = unstable_cache(
    () => getClient().fetch<Result>(query, params),
    [query, JSON.stringify(params)],
    { tags }
  );

  return run();
}
