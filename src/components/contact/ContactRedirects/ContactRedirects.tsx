import { TextLink } from "@/components/ui/TextLink/TextLink";
import styles from "./ContactRedirects.module.css";

/**
 * Three redirect blocks for people in the wrong place (Contact.dc.html
 * lines 54–66). The third ("Something missing") has no link in the
 * design — it's a prompt back to the form above, not a destination.
 */
export function ContactRedirects() {
  return (
    <section className={styles.section}>
      <div className={styles.block}>
        <div className={styles.kicker}>Looking for counsel</div>
        <div className={styles.line}>Start on the Work With Me page instead.</div>
        <TextLink href="/work-with-me" className={styles.link}>
          Work with me
        </TextLink>
      </div>
      <div className={styles.block}>
        <div className={styles.kicker}>Looking for a tool</div>
        <div className={styles.line}>The library is the place to look.</div>
        <TextLink href="/library" className={styles.link}>
          Browse the library
        </TextLink>
      </div>
      <div className={styles.block}>
        <div className={styles.kicker}>Something missing</div>
        <div className={styles.line}>Tell me what tool you need next.</div>
      </div>
    </section>
  );
}
