import type { Metadata } from "next";
import { Suspense } from "react";
import { LibraryHero } from "@/components/library/LibraryHero/LibraryHero";
import { LibraryBrowser } from "@/components/library/LibraryBrowser/LibraryBrowser";
import { LibraryClosing } from "@/components/library/LibraryClosing/LibraryClosing";
import { Newsletter } from "@/components/home/Newsletter/Newsletter";
import { getLibraryTools } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Library",
  description: "Practical tools for thinking, deciding and building.",
};

export default async function LibraryPage() {
  const tools = await getLibraryTools();

  return (
    <>
      <LibraryHero />

      {/* useSearchParams (for the pillar filter) needs a Suspense boundary
          to prerender — README.md doesn't cover this, it's a Next.js
          requirement. */}
      <Suspense fallback={null}>
        <LibraryBrowser tools={tools} />
      </Suspense>

      <LibraryClosing />

      <Newsletter blurb="New tools land here first." />
    </>
  );
}
