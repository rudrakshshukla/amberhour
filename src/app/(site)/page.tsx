import styles from "./page.module.css";

/**
 * Placeholder — build stage 1 is fonts, tokens and shared chrome only.
 * The real Home page (hero, premise, pillars, dissect, library, about,
 * work-with-me, notes, newsletter) is build stage 2.
 */
export default function HomePage() {
  return (
    <div className={styles.placeholder}>
      <div className={styles.kicker}>Build stage 1 · Foundations</div>
      <h1 className={styles.headline}>Think before you build.</h1>
      <p className={styles.copy}>
        Fonts, colour and type tokens, and the shared header, status line and
        footer are wired up. The real Home page — hero, premise, the three
        pillars, Dissect, Library, About, Work with me, Notes and the
        newsletter — comes next.
      </p>
      <div className={styles.actions}>
        <span className={styles.solid}>Solid button</span>
        <span className={styles.outline}>Outline button</span>
      </div>
      <p className={styles.note}>
        Header, status line and footer above and below are the real shared
        components — try a narrow window to see them reflow.
      </p>
    </div>
  );
}
