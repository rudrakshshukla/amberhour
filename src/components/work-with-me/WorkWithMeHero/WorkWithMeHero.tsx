import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import { Kicker } from "@/components/ui/Kicker/Kicker";
import { Button } from "@/components/ui/Button/Button";
import styles from "./WorkWithMeHero.module.css";

/** Work-With-Me.dc.html lines 44–51. */
export function WorkWithMeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.panel}>
        <Kicker>Work with me</Kicker>
        <h1 className={styles.headline}>Some problems are better solved together.</h1>
        <p className={styles.body}>
          Strategic counsel for people building something of their own. Bring the messy version;
          that is usually the useful one.
        </p>
        <Button href="#enquiry" className={styles.cta}>
          Start a conversation
        </Button>
      </div>
      <CmsImage
        label="Portrait — seated, in conversation"
        aspectRatio="3 / 4"
        maxHeight="660px"
        sizes="(max-width: 700px) 100vw, 50vw"
      />
    </section>
  );
}
