import { Fragment } from "react";
import Link from "next/link";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * The hairline strip above a detail page's content: "Library · Tool 01 ·
 * Think" (Tool.dc.html), "Notes · Essay · 6 min" (Note.dc.html) — same
 * visual pattern, different crumbs, so it's one shared component rather
 * than one per page.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className={styles.strip}>
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && <span className={styles.separator}>·</span>}
          {item.href ? (
            <Link href={item.href} className={styles.crumb}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.crumb}>{item.label}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
