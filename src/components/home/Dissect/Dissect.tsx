import { CellGrid } from "@/components/ui/CellGrid/CellGrid";
import { SectionHead } from "@/components/ui/SectionHead/SectionHead";
import styles from "./Dissect.module.css";

const STEPS = [
  { number: "01", label: "De-escalate" },
  { number: "02", label: "Isolate" },
  { number: "03", label: "Specify" },
  { number: "04", label: "Set urgency" },
  { number: "05", label: "Examine intention" },
  { number: "06", label: "Compare solutions" },
  { number: "07", label: "Take action" },
];

export function Dissect() {
  return (
    <section className={styles.section}>
      <SectionHead
        kicker="Dissect"
        headline="When everything feels tangled, take it apart."
        // No destination is specified for this in the handoff — the
        // design shows plain, non-interactive text here.
        action={<span className={styles.seeMethod}>See the method</span>}
      />
      <CellGrid cells={STEPS} minCellWidth="150px" labelSize="19px" />
    </section>
  );
}
