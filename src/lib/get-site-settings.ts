import { getSiteSettings } from "@/sanity/lib/queries";
import { fallbackSiteSettings, type SiteSettings } from "@/lib/site-settings";

/** Real Sanity values, falling back field-by-field before the owner has filled them in. */
export async function resolveSiteSettings(): Promise<SiteSettings> {
  const doc = await getSiteSettings();
  return {
    statusLine: doc?.statusLine ?? fallbackSiteSettings.statusLine,
    issueLabel: doc?.issueLabel ?? fallbackSiteSettings.issueLabel,
    newsletterBlurb: doc?.newsletterBlurb ?? fallbackSiteSettings.newsletterBlurb,
  };
}
