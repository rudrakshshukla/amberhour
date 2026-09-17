import { groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@sanity/types";
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

// ---------------------------------------------------------------------------
// Tools — the Library index (every tool, any status).
// ---------------------------------------------------------------------------

export interface LibraryTool {
  slug: string;
  number: number;
  pillar: "Think" | "Decide" | "Build";
  title: string;
  summary: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  /** undefined until the owner sets a GBP price — render "£00" (README.md → Fidelity). */
  priceGBP?: number;
  status: "Available" | "In progress";
}

interface RawLibraryTool {
  slug: string;
  number: number;
  pillar: "Think" | "Decide" | "Build";
  title: string;
  summary: string;
  coverImage?: SanityImageSource & { alt?: string };
  priceGBP?: number;
  status: "Available" | "In progress";
}

const libraryToolsQuery = groq`
  *[_type == "tool" && defined(slug.current)] | order(number asc) {
    "slug": slug.current,
    number,
    pillar,
    title,
    summary,
    coverImage,
    "priceGBP": prices[currency->code == "GBP"][0].amount,
    status
  }
`;

/**
 * Every tool, any status — the Library index (README.md → "Library index
 * — /library"). In-progress tools render greyed with "Soon" and no link.
 * Bundles ("Bundles appear in this index alongside tools…") are wired in
 * build stage 7 with the rest of the bundle flow, not here.
 */
export async function getLibraryTools(): Promise<LibraryTool[]> {
  const tools = await sanityFetch<RawLibraryTool[]>({
    query: libraryToolsQuery,
    tags: [SANITY_TAGS.tool, SANITY_TAGS.currency],
    fallback: [],
  });

  return tools.map(({ coverImage, ...tool }) => ({
    ...tool,
    coverImageUrl: urlForImage(coverImage)?.width(680).height(510).fit("crop").url(),
    coverImageAlt: coverImage?.alt,
  }));
}

// ---------------------------------------------------------------------------
// Tool detail — /library/[slug].
// ---------------------------------------------------------------------------

export interface ToolPreviewImage {
  url?: string;
  alt?: string;
}

export interface ToolDetail {
  slug: string;
  number: number;
  pillar: "Think" | "Decide" | "Build";
  title: string;
  summary: string;
  description: PortableTextBlock[];
  contents: string[];
  coverImageUrl?: string;
  coverImageAlt?: string;
  previewImages: ToolPreviewImage[];
  priceGBP?: number;
  notionUrl?: string;
  status: "Available" | "In progress";
}

interface RawToolDetail {
  slug: string;
  number: number;
  pillar: "Think" | "Decide" | "Build";
  title: string;
  summary: string;
  description: PortableTextBlock[];
  contents: string[];
  coverImage?: SanityImageSource & { alt?: string };
  previewImages?: (SanityImageSource & { alt?: string })[];
  priceGBP?: number;
  notionUrl?: string;
  status: "Available" | "In progress";
}

const toolBySlugQuery = groq`
  *[_type == "tool" && slug.current == $slug][0]{
    "slug": slug.current,
    number,
    pillar,
    title,
    summary,
    description,
    contents,
    coverImage,
    previewImages,
    "priceGBP": prices[currency->code == "GBP"][0].amount,
    notionUrl,
    status
  }
`;

/** One tool, any status — the Tool page itself decides what to do with "In progress". */
export async function getToolBySlug(slug: string): Promise<ToolDetail | null> {
  const tool = await sanityFetch<RawToolDetail | null>({
    query: toolBySlugQuery,
    params: { slug },
    tags: [SANITY_TAGS.tool, SANITY_TAGS.currency],
    fallback: null,
  });

  if (!tool) return null;

  const { coverImage, previewImages, ...rest } = tool;

  return {
    ...rest,
    coverImageUrl: urlForImage(coverImage)?.width(960).height(720).fit("crop").url(),
    coverImageAlt: coverImage?.alt,
    previewImages: (previewImages ?? []).map((image) => ({
      url: urlForImage(image)?.width(720).height(960).fit("crop").url(),
      alt: image.alt,
    })),
  };
}

export interface RelatedTool {
  slug: string;
  number: number;
  pillar: "Think" | "Decide" | "Build";
  title: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

interface RawRelatedTool {
  slug: string;
  number: number;
  pillar: "Think" | "Decide" | "Build";
  title: string;
  coverImage?: SanityImageSource & { alt?: string };
}

const relatedToolQuery = groq`
  *[
    _type == "tool" &&
    status == "Available" &&
    pillar == $pillar &&
    slug.current != $slug &&
    defined(slug.current)
  ] | order(number asc) [0] {
    "slug": slug.current,
    number,
    pillar,
    title,
    coverImage
  }
`;

/**
 * "Also in the library" — one other Available tool in the same pillar
 * (Tool.dc.html: "Two cards, one real, one dashed placeholder"). Returns
 * null rather than a fabricated card when there isn't one yet.
 */
export async function getRelatedTool(
  pillar: "Think" | "Decide" | "Build",
  excludeSlug: string
): Promise<RelatedTool | null> {
  const related = await sanityFetch<RawRelatedTool | null>({
    query: relatedToolQuery,
    params: { pillar, slug: excludeSlug },
    tags: [SANITY_TAGS.tool],
    fallback: null,
  });

  if (!related) return null;

  const { coverImage, ...rest } = related;

  return {
    ...rest,
    coverImageUrl: urlForImage(coverImage)?.width(560).height(420).fit("crop").url(),
    coverImageAlt: coverImage?.alt,
  };
}

// ---------------------------------------------------------------------------
// Notes — the Notes index (every note, featured note + the rest).
// ---------------------------------------------------------------------------

export interface NotesIndexNote {
  slug: string;
  kind: "Essay" | "Observation" | "Question";
  readingMinutes: number;
  publishedAt: string;
  title: string;
  standfirst: string;
  leadImageUrl?: string;
  leadImageAlt?: string;
  featured: boolean;
}

interface RawNotesIndexNote {
  slug: string;
  kind: "Essay" | "Observation" | "Question";
  readingMinutes: number;
  publishedAt: string;
  title: string;
  standfirst: string;
  leadImage?: SanityImageSource & { alt?: string };
  featured: boolean;
}

const notesIndexQuery = groq`
  *[_type == "note" && defined(slug.current)] | order(featured desc, publishedAt desc) {
    "slug": slug.current,
    kind,
    readingMinutes,
    publishedAt,
    title,
    standfirst,
    leadImage,
    "featured": featured == true
  }
`;

/** Every note — the Notes index (README.md → "7. Notes index — /notes"). */
export async function getNotesIndex(): Promise<NotesIndexNote[]> {
  const notes = await sanityFetch<RawNotesIndexNote[]>({
    query: notesIndexQuery,
    tags: [SANITY_TAGS.note],
    fallback: [],
  });

  return notes.map(({ leadImage, ...note }) => ({
    ...note,
    leadImageUrl: urlForImage(leadImage)?.width(1000).height(625).fit("crop").url(),
    leadImageAlt: leadImage?.alt,
  }));
}
