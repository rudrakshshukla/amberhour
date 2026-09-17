import type { Metadata } from "next";
import { PillarPage } from "@/components/pillar/PillarPage";

export const metadata: Metadata = {
  title: "Build",
  description: "Ideas are lovely. Useful ideas are better.",
};

export default function BuildPage() {
  return <PillarPage pillar="build" />;
}
