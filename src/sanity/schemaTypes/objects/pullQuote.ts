import { defineField, defineType } from "@sanity/types";

/** The pull-quote block type used inside portable text (README.md → note → body). */
export const pullQuote = defineType({
  name: "pullQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { text: "text" },
    prepare({ text }: { text?: string }) {
      return { title: text, subtitle: "Pull quote" };
    },
  },
});
