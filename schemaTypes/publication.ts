import { defineField, defineType } from "sanity";

export const publication = defineType({
  name: "publication",
  title: "Publications",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "year", title: "Year Published", type: "number" }),
    defineField({ name: "publisher", title: "Publisher", type: "string" }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "viewLink", title: "Default View Link", type: "url" }),
    defineField({ name: "buyLink", title: "Default Buy Link", type: "url" }),
    defineField({
      name: "editions",
      title: "Language Editions",
      description: "Optional language-specific cover and links. The frontend will switch by selected language.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  { title: "English", value: "english" },
                  { title: "German", value: "german" },
                  { title: "Spanish", value: "spanish" },
                  { title: "French", value: "french" },
                  { title: "Italian", value: "italian" },
                  { title: "Portuguese", value: "portuguese" },
                  { title: "Other", value: "other" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Language Label (Optional)",
              type: "string",
              description: "Shown in dropdown. Example: English (US), Deutsch, Espanol.",
            }),
            defineField({
              name: "coverImage",
              title: "Edition Cover Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "viewLink", title: "View Link", type: "url" }),
            defineField({ name: "buyLink", title: "Buy Link", type: "url" }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "language",
              media: "coverImage",
            },
            prepare(selection) {
              return {
                title: selection.title || "Language Edition",
                subtitle: selection.subtitle || "language",
                media: selection.media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(12),
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "year", media: "coverImage" },
  },
});
