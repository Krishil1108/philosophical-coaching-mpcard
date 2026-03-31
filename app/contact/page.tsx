import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import Link from "next/link";

export const metadata = {
  title: "Contact & Book — Michael Picard Philosophical Practice",
  description: "Book a philosophical coaching session with Michael Picard or reach out about Café Philosophy and Philosophy Sports.",
};

const options = [
  {
    num: "01",
    platform: "APPA Chat",
    title: "Book a Live Session",
    desc: "Schedule a 30- or 60-minute live philosophical coaching session through the American Philosophical Practitioners Association platform.",
    price: "$60 – $100 USD",
    cta: "Book on APPA Chat",
    href: "https://chat.appa.edu/product/chat-with-michael-picard-msc-phd/",
    external: true,
    featured: true,
  },
  {
    num: "02",
    platform: "Email",
    title: "Café Philosophy & Events",
    desc: "Interested in bringing Café Philosophy or Philosophy Sports to your community, institution, or organization? Get in touch directly.",
    price: "Custom pricing",
    cta: "Send an Email",
    href: "mailto:michael@philosophicalcoaching.com",
    external: false,
    featured: false,
  },
  {
    num: "03",
    platform: "Douglas College",
    title: "Academic & Faculty Inquiries",
    desc: "For questions about Michael's academic work, courses at Douglas College, or translating Gerd Achenbach's texts.",
    price: "Academic context",
    cta: "View Faculty Profile",
    href: "https://www.douglascollege.ca",
    external: true,
    featured: false,
  },
];

export default function ContactPage() {
  return (
    <SiteLayout>
      <PageHeader
        label="Reach Out"
        title="Contact"
        subtitle="Ready to begin your philosophical inquiry? Choose the path that fits your intention."
        breadcrumb={{ label: "Home", href: "/" }}
      />

      {/* Options */}
      <section className="section-pad-xl" style={{ background: "var(--bg)" }}>
        <div className="inner-max" style={{ maxWidth: "76rem" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {options.map((opt) => (
              <div
                key={opt.num}
                className="card-hover flex flex-col"
                style={{
                  background: opt.featured ? "rgba(139, 107, 74, 0.06)" : "var(--bg-card)",
                  border: opt.featured ? "2px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "3rem",
                  boxShadow: opt.featured ? "0 4px 30px rgba(139, 107, 74, 0.1)" : "none",
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="font-cinzel font-bold"
                    style={{ fontSize: "0.75rem", color: "var(--accent)", letterSpacing: "0.22em" }}
                  >
                    {opt.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.5625rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}
                  >
                    {opt.platform}
                  </span>
                </div>

                <h3
                  className="font-serif mb-4"
                  style={{ fontSize: "1.5rem", color: "var(--text-heading)", lineHeight: 1.15 }}
                >
                  {opt.title}
                </h3>

                <p
                  className="flex-1"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 300,
                    color: "var(--text-muted)",
                    lineHeight: 1.85,
                    fontSize: "0.9375rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  {opt.desc}
                </p>

                <div
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    letterSpacing: "0.08em",
                    marginBottom: "2rem",
                    fontWeight: 500,
                  }}
                >
                  {opt.price}
                </div>

                <a
                  href={opt.href}
                  target={opt.external ? "_blank" : "_self"}
                  rel={opt.external ? "noopener noreferrer" : undefined}
                  className={opt.featured ? "btn-primary" : "btn-outline"}
                >
                  <span>{opt.cta}</span>
                  {opt.external && (
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + additional info */}
      <section className="py-24" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
        <div className="inner-max text-center" style={{ maxWidth: "56rem" }}>
          <h2 className="font-serif mb-6" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "var(--text-heading)" }}>
            Before Your First Session
          </h2>
          <div className="divider-gold" />
          <p
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 300,
              color: "var(--text-muted)",
              lineHeight: 1.9,
              fontSize: "1rem",
              marginBottom: "3rem",
            }}
          >
            No preparation required. No background in philosophy expected. All you need is a
            genuine question, a problem you&apos;re sitting with, or a curiosity you haven&apos;t been
            able to shake. The session will meet you exactly where you are.
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              "No worldview imposed",
              "Confidential dialogue",
              "All levels welcome",
              "30 or 60 minutes",
            ].map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                <span style={{ color: "var(--sage)", marginRight: "0.5rem" }}>✓</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Links to other pages */}
      <section className="py-20" style={{ background: "var(--bg-muted)" }}>
        <div className="inner-max" style={{ maxWidth: "80rem" }}>
          <p
            className="text-center mb-8"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.5625rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Continue Exploring
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "About Michael", href: "/about" },
              { label: "Services",      href: "/services" },
              { label: "The Practice",  href: "/practice" },
              { label: "Publications",  href: "/publications" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="btn-outline" style={{ padding: "0.75rem 2rem" }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
