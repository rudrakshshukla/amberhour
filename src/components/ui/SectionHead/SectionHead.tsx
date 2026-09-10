import type { ReactNode } from "react";
import { Kicker } from "@/components/ui/Kicker/Kicker";
import styles from "./SectionHead.module.css";

export interface SectionHeadProps {
  kicker: string;
  headline: string;
  /** A link (or plain span, if the spec doesn't name a destination) on the right. */
  action?: ReactNode;
  /** Overrides the default 32–54px clamp — Notes uses a smaller 30–46px scale. */
  headlineClassName?: string;
}

export function SectionHead({ kicker, headline, action, headlineClassName }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 className={[styles.headline, headlineClassName].filter(Boolean).join(" ")}>
          {headline}
        </h2>
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
