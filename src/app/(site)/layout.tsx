import type { ReactNode } from "react";
import { Header } from "@/components/Header/Header";
import { StatusLine } from "@/components/StatusLine/StatusLine";
import { Footer } from "@/components/Footer/Footer";
import { siteSettings } from "@/lib/site-settings";

/**
 * Shared chrome for every marketing page except Home: standalone header,
 * status line, page content, footer.
 *
 * Home (`app/page.tsx`) lives outside this group and composes its own
 * chrome instead — its header is embedded inside the hero image rather
 * than a standalone bar, and its status line sits below the hero. Every
 * other route (Think/Decide/Build, Library, Notes, About, Work with me,
 * Contact, …) renders through this layout.
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
