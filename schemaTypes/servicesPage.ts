import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page Settings",
  type: "document",
  fields: [
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
  ],
});
