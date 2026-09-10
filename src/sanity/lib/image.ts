import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Returns undefined when Sanity isn't configured or the image field is empty. */
export function urlForImage(source: SanityImageSource | null | undefined) {
  if (!source || !builder) return undefined;
  return builder.image(source);
}
