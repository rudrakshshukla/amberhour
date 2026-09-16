import { Kicker } from "@/components/ui/Kicker/Kicker";
import type { HomeContent } from "@/lib/home-content";
import styles from "./Interruption.module.css";

export function Interruption({ content }: { content: HomeContent["interruption"] }) {
  return (
    <section className={styles.section}>
      <Kicker tone="cream">{content.kicker}</Kicker>
      <p className={styles.line}>{content.line}</p>
    </section>
  );
}
