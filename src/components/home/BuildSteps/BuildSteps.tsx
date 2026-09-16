import { Fragment } from "react";
import styles from "./BuildSteps.module.css";

/** The "Start with what matters → make it work → make it better" line. */
export function BuildSteps({ steps }: { steps: string[] }) {
  return (
    <div className={styles.steps}>
      {steps.map((step, i) => (
        <Fragment key={`${i}-${step}`}>
          {i > 0 && <span className={styles.arrow}>→</span>}
          <span>{step}</span>
        </Fragment>
      ))}
    </div>
  );
}
