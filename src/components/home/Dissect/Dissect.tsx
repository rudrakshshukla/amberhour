import { CellGrid } from "@/components/ui/CellGrid/CellGrid";
import { SectionHead } from "@/components/ui/SectionHead/SectionHead";
import { toNumberedCells, type HomeContent } from "@/lib/home-content";
import styles from "./Dissect.module.css";

export function Dissect({ content }: { content: HomeContent["dissect"] }) {
  return (
    <section className={styles.section}>
      <SectionHead
        kicker={content.kicker}
        headline={content.headline}
        // No destination is specified for this in the handoff — the
        // design shows plain, non-interactive text here.
        action={<span className={styles.seeMethod}>{content.actionLabel}</span>}
      />
      <CellGrid cells={toNumberedCells(content.steps)} minCellWidth="150px" labelSize="19px" />
    </section>
  );
}
