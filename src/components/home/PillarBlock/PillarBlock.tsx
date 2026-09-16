import type { ReactNode } from "react";
import { Kicker } from "@/components/ui/Kicker/Kicker";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import type { CmsImage as CmsImageData } from "@/lib/home-content";
import styles from "./PillarBlock.module.css";

export interface PillarBlockProps {
  id?: string;
  kicker: string;
  headline: string;
  /** Build's block has no paragraph — just the headline, then `extra`. */
  body?: string;
  linkLabel: string;
  linkHref: string;
  /** Placeholder caption, shown until an image is uploaded. */
  imageLabel: string;
  image?: CmsImageData;
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
  image: imageData,
  imageSide,
  imageMinHeight = "min(58vh, 520px)",
  extra,
}: PillarBlockProps) {
  const image = (
    <CmsImage
      image={imageData}
      label={imageLabel}
      minHeight={imageMinHeight}
      sizes="(max-width: 800px) 100vw, 50vw"
      className={styles.image}
    />
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
