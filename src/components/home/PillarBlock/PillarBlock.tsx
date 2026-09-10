import type { ReactNode } from "react";
import { Kicker } from "@/components/ui/Kicker/Kicker";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder/ImagePlaceholder";
import styles from "./PillarBlock.module.css";

export interface PillarBlockProps {
  id?: string;
  kicker: string;
  headline: string;
  /** Build's block has no paragraph — just the headline, then `extra`. */
  body?: string;
  linkLabel: string;
  linkHref: string;
  imageLabel: string;
  imageSide: "left" | "right";
  imageMinHeight?: string;
  /** Build's three-step arrow line. */
  extra?: ReactNode;
}

/** The Think / Decide / Build two-column blocks on the Home page. */
export function PillarBlock({
  id,
  kicker,
  headline,
  body,
  linkLabel,
  linkHref,
  imageLabel,
  imageSide,
  imageMinHeight = "min(58vh, 520px)",
  extra,
}: PillarBlockProps) {
  const image = (
    <ImagePlaceholder label={imageLabel} minHeight={imageMinHeight} className={styles.image} />
  );
  const text = (
    <div className={styles.text}>
      <Kicker>{kicker}</Kicker>
      <h2 className={styles.headline}>{headline}</h2>
      {body && <p className={styles.body}>{body}</p>}
      {extra}
      <TextLink href={linkHref} className={styles.link}>
        {linkLabel}
      </TextLink>
    </div>
  );

  return (
    <section id={id} className={styles.section}>
      {imageSide === "left" ? (
        <>
          {image}
          {text}
        </>
      ) : (
        <>
          {text}
          {image}
        </>
      )}
    </section>
  );
}
