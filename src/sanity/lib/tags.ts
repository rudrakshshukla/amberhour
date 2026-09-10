/** Shared between the query functions (fetch.ts callers) and the webhook route. */
export const SANITY_TAGS = {
  note: "sanity:note",
  tool: "sanity:tool",
  bundle: "sanity:bundle",
  currency: "sanity:currency",
  siteSettings: "sanity:siteSettings",
} as const;

export type SanityDocType = keyof typeof SANITY_TAGS;
