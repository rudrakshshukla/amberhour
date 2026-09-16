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
import { resolveHomeContent } from "@/lib/get-home-content";

export const metadata: Metadata = {
  description:
    "Strategic counsel for people who want to build something of their own—but would prefer to think it through first.",
};

/**
 * Home lives outside the `(site)` route group: its header is embedded in
 * the hero image rather than a standalone bar, and its status line sits
 * below the hero rather than below a standalone header, so it composes
 * its own chrome instead of using the shared layout (README.md → Home).
 *
 * All copy and imagery comes from the `homePage` singleton in Sanity,
 * falling back to the design copy for any field left blank.
 */
export default async function HomePage() {
  const [siteSettings, home] = await Promise.all([
    resolveSiteSettings(),
    resolveHomeContent(),
  ]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Hero content={home.hero} />

      <StatusLine statusLine={siteSettings.statusLine} issueLabel={siteSettings.issueLabel} />

      <main id="main">
        <Premise content={home.premise} />

        <PillarBlock
          id="think"
          kicker={home.think.kicker}
          headline={home.think.headline}
          body={home.think.body}
          linkLabel={home.think.linkLabel}
          linkHref="/think"
          image={home.think.image}
          imageLabel="Witty illustration or image — Think"
          imageSide="left"
        />

        <PillarBlock
          id="decide"
          kicker={home.decide.kicker}
          headline={home.decide.headline}
          body={home.decide.body}
          linkLabel={home.decide.linkLabel}
          linkHref="/decide"
          image={home.decide.image}
          imageLabel="Witty illustration or image — Decide"
          imageSide="right"
        />

        <Interruption content={home.interruption} />

        <PillarBlock
          id="build"
          kicker={home.build.kicker}
          headline={home.build.headline}
          imageMinHeight="min(56vh, 500px)"
          linkLabel={home.build.linkLabel}
          linkHref="/library"
          image={home.build.image}
          imageLabel="Witty illustration or image — Build"
          imageSide="left"
          extra={<BuildSteps steps={home.build.steps} />}
        />

        <Dissect content={home.dissect} />

        <LibraryPreview content={home.library} />

        <AboutPreview content={home.about} />

        <WorkWithMePreview content={home.workWithMe} />

        <NotesPreview content={home.notes} />

        <Newsletter blurb={siteSettings.newsletterBlurb} content={home.newsletter} />
      </main>

      <Footer variant="home" />
    </>
  );
}
