import { defineField, defineType } from "@sanity/types";

/** An essay, observation or question (README.md → Content management → Schema). */
export const note = defineType({
  name: "note",
  title: "Note",
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
      name: "kind",
      title: "Kind",
      description: "Shown as the label.",
      type: "string",
      options: { list: ["Essay", "Observation", "Question"], layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingMinutes",
      title: "Reading minutes",
      description: 'Shown as "6 min".',
      type: "number",
      validation: (Rule) => Rule.required().min(1).integer(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      description: 'Drives ordering and the "Aug 2026" stamp.',
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "standfirst",
      title: "Standfirst",
      description: "The italic line under the headline.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "leadImage",
      title: "Lead image",
      description: "16:9",
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
      name: "body",
      title: "Body",
      description: "Headings, paragraphs, italics, pull quotes, inline images.",
      type: "array",
      of: [
        { type: "block" },
        { type: "pullQuote" },
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "relatedTool",
      title: "Related tool",
      description: "Optional — renders the sidebar card.",
      type: "reference",
      to: [{ type: "tool" }],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description: "One featured note appears at the top of the Notes index.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", kind: "kind", media: "leadImage" },
    prepare({ title, kind, media }) {
      return { title, subtitle: kind, media };
    },
  },
});
