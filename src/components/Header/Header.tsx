"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PILLAR_LINKS, WORK_WITH_ME_LINK } from "@/lib/nav";
import styles from "./Header.module.css";

export interface HeaderProps {
  /**
   * "onHero" drops the background/border and switches logo + links to
   * cream. It renders in normal flow (not absolutely positioned) — the
   * Home page's Hero section places it as its own first child, on top of
   * the hero image only because that image is itself absolutely
   * positioned behind it. Defaults to the standalone bar used on every
   * other page.
   */
  variant?: "default" | "onHero";
  /**
   * Bag line count. The spec shows this only on Library and Tool pages,
   * once the bag exists (build stage 5, Stripe/Razorpay). Omit to hide
   * it entirely, which is every page for now.
   */
  bagCount?: number;
}

export function Header({ variant = "default", bagCount }: HeaderProps) {
  const pathname = usePathname();
  const showBag = typeof bagCount === "number";

  return (
    <header
      className={
        variant === "onHero" ? `${styles.header} ${styles.onHero}` : styles.header
      }
    >
      <Link href="/" className={styles.logo} aria-label="The Amber Hour — home" />

      <nav className={styles.nav} aria-label="Primary">
        {PILLAR_LINKS.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={isActive ? styles.active : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.actions}>
        {showBag && (
          <button type="button" className={`${styles.bag} tabular-nums`}>
            Bag ({bagCount})
          </button>
        )}
        <Link href={WORK_WITH_ME_LINK.href} className={styles.cta}>
          {WORK_WITH_ME_LINK.label}
        </Link>
      </div>
    </header>
  );
}
