import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string" }),
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
    defineField({ name: "philosophyQuote", title: "Philosophy Quote", type: "text", rows: 3 }),
    defineField({ name: "quoteAttribution", title: "Quote Attribution", type: "string" }),
    defineField({ name: "yearsExperience", title: "Years of Experience", type: "number" }),
    defineField({ name: "sessionsHosted", title: "Sessions Hosted", type: "string" }),
    defineField({ name: "affiliation", title: "Current Affiliation", type: "string" }),
  ],
});
