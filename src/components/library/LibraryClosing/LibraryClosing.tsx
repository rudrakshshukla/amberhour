import { TextLink } from "@/components/ui/TextLink/TextLink";
import styles from "./LibraryClosing.module.css";

/** "More tools are being written." — README.md → "Library index". */
export function LibraryClosing() {
  return (
    <section className={styles.section}>
      <p className={styles.line}>
        More tools are being written. Decision-making, offers, positioning, priorities.
      </p>
      <TextLink href="/contact" className={styles.link}>
        Tell me what you need
      </TextLink>
    </section>
  );
}
