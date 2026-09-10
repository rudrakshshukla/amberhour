/**
 * Shape of the `siteSettings` singleton (README.md → Content management →
 * Schema). Static placeholder for now — the CMS build stage replaces this
 * with a Sanity fetch (`revalidateTag`d from the Studio webhook) and keeps
 * this exact shape as the type/fallback.
 */
export interface SiteSettings {
  statusLine: string;
  issueLabel: string;
  newsletterBlurb: string;
}

export const siteSettings: SiteSettings = {
  statusLine:
    "Currently thinking about — whether a smaller offer would sell better",
  issueLabel: "No. 014 · September",
  newsletterBlurb: "No motivational shouting. Just thoughtful things worth opening.",
};
