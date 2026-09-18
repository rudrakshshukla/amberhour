import Razorpay from "razorpay";

/**
 * Razorpay order creation, ready to call once /api/checkout has a real
 * amount to charge in the buyer's routed currency (see currency.ts and
 * the big comment in app/api/checkout/route.ts on why that route stops
 * short of calling this today — cart lines only carry a GBP snapshot,
 * and charging that number as INR would just be wrong).
 *
 * Unlike Stripe Checkout, Razorpay doesn't hand back a hosted redirect
 * URL: the client takes this order's `id` and opens Razorpay's own
 * Checkout.js modal with it (their documented pattern — see
 * https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/).
 * That client-side piece is worth building and testing against real
 * Razorpay test keys once they exist, not blind.
 */
export function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export interface CreateRazorpayOrderInput {
  /** Smallest currency unit — paise for INR, matching Razorpay's own convention. */
  amountInSmallestUnit: number;
  currency: string;
  receipt: string;
}

export async function createRazorpayOrder({
  amountInSmallestUnit,
  currency,
  receipt,
}: CreateRazorpayOrderInput) {
  const client = getRazorpayClient();
  if (!client) {
    throw new Error("Razorpay isn't configured — set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.");
  }

  return client.orders.create({
    amount: amountInSmallestUnit,
    currency,
    receipt,
  });
}
