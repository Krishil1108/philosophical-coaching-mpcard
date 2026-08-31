import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) dotenv.config({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

async function seedPublicationsPage() {
  try {
    const doc = {
      _id: "publications-page",
      _type: "publicationsPage",
      forthcomingText: "Two translations of Gerd Achenbach's works on Philosophical Praxis, published by Lexington Books.",
      quoteContext: "Philosophical Practice — Foundational Principles",
      quoteText: "Philosophical practice must calibrate itself to the themes, problems and question-formulations that burden others, those who in their need have turned to philosophy for help.",
      quoteAuthor: "Gerd B. Achenbach",
      quoteSource: "Philosophical Praxis",
      quotePublisher: "Bloomsbury, 2024"
    };

    console.log("Creating or updating Publications Page settings document...");
    await client.createOrReplace(doc);
    console.log("✅ Successfully seeded Publications Page settings document!");
  } catch (error) {
    console.error("Error seeding Publications Page settings:", error);
  }
}

seedPublicationsPage();
