import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFound/NotFoundContent";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * Handles `notFound()` calls from pages inside this route group (the
 * Tool and Note detail pages) — renders inside `(site)/layout.tsx`, so
 * it gets the normal header/status line/footer for free.
 */
export default function SiteNotFound() {
  return <NotFoundContent />;
}
