import styles from "./Premise.module.css";

export function Premise() {
  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>You don&apos;t need more noise.</h2>
      <p className={styles.copy}>
        There is already plenty of it. This brand is about slowing down
        enough to figure out what actually makes sense.
      </p>
    </section>
  );
}
