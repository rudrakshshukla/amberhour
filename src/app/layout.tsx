import type { Metadata } from "next";
import type { ReactNode } from "react";
import { editorial, instrumentSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Amber Hour",
    template: "%s — The Amber Hour",
  },
  description:
    "Strategic counsel for people who want to build something of their own — but would prefer to think it through first.",
};

/**
 * Root layout: fonts and global tokens only. Chrome (header, status line,
 * footer) lives in `(site)/layout.tsx` so a future route outside that
 * group — `/studio`, the Sanity Studio — can render without it.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${editorial.variable} ${instrumentSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
