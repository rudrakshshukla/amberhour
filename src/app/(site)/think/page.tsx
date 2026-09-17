import type { Metadata } from "next";
import { PillarPage } from "@/components/pillar/PillarPage";

export const metadata: Metadata = {
  title: "Think",
  description: "Before the answer, there is usually a better question.",
};

export default function ThinkPage() {
  return <PillarPage pillar="think" />;
}
