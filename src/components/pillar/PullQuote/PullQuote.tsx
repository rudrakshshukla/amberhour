import type { CSSProperties } from "react";
import styles from "./PullQuote.module.css";

export interface PullQuoteProps {
  children: string;
  /** Overrides the default 24ch (Work-With-Me.dc.html's tone line is 30ch, not 24ch). */
  maxWidth?: string;
  /** Overrides the default clamp(28px,3.8vw,50px). */
  fontSize?: string;
}

/**
 * Centred italic quote on the estate-green ground — used as the pillar
 * pages' pull quote and, with size overrides, as the "tone line" band
 * that recurs on other screens (README.md → "Pillar page"; Work-With-
 * Me.dc.html's tone line is the same visual pattern at a different size).
 */
export function PullQuote({ children, maxWidth, fontSize }: PullQuoteProps) {
  const style: CSSProperties = { maxWidth, fontSize };
  return (
    <section className={styles.section}>
      <p className={styles.quote} style={style}>
        {children}
      </p>
    </section>
  );
}
