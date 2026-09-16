import { Kicker } from "@/components/ui/Kicker/Kicker";
import { Button } from "@/components/ui/Button/Button";
import { CellGrid } from "@/components/ui/CellGrid/CellGrid";
import { toNumberedCells, type HomeContent } from "@/lib/home-content";
import styles from "./WorkWithMePreview.module.css";

export function WorkWithMePreview({ content }: { content: HomeContent["workWithMe"] }) {
  return (
    <section className={styles.section}>
      <Kicker>{content.kicker}</Kicker>
      <h2 className={styles.headline}>{content.headline}</h2>
      <p className={styles.copy}>{content.copy}</p>
      <CellGrid
        cells={toNumberedCells(content.steps)}
        minCellWidth="170px"
        labelSize="21px"
        className={styles.grid}
      />
      <Button href="/work-with-me" className={styles.cta}>
        {content.ctaLabel}
      </Button>
    </section>
  );
}
