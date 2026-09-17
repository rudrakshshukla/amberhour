const WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
];

/**
 * Spells small counts out ("Seven"), the way the Tool page's "What's
 * inside" headline names the length of the `contents` list (Tool.dc.html:
 * "Seven moves, in order.", mirrored in the pillar list headlines, e.g.
 * Build's "Three steps, in order."). Falls back to the numeral past
 * twelve rather than guessing at more words.
 */
export function countWord(n: number): string {
  return WORDS[n] ?? String(n);
}
