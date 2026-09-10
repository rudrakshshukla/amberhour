import { Kicker } from "@/components/ui/Kicker/Kicker";
import styles from "./Interruption.module.css";

export function Interruption() {
  return (
    <section className={styles.section}>
      <Kicker tone="cream">A small interruption</Kicker>
      <p className={styles.line}>
        You don&apos;t need to have your entire life figured out before
        Tuesday. Tuesday will be there regardless.
      </p>
    </section>
  );
}
