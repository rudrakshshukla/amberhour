import Link from "next/link";
import { FOOTER_ELSEWHERE_LINKS, FOOTER_WORK_LINKS } from "@/lib/nav";
import styles from "./Footer.module.css";

export interface FooterProps {
  /**
   * "home" adds the "Have a question? Good." line and "Send a note"
   * button next to the logo — the Home page only (README.md → Shared
   * footer). Defaults to the plain logo used everywhere else.
   */
  variant?: "default" | "home";
}

export function Footer({ variant = "default" }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="The Amber Hour — home"
        />
        {variant === "home" && (
          <>
            <p className={styles.question}>Have a question? Good.</p>
            <Link href="/contact" className={styles.sendNote}>
              Send a note
            </Link>
          </>
        )}
      </div>

      <div className={styles.columns}>
        <div className={styles.column}>
          <div className={styles.columnHeading}>The work</div>
          <div className={styles.columnLinks}>
            {FOOTER_WORK_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.columnHeading}>Elsewhere</div>
          <div className={styles.columnLinks}>
            {FOOTER_ELSEWHERE_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
