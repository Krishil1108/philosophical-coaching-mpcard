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

async function seedBookingPage() {
  try {
    const doc = {
      _id: "booking-page",
      _type: "bookingPage",
      subtitle: "Select an available time from Michael's calendar and receive a Google Meet link instantly.",
      bookingHeading: "Choose a Date",
      bookingDescription: "Michael controls these sessions directly from Google Calendar. Pick a day first, then choose one of the available times for that day."
    };

    console.log("Creating or updating booking page document...");
    await client.createOrReplace(doc);
    console.log("✅ Successfully seeded Booking Page document!");
  } catch (error) {
    console.error("Error seeding booking page:", error);
  }
}

seedBookingPage();
