import fs from "fs";
import path from "path";

async function seedAboutContent() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId || !dataset || !token) {
    console.error("Missing required environment variables:");
    console.error("- NEXT_PUBLIC_SANITY_PROJECT_ID:", projectId ? "✓" : "✗");
    console.error("- NEXT_PUBLIC_SANITY_DATASET:", dataset ? "✓" : "✗");
    console.error("- SANITY_API_TOKEN:", token ? "✓" : "✗");
    console.log("\nUsage: NEXT_PUBLIC_SANITY_PROJECT_ID=xxx NEXT_PUBLIC_SANITY_DATASET=yyy SANITY_API_TOKEN=zzz tsx scripts/seed-about-api.ts");
    process.exit(1);
  }

  const aboutContent = {
    _type: "about",
    _id: "michael-picard",
    pageHeaderLabel: "The Philosopher",
    pageHeaderTitle: "About Michael",
    pageHeaderSubtitle: "A life in philosophy — from MIT lecture halls to café tables to one-on-one inquiry.",
    openingStatement: "A philosopher who teaches at Douglas College, facilitates public dialogue, and practices neo-socratic inquiry one-on-one — bridging academic rigour and lived philosophy.",
    name: "Michael Picard",
    location: "BC, Canada",
    bio: [
      {
        _key: "bio-1",
        _type: "block",
        children: [
          {
            _key: "bio-1-span-1",
            _type: "span",
            marks: [],
            text: "Michael Picard is a philosopher, author, and neo-socratic practitioner based in British Columbia, Canada. Educated at MIT, he has spent over two decades exploring philosophy as a living discipline — not merely an academic exercise.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
      {
        _key: "bio-2",
        _type: "block",
        children: [
          {
            _key: "bio-2-span-1",
            _type: "span",
            marks: [],
            text: "As the founder of Café Philosophy in Victoria, BC (weekly sessions running for 12 years), and Faculty at Douglas College, Michael brings rigorous philosophical inquiry into accessible conversation. His work focuses on examining the language behind our beliefs, probing the reasoning we rarely question, and helping individuals think more independently.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
      {
        _key: "bio-3",
        _type: "block",
        children: [
          {
            _key: "bio-3-span-1",
            _type: "span",
            marks: [],
            text: "His approach is neither therapeutic nor didactic. He acts as an impartial witness — using semantic analysis and neo-socratic questioning to reveal the hidden assumptions that shape how we see the world.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
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

  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;

  try {
    console.log("Seeding About content to Sanity...");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mutations: [
          {
            createOrReplace: aboutContent,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(error)}`);
    }

    const result = await response.json();
    console.log("✓ About content seeded successfully!");
    console.log("Document ID:", result.results[0].id);
  } catch (error) {
    console.error("Error seeding About content:", error);
    process.exit(1);
  }
}

seedAboutContent();
