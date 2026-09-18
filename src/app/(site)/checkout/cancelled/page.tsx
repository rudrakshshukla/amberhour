import type { Metadata } from "next";
import { CheckoutMessage } from "@/components/checkout/CheckoutMessage/CheckoutMessage";

export const metadata: Metadata = {
  title: "Checkout cancelled",
};

/** Stripe's cancel_url. The bag is left untouched — nothing was charged. */
export default function CheckoutCancelledPage() {
  return (
    <CheckoutMessage
      kicker="Checkout cancelled"
      headline="No charge went through."
      body="Whatever was in your bag is still there whenever you're ready."
      buttonLabel="Back to the library"
      buttonHref="/library"
    />
  );
}
