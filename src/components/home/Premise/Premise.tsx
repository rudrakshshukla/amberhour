import type { HomeContent } from "@/lib/home-content";
import styles from "./Premise.module.css";

export function Premise({ content }: { content: HomeContent["premise"] }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>{content.headline}</h2>
      <p className={styles.copy}>{content.copy}</p>
    </section>
  );
}
