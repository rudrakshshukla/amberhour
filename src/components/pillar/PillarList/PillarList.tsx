import { Kicker } from "@/components/ui/Kicker/Kicker";
import type { PillarListItem } from "@/lib/pillar-content";
import styles from "./PillarList.module.css";

export interface PillarListProps {
  kicker: string;
  headline: string;
  items: PillarListItem[];
}

/**
 * The pillar page's two-column list: a kicker + headline on the left,
 * hairline-separated numbered rows on the right (README.md → "Pillar
 * page", "Pillar list").
 */
export function PillarList({ kicker, headline, items }: PillarListProps) {
  return (
    <section className={styles.section}>
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 className={styles.headline}>{headline}</h2>
      </div>
      <div className={styles.rows}>
        {items.map((item, i) => (
          <div key={item.label} className={styles.row}>
            <span className={`${styles.number} tabular-nums`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={styles.term}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
