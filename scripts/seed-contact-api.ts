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

async function seedContactContent() {
  const contactContent = {
    _type: "contactPage",
    _id: "contact-page",
    pageHeaderLabel: "Reach Out",
    pageHeaderTitle: "Contact",
    pageHeaderSubtitle: "Ready to begin your philosophical inquiry? Choose the path that fits your intention.",
    options: [
      {
        _key: "opt-1",
        num: "01",
        platform: "Google Meet",
        title: "Book a Live Session",
        desc: "Choose from Michael's available session times and book a live philosophical coaching session on Google Meet.",
        cta: "Book a Session",
        href: "/book-session",
        external: false,
        featured: false,
      },
      {
        _key: "opt-2",
        num: "02",
        platform: "Email",
        title: "Café Philosophy & Events",
        desc: "Interested in bringing Café Philosophy or Philosophy Sports to your community, institution, or organization? Get in touch directly.",
        cta: "Send an Email",
        href: "mailto:michael@philosophicalcoaching.com",
        external: false,
        featured: false,
      },
      {
        _key: "opt-3",
        num: "03",
        platform: "Douglas College",
        title: "Academic & Faculty Inquiries",
        desc: "For questions about Michael's academic work, courses at Douglas College, or translating Gerd Achenbach's texts.",
        cta: "View Faculty Profile",
        href: "https://www.douglascollege.ca",
        external: true,
        featured: false,
      },
    ],
    firstSessionLabel: "First Session",
    firstSessionTitle: "Before You Begin",
    firstSessionBody:
      "No preparation required. No background in philosophy expected. Bring a genuine question, a problem you're living with, or a curiosity you can't shake. The session starts from where you are.",
    firstSessionPoints: ["No worldview imposed", "Confidential dialogue", "All levels welcome", "30 or 60 minutes"],
    firstSessionNote: "If you are unsure whether this is the right fit, start with a 30-minute session.",
  };

  try {
    const existing = await client.fetch(`*[_id == "contact-page" && _type == "contactPage"][0]`);

    if (existing) {
      console.log("Updating existing Contact document...");
      await client.patch("contact-page").set(contactContent).commit();
      console.log("✓ Contact document updated successfully!");
    } else {
      console.log("Creating new Contact document...");
      await client.create(contactContent);
      console.log("✓ Contact document created successfully!");
    }
  } catch (error) {
    console.error("Error seeding Contact content:", error);
    process.exit(1);
  }
}

seedContactContent();
