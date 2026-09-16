import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead/SectionHead";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { getHomeNotes, formatNoteDate } from "@/sanity/lib/queries";
import type { HomeContent } from "@/lib/home-content";
import styles from "./NotesPreview.module.css";

export async function NotesPreview({ content }: { content: HomeContent["notes"] }) {
  const notes = await getHomeNotes();

  return (
    <section id="notes" className={styles.section}>
      <SectionHead
        kicker={content.kicker}
        headline={content.headline}
        headlineClassName={styles.headline}
        action={<TextLink href="/notes">{content.linkLabel}</TextLink>}
      />
      <div className={styles.rows}>
        {notes.length === 0 ? (
          <p className={styles.empty}>{content.emptyText}</p>
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
