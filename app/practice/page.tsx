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
      <section className="section-pad-lg" style={{ background: "var(--bg-card)" }}>
        <div className="inner-max" style={{ maxWidth: "72rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>The Methods</span>
              <h2 className="font-serif mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text-heading)" }}>
                Three Approaches
              </h2>
              <div className="divider-gold-left" />
              <p
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 300,
                  color: "var(--text)",
                  lineHeight: 1.9,
                  fontSize: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                Each session draws from these complementary approaches, depending on what emerges in our conversation.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { symbol: "∮", term: "Questionless Inquiry", definition: "Philosophy also listens. A space for what is answerless, unquestioned, and unquestionable." },
                { symbol: "§", term: "Approximately-Socratic", definition: "Not an imitation but thinking alongside. Open ears, genuine engagement, shared risk." },
                { symbol: "◎", term: "Examining Language", definition: "Every belief lives in words. Revealing the 'zombie metaphors' that move us without awareness." },
              ].map((item) => (
                <div
                  key={item.term}
                  className="card-hover"
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "2.25rem",
                  }}
                >
                  <div
                    className="font-serif mb-3"
                    style={{ fontSize: "2.25rem", color: "rgba(139, 107, 74, 0.3)", lineHeight: 1 }}
                  >
                    {item.symbol}
                  </div>
                  <h3
                    className="font-serif mb-3"
                    style={{ fontSize: "1.25rem", color: "var(--text-heading)" }}
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
