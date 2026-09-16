import { groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityFetch } from "./fetch";
import { urlForImage } from "./image";
import { SANITY_TAGS } from "./tags";

// ---------------------------------------------------------------------------
// Site settings (singleton) — the header status line and issue label.
// ---------------------------------------------------------------------------

export interface SiteSettingsDoc {
  statusLine: string;
  issueLabel: string;
  newsletterBlurb?: string;
}

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    statusLine,
    issueLabel,
    newsletterBlurb
  }
`;

export function getSiteSettings() {
  return sanityFetch<SiteSettingsDoc | null>({
    query: siteSettingsQuery,
    tags: [SANITY_TAGS.siteSettings],
    fallback: null,
  });
}

// ---------------------------------------------------------------------------
// Notes — the Home page preview (three most recent).
// ---------------------------------------------------------------------------

export interface HomeNote {
  slug: string;
  kind: "Essay" | "Observation" | "Question";
  readingMinutes: number;
  title: string;
  publishedAt: string;
}

const homeNotesQuery = groq`
  *[_type == "note" && defined(slug.current)] | order(publishedAt desc) [0...3] {
    "slug": slug.current,
    kind,
    readingMinutes,
    title,
    publishedAt
  }
`;

export function getHomeNotes() {
  return sanityFetch<HomeNote[]>({
    query: homeNotesQuery,
    tags: [SANITY_TAGS.note],
    fallback: [],
  });
}

/** "Aug 2026" — the date stamp format used throughout the Notes UI. */
export function formatNoteDate(publishedAt: string) {
  return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(
    new Date(publishedAt)
  );
}

// ---------------------------------------------------------------------------
// Tools — the Home page Library preview (two, Available only).
// ---------------------------------------------------------------------------

export interface HomeTool {
  slug: string;
  number: number;
  pillar: "Think" | "Decide" | "Build";
  title: string;
  summary: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  /** undefined until the owner sets a GBP price — render "£00" (README.md → Fidelity). */
  priceGBP?: number;
}

interface RawHomeTool {
  slug: string;
  number: number;
  pillar: "Think" | "Decide" | "Build";
  title: string;
  summary: string;
  coverImage?: SanityImageSource & { alt?: string };
  priceGBP?: number;
}

const homeToolsQuery = groq`
  *[_type == "tool" && status == "Available" && defined(slug.current)]
  | order(number asc) [0...2] {
    "slug": slug.current,
    number,
    pillar,
    title,
    summary,
    coverImage,
    "priceGBP": prices[currency->code == "GBP"][0].amount
  }
`;

export async function getHomeTools(): Promise<HomeTool[]> {
  const tools = await sanityFetch<RawHomeTool[]>({
    query: homeToolsQuery,
    // Prices reference currency documents, so a currency edit should
    // revalidate this too.
    tags: [SANITY_TAGS.tool, SANITY_TAGS.currency],
    fallback: [],
  });

  return tools.map(({ coverImage, ...tool }) => ({
    ...tool,
    coverImageUrl: urlForImage(coverImage)?.width(560).height(420).fit("crop").url(),
    coverImageAlt: coverImage?.alt,
  }));
}

// ---------------------------------------------------------------------------
// Home page (singleton) — every editable headline, paragraph, list and image.
// Merged over the design copy in lib/get-home-content.ts.
// ---------------------------------------------------------------------------

/** Raw document: sections of optional strings, string arrays and image objects. */
export type HomePageDoc = Record<string, Record<string, unknown> | null | undefined>;

const homePageQuery = groq`*[_id == "homePage"][0]`;

export function getHomePage() {
  return sanityFetch<HomePageDoc | null>({
    query: homePageQuery,
    tags: [SANITY_TAGS.homePage],
    fallback: null,
  });
}
