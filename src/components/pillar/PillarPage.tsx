import { Kicker } from "@/components/ui/Kicker/Kicker";
import { CmsImage } from "@/components/ui/CmsImage/CmsImage";
import { PillarBlock } from "@/components/home/PillarBlock/PillarBlock";
import { PillarList } from "@/components/pillar/PillarList/PillarList";
import { PullQuote } from "@/components/pillar/PullQuote/PullQuote";
import { PillarClose } from "@/components/pillar/PillarClose/PillarClose";
import { PILLARS, crossLinksFor, type PillarId } from "@/lib/pillar-content";
import styles from "./PillarPage.module.css";

/**
 * The shared Think / Decide / Build template — one component, three
 * routes (README.md → "Pillar page — /think, /decide, /build", "One
 * template, three routes. Only the kicker, headline, pillar list and
 * tools change").
 */
export function PillarPage({ pillar }: { pillar: PillarId }) {
  const data = PILLARS[pillar];
  const crossLinks = crossLinksFor(pillar);

  return (
    <>
      <section className={styles.hero}>
        <Kicker>{data.kicker}</Kicker>
        <h1 className={styles.headline}>{data.headline}</h1>
        <p className={styles.body}>{data.body}</p>
      </section>

      <CmsImage
        image={data.heroImage}
        label={data.heroImageLabel}
        aspectRatio="21 / 8"
        sizes="100vw"
        className={styles.bleed}
      />

      <PillarList kicker={data.list.kicker} headline={data.list.headline} items={data.list.items} />

      <PullQuote>{data.pullQuote}</PullQuote>

      {crossLinks.map((link, i) => (
        <PillarBlock
          key={link.pillar}
          kicker={link.kicker}
          headline={link.headline}
          body={link.body}
          linkLabel={link.linkLabel}
          linkHref={`/${link.pillar}`}
          imageLabel={link.imageLabel}
          imageSide={i % 2 === 0 ? "left" : "right"}
          imageMinHeight="min(46vh, 420px)"
          extra={
            link.chips && (
              <div className={styles.chips}>
                {link.chips.map((chip) => (
                  <span key={chip} className={styles.chip}>
                    {chip}
                  </span>
                ))}
              </div>
            )
          }
        />
      ))}

      <PillarClose />
    </>
  );
}
