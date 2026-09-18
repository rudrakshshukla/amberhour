"use client";

import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import { Button } from "@/components/ui/Button/Button";
import { useCart } from "@/lib/cart/CartProvider";
import type { ToolDetail } from "@/sanity/lib/queries";
import styles from "./ToolHero.module.css";

/**
 * The Tool page hero: cover image left, info panel right (HANDOFF-SPEC.md
 * → "4. Tool page", "Hero"; Tool.dc.html lines 50–66).
 *
 * "Add to bag" adds the line and opens the bag panel; "Buy now" adds the
 * line and checks out immediately through the same `useCart().checkout()`
 * the bag panel's own button calls (see CartProvider.tsx for how the
 * just-added line reaches checkout() without a stale-state race). The
 * "Secure checkout by…" line is left static naming Stripe; the spec
 * calls for it to switch to Razorpay/UPI for Indian buyers once gateway
 * routing is wired into this page too (today only lib/checkout's
 * server-side routing knows about that).
 *
 * An "In progress" tool isn't linked from the Library index (LibraryRow
 * shows it greyed with "Soon", no link) — but this route still resolves
 * by direct URL, so it swaps the price/buttons for the same "Soon"
 * language rather than offering to sell something that isn't ready.
 */
export function ToolHero({ tool }: { tool: ToolDetail }) {
  const available = tool.status === "Available";
  const { add, open, checkout, isCheckingOut } = useCart();

  const cartLine = {
    kind: "tool" as const,
    slug: tool.slug,
    title: tool.title,
    priceGBP: tool.priceGBP,
    coverImageUrl: tool.coverImageUrl,
    coverImageAlt: tool.coverImageAlt,
  };

  function handleAddToBag() {
    add(cartLine);
    open();
  }

  function handleBuyNow() {
    add(cartLine);
    void checkout();
  }

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
              <Button type="button" onClick={handleAddToBag}>
                Add to bag
              </Button>
              <Button type="button" variant="outline" onClick={handleBuyNow} disabled={isCheckingOut}>
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
