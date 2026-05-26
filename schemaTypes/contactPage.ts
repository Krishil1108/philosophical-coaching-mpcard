import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "pageHeaderLabel", title: "Page Header Label", type: "string" }),
    defineField({ name: "pageHeaderTitle", title: "Page Header Title", type: "string" }),
    defineField({ name: "pageHeaderSubtitle", title: "Page Header Subtitle", type: "text", rows: 3 }),
    defineField({
      name: "options",
      title: "Contact Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "num", title: "Display Number", type: "string" }),
            defineField({ name: "platform", title: "Platform Label", type: "string" }),
            defineField({ name: "title", title: "Option Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "cta", title: "CTA Text", type: "string" }),
            defineField({ name: "href", title: "CTA Link", type: "string" }),
            defineField({ name: "external", title: "Open in New Tab", type: "boolean" }),
            defineField({ name: "featured", title: "Featured (highlighted)", type: "boolean" }),
          ],
        },
      ],
    }),
    defineField({ name: "firstSessionLabel", title: "First Session Label", type: "string" }),
    defineField({ name: "firstSessionTitle", title: "First Session Title", type: "string" }),
    defineField({ name: "firstSessionBody", title: "First Session Body", type: "text", rows: 4 }),
    defineField({
      name: "firstSessionPoints",
      title: "First Session Points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "firstSessionNote", title: "First Session Note", type: "text", rows: 2 }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page Content" };
    },
  },
});
