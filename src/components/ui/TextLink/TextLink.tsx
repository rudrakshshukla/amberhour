import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./TextLink.module.css";

export interface TextLinkProps {
  href: string;
  children: ReactNode;
  /** "cream" for use on the green/espresso sections. */
  tone?: "green" | "cream";
  className?: string;
}

/** The underlined, uppercase "Explore thinking" / "View" style link. */
export function TextLink({ href, children, tone = "green", className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={[styles.link, styles[tone], className].filter(Boolean).join(" ")}
    >
      {children}
    </Link>
  );
}
