import Link from "next/link";
import { Kicker } from "@/components/ui/Kicker/Kicker";
import type { MoreNote } from "@/sanity/lib/queries";
import styles from "./MoreNotes.module.css";

/** "More notes" — up to three others (Note.dc.html lines 83–98). */
export function MoreNotes({ notes }: { notes: MoreNote[] }) {
  if (notes.length === 0) return null;

  return (
    <section className={styles.section}>
      <Kicker className={styles.kicker}>More notes</Kicker>
      <div className={styles.grid}>
        {notes.map((note) => (
          <Link key={note.slug} href={`/notes/${note.slug}`} className={styles.card}>
            <div className={`${styles.meta} tabular-nums`}>{`${note.kind} · ${note.readingMinutes} min`}</div>
            <div className={styles.title}>{note.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
