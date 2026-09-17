import { Button } from "@/components/ui/Button/Button";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import styles from "./NotFoundContent.module.css";

/**
 * The 404 body. Not in the design files — HANDOFF-SPEC.md → "Also
 * needed (not designed — build from the system)" gives the exact copy
 * and destinations to use: "This page doesn't exist. Not everything
 * needs to." plus links to Library and Notes.
 */
export function NotFoundContent() {
  return (
    <section className={styles.section}>
      <div className={styles.kicker}>404</div>
      <h1 className={styles.headline}>This page doesn&rsquo;t exist. Not everything needs to.</h1>
      <div className={styles.actions}>
        <Button href="/library">Browse the library</Button>
        <TextLink href="/notes">Read the notes</TextLink>
      </div>
    </section>
  );
}
