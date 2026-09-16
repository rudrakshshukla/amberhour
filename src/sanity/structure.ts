import type { StructureResolver } from "sanity/structure";

/** One-of-a-kind documents: pinned at the top, never listed or created as many. */
export const SINGLETONS = [
  { type: "homePage", title: "Home page" },
  { type: "siteSettings", title: "Site settings" },
] as const;

export const SINGLETON_TYPES = new Set<string>(SINGLETONS.map((s) => s.type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map(({ type, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type).title(title))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLETON_TYPES.has(item.getId() ?? "")),
    ]);
