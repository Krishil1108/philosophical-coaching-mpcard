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

      {/* Deep dive section */}
      <section className="section-pad-lg" style={{ background: "#141720" }}>
        <div className="inner-max" style={{ maxWidth: "72rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>Why It Works</span>
              <h2 className="font-serif mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "white" }}>
                Philosophy as Liberation
              </h2>
              <div className="divider-gold-left" />
              {[
                "Most of what we believe, we believe because we absorbed it — from culture, family, media, and social contagion. Very little of our thinking is genuinely our own.",
                "Michael calls these inherited structures 'zombie metaphors' — figurative language that moves us without our awareness. He helps you see them, name them, and choose what to do with them.",
                "The result is not a new worldview imposed from outside, but a more honest, more flexible relationship with your own mind.",
              ].map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 300,
                    color: i === 0 ? "var(--text)" : "var(--text-muted)",
                    lineHeight: 1.9,
                    fontSize: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="space-y-6">
              {[
                { symbol: "∮", term: "Socratic Inquiry", definition: "Tracing beliefs back to their foundations through systematic question and answer — not to demolish, but to understand." },
                { symbol: "§", term: "Semantic Analysis", definition: "Every belief lives in language. Examining the specific words and metaphors we use reveals the hidden architecture of thought." },
                { symbol: "◎", term: "Impartial Witnessing", definition: "Michael brings no conclusion to promote. His role is to hold a clear mirror — the insight must, and always will, be yours." },
              ].map((item) => (
                <div
                  key={item.term}
                  className="card-hover"
                  style={{
                    background: "#1c2030",
                    border: "1px solid rgba(201,168,76,0.1)",
                    borderRadius: "4px",
                    padding: "2.25rem",
                  }}
                >
                  <div
                    className="font-serif mb-3"
                    style={{ fontSize: "2.25rem", color: "rgba(201,168,76,0.3)", lineHeight: 1 }}
                  >
                    {item.symbol}
                  </div>
                  <h3
                    className="font-serif mb-3"
                    style={{ fontSize: "1.25rem", color: "white" }}
                  >
                    {item.term}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 300,
                      color: "var(--text-muted)",
                      lineHeight: 1.8,
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center" style={{ background: "#0d0f14" }}>
        <div className="inner-max" style={{ maxWidth: "48rem" }}>
          <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>Ready?</span>
          <h2 className="font-serif mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "white" }}>
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
            You don&apos;t need a background in philosophy. You just need a genuine question.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chat.appa.edu/product/chat-with-michael-picard-msc-phd/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Book a Session</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <Link href="/services" className="btn-outline">View All Services</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
