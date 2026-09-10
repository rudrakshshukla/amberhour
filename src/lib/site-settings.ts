/**
 * Shape of the `siteSettings` singleton (README.md → Content management →
 * Schema). Real values now come from Sanity (src/sanity/lib/queries.ts →
 * getSiteSettings) — this is the fallback used before the owner has
 * created the singleton document in the Studio, or before Sanity is
 * configured at all.
 */
export interface SiteSettings {
  statusLine: string;
  issueLabel: string;
  newsletterBlurb: string;
}

export const fallbackSiteSettings: SiteSettings = {
  statusLine:
    "Currently thinking about — whether a smaller offer would sell better",
  issueLabel: "No. 014 · September",
  newsletterBlurb: "No motivational shouting. Just thoughtful things worth opening.",
};
