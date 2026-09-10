import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead/SectionHead";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { PLACEHOLDER_NOTES } from "@/lib/placeholder-content";
import styles from "./NotesPreview.module.css";

export function NotesPreview() {
  return (
    <section id="notes" className={styles.section}>
      <SectionHead
        kicker="Notes"
        headline="Things I've been thinking about."
        headlineClassName={styles.headline}
        action={<TextLink href="/notes">All notes</TextLink>}
      />
      <div className={styles.rows}>
        {PLACEHOLDER_NOTES.map((note) => (
          <Link key={note.slug} href={`/notes/${note.slug}`} className={styles.row}>
            <span className={`${styles.meta} tabular-nums`}>
              {note.kind} · {note.readingMinutes} min
            </span>
            <span className={styles.title}>{note.title}</span>
            <span className={`${styles.date} tabular-nums`}>{note.date}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
