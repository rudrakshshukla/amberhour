"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Keeps sanity.config.ts (and everything it pulls in — `sanity`,
// `@sanity/vision`) strictly client-bundled. Importing it from a Server
// Component file breaks the build: those packages assume a browser
// context and aren't written for the RSC "react-server" condition.
export default function StudioPage() {
  return <NextStudio config={config} />;
}
