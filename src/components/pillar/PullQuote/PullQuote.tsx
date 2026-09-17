import styles from "./PullQuote.module.css";

/** Centred italic pull quote on the estate-green ground (README.md → "Pillar page"). */
export function PullQuote({ children }: { children: string }) {
  return (
    <section className={styles.section}>
      <p className={styles.quote}>{children}</p>
    </section>
  );
}
