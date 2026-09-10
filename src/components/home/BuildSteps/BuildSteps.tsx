import styles from "./BuildSteps.module.css";

/** The "Start with what matters → make it work → make it better" line. */
export function BuildSteps() {
  return (
    <div className={styles.steps}>
      <span>Start with what matters</span>
      <span className={styles.arrow}>→</span>
      <span>make it work</span>
      <span className={styles.arrow}>→</span>
      <span>make it better</span>
    </div>
  );
}
