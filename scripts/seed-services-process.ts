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

const defaultWhatToExpect = [
  { _key: "npa", n: "01", title: "No Preset Agenda", body: "Michael brings no worldview to impose. The session belongs entirely to your thinking and your questions." },
  { _key: "iw", n: "02", title: "Impartial Witness", body: "Rather than arguing for a position, Michael acts as a mirror — helping you see the logic and language behind your own beliefs." },
  { _key: "sa", n: "03", title: "Semantic Analysis", body: "Many of our deepest convictions rest on unexamined metaphors. Michael's approach helps surface and renegotiate those invisible structures." },
  { _key: "ls", n: "04", title: "Lasting Shift", body: "The goal isn't a single insight — it's a new way of relating to your own thinking: more independently, more clearly, more freely." },
];

async function seedServicesProcess() {
  try {
    console.log("Fetching all services...");
    const services = await client.fetch(`*[_type == "service"]`);
    
    if (services.length === 0) {
      console.log("No services found in Sanity. Please create a service first.");
      return;
    }

    console.log(`Found ${services.length} services. Updating them...`);

    const transaction = client.transaction();

    for (const service of services) {
      transaction.patch(service._id, (p) => p.set({
        showWhatToExpect: true,
        whatToExpect: defaultWhatToExpect
      }));
    }

    await transaction.commit();
    console.log("✅ Successfully updated all services with 'What to Expect' data and toggle!");
  } catch (error) {
    console.error("Error seeding services process:", error);
  }
}

seedServicesProcess();
