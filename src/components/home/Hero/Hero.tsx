import { Header } from "@/components/Header/Header";
import { Button } from "@/components/ui/Button/Button";
import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import type { HomeContent } from "@/lib/home-content";
import styles from "./Hero.module.css";

/**
 * The Home page's header lives here, not in a shared layout: it's
 * visually embedded in the hero image (cream on a scrim), which only
 * makes sense in this one context (README.md → Home, "Hero").
 */
export function Hero({ content }: { content: HomeContent["hero"] }) {
  return (
    <div className={styles.hero}>
      <CmsImage
        image={content.image}
        label="Full-bleed portrait — three-quarter, natural light"
        fill
        priority
        className={styles.image}
      />
      <div className={styles.topScrim} aria-hidden="true" />
      <Header variant="onHero" />
      <div className={styles.bottom}>
        <h1 className={styles.headline}>{content.headline}</h1>
        <div className={styles.bottomRow}>
          <p className={styles.copy}>{content.copy}</p>
          <Button href="#think" tone="cream" className={styles.cta}>
            {content.ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
