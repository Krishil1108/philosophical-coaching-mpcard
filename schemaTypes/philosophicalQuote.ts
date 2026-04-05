import { defineField, defineType } from "sanity";

export const philosophicalQuote = defineType({
  name: "philosophicalQuote",
  title: "Philosophical Quotes",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source/Book",
      type: "string",
      description: 'E.g., "Philosophical Praxis"',
    }),
    defineField({
      name: "publisher",
      title: "Publisher Info",
      type: "string",
      description: 'E.g., "Bloomsbury, 2024"',
    }),
    defineField({
      name: "context",
      title: "Context/Theme",
      type: "string",
      description: 'E.g., "Foundational Principles", "Philosophical Dialogue"',
    }),
    defineField({
      name: "usedOnPages",
      title: "Used on Pages",
      type: "array",
      of: [{
        type: "string",
        options: {
          list: [
            { title: "Homepage", value: "homepage" },
            { title: "About", value: "about" },
            { title: "Practice", value: "practice" },
            { title: "Services", value: "services" },
            { title: "Publications", value: "publications" },
            { title: "Videos", value: "videos" },
          ],
        },
      }],
    }),
    defineField({
      name: "active",
      title: "Active/Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "context",
      description: "quote",
    },
    prepare({ title, subtitle, description }) {
      return {
        title: `${title}`,
        subtitle: subtitle || "Quote",
        description: description.length > 60 ? description.substring(0, 60) + "..." : description,
      };
    },
  },
});