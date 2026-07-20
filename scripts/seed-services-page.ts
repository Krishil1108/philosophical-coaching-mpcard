import { createClient } from "next-sanity";
import { config } from "dotenv";

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

async function seedServicesPage() {
  const content = {
    _type: "servicesPage",
    _id: "services-page",
    whatToExpect: [
      { _key: "exp-1", n: "01", title: "No Preset Agenda", body: "Michael brings no worldview to impose. The session belongs entirely to your thinking and your questions." },
      { _key: "exp-2", n: "02", title: "Impartial Witness", body: "Rather than arguing for a position, Michael acts as a mirror — helping you see the logic and language behind your own beliefs." },
      { _key: "exp-3", n: "03", title: "Semantic Analysis", body: "Many of our deepest convictions rest on unexamined metaphors. Michael's approach helps surface and renegotiate those invisible structures." },
      { _key: "exp-4", n: "04", title: "Lasting Shift", body: "The goal isn't a single insight — it's a new way of relating to your own thinking: more independently, more clearly, more freely." },
    ]
  };

  try {
    const existingIds = await client.fetch(`*[_type == "servicesPage"]._id`);
    const docId = existingIds.length > 0 ? existingIds[0] : "services-page";
    const targetId = existingIds.includes("services-page") ? "services-page" : docId;

    if (existingIds.includes(targetId)) {
      console.log("Updating existing Services Page document with ID:", targetId);
      const { _id, ...patchContent } = content;
      await client.patch(targetId).set(patchContent).commit();
      console.log("✓ Services Page document updated successfully!");
    } else if (existingIds.length === 0) {
      console.log("Creating new Services Page document...");
      await client.create(content);
      console.log("✓ Services Page document created successfully!");
    } else {
      console.log("Found existing document but IDs didn't match cleanly. Skipping creation to avoid duplicates.");
    }
  } catch (error) {
    console.error("Failed to seed Services Page data:", error);
  }
}

seedServicesPage();
