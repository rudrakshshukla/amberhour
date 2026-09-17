import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import { PortableTextBody } from "@/components/ui/PortableTextBody/PortableTextBody";
import { NoteAside } from "@/components/notes/NoteAside/NoteAside";
import { formatNoteDate, type NoteDetail } from "@/sanity/lib/queries";
import styles from "./NoteArticle.module.css";

/** The note itself: head, lead image, and the body/aside grid (Note.dc.html lines 47–79). */
export function NoteArticle({ note }: { note: NoteDetail }) {
  return (
    <article className={styles.article}>
      <div className={`${styles.eyebrow} tabular-nums`}>
        {`${note.kind} · ${formatNoteDate(note.publishedAt, { long: true })}`}
      </div>
      <h1 className={styles.title}>{note.title}</h1>
      <p className={styles.standfirst}>{note.standfirst}</p>

      <CmsImage
        image={note.leadImageUrl ? { url: note.leadImageUrl, alt: note.leadImageAlt ?? "" } : undefined}
        label="Lead image or illustration"
        aspectRatio="16 / 9"
        sizes="(max-width: 1100px) 100vw, 1100px"
        className={styles.leadImage}
      />

      <div className={styles.grid}>
        <PortableTextBody value={note.body} />
        <NoteAside relatedTool={note.relatedTool} />
      </div>
    </article>
  );
}
