import { NextStudioLayout } from "next-sanity/studio";

// `metadata`/`viewport` must come from a Server Component — this layout
// stays one, importing only next-sanity's lightweight re-exports. The
// actual Studio (and sanity.config.ts, which pulls in the `sanity` and
// `@sanity/vision` packages) is client-only, in page.tsx.
export { metadata, viewport } from "next-sanity/studio";

export default NextStudioLayout;
