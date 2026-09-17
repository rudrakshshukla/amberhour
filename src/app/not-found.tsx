import type { Metadata } from "next";
import { Header } from "@/components/Header/Header";
import { StatusLine } from "@/components/StatusLine/StatusLine";
import { Footer } from "@/components/Footer/Footer";
import { NotFoundContent } from "@/components/NotFound/NotFoundContent";
import { resolveSiteSettings } from "@/lib/get-site-settings";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * The root-level 404 (Next.js's fallback for a URL that matches no
 * route at all, e.g. a mistyped path — that case never enters the
 * `(site)` route group, so it doesn't inherit `(site)/layout.tsx`'s
 * chrome). Duplicates that layout's header/status line/footer rather
 * than leaving this one bare; see `(site)/not-found.tsx` for the one
 * that handles `notFound()` calls thrown from within site pages.
 */
export default async function RootNotFound() {
  const siteSettings = await resolveSiteSettings();

  return (
    <>
      <Header />
      <StatusLine statusLine={siteSettings.statusLine} issueLabel={siteSettings.issueLabel} />
      <main>
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
