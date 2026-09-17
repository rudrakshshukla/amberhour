import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoteBreadcrumb } from "@/components/notes/NoteBreadcrumb/NoteBreadcrumb";
import { NoteArticle } from "@/components/notes/NoteArticle/NoteArticle";
import { MoreNotes } from "@/components/notes/MoreNotes/MoreNotes";
import { getNoteBySlug, getMoreNotes } from "@/sanity/lib/queries";

/** HANDOFF-SPEC.md → "8. Note — /notes/[slug]", Note.dc.html. */

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.standfirst,
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) notFound();

  const moreNotes = await getMoreNotes(note.slug);

  return (
    <>
      <NoteBreadcrumb kind={note.kind} readingMinutes={note.readingMinutes} />
      <NoteArticle note={note} />
      <MoreNotes notes={moreNotes} />
    </>
  );
}
