import { defineField, defineType } from "@sanity/types";
import { initialValueFor } from "../defaults";

/**
 * Singleton: every headline, paragraph, list and image on the Home page.
 * Any field left blank falls back to the design's copy
 * (src/lib/home-content.ts), so the page never renders empty.
 * Link destinations stay in code — they point at routes, not content.
 */

const text = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "string", description });

const paragraph = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "text", rows: 3, description });

const list = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "array", of: [{ type: "string" }], description });

const image = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description: "Describe the image for people using screen readers.",
        validation: (Rule) => Rule.required(),
      }),
    ],
  });

const section = (
  name: string,
  title: string,
  fields: ReturnType<typeof defineField>[]
) =>
  defineField({
    name,
    title,
    type: "object",
    group: name,
    options: { collapsible: true, collapsed: false },
    fields,
  });

const pillarFields = (imageNote: string, withBody = true) => [
  text("kicker", "Small label", 'e.g. "01 · Think"'),
  paragraph("headline", "Headline"),
  ...(withBody ? [paragraph("body", "Paragraph")] : []),
  text("linkLabel", "Link text"),
  image("image", "Image", imageNote),
];

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  // A new Home page opens with the design copy already filled in.
  initialValue: () => initialValueFor("homePage"),
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "premise", title: "Intro" },
    { name: "think", title: "Think" },
    { name: "decide", title: "Decide" },
    { name: "interruption", title: "Interruption" },
    { name: "build", title: "Build" },
    { name: "dissect", title: "Dissect" },
    { name: "library", title: "Library" },
    { name: "about", title: "About" },
    { name: "workWithMe", title: "Work with me" },
    { name: "notes", title: "Notes" },
    { name: "newsletter", title: "Newsletter" },
  ],
  fields: [
    section("hero", "Hero", [
      image("image", "Hero photo", "Full-bleed portrait, three-quarter, natural light. Landscape, at least 2400px wide."),
      paragraph("headline", "Headline"),
      paragraph("copy", "Paragraph"),
      text("ctaLabel", "Button text"),
    ]),
    section("premise", "Intro", [paragraph("headline", "Headline"), paragraph("copy", "Paragraph")]),
    section("think", "Think", pillarFields("Witty illustration or image for Think.")),
    section("decide", "Decide", pillarFields("Witty illustration or image for Decide.")),
    section("interruption", "A small interruption", [
      text("kicker", "Small label"),
      paragraph("line", "The line"),
    ]),
    section("build", "Build", [
      ...pillarFields("Witty illustration or image for Build.", false),
      list("steps", "Steps", "Shown as “one → two → three”."),
    ]),
    section("dissect", "Dissect", [
      text("kicker", "Small label"),
      paragraph("headline", "Headline"),
      text("actionLabel", "Right-hand text"),
      list("steps", "Steps", "Numbered automatically (01, 02, …)."),
    ]),
    section("library", "Library preview", [
      text("kicker", "Small label"),
      paragraph("headline", "Headline"),
      text("linkLabel", "Link text"),
      text("moreText", "Last card text"),
      text("moreLinkLabel", "Last card link text"),
    ]),
    section("about", "About preview", [
      image("image", "Portrait", "Tall portrait (roughly 9:16)."),
      text("kicker", "Small label"),
      paragraph("headline", "Headline"),
      list("beliefs", "Beliefs"),
      text("linkLabel", "Link text"),
    ]),
    section("workWithMe", "Work with me preview", [
      text("kicker", "Small label"),
      paragraph("headline", "Headline"),
      paragraph("copy", "Paragraph"),
      list("steps", "Process steps", "Numbered automatically (01, 02, …)."),
      text("ctaLabel", "Button text"),
    ]),
    section("notes", "Notes preview", [
      text("kicker", "Small label"),
      paragraph("headline", "Headline"),
      text("linkLabel", "Link text"),
      text("emptyText", "Text when nothing is published"),
    ]),
    section("newsletter", "Newsletter", [
      paragraph("headline", "Headline"),
      text("ctaLabel", "Button text"),
      text("finePrint", "Small print"),
    ]),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
