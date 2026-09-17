import { Kicker } from "@/components/ui/Kicker/Kicker";
import { PortableTextBody } from "@/components/ui/PortableTextBody/PortableTextBody";
import type { ToolDetail } from "@/sanity/lib/queries";
import styles from "./ToolWhatItIs.module.css";

/**
 * Renders `tool.description` (schema: 'the "What it is" block'). Note:
 * Tool.dc.html and the HANDOFF-SPEC.md page breakdown for the Tool page
 * don't show a section for this field at all — the mockup jumps straight
 * from the hero to "What's inside". This is a real, owner-authored,
 * required field with nowhere else to go, so it renders here, right
 * after the hero, rather than being silently dropped. Flagging as a
 * design/schema gap rather than matching the mockup's section list
 * exactly.
 */
export function ToolWhatItIs({ tool }: { tool: ToolDetail }) {
  return (
    <section className={styles.section}>
      <Kicker>What it is</Kicker>
      <div className={styles.body}>
        <PortableTextBody value={tool.description} />
      </div>
    </section>
  );
}
