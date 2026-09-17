import { Kicker } from "@/components/ui/Kicker/Kicker";
import styles from "./NotesHero.module.css";

/** Notes.dc.html lines 44–48. */
export function NotesHero() {
  return (
    <section className={styles.hero}>
      <Kicker>Notes</Kicker>
      <h1 className={styles.headline}>Things I&rsquo;ve been thinking about.</h1>
      <p className={styles.body}>
        Essays, observations and questions about building businesses, making decisions and
        figuring out what to do next.
      </p>
    </section>
  );
}
