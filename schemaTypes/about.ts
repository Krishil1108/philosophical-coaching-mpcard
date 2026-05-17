import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({ name: "pageHeaderLabel", title: "Page Header Label", type: "string" }),
    defineField({ name: "pageHeaderTitle", title: "Page Header Title", type: "string" }),
    defineField({ name: "pageHeaderSubtitle", title: "Page Header Subtitle", type: "text", rows: 3 }),
    defineField({ name: "openingStatement", title: "Opening Statement", type: "text", rows: 3 }),
    defineField({ name: "name", title: "Full Name", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "portrait",
      title: "Portrait Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "bioSectionLabel", title: "Bio Section Label", type: "string" }),
    defineField({ name: "bioSectionTitle", title: "Bio Section Title", type: "string" }),
    defineField({ name: "credentialsSectionLabel", title: "Credentials Section Label", type: "string" }),
    defineField({ name: "credentialsSectionTitle", title: "Credentials Section Title", type: "string" }),
    defineField({ name: "educationTitle", title: "Education Card Title", type: "string" }),
    defineField({
      name: "educationItems",
      title: "Education Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "teachingTitle", title: "Teaching Card Title", type: "string" }),
    defineField({ name: "teachingRoleLabel", title: "Teaching Role Label", type: "string" }),
    defineField({ name: "teachingRoleValue", title: "Teaching Role Value", type: "string" }),
    defineField({ name: "teachingTagline", title: "Teaching Tagline", type: "string" }),
    defineField({ name: "innovationTitle", title: "Innovation Card Title", type: "string" }),
    defineField({
      name: "innovationItems",
      title: "Innovation Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "liberationLabel", title: "Liberation Section Label", type: "string" }),
    defineField({ name: "liberationTitle", title: "Liberation Section Title", type: "string" }),
    defineField({
      name: "liberationParagraphs",
      title: "Liberation Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "liberationCards",
      title: "Liberation Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "symbol", title: "Symbol", type: "string" }),
            defineField({ name: "term", title: "Term", type: "string" }),
            defineField({ name: "definition", title: "Definition", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
    defineField({ name: "philosophyQuote", title: "Philosophy Quote", type: "text", rows: 3 }),
    defineField({ name: "quoteAttribution", title: "Quote Attribution", type: "string" }),
    defineField({ name: "yearsExperience", title: "Years of Experience", type: "number" }),
    defineField({ name: "sessionsHosted", title: "Sessions Hosted", type: "string" }),
    defineField({ name: "affiliation", title: "Current Affiliation", type: "string" }),
  ],
});
