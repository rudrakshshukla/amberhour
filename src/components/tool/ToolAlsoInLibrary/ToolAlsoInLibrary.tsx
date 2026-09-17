import Link from "next/link";
import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import type { RelatedTool } from "@/sanity/lib/queries";
import styles from "./ToolAlsoInLibrary.module.css";

/**
 * "Also in the library" — one real related-tool card plus a dashed
 * placeholder (HANDOFF-SPEC.md → "4. Tool page": "Two cards, one real,
 * one dashed placeholder."; Tool.dc.html lines 124–137). When there's no
 * other Available tool in the same pillar yet, only the placeholder
 * shows — never a fabricated second card.
 */
export function ToolAlsoInLibrary({
  related,
  pillar,
}: {
  related: RelatedTool | null;
  pillar: "Think" | "Decide" | "Build";
}) {
  return (
    <section className={styles.section}>
      <div className={styles.kicker}>Also in the library</div>
      <div className={styles.grid}>
        {related && (
          <Link href={`/library/${related.slug}`} className={styles.card}>
            <CmsImage
              image={
                related.coverImageUrl
                  ? { url: related.coverImageUrl, alt: related.coverImageAlt ?? "" }
                  : undefined
              }
              label={`Cover — ${related.title}`}
              height="200px"
              className={styles.cover}
            />
            <div className={styles.body}>
              <div className={`${styles.meta} tabular-nums`}>
                {`${String(related.number).padStart(2, "0")} · ${related.pillar}`}
              </div>
              <div className={styles.title}>{related.title}</div>
            </div>
          </Link>
        )}
        <div className={styles.placeholder}>
          <span>{`More ${pillar} tools are being written.`}</span>
        </div>
      </div>
    </section>
  );
}
