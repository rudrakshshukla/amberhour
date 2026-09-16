import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead/SectionHead";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder/ImagePlaceholder";
import { getHomeTools } from "@/sanity/lib/queries";
import type { HomeContent } from "@/lib/home-content";
import styles from "./LibraryPreview.module.css";

export async function LibraryPreview({ content }: { content: HomeContent["library"] }) {
  const tools = await getHomeTools();

  return (
    <section id="library" className={styles.section}>
      <SectionHead
        kicker={content.kicker}
        headline={content.headline}
        action={<TextLink href="/library">{content.linkLabel}</TextLink>}
      />
      <div className={styles.grid}>
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/library/${tool.slug}`} className={styles.card}>
            {tool.coverImageUrl ? (
              <div className={styles.cover}>
                <Image
                  src={tool.coverImageUrl}
                  alt={tool.coverImageAlt ?? ""}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <ImagePlaceholder label="Tool cover" height="220px" className={styles.cover} />
            )}
            <div className={styles.cardBody}>
              <div className={`${styles.cardKicker} tabular-nums`}>
                {String(tool.number).padStart(2, "0")} · {tool.pillar}
              </div>
              <h3 className={styles.cardTitle}>{tool.title}</h3>
              <p className={styles.cardSummary}>{tool.summary}</p>
              <div className={styles.cardFooter}>
                <span className={`${styles.price} tabular-nums`}>
                  {tool.priceGBP !== undefined ? `£${tool.priceGBP}` : "£00"}
                </span>
                <span className={styles.view}>View</span>
              </div>
            </div>
          </Link>
        ))}
        <div className={styles.placeholderCard}>
          <div className={styles.placeholderText}>{content.moreText}</div>
          <Link href="/contact" className={styles.placeholderLink}>
            {content.moreLinkLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
