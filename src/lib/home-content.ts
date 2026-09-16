/**
 * Every editable piece of the Home page, and the copy it falls back to
 * when the owner hasn't filled a field in the Studio yet (or Sanity isn't
 * configured). Real values come from the `homePage` singleton — see
 * src/sanity/schemaTypes/homePage.ts and lib/get-home-content.ts.
 */

export interface CmsImage {
  url: string;
  alt: string;
  /** CSS object-position derived from the Studio hotspot, e.g. "50% 30%". */
  position?: string;
}

export interface PillarContent {
  kicker: string;
  headline: string;
  body?: string;
  linkLabel: string;
  image?: CmsImage;
}

export interface HomeContent {
  hero: { headline: string; copy: string; ctaLabel: string; image?: CmsImage };
  premise: { headline: string; copy: string };
  think: PillarContent;
  decide: PillarContent;
  interruption: { kicker: string; line: string };
  build: PillarContent & { steps: string[] };
  dissect: { kicker: string; headline: string; actionLabel: string; steps: string[] };
  library: { kicker: string; headline: string; linkLabel: string; moreText: string; moreLinkLabel: string };
  about: { kicker: string; headline: string; beliefs: string[]; linkLabel: string; image?: CmsImage };
  workWithMe: { kicker: string; headline: string; copy: string; steps: string[]; ctaLabel: string };
  notes: { kicker: string; headline: string; linkLabel: string; emptyText: string };
  newsletter: { headline: string; ctaLabel: string; finePrint: string };
}

export const fallbackHomeContent: HomeContent = {
  hero: {
    headline: "Think before you build.",
    copy: "Strategic counsel for people who want to build something of their own—but would prefer to think it through first.",
    ctaLabel: "Start thinking",
  },
  premise: {
    headline: "You don't need more noise.",
    copy: "There is already plenty of it. This brand is about slowing down enough to figure out what actually makes sense.",
  },
  think: {
    kicker: "01 · Think",
    headline: "Before the answer, there is usually a better question.",
    body: "Thinking is the work before the work.",
    linkLabel: "Explore thinking",
  },
  decide: {
    kicker: "02 · Decide",
    headline: "Not every decision needs a five-year plan.",
    body: "Make the decision smaller, clearer and less dramatic.",
    linkLabel: "Explore decision tools",
  },
  interruption: {
    kicker: "A small interruption",
    line: "You don't need to have your entire life figured out before Tuesday. Tuesday will be there regardless.",
  },
  build: {
    kicker: "03 · Build",
    headline: "Ideas are lovely. Useful ideas are better.",
    linkLabel: "Explore the library",
    steps: ["Start with what matters", "make it work", "make it better"],
  },
  dissect: {
    kicker: "Dissect",
    headline: "When everything feels tangled, take it apart.",
    actionLabel: "See the method",
    steps: [
      "De-escalate",
      "Isolate",
      "Specify",
      "Set urgency",
      "Examine intention",
      "Compare solutions",
      "Take action",
    ],
  },
  library: {
    kicker: "The library",
    headline: "Things worth keeping nearby.",
    linkLabel: "All tools",
    moreText: "More tools are being written.",
    moreLinkLabel: "Tell me what you need",
  },
  about: {
    kicker: "About",
    headline: "I'm interested in what happens before people build.",
    beliefs: [
      "You don't need to scale everything.",
      "Being busy is not a strategy.",
      "Stopping can be progress.",
    ],
    linkLabel: "More about me",
  },
  workWithMe: {
    kicker: "Work with me",
    headline: "Some problems are better solved together.",
    copy: "Bring the messy version; that is usually the useful one.",
    steps: ["Bring the situation", "Dissect it", "Think", "Decide", "Move"],
    ctaLabel: "Work with me",
  },
  notes: {
    kicker: "Notes",
    headline: "Things I've been thinking about.",
    linkLabel: "All notes",
    emptyText: "Nothing published yet. Back soon.",
  },
  newsletter: {
    headline: "A letter, occasionally.",
    ctaLabel: "Join the list",
    finePrint: "No schedule. No sequence. Unsubscribe whenever.",
  },
};

/** "01", "02", … for numbered step grids. */
export function toNumberedCells(labels: string[]) {
  return labels.map((label, i) => ({ number: String(i + 1).padStart(2, "0"), label }));
}
