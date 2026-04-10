import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import BookingScheduler from "../components/BookingScheduler";

export const metadata = {
  title: "Book a Session — Michael Picard Philosophical Practice",
  description:
    "Choose from Michael Picard's available Google Calendar slots and book your philosophical coaching session with a Google Meet link.",
};

export default function BookSessionPage() {
  return (
    <SiteLayout>
      <PageHeader
        label="Live Booking"
        title="Book a Session"
        subtitle="Select an available time from Michael's calendar and receive a Google Meet link instantly."
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <BookingScheduler />
    </SiteLayout>
  );
}
