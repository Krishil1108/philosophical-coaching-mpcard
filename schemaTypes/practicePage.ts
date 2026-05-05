import { defineField, defineType } from "sanity";

export const practiceMethod = defineType({
  name: "practiceMethod",
  title: "Practice Method",
  type: "object",
  fields: [
    defineField({ name: "num", title: "Roman Numeral", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "name", title: "Method Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "short", title: "Short Line", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Description", type: "text", rows: 6, validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "num",
    },
  },
});

export const practicePage = defineType({
  name: "practicePage",
  title: "Practice Page",
  type: "document",
  fields: [
    defineField({ name: "headerLabel", title: "Header Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "headerTitle", title: "Header Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "headerSubtitle",
      title: "Header Subtitle",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "openingStatement",
      title: "Opening Statement",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "openingTags",
      title: "Opening Tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "approachLabel", title: "Approach Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "approachQuote",
      title: "Approach Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "approachCite", title: "Approach Citation", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "methods",
      title: "Methods",
      type: "array",
      of: [{ type: "practiceMethod" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "ctaTitle", title: "CTA Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "ctaBody",
      title: "CTA Body",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "ctaPrimaryText", title: "CTA Primary Text", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "ctaPrimaryLink", title: "CTA Primary Link", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "ctaSecondaryText", title: "CTA Secondary Text", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "ctaSecondaryLink", title: "CTA Secondary Link", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    prepare() {
      return { title: "Practice Page Content" };
    },
  },
});

