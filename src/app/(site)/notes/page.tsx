import type { Metadata } from "next";
import { NotesHero } from "@/components/notes/NotesHero/NotesHero";
import { NotesFeatured } from "@/components/notes/NotesFeatured/NotesFeatured";
import { NotesIndexRow } from "@/components/notes/NotesIndexRow/NotesIndexRow";
import { Newsletter } from "@/components/home/Newsletter/Newsletter";
import { getNotesIndex } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Notes",
  description: "Essays, observations and questions about building, deciding and figuring out what to do next.",
};

/**
 * HANDOFF-SPEC.md → "7. Notes index — /notes", Notes.dc.html. The
 * featured note only renders when the owner has actually marked one
 * `featured` in the Studio (schema: "One featured note appears at the
 * top of the Notes index") — no note is promoted to that slot by default.
 */
export default async function NotesPage() {
  const notes = await getNotesIndex();
  const featured = notes.find((note) => note.featured);
  const rest = featured ? notes.filter((note) => note.slug !== featured.slug) : notes;

  return (
    <>
      <NotesHero />
      {featured && <NotesFeatured note={featured} />}
      <div>
        {rest.map((note) => (
          <NotesIndexRow key={note.slug} note={note} />
        ))}
      </div>
      <Newsletter blurb="No motivational shouting. Just thoughtful things worth opening." />
    </>
  );
}
