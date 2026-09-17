import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import type { ToolDetail } from "@/sanity/lib/queries";
import styles from "./ToolLookInside.module.css";

/**
 * "Look inside" — three real page shots, 3:4, on the surface tint
 * (HANDOFF-SPEC.md → "4. Tool page": "Real page shots matter here —
 * buyers hesitate without them."; Tool.dc.html lines 87–93). Renders
 * nothing if the owner hasn't uploaded any `previewImages` yet, rather
 * than showing three placeholders under a heading that promises real
 * photography.
 */
export function ToolLookInside({ tool }: { tool: ToolDetail }) {
  if (tool.previewImages.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.kicker}>Look inside</div>
      <div className={styles.grid}>
        {tool.previewImages.map((image, i) => (
          <CmsImage
            key={image.url ?? i}
            image={image.url ? { url: image.url, alt: image.alt ?? "" } : undefined}
            label={`Page ${i + 1}`}
            aspectRatio="3 / 4"
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        ))}
      </div>
    </section>
  );
}
