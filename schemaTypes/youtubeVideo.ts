import { defineField, defineType } from "sanity";

export const youtubeVideo = defineType({
  name: "youtubeVideo",
  title: "YouTube Videos",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Video Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "videoId", title: "YouTube Video ID", type: "string", description: 'The part after "v=" in the YouTube URL. E.g., dQw4w9WgXcQ', validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Short Description", type: "text", rows: 2 }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "videoId" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `youtube.com/watch?v=${subtitle}` };
    },
  },
});
