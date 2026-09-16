import { Kicker } from "@/components/ui/Kicker/Kicker";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import type { HomeContent } from "@/lib/home-content";
import styles from "./AboutPreview.module.css";

export function AboutPreview({ content }: { content: HomeContent["about"] }) {
  return (
    <section className={styles.section}>
      <CmsImage
        image={content.image}
        label="About — animated portrait (convert the supplied GIF to video, README.md → Performance)"
        aspectRatio="270 / 480"
        maxHeight="620px"
        sizes="(max-width: 700px) 100vw, 40vw"
        className={styles.media}
      />
      <div className={styles.text}>
        <Kicker>{content.kicker}</Kicker>
        <h2 className={styles.headline}>{content.headline}</h2>
        <div className={styles.beliefs}>
          {content.beliefs.map((belief, i) => (
            <div key={`${i}-${belief}`} className={styles.belief}>
              {belief}
            </div>
          ))}
        </div>
        <TextLink href="/about" className={styles.link}>
          {content.linkLabel}
        </TextLink>
      </div>
    </section>
  );
}
