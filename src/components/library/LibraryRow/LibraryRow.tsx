import Link from "next/link";
import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import type { LibraryTool } from "@/sanity/lib/queries";
import styles from "./LibraryRow.module.css";

export interface LibraryRowProps {
  tool: LibraryTool;
  /** Odd rows (1st, 3rd, …) image left; even rows image right (Library.dc.html). */
  imageSide: "left" | "right";
}

/**
 * One row of the Library index. The whole row is a link — except an
 * in-progress tool, which renders at reduced opacity with "Soon" instead
 * of a price and isn't a link at all (README.md → "Library index").
 */
export function LibraryRow({ tool, imageSide }: LibraryRowProps) {
  const available = tool.status === "Available";

  const cover = (
    <CmsImage
      image={
        tool.coverImageUrl
          ? { url: tool.coverImageUrl, alt: tool.coverImageAlt ?? "" }
          : undefined
      }
      label={`Tool cover — ${tool.title}`}
      aspectRatio="4 / 3"
      sizes="(max-width: 700px) 100vw, 50vw"
    />
  );

  const body = (
    <div className={styles.text}>
      <div className={styles.meta}>
        <span className={`${styles.number} tabular-nums`}>
          {String(tool.number).padStart(2, "0")}
        </span>
        <span className={styles.pillar}>{tool.pillar}</span>
      </div>
      <div className={styles.title}>{tool.title}</div>
      <p className={styles.summary}>{tool.summary}</p>
      <div className={styles.footer}>
        {available ? (
          <>
            <span className={`${styles.price} tabular-nums`}>
              {tool.priceGBP !== undefined ? `£${tool.priceGBP}` : "£00"}
            </span>
            <span className={styles.view}>View the tool</span>
          </>
        ) : (
          <span className={styles.soon}>Soon</span>
        )}
      </div>
    </div>
  );

  const content =
    imageSide === "left" ? (
      <>
        {cover}
        {body}
      </>
    ) : (
      <>
        <div className={styles.textOrder}>{body}</div>
        <div className={styles.imageOrder}>{cover}</div>
      </>
    );

  const className = [styles.row, available ? "" : styles.inProgress].filter(Boolean).join(" ");

  if (!available) {
    return (
      <div className={className} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link href={`/library/${tool.slug}`} className={className}>
      {content}
    </Link>
  );
}
