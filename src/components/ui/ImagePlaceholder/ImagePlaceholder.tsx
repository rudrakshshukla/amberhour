import type { CSSProperties } from "react";
import styles from "./ImagePlaceholder.module.css";

export interface ImagePlaceholderProps {
  /** What real image goes here, and any notes on framing — shown as the caption. */
  label: string;
  aspectRatio?: string;
  minHeight?: string;
  maxHeight?: string;
  height?: string;
  /** Fills its positioned parent (`position: absolute; inset: 0`) instead of sizing itself. */
  fill?: boolean;
  className?: string;
}

/**
 * Every image in the design is a drop-target placeholder until the owner
 * supplies real photography/illustration (README.md → Fidelity). This
 * renders a real image slot at the right aspect ratio and says what
 * belongs there, rather than reproducing the design tool's own preview
 * chrome.
 */
export function ImagePlaceholder({
  label,
  aspectRatio,
  minHeight,
  maxHeight,
  height,
  fill,
  className,
}: ImagePlaceholderProps) {
  const style: CSSProperties = { aspectRatio, minHeight, maxHeight, height };

  return (
    <div
      className={[styles.placeholder, fill ? styles.fill : "", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
      role="img"
      aria-label={label}
    >
      <span className={styles.label}>{label}</span>
    </div>
  );
}
