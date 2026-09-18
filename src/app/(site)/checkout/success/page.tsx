"use client";

import { useEffect } from "react";
import { CheckoutMessage } from "@/components/checkout/CheckoutMessage/CheckoutMessage";
import { useCart } from "@/lib/cart/CartProvider";

/**
 * Stripe redirects here after a successful payment. Deliberately honest
 * rather than pretending to be a finished receipt page: the real
 * receipt (/receipt/[orderToken], HANDOFF-SPEC.md → "9. Receipt"),
 * signed download links, and the confirmation email all depend on the
 * webhook + order storage this build doesn't have yet (see the README
 * note on /api/checkout/route.ts). Replace this page when that lands.
 *
 * Client component only to clear the bag once the buyer lands here —
 * metadata for this route lives in the (site) layout's default title
 * template since a client page can't export it directly.
 */
export default function CheckoutSuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // Intentionally only on mount — clearing on every render would fight
    // the buyer if they navigate back here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CheckoutMessage
      kicker="Payment received"
      headline="Thank you — your payment went through."
      body={
        <>
          Automatic delivery isn&rsquo;t wired up on this site yet, so your download link isn&rsquo;t
          ready to send itself — hold onto your payment confirmation and reach out so it can be
          sent by hand for now.
        </>
      }
      buttonLabel="Get in touch"
      buttonHref="/contact"
    />
  );
}
