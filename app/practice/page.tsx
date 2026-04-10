import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import PhilosophySection from "../components/PhilosophySection";
import Link from "next/link";

export const metadata = {
  title: "The Practice — Michael Picard Philosophical Coaching",
  description: "Socratic inquiry, semantic analysis, and independent thinking. Explore Michael Picard's philosophical methodology.",
};

export default function PracticePage() {
  return (
    <SiteLayout>
      <PageHeader
        label="Methodology"
        title="The Practice"
        subtitle="Philosophy not as a set of answers, but as a way of inhabiting questions with greater clarity and freedom."
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <PhilosophySection />

      {/* CTA */}
      <section className="py-28 text-center" style={{ background: "var(--bg-muted)" }}>
        <div className="inner-max" style={{ maxWidth: "48rem" }}>
          <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>Ready?</span>
          <h2 className="font-serif mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--text-heading)" }}>
            Begin the Inquiry
          </h2>
          <div className="divider-gold" />
          <p
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 300,
              color: "var(--text-muted)",
              lineHeight: 1.85,
              marginBottom: "2.5rem",
            }}
          >
            You don&apos;t need a background in philosophy. You just need a life, and issues. This is not philosophy for philosophers. It is philosophy by philosophers in free conversation with human beings (philosophers or not) in the service of life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-session"
              className="btn-primary"
            >
              <span>Book a Session</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/services" className="btn-outline">View All Services</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
