import { Kicker } from "@/components/ui/Kicker/Kicker";
import styles from "./LibraryHero.module.css";

export function LibraryHero() {
  return (
    <section className={styles.hero}>
      <Kicker>The library</Kicker>
      <h1 className={styles.headline}>Things worth keeping nearby.</h1>
      <p className={styles.body}>Practical tools for thinking, deciding and building.</p>
    </section>
  );
}
