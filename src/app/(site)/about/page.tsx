import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero/AboutHero";
import { AboutBeliefs } from "@/components/about/AboutBeliefs/AboutBeliefs";
import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import { CloseBand } from "@/components/ui/CloseBand/CloseBand";

export const metadata: Metadata = {
  title: "About",
  description: "I'm interested in what happens before people build.",
};

/** HANDOFF-SPEC.md → "6. About — /about", About.dc.html. */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBeliefs />
      <CmsImage
        label="Lifestyle image — desk, room, elsewhere"
        aspectRatio="21 / 8"
        sizes="100vw"
      />
      <CloseBand
        line="Some problems are better solved together."
        buttonLabel="Work with me"
        buttonHref="/work-with-me"
        maxWidth="22ch"
        fontSize="clamp(32px, 4.4vw, 58px)"
      />
    </>
  );
}
