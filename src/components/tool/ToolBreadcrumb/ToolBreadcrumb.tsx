import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";

/**
 * "Library · Tool 01 · Think" strip above the hero (HANDOFF-SPEC.md →
 * "4. Tool page", "Breadcrumb"; Tool.dc.html line 48).
 */
export function ToolBreadcrumb({
  number,
  pillar,
}: {
  number: number;
  pillar: "Think" | "Decide" | "Build";
}) {
  return (
    <Breadcrumb
      items={[
        { label: "Library", href: "/library" },
        { label: `Tool ${String(number).padStart(2, "0")}` },
        { label: pillar, href: `/${pillar.toLowerCase()}` },
      ]}
    />
  );
}
