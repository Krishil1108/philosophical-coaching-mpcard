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
    defineField({
      name: "showcasePhotos",
      title: "Home Showcase Photos",
      description: "Add up to 12 photos for the Home page Visual Showcase carousel.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required().max(90),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
              validation: (Rule) => Rule.max(140),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(12),
    }),
    defineField({ name: "quote", title: "Featured Quote", type: "text", rows: 2 }),
    defineField({ name: "quoteAuthor", title: "Quote Author", type: "string" }),
    defineField({ name: "quoteLabel", title: "Quote Label", type: "string", description: "Label text appearing vertically next to the quote" }),
    defineField({
      name: "openingReflections",
      title: "Opening Reflections (Typewriter)",
      description: "List of texts that appear in the typewriter effect section",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "contents",
      title: "Page Contents / Index",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "num", title: "Number", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "string" }),
            defineField({ name: "href", title: "Link Path", type: "string" }),
          ],
        },
      ],
    }),
  ],
});
