import styles from "./StatusLine.module.css";

export interface StatusLineProps {
  statusLine: string;
  issueLabel: string;
}

/**
 * Shared status strip: the owner's `statusLine` on the left, `issueLabel`
 * on the right. Plain text — it never ticks or animates (README.md).
 */
export function StatusLine({ statusLine, issueLabel }: StatusLineProps) {
  return (
    <div className={styles.statusLine}>
      <span>{statusLine}</span>
      <span className="tabular-nums">{issueLabel}</span>
    </div>
  );
}
