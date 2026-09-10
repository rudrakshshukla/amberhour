import type { StructureResolver } from "sanity/structure";

/**
 * Pins `siteSettings` as a single editable document (no "create new", no
 * list of many) at the top, above the regular content-type lists.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "siteSettings"
      ),
    ]);
