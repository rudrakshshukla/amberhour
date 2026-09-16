import type { CSSProperties } from "react";
import Image from "next/image";
import type { CmsImage as CmsImageData } from "@/lib/home-content";
import {
  ImagePlaceholder,
  type ImagePlaceholderProps,
} from "@/components/ui/ImagePlaceholder/ImagePlaceholder";
import styles from "./CmsImage.module.css";

export interface CmsImageProps extends ImagePlaceholderProps {
  /** Uploaded in the Studio. Until then, the labelled placeholder renders instead. */
  image?: CmsImageData;
  sizes?: string;
  priority?: boolean;
}

/** A real image slot: the owner's upload if there is one, otherwise the placeholder. */
export function CmsImage({
  image,
  sizes = "100vw",
  priority,
  ...placeholder
}: CmsImageProps) {
  if (!image) return <ImagePlaceholder {...placeholder} />;

  const { aspectRatio, minHeight, maxHeight, height, fill, className } = placeholder;
  const style: CSSProperties = { aspectRatio, minHeight, maxHeight, height };

  return (
    <div
      className={[styles.frame, fill ? styles.fill : "", className].filter(Boolean).join(" ")}
      style={style}
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", objectPosition: image.position ?? "center" }}
      />
    </div>
  );
}
