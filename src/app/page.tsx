import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero/Hero";
import { StatusLine } from "@/components/StatusLine/StatusLine";
import { Premise } from "@/components/home/Premise/Premise";
import { PillarBlock } from "@/components/home/PillarBlock/PillarBlock";
import { BuildSteps } from "@/components/home/BuildSteps/BuildSteps";
import { Interruption } from "@/components/home/Interruption/Interruption";
import { Dissect } from "@/components/home/Dissect/Dissect";
import { LibraryPreview } from "@/components/home/LibraryPreview/LibraryPreview";
import { AboutPreview } from "@/components/home/AboutPreview/AboutPreview";
import { WorkWithMePreview } from "@/components/home/WorkWithMePreview/WorkWithMePreview";
import { NotesPreview } from "@/components/home/NotesPreview/NotesPreview";
import { Newsletter } from "@/components/home/Newsletter/Newsletter";
import { Footer } from "@/components/Footer/Footer";
import { resolveSiteSettings } from "@/lib/get-site-settings";

export const metadata: Metadata = {
  description:
    "Strategic counsel for people who want to build something of their own—but would prefer to think it through first.",
};

/**
 * Home lives outside the `(site)` route group: its header is embedded in
 * the hero image rather than a standalone bar, and its status line sits
 * below the hero rather than below a standalone header, so it composes
 * its own chrome instead of using the shared layout (README.md → Home).
 */
export default async function HomePage() {
  const siteSettings = await resolveSiteSettings();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Hero />

      <StatusLine statusLine={siteSettings.statusLine} issueLabel={siteSettings.issueLabel} />

      <main id="main">
        <Premise />

        <PillarBlock
          id="think"
          kicker="01 · Think"
          headline="Before the answer, there is usually a better question."
          body="Thinking is the work before the work."
          linkLabel="Explore thinking"
          linkHref="/think"
          imageLabel="Witty illustration or image — Think"
          imageSide="left"
        />

        <PillarBlock
          id="decide"
          kicker="02 · Decide"
          headline="Not every decision needs a five-year plan."
          body="Make the decision smaller, clearer and less dramatic."
          linkLabel="Explore decision tools"
          linkHref="/decide"
          imageLabel="Witty illustration or image — Decide"
          imageSide="right"
        />

        <Interruption />

        <PillarBlock
          id="build"
          kicker="03 · Build"
          headline="Ideas are lovely. Useful ideas are better."
          imageMinHeight="min(56vh, 500px)"
          linkLabel="Explore the library"
          linkHref="/library"
          imageLabel="Witty illustration or image — Build"
          imageSide="left"
          extra={<BuildSteps />}
        />

        <Dissect />

        <LibraryPreview />

        <AboutPreview />

        <WorkWithMePreview />

        <NotesPreview />

        <Newsletter blurb={siteSettings.newsletterBlurb} />
      </main>

      <Footer variant="home" />
    </>
  );
}
