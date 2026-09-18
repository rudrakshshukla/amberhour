"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart/CartProvider";
import styles from "./BagPanel.module.css";

/**
 * The slide-over bag panel (HANDOFF-SPEC.md → "4. Tool page", "Bag":
 * "In the real build the bag is a slide-over panel from the right, not
 * an inline section. It opens on add-to-bag, and buying never leaves
 * the page until the gateway redirect."). Rendered once, globally, from
 * the root layout — every page's header bag button opens the same
 * instance, and Buy Now on the Tool page checks out through the same
 * `useCart().checkout()` this panel's button calls.
 *
 * GBP only for now: cart lines only carry the GBP price snapshot (see
 * CartProvider) since that's the only price the site's queries fetch
 * today. Multi-currency display is follow-up work alongside wiring
 * lib/checkout/currency.ts's gateway resolution into the tool queries.
 *
 * IMPORTANT: checkout here creates a real Stripe/Razorpay session once
 * API keys are configured, but nothing on the fulfilment side exists
 * yet (webhook, signed download links, receipt page, emails) — see the
 * README note on build stage 5. Don't point production keys at this
 * until that's built, or a buyer pays and gets nothing back.
 */
export function BagPanel() {
  const { lines, isOpen, close, remove, checkout, isCheckingOut, checkoutError } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const total = lines.reduce((sum, line) => sum + (line.priceGBP ?? 0), 0);

  return (
    <div className={styles.overlay} role="presentation" onClick={close}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <span>Your bag</span>
          <button type="button" className={styles.close} onClick={close}>
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyKicker}>Empty state</div>
            <p className={styles.emptyLine}>Nothing in the bag. Not necessarily a problem.</p>
            <Link href="/library" className={styles.emptyLink} onClick={close}>
              Browse the library
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.lines}>
              {lines.map((line) => (
                <div key={line.slug} className={styles.line}>
                  <div className={styles.thumb}>
                    {line.coverImageUrl && (
                      <Image
                        src={line.coverImageUrl}
                        alt={line.coverImageAlt ?? ""}
                        fill
                        sizes="64px"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className={styles.lineText}>
                    <div className={styles.lineTitle}>{line.title}</div>
                    <div className={styles.lineMeta}>Instant download</div>
                  </div>
                  <span className={`${styles.linePrice} tabular-nums`}>
                    {line.priceGBP !== undefined ? `£${line.priceGBP}` : "£00"}
                  </span>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => remove(line.slug)}
                    aria-label={`Remove ${line.title} from the bag`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={`${styles.total} tabular-nums`}>{`£${total}`}</span>
              </div>
              <button
                type="button"
                className={styles.checkout}
                onClick={checkout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Redirecting…" : "Checkout with Stripe"}
              </button>
              {checkoutError && <p className={styles.error}>{checkoutError}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
