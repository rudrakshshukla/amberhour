import { defineField, defineType } from "@sanity/types";

/**
 * The markets that are live. Adding one and ticking its countries is how
 * the owner opens a new market herself (README.md → Content management).
 */
export const currency = defineType({
  name: "currency",
  title: "Currency",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Code",
      description: "ISO 4217, e.g. GBP, AED, USD, EUR, SGD, INR.",
      type: "string",
      validation: (Rule) => Rule.required().uppercase().length(3),
    }),
    defineField({
      name: "symbol",
      title: "Symbol",
      description: "e.g. £, AED, $, €.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gateway",
      title: "Gateway",
      type: "string",
      options: { list: ["Stripe", "Razorpay"], layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "countries",
      title: "Countries",
      description: "ISO country codes routed to this currency.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "active",
      title: "Active",
      description: "Turning this on makes that market live.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { code: "code", active: "active" },
    prepare({ code, active }: { code?: string; active?: boolean }) {
      return { title: code, subtitle: active ? "Active" : "Inactive" };
    },
  },
});
