import type { ReactNode } from "react";
import styles from "./Kicker.module.css";

export interface KickerProps {
  children: ReactNode;
  /** "cream" for use on the green/espresso sections. */
  tone?: "green" | "cream";
  className?: string;
}

export function Kicker({ children, tone = "green", className }: KickerProps) {
  return (
    <div
      className={[styles.kicker, styles[tone], "tabular-nums", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
