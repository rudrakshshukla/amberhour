import { Kicker } from "@/components/ui/Kicker/Kicker";
import { Button } from "@/components/ui/Button/Button";
import { CellGrid } from "@/components/ui/CellGrid/CellGrid";
import styles from "./WorkWithMePreview.module.css";

const PROCESS = [
  { number: "01", label: "Bring the situation" },
  { number: "02", label: "Dissect it" },
  { number: "03", label: "Think" },
  { number: "04", label: "Decide" },
  { number: "05", label: "Move" },
];

export function WorkWithMePreview() {
  return (
    <section className={styles.section}>
      <Kicker>Work with me</Kicker>
      <h2 className={styles.headline}>Some problems are better solved together.</h2>
      <p className={styles.copy}>Bring the messy version; that is usually the useful one.</p>
      <CellGrid
        cells={PROCESS}
        minCellWidth="170px"
        labelSize="21px"
        className={styles.grid}
      />
      <Button href="/work-with-me" className={styles.cta}>
        Work with me
      </Button>
    </section>
  );
}
