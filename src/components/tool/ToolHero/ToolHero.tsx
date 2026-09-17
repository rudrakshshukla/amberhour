import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import { Button } from "@/components/ui/Button/Button";
import type { ToolDetail } from "@/sanity/lib/queries";
import styles from "./ToolHero.module.css";

/**
 * The Tool page hero: cover image left, info panel right (HANDOFF-SPEC.md
 * → "4. Tool page", "Hero"; Tool.dc.html lines 50–66).
 *
 * "Add to bag" and "Buy now" render as inert buttons — the bag and
 * checkout flow are build stage 5 (payments), not built yet, and the
 * spec's own note on the Bag section says the real bag is a slide-over
 * panel, not an inline one. The "Secure checkout by…" line is left
 * static naming Stripe; the spec calls for it to switch to Razorpay/UPI
 * for Indian buyers once gateway routing exists (stage 5), which isn't
 * something to fake here.
 *
 * An "In progress" tool isn't linked from the Library index (LibraryRow
 * shows it greyed with "Soon", no link) — but this route still resolves
 * by direct URL, so it swaps the price/buttons for the same "Soon"
 * language rather than offering to sell something that isn't ready.
 */
export function ToolHero({ tool }: { tool: ToolDetail }) {
  const available = tool.status === "Available";

  return (
    <section className={styles.hero}>
      <CmsImage
        image={
          tool.coverImageUrl ? { url: tool.coverImageUrl, alt: tool.coverImageAlt ?? "" } : undefined
        }
        label={`Tool cover — ${tool.title}`}
        aspectRatio="4 / 3"
        sizes="(max-width: 700px) 100vw, 50vw"
        className={styles.cover}
      />
      <div className={styles.panel}>
        <div className={`${styles.eyebrow} tabular-nums`}>
          {`Tool ${String(tool.number).padStart(2, "0")} · ${tool.pillar}`}
        </div>
        <h1 className={styles.title}>{tool.title}</h1>
        <p className={styles.summary}>{tool.summary}</p>
        {available ? (
          <>
            <div className={styles.priceRow}>
              <span className={`${styles.price} tabular-nums`}>
                {tool.priceGBP !== undefined ? `£${tool.priceGBP}` : "£00"}
              </span>
              <span className={styles.instant}>Instant download</span>
            </div>
            <div className={styles.actions}>
              <Button type="button">Add to bag</Button>
              <Button type="button" variant="outline">
                Buy now
              </Button>
            </div>
            <p className={styles.secure}>Secure checkout by Stripe. Card, Apple Pay, Google Pay.</p>
          </>
        ) : (
          <div className={styles.soonRow}>
            <span className={styles.soon}>Soon</span>
          </div>
        )}
      </div>
    </section>
  );
}
