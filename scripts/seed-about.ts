import { createClient } from "next-sanity";
import { config } from "dotenv";

// Load environment variables from .env
config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing required environment variables:");
  console.error("- NEXT_PUBLIC_SANITY_PROJECT_ID:", projectId ? "✓" : "✗");
  console.error("- NEXT_PUBLIC_SANITY_DATASET:", dataset ? "✓" : "✗");
  console.error("- SANITY_API_TOKEN:", token ? "✓" : "✗");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: "2024-10-15",
  token,
});

async function seedAboutContent() {
  const aboutContent = {
    _type: "about",
    _id: "michael-picard",
    pageHeaderLabel: "The Philosopher",
    pageHeaderTitle: "About Michael",
    pageHeaderSubtitle: "A life in philosophy — from MIT lecture halls to café tables to one-on-one inquiry.",
    openingStatement: "A philosopher who teaches at Douglas College, facilitates public dialogue, and practices neo-socratic inquiry one-on-one — bridging academic rigour and lived philosophy.",
    name: "Michael Picard",
    location: "BC, Canada",
    bioSectionLabel: "Living Philosophy",
    bioSectionTitle: "A Working Biography",
    credentialsSectionLabel: "Academic Journey",
    credentialsSectionTitle: "Two Decades of Philosophical Practice",
    educationTitle: "Education",
    educationItems: [
      {
        _key: "edu-1",
        label: "PhD, Philosophy",
        value: "Massachusetts Institute of Technology",
      },
      {
        _key: "edu-2",
        label: "MSc",
        value: "Massachusetts Institute of Technology",
      },
    ],
    teachingTitle: "Teaching",
    teachingRoleLabel: "Faculty",
    teachingRoleValue: "Douglas College",
    teachingTagline: "Bringing philosophy to life in the classroom",
    innovationTitle: "Innovation",
    innovationItems: [
      {
        _key: "inn-1",
        label: "Founder",
        value: "Café Philosophy Victoria BC",
      },
      {
        _key: "inn-2",
        label: "Creator",
        value: "Philosophy Sports",
      },
      {
        _key: "inn-3",
        label: "Author",
        value: "How to Play Philosophy",
      },
    ],
    liberationLabel: "Why It Works",
    liberationTitle: "Philosophy as Liberation",
    liberationParagraphs: [
      "Most of what we believe, we believe because we absorbed it — from culture, family, media, and social contagion. Very little of our thinking is genuinely our own.",
      "Michael calls these inherited structures 'zombie metaphors' — figurative language that moves us without our awareness. He helps you see them, name them, and choose what to do with them.",
      "The result is not a new worldview imposed from outside, but a more honest, more flexible relationship with your own mind.",
    ],
    liberationCards: [
      {
        _key: "lib-1",
        symbol: "∮",
        term: "Examine Inherited Thinking",
        definition: "Question what you've absorbed from culture, family, and media without conscious choice.",
      },
      {
        _key: "lib-2",
        symbol: "§",
        term: "Identify Zombie Metaphors",
        definition: "See the figurative language that moves you without your awareness and decide what to do with it.",
      },
      {
        _key: "lib-3",
        symbol: "◎",
        term: "Develop Mental Freedom",
        definition: "Build a more honest, flexible relationship with your own mind and thinking patterns.",
      },
    ],
    yearsExperience: 20,
    sessionsHosted: "700+ dialogues",
    affiliation: "Douglas College",
    philosophyQuote: "Philosophy is not about having the right answers — it's about learning to ask better questions.",
    quoteAttribution: "Michael Picard",
  };

  try {
    // Check if document exists and update/create accordingly
    const existing = await client.fetch(`*[_id == "michael-picard" && _type == "about"][0]`);

    if (existing) {
      console.log("Updating existing About document...");
      await client.patch("michael-picard").set(aboutContent).commit();
      console.log("✓ About document updated successfully!");
    } else {
      console.log("Creating new About document...");
      await client.create(aboutContent);
      console.log("✓ About document created successfully!");
    }
  } catch (error) {
    console.error("Error seeding About content:", error);
    process.exit(1);
  }
}

seedAboutContent();
