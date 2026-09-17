import Link from "next/link";
import styles from "./ToolBreadcrumb.module.css";

/**
 * "Library · Tool 01 · Think" strip above the hero (HANDOFF-SPEC.md →
 * "4. Tool page", "Breadcrumb"; Tool.dc.html line 48).
 */
export function ToolBreadcrumb({
  number,
  pillar,
}: {
  number: number;
  pillar: "Think" | "Decide" | "Build";
}) {
  return (
    <div className={styles.strip}>
      <Link href="/library" className={styles.crumb}>
        Library
      </Link>
      <span className={styles.separator}>·</span>
      <span className={styles.crumb}>{`Tool ${String(number).padStart(2, "0")}`}</span>
      <span className={styles.separator}>·</span>
      <Link href={`/${pillar.toLowerCase()}`} className={styles.crumb}>
        {pillar}
      </Link>
    </div>
  );
}
