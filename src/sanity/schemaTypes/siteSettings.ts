import { defineField, defineType } from "@sanity/types";
import { initialValueFor } from "../defaults";

/** Singleton — see src/sanity/structure.ts for how it's pinned in the Studio. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  initialValue: () => initialValueFor("siteSettings"),
  fields: [
    defineField({
      name: "statusLine",
      title: "Status line",
      description:
        'e.g. "Currently thinking about — whether a smaller offer would sell better." Plain text — it never ticks or animates.',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issueLabel",
      title: "Issue label",
      description: 'e.g. "No. 014 · September".',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsletterBlurb",
      title: "Newsletter blurb",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
