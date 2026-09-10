import { Header } from "@/components/Header/Header";
import { Button } from "@/components/ui/Button/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder/ImagePlaceholder";
import styles from "./Hero.module.css";

/**
 * The Home page's header lives here, not in a shared layout: it's
 * visually embedded in the hero image (cream on a scrim), which only
 * makes sense in this one context (README.md → Home, "Hero").
 */
export function Hero() {
  return (
    <div className={styles.hero}>
      <ImagePlaceholder
        label="Full-bleed portrait — three-quarter, natural light"
        fill
        className={styles.image}
      />
      <div className={styles.topScrim} aria-hidden="true" />
      <Header variant="onHero" />
      <div className={styles.bottom}>
        <h1 className={styles.headline}>Think before you build.</h1>
        <div className={styles.bottomRow}>
          <p className={styles.copy}>
            Strategic counsel for people who want to build something of
            their own—but would prefer to think it through first.
          </p>
          <Button href="#think" tone="cream" className={styles.cta}>
            Start thinking
          </Button>
        </div>
      </div>
    </div>
  );
}
