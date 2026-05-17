import { groq } from "next-sanity";

export const heroQuery = groq`*[_type == "hero"][0]{
  headline,
  subheadline,
  ctaPrimary,
  ctaPrimaryLink,
  ctaSecondary,
  ctaSecondaryLink,
  backgroundImage,
  showcasePhotos[]{
    _key,
    title,
    subtitle,
    image
  },
  quote,
  quoteAuthor
}`;

export const aboutQuery = groq`*[_type == "about" && _id == "michael-picard"][0]{
  pageHeaderLabel,
  pageHeaderTitle,
  pageHeaderSubtitle,
  openingStatement,
  name,
  location,
  portrait,
  bio,
  credentials,
  bioSectionLabel,
  bioSectionTitle,
  credentialsSectionLabel,
  credentialsSectionTitle,
  educationTitle,
  educationItems,
  teachingTitle,
  teachingRoleLabel,
  teachingRoleValue,
  teachingTagline,
  innovationTitle,
  innovationItems,
  liberationLabel,
  liberationTitle,
  liberationParagraphs,
  liberationCards,
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
  viewLink,
  buyLink,
  viewLinks[]{
    label,
    url
  },
  buyLinks[]{
    label,
    url
  },
  editions[]{
    _key,
    language,
    label,
    coverImage,
    viewLink,
    buyLink,
    viewLinks[]{
      label,
      url
    },
    buyLinks[]{
      label,
      url
    }
  }
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  author,
  role
}`;

export const philosophicalQuotesQuery = groq`*[_type == "philosophicalQuote" && active == true] | order(order asc){
  _id,
  quote,
  author,
  source,
  publisher,
  context,
  usedOnPages
}`;

export const practicePageQuery = groq`*[_type == "practicePage"][0]{
  headerLabel,
  headerTitle,
  headerSubtitle,
  openingStatement,
  openingTags,
  approachLabel,
  approachQuote,
  approachCite,
  methods[]{
    _key,
    num,
    name,
    short,
    body
  },
  ctaLabel,
  ctaTitle,
  ctaBody,
  ctaPrimaryText,
  ctaPrimaryLink,
  ctaSecondaryText,
  ctaSecondaryLink
}`;
