import type { ReactNode } from "react";
import { Header } from "@/components/Header/Header";
import { StatusLine } from "@/components/StatusLine/StatusLine";
import { Footer } from "@/components/Footer/Footer";
import { siteSettings } from "@/lib/site-settings";

/**
 * Shared chrome for every marketing page: standalone header, status line,
 * page content, footer.
 *
 * The Home page is the one exception the spec calls out — its header is
 * embedded inside the hero image rather than a standalone bar above it,
 * and its footer carries an extra "Send a note" block. Once Home is
 * built (build stage 2) it will likely move to `app/page.tsx`, outside
 * this group, and compose `<Header variant="onHero">` / `<Footer
 * variant="home">` itself. For now `/` renders through this group like
 * every other route, as a placeholder.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <StatusLine
        statusLine={siteSettings.statusLine}
        issueLabel={siteSettings.issueLabel}
      />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
