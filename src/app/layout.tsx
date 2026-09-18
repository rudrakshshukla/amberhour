import type { Metadata } from "next";
import type { ReactNode } from "react";
import { editorial, instrumentSans } from "./fonts";
import { CartProvider } from "@/lib/cart/CartProvider";
import { BagPanel } from "@/components/cart/BagPanel/BagPanel";
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
 * Root layout: fonts, global tokens, and the bag's client-side state.
 * Chrome (header, status line, footer) lives in `(site)/layout.tsx` so
 * a future route outside that group — `/studio`, the Sanity Studio —
 * can render without it.
 *
 * CartProvider lives here rather than in `(site)/layout.tsx` so the bag
 * survives navigating to and from Home (`app/page.tsx`), which renders
 * outside that route group with its own chrome — putting the provider
 * in `(site)` would remount it (and reset its in-memory state, though
 * not the underlying localStorage) every time.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${editorial.variable} ${instrumentSans.variable}`}>
      <body>
        <CartProvider>
          {children}
          <BagPanel />
        </CartProvider>
      </body>
    </html>
  );
}
