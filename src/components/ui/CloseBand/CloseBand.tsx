import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./CloseBand.module.css";

export interface CloseBandProps {
  line: string;
  buttonLabel: string;
  buttonHref: string;
  /** Overrides the default 20ch (About.dc.html's close is 22ch). */
  maxWidth?: string;
  /** Overrides the default clamp(32px,4.4vw,60px) (About.dc.html's is …58px). */
  fontSize?: string;
}

/**
 * The centred closing band on the surface tint: a display-200 line plus
 * one solid button. Originally the pillar pages' "Tools for all of
 * this." → Library; About.dc.html reuses the identical pattern for its
 * own close → Work with me, just short enough to warrant sharing rather
 * than forking (README.md → "Pillar page"; "6. About").
 */
export function CloseBand({ line, buttonLabel, buttonHref, maxWidth, fontSize }: CloseBandProps) {
  const style: CSSProperties = { maxWidth, fontSize };
  return (
    <section className={styles.section}>
      <p className={styles.line} style={style}>
        {line}
      </p>
      <Button href={buttonHref} className={styles.button}>
        {buttonLabel}
      </Button>
    </section>
  );
}
