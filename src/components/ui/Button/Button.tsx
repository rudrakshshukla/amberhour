import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Common = {
  variant?: "solid" | "outline";
  /** "cream" for use on the green/espresso sections. */
  tone?: "green" | "cream";
  className?: string;
};

type AsLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };
type AsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = AsLink | AsButton;

/** Solid and outlined buttons, in the green or cream tone the section needs. */
export function Button(props: ButtonProps) {
  const { variant = "solid", tone = "green", className, ...rest } = props;
  const classes = [styles.button, styles[variant], styles[tone], className]
    .filter(Boolean)
    .join(" ");

  if (rest.href) {
    const { href, ...anchorRest } = rest as AsLink;
    return <Link href={href} className={classes} {...anchorRest} />;
  }

  const { href: _omit, type, ...buttonRest } = rest as AsButton;
  void _omit;
  return <button type={type ?? "button"} className={classes} {...buttonRest} />;
}
