import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("About Section")
        .id("aboutSingleton")
        .child(S.document().schemaType("about").documentId("michael-picard")),
      S.listItem()
        .title("Contact Page")
        .id("contactPageSingleton")
        .child(S.document().schemaType("contactPage").documentId("contact-page")),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "about" && item.getId() !== "contactPage",
      ),
    ]);
