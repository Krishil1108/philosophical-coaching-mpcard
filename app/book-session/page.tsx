import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import BookingScheduler from "../components/BookingScheduler";
import { hasSanityConfig, client } from "../lib/sanity";
import { bookingPageQuery } from "../lib/queries";

export const metadata = {
  title: "Book a Session — Michael Picard Philosophical Practice",
  description:
    "Choose from Michael Picard's available Google Calendar slots and book your philosophical coaching session with a Google Meet link.",
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
