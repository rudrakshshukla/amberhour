import { defineField, defineType } from "@sanity/types";

/** A Library item (README.md → Content management → Schema). */
export const tool = defineType({
  name: "tool",
  title: "Tool",
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
      name: "number",
      title: "Number",
      description: 'The "01", "02" displayed.',
      type: "number",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: "pillar",
      title: "Pillar",
      description: "Drives the filters.",
      type: "string",
      options: { list: ["Think", "Decide", "Build"], layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      description: "One sentence, used on the index and cards.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: 'The "What it is" block.',
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contents",
      title: "Contents",
      description: 'The "What\'s inside" numbered list.',
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      description: "4:3",
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
      name: "previewImages",
      title: "Preview images",
      description: '3:4, the "Look inside" row.',
      type: "array",
      of: [
        {
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
        },
      ],
    }),
    defineField({
      name: "prices",
      title: "Prices",
      description: "One entry per market currency. 0 means free.",
      type: "array",
      of: [{ type: "price" }],
    }),
    defineField({
      name: "file",
      title: "File",
      description:
        "The deliverable. Delivery is signed/expiring links, built in a later stage — uploading it here is enough for now.",
      type: "file",
    }),
    defineField({
      name: "notionUrl",
      title: "Notion URL",
      description: "Optional duplicate link, if this is a Notion template.",
      type: "url",
    }),
    defineField({
      name: "status",
      title: "Status",
      description: '"In progress" renders greyed with "Soon" and no buy button.',
      type: "string",
      options: { list: ["Available", "In progress"], layout: "radio" },
      initialValue: "In progress",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", pillar: "pillar", media: "coverImage" },
    prepare({ title, pillar, media }) {
      return { title, subtitle: pillar, media };
    },
  },
});
