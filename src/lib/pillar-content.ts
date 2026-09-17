import type { CmsImage } from "@/lib/home-content";

export type PillarId = "think" | "decide" | "build";

export interface PillarListItem {
  label: string;
}

export interface PillarCrossLink {
  pillar: PillarId;
  kicker: string;
  headline: string;
  body: string;
  linkLabel: string;
  /** Decide's cross-link only — the four outlined chips (Think.dc.html). */
  chips?: string[];
  imageLabel: string;
  image?: CmsImage;
}

export interface PillarData {
  id: PillarId;
  number: string;
  name: string;
  href: string;
  kicker: string;
  headline: string;
  body: string;
  heroImageLabel: string;
  heroImage?: CmsImage;
  list: {
    kicker: string;
    headline: string;
    items: PillarListItem[];
  };
  pullQuote: string;
}

/**
 * Think, Decide and Build share one page template (README.md → "Pillar
 * page — /think, /decide, /build", "One template, three routes").
 *
 * Think's content is verbatim from the design handoff (`design/Think.dc.html`
 * — the only pillar page actually designed — and `design/brief.txt`).
 *
 * Decide and Build were only ever sketched as cross-link teasers *within*
 * Think.dc.html: a headline, one line of body copy, and (for Decide) four
 * chips. Neither has a designed five-item list or pull quote anywhere in
 * the handoff. The italicised fields below are drafted to match the
 * brief's voice ("dry, intelligent and sparse") so the pages aren't
 * missing content — flag them to the owner to confirm or rewrite before
 * launch; everything else on this page is taken directly from the handoff.
 */
export const PILLARS: Record<PillarId, PillarData> = {
  think: {
    id: "think",
    number: "01",
    name: "Think",
    href: "/think",
    kicker: "Pillar 01 · Think",
    headline: "Before the answer, there is usually a better question.",
    body: "Thinking is the work before the work.",
    heroImageLabel: "Full-bleed image or illustration — Think",
    list: {
      kicker: "What we take apart",
      headline: "Five things underneath the problem.",
      items: [
        { label: "The situation" },
        { label: "The problem" },
        { label: "The intention" },
        { label: "The options" },
        { label: "The consequences" },
      ],
    },
    // Verbatim, design/Think.dc.html.
    pullQuote: "Most stuck decisions are two decisions wearing one coat.",
  },
  decide: {
    id: "decide",
    number: "02",
    name: "Decide",
    href: "/decide",
    kicker: "Pillar 02 · Decide",
    headline: "Clarity is useful. Decisions are better.",
    body: "A decision does not have to be perfect. It has to be good enough to move forward with.",
    heroImageLabel: "Full-bleed image or illustration — Decide",
    // DRAFT — not in the handoff. The brief only names four concepts
    // (starting/changing/stopping/choosing, brief.txt §7); kept at four
    // rather than padding to five with an invented category.
    list: {
      kicker: "What we help you decide",
      headline: "Four kinds of decisions.",
      items: [
        { label: "Starting" },
        { label: "Changing" },
        { label: "Stopping" },
        { label: "Choosing" },
      ],
    },
    // DRAFT — no pull quote exists for this page in the handoff.
    pullQuote: "A decision delayed long enough stops being a decision and starts being a mood.",
  },
  build: {
    id: "build",
    number: "03",
    name: "Build",
    href: "/build",
    kicker: "Pillar 03 · Build",
    headline: "Ideas are lovely. Useful ideas are better.",
    body: "Building means knowing what needs to be built first.",
    heroImageLabel: "Full-bleed image or illustration — Build",
    // The three-step principle (brief.txt §8, reused verbatim from the
    // Home page's Build section) stood in as the list — no fifth or
    // fourth step exists anywhere, so this stays at three rather than
    // three padded to a false five.
    list: {
      kicker: "How building actually goes",
      headline: "Three steps, in order.",
      items: [
        { label: "Start with what matters" },
        { label: "Make it work" },
        { label: "Make it better" },
      ],
    },
    // DRAFT — no pull quote exists for this page in the handoff.
    pullQuote: "Most businesses fail beautifully, in Figma, before anyone tries to buy anything.",
  },
};

const CROSS_LINK_COPY: Record<PillarId, Omit<PillarCrossLink, "imageLabel" | "image">> = {
  think: {
    pillar: "think",
    kicker: "Pillar 01 · Think",
    headline: "Before the answer, there is usually a better question.",
    body: "Thinking is the work before the work.",
    linkLabel: "Explore thinking",
  },
  decide: {
    pillar: "decide",
    kicker: "Pillar 02 · Decide",
    headline: "Clarity is useful. Decisions are better.",
    body: "A decision does not have to be perfect. It has to be good enough to move forward with.",
    linkLabel: "Explore decision tools",
    chips: ["Starting", "Changing", "Stopping", "Choosing"],
  },
  build: {
    pillar: "build",
    kicker: "Pillar 03 · Build",
    headline: "Ideas are lovely. Useful ideas are better.",
    body: "Building means knowing what needs to be built first.",
    linkLabel: "Explore the library",
  },
};

/** The other two pillars, as cross-link teaser blocks, in pillar order. */
export function crossLinksFor(pillar: PillarId): PillarCrossLink[] {
  const order: PillarId[] = ["think", "decide", "build"];
  return order
    .filter((id) => id !== pillar)
    .map((id) => ({
      ...CROSS_LINK_COPY[id],
      imageLabel: `Illustration — ${PILLARS[id].name}`,
    }));
}
