import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
    defineField({ name: "subheadline", title: "Sub-Headline", type: "text", rows: 3 }),
    defineField({ name: "ctaPrimary", title: "Primary CTA Text", type: "string" }),
    defineField({ name: "ctaPrimaryLink", title: "Primary CTA Link", type: "string" }),
    defineField({ name: "ctaSecondary", title: "Secondary CTA Text", type: "string" }),
    defineField({ name: "ctaSecondaryLink", title: "Secondary CTA Link", type: "string" }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "quote", title: "Featured Quote", type: "text", rows: 2 }),
    defineField({ name: "quoteAuthor", title: "Quote Author", type: "string" }),
  ],
});
