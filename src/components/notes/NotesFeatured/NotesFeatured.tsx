import Link from "next/link";
import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import { formatNoteDate, type NotesIndexNote } from "@/sanity/lib/queries";
import styles from "./NotesFeatured.module.css";

/** The featured note (Notes.dc.html lines 50–57). */
export function NotesFeatured({ note }: { note: NotesIndexNote }) {
  return (
    <Link href={`/notes/${note.slug}`} className={styles.section}>
      <CmsImage
        image={note.leadImageUrl ? { url: note.leadImageUrl, alt: note.leadImageAlt ?? "" } : undefined}
        label="Lead image or illustration"
        aspectRatio="16 / 10"
        sizes="(max-width: 700px) 100vw, 50vw"
      />
      <div className={styles.panel}>
        <div className={`${styles.meta} tabular-nums`}>
          {`${note.kind} · ${note.readingMinutes} min · ${formatNoteDate(note.publishedAt)}`}
        </div>
        <h2 className={styles.title}>{note.title}</h2>
        <p className={styles.standfirst}>{note.standfirst}</p>
        <span className={styles.readMore}>Read the note</span>
      </div>
    </Link>
  );
}
