import { Kicker } from "@/components/ui/Kicker/Kicker";
import styles from "./AboutBeliefs.module.css";

/** Verbatim from About.dc.html and the brief — six statements, no supporting copy. */
const BELIEFS = [
  "You don't need to scale everything.",
  "Not every idea deserves a business.",
  "Being busy is not a strategy.",
  "A smaller business can be a very successful business.",
  "Stopping can be progress.",
  "Sometimes the smartest move is to do less—properly.",
];

/** "Things I believe" (About.dc.html lines 53–61). */
export function AboutBeliefs() {
  return (
    <section className={styles.section}>
      <Kicker className={styles.kicker}>Things I believe</Kicker>
      <div className={styles.rows}>
        {BELIEFS.map((belief) => (
          <p key={belief} className={styles.row}>
            {belief}
          </p>
        ))}
      </div>
    </section>
  );
}
