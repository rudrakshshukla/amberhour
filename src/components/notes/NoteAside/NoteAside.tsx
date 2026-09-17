import { Kicker } from "@/components/ui/Kicker/Kicker";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { Button } from "@/components/ui/Button/Button";
import type { NoteRelatedTool } from "@/sanity/lib/queries";
import styles from "./NoteAside.module.css";

/**
 * The sticky aside: a "Tools for this" card (only when the note has a
 * `relatedTool`) and a newsletter card (Note.dc.html lines 62–74).
 * Newsletter submission is static, same as the site's other newsletter
 * forms — wired in build stage 8 (README.md → Email).
 */
export function NoteAside({ relatedTool }: { relatedTool: NoteRelatedTool | null }) {
  return (
    <aside className={styles.aside}>
      {relatedTool && (
        <div className={styles.card}>
          <Kicker className={styles.kicker}>Tools for this</Kicker>
          <div className={styles.toolTitle}>{relatedTool.title}</div>
          <p className={styles.toolSummary}>{relatedTool.summary}</p>
          <TextLink href={`/library/${relatedTool.slug}`} className={styles.toolLink}>
            View the tool
          </TextLink>
        </div>
      )}
      <div className={styles.card}>
        <Kicker className={styles.kicker}>A letter, occasionally</Kicker>
        <p className={styles.newsletterCopy}>New notes land here first.</p>
        <form className={styles.form}>
          <input
            type="email"
            name="email"
            required
            placeholder="you@yourthing.com"
            aria-label="Email address"
            className={styles.input}
          />
          <Button type="submit" className={styles.submit}>
            Join the list
          </Button>
        </form>
      </div>
    </aside>
  );
}
