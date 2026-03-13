import { groq } from "next-sanity";

export const heroQuery = groq`*[_type == "hero"][0]{
  headline,
  subheadline,
  ctaPrimary,
  ctaPrimaryLink,
  ctaSecondary,
  ctaSecondaryLink,
  backgroundImage,
  quote,
  quoteAuthor
}`;

export const aboutQuery = groq`*[_type == "about"][0]{
  name,
  portrait,
  bio,
  credentials,
  philosophyQuote,
  quoteAttribution,
  yearsExperience,
  sessionsHosted,
  affiliation
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  title,
  icon,
  description,
  price,
  duration,
  features,
  ctaText,
  ctaLink,
  featured
}`;

export const galleryQuery = groq`*[_type == "galleryImage"] | order(order asc){
  _id,
  image,
  caption,
  alt
}`;

export const videosQuery = groq`*[_type == "youtubeVideo"] | order(order asc){
  _id,
  title,
  videoId,
  description
}`;

export const publicationsQuery = groq`*[_type == "publication"] | order(order asc){
  _id,
  title,
  subtitle,
  year,
  publisher,
  coverImage,
  description,
  buyLink
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  author,
  role
}`;
