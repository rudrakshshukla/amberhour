import type { SanityImageSource } from "@sanity/image-url";
import { getHomePage } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { fallbackHomeContent, type CmsImage, type HomeContent } from "@/lib/home-content";

type RawImage = SanityImageSource & {
  asset?: { _ref?: string };
  alt?: string;
  hotspot?: { x?: number; y?: number };
};

function toCmsImage(value: unknown, width: number): CmsImage | undefined {
  const img = value as RawImage | undefined;
  if (!img?.asset?._ref) return undefined;
  const url = urlForImage(img)?.width(width).fit("max").auto("format").url();
  if (!url) return undefined;
  const { x, y } = img.hotspot ?? {};
  return {
    url,
    alt: img.alt ?? "",
    position:
      typeof x === "number" && typeof y === "number"
        ? `${Math.round(x * 100)}% ${Math.round(y * 100)}%`
        : undefined,
  };
}

/** Keeps only fields the owner has actually filled in. */
function filled(section: Record<string, unknown> | null | undefined) {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(section ?? {})) {
    if (key === "image" || key.startsWith("_")) continue;
    if (typeof value === "string" && value.trim()) out[key] = value;
    if (Array.isArray(value)) {
      const items = value.filter((v): v is string => typeof v === "string" && v.trim() !== "");
      if (items.length) out[key] = items;
    }
  }
  return out;
}

const IMAGE_WIDTHS: Record<string, number> = { hero: 2400, about: 1000 };

/** Real Sanity values, falling back field-by-field to the design copy. */
export async function resolveHomeContent(): Promise<HomeContent> {
  const doc = await getHomePage();
  const merged = {} as Record<string, unknown>;

  for (const key of Object.keys(fallbackHomeContent) as (keyof HomeContent)[]) {
    const raw = doc?.[key];
    const image = toCmsImage(raw?.image, IMAGE_WIDTHS[key] ?? 1600);
    merged[key] = {
      ...fallbackHomeContent[key],
      ...filled(raw),
      ...(image ? { image } : {}),
    };
  }

  return merged as unknown as HomeContent;
}
