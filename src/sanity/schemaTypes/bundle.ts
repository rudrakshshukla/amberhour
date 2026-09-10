import { defineField, defineType } from "@sanity/types";

/** Two or more tools sold together at a combined price. */
export const bundle = defineType({
  name: "bundle",
  title: "Bundle",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tools",
      title: "Tools",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tool" }] }],
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "prices",
      title: "Prices",
      description: "The combined price per currency, set manually.",
      type: "array",
      of: [{ type: "price" }],
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
});
