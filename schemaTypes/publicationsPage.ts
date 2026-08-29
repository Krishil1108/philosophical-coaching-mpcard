import { defineField, defineType } from "sanity";

export const publicationsPage = defineType({
  name: "publicationsPage",
  title: "Publications Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "forthcomingText",
      title: "Forthcoming Text",
      type: "string",
      description: "Text for the forthcoming section (e.g. 'Two translations of Gerd Achenbach...')"
    }),
    defineField({
      name: "quoteContext",
      title: "Quote Context/Label",
      type: "string",
      description: "Small uppercase label above the quote (e.g., 'Philosophical Practice — Foundational Principles')."
    }),
    defineField({
      name: "quoteText",
      title: "Quote Text",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "quoteAuthor",
      title: "Quote Author",
      type: "string"
    }),
    defineField({
      name: "quoteSource",
      title: "Quote Source/Book",
      type: "string"
    }),
    defineField({
      name: "quotePublisher",
      title: "Quote Publisher Info",
      type: "string",
      description: "E.g., 'Bloomsbury, 2024'."
    }),
    defineField({
      name: "philPeopleLabel",
      title: "PhilPeople Label",
      type: "string",
      description: "Side label shown vertically (e.g. 'PhilPapers')."
    }),
    defineField({
      name: "philPeopleCategory",
      title: "PhilPeople Category",
      type: "string",
      description: "Small uppercase label (e.g. 'Academic Work')."
    }),
    defineField({
      name: "philPeopleTitle",
      title: "PhilPeople Section Title",
      type: "string",
      description: "Title (e.g. 'Scholarly Publications')."
    }),
    defineField({
      name: "philPeopleDesc",
      title: "PhilPeople Section Description",
      type: "text",
      rows: 4
    }),
  ]
});
