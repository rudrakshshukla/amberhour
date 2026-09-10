import localFont from "next/font/local";
import { Instrument_Sans } from "next/font/google";

/**
 * Display face — PP Editorial Old. Self-hosted (see fonts/ in the design
 * handoff). Two weight/style pairs cover every use in the spec: Ultralight
 * (200) for large display type, Regular (400) for everything else, each
 * with an italic cut for emphasis and pull quotes.
 */
export const editorial = localFont({
  src: [
    {
      path: "../fonts/PPEditorialOld-Ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/PPEditorialOld-UltralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/PPEditorialOld-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPEditorialOld-Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

/**
 * Body face — Instrument Sans, subset to Latin. Weights 400/500 plus
 * italic, per the design tokens.
 */
export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});
