"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * One line in the bag. Client-side only, `localStorage`-backed
 * (HANDOFF-SPEC.md → "Interactions & behaviour": "Bag state is
 * client-side (localStorage), lines are {toolId | bundleId, qty: 1}").
 *
 * A digital one-off download doesn't have a meaningful "quantity" —
 * adding an already-present tool is a no-op rather than incrementing —
 * so this only stores presence, not qty. Bundles (build stage 7) will
 * add `kind: "bundle"` here without changing the shape.
 *
 * The line snapshots the display fields (title, price, cover) at
 * add-time so the bag panel can render without a second fetch. Prices
 * are GBP only for now — see lib/checkout/currency.ts for why.
 */
export interface CartLine {
  kind: "tool";
  slug: string;
  title: string;
  priceGBP?: number;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (line: CartLine) => void;
  remove: (slug: string) => void;
  clear: () => void;
  /** Posts the current bag to /api/checkout and redirects on success. */
  checkout: () => Promise<void>;
  isCheckingOut: boolean;
  checkoutError: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "amberhour:bag";

function readStoredLines(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupt or inaccessible storage (private browsing, quota, etc.) —
    // start with an empty bag rather than throwing.
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Mirrors `lines`, updated synchronously inside the same setState call
  // that changes `lines` (see `mutate` below) — not via a useEffect keyed
  // on `lines`, which would lag a render behind. `checkout()` reads this
  // so "Buy now" (add() immediately followed by checkout()) sees the
  // just-added line instead of the state from before that render.
  const linesRef = useRef<CartLine[]>([]);

  // Read localStorage only after mount — it isn't available during SSR,
  // and reading it during the initial render would also mismatch the
  // server-rendered HTML. This is the standard exception to "avoid
  // setState in an effect": syncing from a client-only source
  // (localStorage) that the server literally cannot see.
  useEffect(() => {
    const initial = readStoredLines();
    linesRef.current = initial;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(initial);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage full or unavailable — the bag still works for this tab,
      // it just won't persist across a reload.
    }
  }, [lines, hydrated]);

  const mutate = useCallback((updater: (prev: CartLine[]) => CartLine[]) => {
    setLines((prev) => {
      const next = updater(prev);
      linesRef.current = next;
      return next;
    });
  }, []);

  const add = useCallback(
    (line: CartLine) => {
      mutate((prev) => (prev.some((l) => l.slug === line.slug) ? prev : [...prev, line]));
    },
    [mutate]
  );

  const remove = useCallback(
    (slug: string) => {
      mutate((prev) => prev.filter((l) => l.slug !== slug));
    },
    [mutate]
  );

  const clear = useCallback(() => mutate(() => []), [mutate]);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const checkout = useCallback(async () => {
    setIsCheckingOut(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: linesRef.current }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCheckoutError(data.error ?? "Checkout isn't set up yet.");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      // Razorpay returns order details instead of a redirect URL — the
      // client opens Razorpay's own checkout modal with them. Left as a
      // clear error rather than a half-working modal until there are
      // real Razorpay test keys to build and verify this against.
      setCheckoutError(
        "Razorpay checkout needs its client-side modal wired up once test keys are in place."
      );
    } catch {
      setCheckoutError("Something went wrong reaching checkout. Try again in a moment.");
    } finally {
      setIsCheckingOut(false);
    }
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.length,
      isOpen,
      open,
      close,
      add,
      remove,
      clear,
      checkout,
      isCheckingOut,
      checkoutError,
    }),
    [lines, isOpen, open, close, add, remove, clear, checkout, isCheckingOut, checkoutError]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
