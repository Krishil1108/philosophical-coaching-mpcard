import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import BookingScheduler from "../components/BookingScheduler";
import { hasSanityConfig, client } from "../lib/sanity";
import { bookingPageQuery } from "../lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Schedule a one-on-one philosophical coaching session with Michael Picard, PhD. Select an available time slot with instant Google Meet confirmation.",
  alternates: {
    canonical: "/book-session",
  },
};

async function getData() {
  if (!hasSanityConfig()) return null;
  return client.fetch(bookingPageQuery);
}

export default async function BookSessionPage() {
  const data = await getData();

  const subtitle = data?.subtitle || "Select an available time from Michael's calendar and receive a Google Meet link instantly.";

  return (
    <SiteLayout>
      <PageHeader
        label="Live Booking"
        title="Book a Session"
        subtitle={subtitle}
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <BookingScheduler 
        heading={data?.bookingHeading} 
        description={data?.bookingDescription} 
      />
    </SiteLayout>
  );
}
