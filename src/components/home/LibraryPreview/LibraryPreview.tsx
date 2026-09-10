import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead/SectionHead";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder/ImagePlaceholder";
import { PLACEHOLDER_TOOLS } from "@/lib/placeholder-content";
import styles from "./LibraryPreview.module.css";

export function LibraryPreview() {
  return (
    <section id="library" className={styles.section}>
      <SectionHead
        kicker="The library"
        headline="Things worth keeping nearby."
        action={<TextLink href="/library">All tools</TextLink>}
      />
      <div className={styles.grid}>
        {PLACEHOLDER_TOOLS.map((tool) => (
          <Link key={tool.slug} href={`/library/${tool.slug}`} className={styles.card}>
            <ImagePlaceholder label="Tool cover" height="220px" className={styles.cover} />
            <div className={styles.cardBody}>
              <div className={`${styles.cardKicker} tabular-nums`}>
                {tool.number} · {tool.pillar}
              </div>
              <h3 className={styles.cardTitle}>{tool.title}</h3>
              <p className={styles.cardSummary}>{tool.summary}</p>
              <div className={styles.cardFooter}>
                <span className={`${styles.price} tabular-nums`}>£00</span>
                <span className={styles.view}>View</span>
              </div>
            </div>
          </Link>
        ))}
        <div className={styles.placeholderCard}>
          <div className={styles.placeholderText}>More tools are being written.</div>
          <Link href="/contact" className={styles.placeholderLink}>
            Tell me what you need
          </Link>
        </div>
      </div>
    </section>
  );
}
