import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead/SectionHead";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { getHomeNotes, formatNoteDate } from "@/sanity/lib/queries";
import styles from "./NotesPreview.module.css";

export async function NotesPreview() {
  const notes = await getHomeNotes();

  return (
    <section id="notes" className={styles.section}>
      <SectionHead
        kicker="Notes"
        headline="Things I've been thinking about."
        headlineClassName={styles.headline}
        action={<TextLink href="/notes">All notes</TextLink>}
      />
      <div className={styles.rows}>
        {notes.length === 0 ? (
          <p className={styles.empty}>Nothing published yet. Back soon.</p>
        ) : (
          notes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className={styles.row}>
              <span className={`${styles.meta} tabular-nums`}>
                {note.kind} · {note.readingMinutes} min
              </span>
              <span className={styles.title}>{note.title}</span>
              <span className={`${styles.date} tabular-nums`}>
                {formatNoteDate(note.publishedAt)}
              </span>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
