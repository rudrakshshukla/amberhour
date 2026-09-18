import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./CheckoutMessage.module.css";

export interface CheckoutMessageProps {
  kicker: string;
  headline: string;
  body: ReactNode;
  buttonLabel: string;
  buttonHref: string;
}

/** Shared layout for the honest success/cancelled placeholders. */
export function CheckoutMessage({ kicker, headline, body, buttonLabel, buttonHref }: CheckoutMessageProps) {
  return (
    <section className={styles.section}>
      <div className={styles.kicker}>{kicker}</div>
      <h1 className={styles.headline}>{headline}</h1>
      <p className={styles.body}>{body}</p>
      <div className={styles.action}>
        <Button href={buttonHref}>{buttonLabel}</Button>
      </div>
    </section>
  );
}
