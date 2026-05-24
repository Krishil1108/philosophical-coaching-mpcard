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

async function seedHeroContent() {
  const heroContent = {
    _type: "hero",
    _id: "home-hero",
    headline: "Thinking\nwith Care...",
    subheadline: "Philosophical practice is not philosophy on sale. It is a situational deployment of philosophy for purposes of life. It is not a monopoly. Try it.",
    ctaPrimary: "Explore the Practice",
    ctaPrimaryLink: "/about",
    ctaSecondary: "The Practice",
    ctaSecondaryLink: "/practice",
    openingReflections: [
      "There is philosophy for the philosophers, and there is philosophy for life. They are not the same in that they ask different questions; but insofar as both take thinking seriously, they are one.",
      "Sometimes an idea helps, and so benefits may come from a philosophy. More often the benefit arises, not from an idea, but from thinking, from the practice of philosophy in relation to life.",
      "The practice of philosophy is not the application of a theory, still less the development of theory. It is not a philosophy that can help you, but a philosopher who will think with you.",
      "The purpose of philosophy of life is a life, not a philosophy.",
    ],
    contents: [
      {
        _key: "contents-1",
        num: "01",
        href: "/about",
        title: "About",
        desc: "PhD from MIT · Faculty at Douglas College · 12 years of public dialogue · Author of How to Play Philosophy",
      },
      {
        _key: "contents-2",
        num: "02",
        href: "/services",
        title: "Services",
        desc: "1-on-1 Philosophical Coaching · Café Philosophy · Philosophy Sports",
      },
      {
        _key: "contents-3",
        num: "03",
        href: "/practice",
        title: "The Practice",
        desc: "Neo-socratic Inquiry · Semantic Analysis · Impartial Witness · No Preset Agenda",
      },
      {
        _key: "contents-4",
        num: "04",
        href: "/publications",
        title: "Publications",
        desc: "How to Play Philosophy · This is Not a Book · Café Conversations · Forthcoming Translations",
      },
      {
        _key: "contents-5",
        num: "05",
        href: "/videos",
        title: "Videos",
        desc: "Talks · Demonstrations · Café Philosophy · Philosophy Sports in Action",
      },
    ],
    quote: "“The purpose of philosophy of life is a life, not a philosophy.”",
    quoteAuthor: "— Michael Picard, How to Play Philosophy",
    quoteLabel: "How to Play Philosophy"
  };

  try {
    const existingIds = await client.fetch(`*[_type == "hero"]._id`);
    const docId = existingIds.length > 0 ? existingIds[0] : "home-hero";

    // Use the existing ID if there's an existing document to avoid duplicates,
    // otherwise create a new document with the ID "home-hero".
    const targetId = existingIds.includes("home-hero") ? "home-hero" : docId;

    // Do not include _id in the nested object when patching, to avoid the immutable _id error
    if (existingIds.includes(targetId)) {
      console.log("Updating existing Hero document with ID:", targetId);
      const { _id, ...patchContent } = heroContent;
      await client.patch(targetId).set(patchContent).commit();
      console.log("✓ Hero document updated successfully!");
    } else if (existingIds.length === 0) {
      console.log("Creating new Hero document...");
      await client.create(heroContent);
      console.log("✓ Hero document created successfully!");
    }
  } catch (error) {
    console.error("Error seeding Hero content:", error);
    process.exit(1);
  }
}

seedHeroContent();