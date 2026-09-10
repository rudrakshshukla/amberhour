import { Kicker } from "@/components/ui/Kicker/Kicker";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder/ImagePlaceholder";
import styles from "./AboutPreview.module.css";

const BELIEFS = [
  "You don't need to scale everything.",
  "Being busy is not a strategy.",
  "Stopping can be progress.",
];

export function AboutPreview() {
  return (
    <section className={styles.section}>
      <ImagePlaceholder
        label="About — animated portrait (convert the supplied GIF to video, README.md → Performance)"
        aspectRatio="270 / 480"
        maxHeight="620px"
        className={styles.media}
      />
      <div className={styles.text}>
        <Kicker>About</Kicker>
        <h2 className={styles.headline}>
          I&apos;m interested in what happens before people build.
        </h2>
        <div className={styles.beliefs}>
          {BELIEFS.map((belief) => (
            <div key={belief} className={styles.belief}>
              {belief}
            </div>
          ))}
        </div>
        <TextLink href="/about" className={styles.link}>
          More about me
        </TextLink>
      </div>
    </section>
  );
}
