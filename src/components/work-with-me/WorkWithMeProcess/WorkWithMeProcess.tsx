import { Kicker } from "@/components/ui/Kicker/Kicker";
import { CellGrid } from "@/components/ui/CellGrid/CellGrid";
import styles from "./WorkWithMeProcess.module.css";

const STEPS = [
  { number: "01", label: "Bring the situation" },
  { number: "02", label: "Dissect it" },
  { number: "03", label: "Think" },
  { number: "04", label: "Decide" },
  { number: "05", label: "Move" },
];

/** "The process" — five cells (Work-With-Me.dc.html lines 54–61). */
export function WorkWithMeProcess() {
  return (
    <section className={styles.section}>
      <Kicker>The process</Kicker>
      <h2 className={styles.headline}>Five steps, no theatre.</h2>
      <CellGrid cells={STEPS} minCellWidth="190px" labelSize="22px" className={styles.grid} />
    </section>
  );
}
