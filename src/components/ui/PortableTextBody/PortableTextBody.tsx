import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@sanity/types";
import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import { urlForImage } from "@/sanity/lib/image";
import styles from "./PortableTextBody.module.css";

/**
 * The shared portable-text renderer for the two rich-text fields in the
 * schema: `tool.description` (plain blocks only) and `note.body`
 * (blocks, a pull-quote object, and inline images — README.md → Content
 * management → Schema, "note", "Portable text needs a pull-quote block
 * type and an image block. Nothing else.").
 *
 * Typography follows the Note page spec (README.md → "Note —
 * /notes/[slug]", "Body"): 18px/1.75 paragraphs, hairline + display h2
 * for section breaks, italic emphasis (never bold), and an indented
 * italic pull quote.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={styles.paragraph}>{children}</p>,
    h2: ({ children }) => (
      <>
        <hr className={styles.rule} />
        <h2 className={styles.heading}>{children}</h2>
      </>
    ),
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
  },
  types: {
    pullQuote: ({ value }: { value: { text: string } }) => (
      <blockquote className={styles.pullQuote}>{value.text}</blockquote>
    ),
    image: ({ value }: { value: SanityImageSource & { alt?: string } }) => {
      const url = urlForImage(value)?.width(1200).url();
      if (!url) return null;
      return (
        <CmsImage
          image={{ url, alt: value.alt ?? "" }}
          label="Inline image"
          aspectRatio="16 / 9"
          sizes="(max-width: 800px) 100vw, 64ch"
          className={styles.image}
        />
      );
    },
  },
};

export function PortableTextBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className={styles.body}>
      <PortableText value={value} components={components} />
    </div>
  );
}
