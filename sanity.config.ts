import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset, apiVersion } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure, SINGLETON_TYPES } from "./src/sanity/structure";
import { FillDefaultsAction } from "./src/sanity/actions/FillDefaultsAction";

// Singletons can only be edited and published — not created, duplicated or deleted.
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "The Amber Hour",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    // GROQ playground — useful while building, harmless to leave in.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
  document: {
    // Singleton templates stay registered (they carry the initial values) but
    // never appear in the global "Create new" menu.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter(({ templateId }) => !SINGLETON_TYPES.has(templateId))
        : prev,
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? [
            ...actions.filter(({ action }) => action && SINGLETON_ACTIONS.has(action)),
            FillDefaultsAction,
          ]
        : actions,
  },
});
