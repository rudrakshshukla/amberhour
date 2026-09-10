import { Button } from "@/components/ui/Button/Button";
import { siteSettings } from "@/lib/site-settings";
import styles from "./Newsletter.module.css";

/**
 * Static for now — build stage 8 wires this to the newsletter module
 * (`lib/newsletter.ts`) once a platform is chosen (README.md → Email).
 */
export function Newsletter() {
  return (
    <section className={styles.section}>
      <div>
        <h2 className={styles.headline}>A letter, occasionally.</h2>
        <p className={styles.copy}>{siteSettings.newsletterBlurb}</p>
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
            Join the list
          </Button>
        </div>
        <p className={styles.fine}>No schedule. No sequence. Unsubscribe whenever.</p>
      </form>
    </section>
  );
}
