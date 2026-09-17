import type { Metadata } from "next";
import { WorkWithMeHero } from "@/components/work-with-me/WorkWithMeHero/WorkWithMeHero";
import { WorkWithMeProcess } from "@/components/work-with-me/WorkWithMeProcess/WorkWithMeProcess";
import { PullQuote } from "@/components/pillar/PullQuote/PullQuote";
import { WorkWithMeEnquiry } from "@/components/work-with-me/WorkWithMeEnquiry/WorkWithMeEnquiry";

export const metadata: Metadata = {
  title: "Work with me",
  description: "Strategic counsel for people building something of their own.",
};

/**
 * HANDOFF-SPEC.md → "5. Work With Me — /work-with-me", Work-With-Me.dc.html.
 * No price is stated anywhere on this page — the spec flags that as
 * deliberate ("If counsel has a fee or a range, saying it here would
 * filter enquiries — raise this with the owner"), so this doesn't invent one.
 */
export default function WorkWithMePage() {
  return (
    <>
      <WorkWithMeHero />
      <WorkWithMeProcess />
      <PullQuote maxWidth="30ch" fontSize="clamp(26px, 3.4vw, 46px)">
        This isn&rsquo;t coaching theatre. There will be no dramatic breakthrough music. Just good
        questions, honest thinking and useful decisions.
      </PullQuote>
      <WorkWithMeEnquiry />
    </>
  );
}
