import { defineField, defineType } from "sanity";

export const bookingPage = defineType({
  name: "bookingPage",
  title: "Booking Page",
  type: "document",
  fields: [
    defineField({
      name: "subtitle",
      title: "Page Subtitle",
      type: "string",
      description: "Text shown under the 'Book a Session' title.",
    }),
    defineField({
      name: "bookingHeading",
      title: "Booking Section Heading",
      type: "string",
      description: "Heading text above the calendar (e.g., 'Choose a Date').",
    }),
    defineField({
      name: "bookingDescription",
      title: "Booking Section Description",
      type: "text",
      rows: 3,
      description: "Instructions shown below the booking heading.",
    }),
  ],
});
