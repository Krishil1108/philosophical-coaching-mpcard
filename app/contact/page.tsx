import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import { hasSanityConfig, client } from "../lib/sanity";
import { contactPageQuery } from "../lib/queries";

export const revalidate = 0;

export const metadata = {
  title: "Contact & Book — Michael Picard Philosophical Practice",
  description: "Book a philosophical coaching session with Michael Picard or reach out about Café Philosophy and Philosophy Sports.",
};

type ContactOption = {
  _key?: string;
  num: string;
  platform: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  external?: boolean;
  featured?: boolean;
};

type ContactPageData = {
  pageHeaderLabel?: string;
  pageHeaderTitle?: string;
  pageHeaderSubtitle?: string;
  options?: ContactOption[];
  firstSessionLabel?: string;
  firstSessionTitle?: string;
  firstSessionBody?: string;
  firstSessionPoints?: string[];
  firstSessionNote?: string;
};

const fallbackOptions: ContactOption[] = [
  {
    num: "01",
    platform: "Google Meet",
    title: "Book a Live Session",
    desc: "Choose from Michael's available session times and book a live philosophical coaching session on Google Meet.",
    cta: "Book a Session",
    href: "/book-session",
    external: false,
    featured: false,
  },
  {
    num: "02",
    platform: "Email",
    title: "Café Philosophy & Events",
    desc: "Interested in bringing Café Philosophy or Philosophy Sports to your community, institution, or organization? Get in touch directly.",
    cta: "Send a Message",
    href: "#contact-form",
    external: false,
    featured: false,
  },
  {
    num: "03",
    platform: "Douglas College",
    title: "Academic & Faculty Inquiries",
    desc: "For questions about Michael's academic work, courses at Douglas College, or translating Gerd Achenbach's texts.",
    cta: "View Faculty Profile",
    href: "https://www.douglascollege.ca",
    external: true,
    featured: false,
  },
];

const fallbackFirstSessionPoints: string[] = [
  "No worldview imposed",
  "Confidential dialogue",
  "All levels welcome",
  "30 or 60 minutes",
];

const fallbackFirstSessionBody =
  "No preparation required. No background in philosophy expected. Bring a genuine question, a problem you're living with, or a curiosity you can't shake. The session starts from where you are.";

const fallbackFirstSessionNote =
  "If you are unsure whether this is the right fit, start with a 30-minute session.";

async function getData() {
  if (!hasSanityConfig()) return { contact: null };

  const contact = await client.fetch<ContactPageData | null>(contactPageQuery);

  return { contact };
}

export default async function ContactPage() {
  const { contact } = await getData();
  const options =
    contact?.options && contact.options.length > 0 ? contact.options : fallbackOptions;
  const firstSessionPoints =
    contact?.firstSessionPoints && contact.firstSessionPoints.length > 0
      ? contact.firstSessionPoints
      : fallbackFirstSessionPoints;

  return (
    <SiteLayout>
      <PageHeader
        label={contact?.pageHeaderLabel || "Reach Out"}
        title={contact?.pageHeaderTitle || "Contact"}
        subtitle={
          contact?.pageHeaderSubtitle ||
          "Ready to begin your philosophical inquiry? Choose the path that fits your intention."
        }
        breadcrumb={{ label: "Home", href: "/" }}
      />

      {/* Options */}
      <section className="section-pad-xl" style={{ background: "var(--bg)" }}>
        <div className="inner-max" style={{ maxWidth: "76rem" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {options.map((opt) => (
              <div
                key={opt._key ?? opt.num}
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

      {/* Trust + prep */}
      <section className="section-pad" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
        <div className="inner-max" style={{ maxWidth: "74rem" }}>
          <div
            style={{
              textAlign: "center",
              maxWidth: "56rem",
              margin: "0 auto",
              marginBottom: "3rem",
            }}
          >
            <span className="section-label" style={{ marginBottom: "0.9rem", display: "inline-block" }}>
              {contact?.firstSessionLabel || "First Session"}
            </span>
            <h2 className="font-serif" style={{ fontSize: "clamp(1.95rem, 4vw, 3rem)", color: "var(--text-heading)" }}>
              {contact?.firstSessionTitle || "Before You Begin"}
            </h2>
            <div className="divider-gold" style={{ marginTop: "1.1rem", marginBottom: "1.25rem" }} />
            <p
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 400,
                color: "var(--text-muted)",
                lineHeight: 1.85,
                fontSize: "1.02rem",
              }}
            >
              {contact?.firstSessionBody || fallbackFirstSessionBody}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: "2.25rem" }}>
            {firstSessionPoints.map((t) => (
              <div
                key={t}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "1rem 1.1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.7rem",
                  minHeight: "3.4rem",
                }}
              >
                <span
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(125, 139, 111, 0.35)",
                    color: "var(--sage)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "0.75rem",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.76rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {t}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "linear-gradient(120deg, rgba(139, 107, 74, 0.09), rgba(163, 176, 148, 0.08))",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "1.25rem 1.35rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.85rem",
                color: "var(--text)",
                lineHeight: 1.7,
              }}
            >
              {contact?.firstSessionNote || fallbackFirstSessionNote}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="section-pad-xl" style={{ background: "var(--bg)" }}>
        <div className="inner-max" style={{ maxWidth: "76rem" }}>
          <ContactForm />
        </div>
      </section>

    </SiteLayout>
  );
}
