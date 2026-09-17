"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { LibraryRow } from "@/components/library/LibraryRow/LibraryRow";
import type { LibraryTool } from "@/sanity/lib/queries";
import styles from "./LibraryBrowser.module.css";

const PILLAR_FILTERS = ["Think", "Decide", "Build"] as const;

/**
 * Filter chips + the index rows. Filtering is client-side and instant —
 * the full tool list is already on the page — with the active filter
 * mirrored in the URL query so a filtered view is shareable (README.md
 * → "Library index", "Interactions & behaviour" → Filters).
 */
export function LibraryBrowser({ tools }: { tools: LibraryTool[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const active = searchParams.get("pillar");
  const activeFilter = PILLAR_FILTERS.includes(active as (typeof PILLAR_FILTERS)[number])
    ? (active as (typeof PILLAR_FILTERS)[number])
    : null;

  const filtered = useMemo(
    () => (activeFilter ? tools.filter((tool) => tool.pillar === activeFilter) : tools),
    [tools, activeFilter]
  );

  function setFilter(pillar: (typeof PILLAR_FILTERS)[number] | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (pillar) {
      params.set("pillar", pillar);
    } else {
      params.delete("pillar");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <>
      <div className={styles.filters}>
        <button
          type="button"
          className={activeFilter === null ? styles.chipActive : styles.chip}
          aria-pressed={activeFilter === null}
          onClick={() => setFilter(null)}
        >
          All
        </button>
        {PILLAR_FILTERS.map((pillar) => (
          <button
            key={pillar}
            type="button"
            className={activeFilter === pillar ? styles.chipActive : styles.chip}
            aria-pressed={activeFilter === pillar}
            onClick={() => setFilter(pillar)}
          >
            {pillar}
          </button>
        ))}
      </div>

      <div>
        {filtered.map((tool, i) => (
          <LibraryRow key={tool.slug} tool={tool} imageSide={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </>
  );
}
