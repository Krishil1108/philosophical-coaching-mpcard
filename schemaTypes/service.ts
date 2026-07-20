import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Service Title", type: "string" }),
    defineField({ name: "icon", title: "Icon (emoji or SVG name)", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "price", title: "Price Range", type: "string" }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "features", title: "Features List", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "showWhatToExpect",
      title: "Show 'What to Expect' Section",
      type: "boolean",
      initialValue: true,
      description: "Toggle this off to hide the What to Expect section for this service."
    }),
    defineField({
      name: "whatToExpect",
      title: "What to Expect (Process)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "n", title: "Number (e.g. 01)", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Description", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
    defineField({ name: "ctaText", title: "CTA Button Text", type: "string" }),
    defineField({ name: "ctaLink", title: "CTA Button Link", type: "string" }),
    defineField({ name: "featured", title: "Featured (highlighted)", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
