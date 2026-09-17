import Link from "next/link";
import { formatNoteDate, type NotesIndexNote } from "@/sanity/lib/queries";
import styles from "./NotesIndexRow.module.css";

/** One row of the Notes index (Notes.dc.html lines 61–79). */
export function NotesIndexRow({ note }: { note: NotesIndexNote }) {
  return (
    <Link href={`/notes/${note.slug}`} className={styles.row}>
      <span className={`${styles.meta} tabular-nums`}>{`${note.kind} · ${note.readingMinutes} min`}</span>
      <span className={styles.title}>{note.title}</span>
      <span className={`${styles.date} tabular-nums`}>{formatNoteDate(note.publishedAt)}</span>
    </Link>
  );
}
