import { createClient, type ClientConfig } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  // Freshness is handled ourselves via unstable_cache + revalidateTag from
  // the Sanity webhook (see fetch.ts and the revalidate route), so the
  // CDN's own ~60s cache is skipped rather than layering a second,
  // independent staleness window on top.
  useCdn: false,
};

let cached: ReturnType<typeof createClient> | undefined;

/**
 * Lazy — `createClient` throws synchronously if `projectId` is empty, so
 * this must never run before `isSanityConfigured` has been checked (see
 * fetch.ts, the only caller).
 */
export function getClient() {
  cached ??= createClient(config);
  return cached;
}
