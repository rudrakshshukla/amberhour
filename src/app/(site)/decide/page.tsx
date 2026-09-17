import type { Metadata } from "next";
import { PillarPage } from "@/components/pillar/PillarPage";

export const metadata: Metadata = {
  title: "Decide",
  description: "Clarity is useful. Decisions are better.",
};

export default function DecidePage() {
  return <PillarPage pillar="decide" />;
}
