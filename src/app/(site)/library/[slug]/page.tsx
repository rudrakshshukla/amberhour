import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolBreadcrumb } from "@/components/tool/ToolBreadcrumb/ToolBreadcrumb";
import { ToolHero } from "@/components/tool/ToolHero/ToolHero";
import { ToolWhatItIs } from "@/components/tool/ToolWhatItIs/ToolWhatItIs";
import { PillarList } from "@/components/pillar/PillarList/PillarList";
import { ToolLookInside } from "@/components/tool/ToolLookInside/ToolLookInside";
import { PullQuote } from "@/components/pillar/PullQuote/PullQuote";
import { ToolAlsoInLibrary } from "@/components/tool/ToolAlsoInLibrary/ToolAlsoInLibrary";
import { getToolBySlug, getRelatedTool } from "@/sanity/lib/queries";
import { countWord } from "@/lib/count-words";

/**
 * The Tool page (HANDOFF-SPEC.md → "4. Tool page — /library/[slug]",
 * Tool.dc.html). Deliberately skips the mockup's "Bag" section: the
 * spec's own note says the real bag is a slide-over panel opened from
 * the header, not an inline section, and the panel plus checkout are
 * build stage 5 (payments) — not built yet. See ToolHero for the
 * inert Add-to-bag/Buy-now buttons and ToolWhatItIs for the one section
 * this page has that the mockup doesn't (the required `description`
 * field, which has nowhere else to go).
 */

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.summary,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  const related = await getRelatedTool(tool.pillar, tool.slug);

  return (
    <>
      <ToolBreadcrumb number={tool.number} pillar={tool.pillar} />
      <ToolHero tool={tool} />
      <ToolWhatItIs tool={tool} />
      <PillarList
        kicker="What's inside"
        headline={`${countWord(tool.contents.length)} moves, in order.`}
        items={tool.contents.map((label) => ({ label }))}
      />
      <ToolLookInside tool={tool} />
      {/*
        Tool.dc.html's pull quote ("A beautifully designed plan…") reads as
        the template's fixed editorial line, not something specific to the
        one mockup tool it happened to be shown on — it doesn't name the
        tool, and the schema has no per-tool quote field to draw from. It's
        used verbatim (brief.txt) and the same on every tool page for now;
        flagging in case the owner wants a per-tool quote field added later.
      */}
      <PullQuote>
        A beautifully designed plan that never leaves the notebook is, technically speaking,
        stationery.
      </PullQuote>
      <ToolAlsoInLibrary related={related} pillar={tool.pillar} />
    </>
  );
}
