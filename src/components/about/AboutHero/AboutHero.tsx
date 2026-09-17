import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import { Kicker } from "@/components/ui/Kicker/Kicker";
import styles from "./AboutHero.module.css";

/**
 * About.dc.html lines 39–46. The left slot is a GIF in the design
 * (`assets/about.gif`) — CmsImage doesn't distinguish still/motion, so
 * it renders as a normal image slot; note this for whoever uploads it.
 */
export function AboutHero() {
  return (
    <section className={styles.hero}>
      <CmsImage
        label="About GIF — explaining the thinking behind a business question"
        aspectRatio="270 / 480"
        maxHeight="660px"
        sizes="(max-width: 700px) 100vw, 50vw"
      />
      <div className={styles.panel}>
        <Kicker>About</Kicker>
        <h1 className={styles.headline}>I&rsquo;m interested in what happens before people build.</h1>
        <p className={styles.body}>
          Not the business, launch, website or decision. The thinking that comes before any of
          them.
        </p>
      </div>
    </section>
  );
}
