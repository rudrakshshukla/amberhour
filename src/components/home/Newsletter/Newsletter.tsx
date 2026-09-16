import { Button } from "@/components/ui/Button/Button";
import { fallbackSiteSettings } from "@/lib/site-settings";
import { fallbackHomeContent, type HomeContent } from "@/lib/home-content";
import styles from "./Newsletter.module.css";

export interface NewsletterProps {
  /** siteSettings.newsletterBlurb, resolved by the caller (avoids every page section re-fetching it). */
  blurb?: string;
  content?: HomeContent["newsletter"];
}

/**
 * Form submission is static for now — build stage 8 wires this to the
 * newsletter module (`lib/newsletter.ts`) once a platform is chosen
 * (README.md → Email).
 */
export function Newsletter({
  blurb = fallbackSiteSettings.newsletterBlurb,
  content = fallbackHomeContent.newsletter,
}: NewsletterProps) {
  return (
    <section className={styles.section}>
      <div>
        <h2 className={styles.headline}>{content.headline}</h2>
        <p className={styles.copy}>{blurb}</p>
      </div>
      <form className={styles.form}>
        <div className={styles.fieldRow}>
          <input
            type="email"
            name="email"
            required
            placeholder="you@yourthing.com"
            aria-label="Email address"
            className={styles.input}
          />
          <Button type="submit" tone="cream" className={styles.cta}>
            {content.ctaLabel}
          </Button>
        </div>
        <p className={styles.fine}>{content.finePrint}</p>
      </form>
    </section>
  );
}
