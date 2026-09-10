import { defineField, defineType } from "@sanity/types";

/**
 * One `{currency, amount}` entry. Used as an array member on `tool` and
 * `bundle` — one per market currency, set by hand, never converted at
 * runtime (README.md → Payments).
 */
export const price = defineType({
  name: "price",
  title: "Price",
  type: "object",
  fields: [
    defineField({
      name: "currency",
      title: "Currency",
      type: "reference",
      to: [{ type: "currency" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amount",
      title: "Amount",
      description: "0 means free — see Free tools in the handoff.",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: { code: "currency.code", amount: "amount" },
    prepare({ code, amount }: { code?: string; amount?: number }) {
      return { title: `${code ?? "—"} ${amount ?? "—"}` };
    },
  },
});
