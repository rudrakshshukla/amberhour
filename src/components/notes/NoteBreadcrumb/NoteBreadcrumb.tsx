import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";

/** "Notes · Essay · 6 min" (Note.dc.html lines 38–44). */
export function NoteBreadcrumb({ kind, readingMinutes }: { kind: string; readingMinutes: number }) {
  return (
    <Breadcrumb
      items={[
        { label: "Notes", href: "/notes" },
        { label: kind },
        { label: `${readingMinutes} min` },
      ]}
    />
  );
}
