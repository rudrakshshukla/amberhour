import { Button } from "@/components/ui/Button/Button";
import styles from "./PillarClose.module.css";

/** "Tools for all of this." — closing CTA to the Library (README.md → "Pillar page"). */
export function PillarClose() {
  return (
    <section className={styles.section}>
      <p className={styles.line}>Tools for all of this.</p>
      <Button href="/library" className={styles.button}>
        Explore the library
      </Button>
    </section>
  );
}
