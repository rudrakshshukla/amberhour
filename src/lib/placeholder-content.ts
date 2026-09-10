/**
 * Standing in for the `tool` and `note` documents (README.md → Content
 * management → Schema) until Sanity is wired up (build stage 3). Copy is
 * taken verbatim from the design handoff. Slugs are guesses for routes
 * that don't exist yet — real slugs will come from the CMS.
 */

export interface PlaceholderTool {
  slug: string;
  number: string;
  pillar: "Think" | "Decide" | "Build";
  title: string;
  summary: string;
}

export const PLACEHOLDER_TOOLS: PlaceholderTool[] = [
  {
    slug: "im-stuck",
    number: "01",
    pillar: "Think",
    title: "I'm Stuck",
    summary:
      "A practical reset for when something isn't working but you cannot quite explain what.",
  },
  {
    slug: "situation-deconstruction",
    number: "02",
    pillar: "Think",
    title: "Situation Deconstruction",
    summary:
      "A framework for taking a messy situation apart and seeing what is actually going on.",
  },
];

export interface PlaceholderNote {
  slug: string;
  kind: "Essay" | "Observation" | "Question";
  readingMinutes: number;
  title: string;
  date: string;
}

export const PLACEHOLDER_NOTES: PlaceholderNote[] = [
  {
    slug: "the-plan-that-never-left-the-notebook",
    kind: "Essay",
    readingMinutes: 6,
    title: "The plan that never left the notebook",
    date: "Aug 2026",
  },
  {
    slug: "being-busy-is-not-a-strategy",
    kind: "Observation",
    readingMinutes: 2,
    title: "Being busy is not a strategy",
    date: "Jul 2026",
  },
  {
    slug: "what-are-you-actually-deciding",
    kind: "Question",
    readingMinutes: 3,
    title: "What are you actually deciding?",
    date: "Jul 2026",
  },
];
