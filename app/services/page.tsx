import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import Services from "../components/Services";
import { hasSanityConfig, client } from "../lib/sanity";
import { servicesQuery, servicesPageQuery } from "../lib/queries";

export const revalidate = 0;

export const metadata = {
  title: "Services — Michael Picard Philosophical Practice",
  description: "1-on-1 philosophical coaching, Café Philosophy facilitation, and Philosophy Sports with Michael Picard, PhD (MIT).",
};

async function getData() {
  if (!hasSanityConfig()) return { services: [], servicesPage: null };
  const [services, servicesPage] = await Promise.all([
    client.fetch(servicesQuery),
    client.fetch(servicesPageQuery)
  ]);
  return { services, servicesPage };
}

export default async function ServicesPage() {
  const { services, servicesPage } = await getData();

  const defaultWhatToExpect = [
    { n: "01", title: "No Preset Agenda", body: "Michael brings no worldview to impose. The session belongs entirely to your thinking and your questions." },
    { n: "02", title: "Impartial Witness", body: "Rather than arguing for a position, Michael acts as a mirror — helping you see the logic and language behind your own beliefs." },
    { n: "03", title: "Semantic Analysis", body: "Many of our deepest convictions rest on unexamined metaphors. Michael's approach helps surface and renegotiate those invisible structures." },
    { n: "04", title: "Lasting Shift", body: "The goal isn't a single insight — it's a new way of relating to your own thinking: more independently, more clearly, more freely." },
  ];

  const whatToExpect = servicesPage?.whatToExpect?.length > 0 ? servicesPage.whatToExpect : defaultWhatToExpect;

  return (
    <SiteLayout>
      <PageHeader
        label="Offerings"
        title="Services"
        subtitle="Choose the format that fits your path — from intimate one-on-one dialogue to public philosophical conversation."
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <Services data={services} />

      {/* What to expect section */}
      <section className="section-pad" style={{ background: "var(--bg-muted)" }}>
        <div className="inner-max" style={{ maxWidth: "64rem" }}>
          <div className="text-center mb-20">
            <span className="section-label" style={{ marginBottom: "1.25rem", display: "block" }}>Process</span>
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--text-heading)" }}>
              What to Expect
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {whatToExpect.map((item: any) => (
              <div
                key={item.n}
                className="card-hover"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "2.5rem",
                }}
              >
                <div
                  className="font-cinzel font-bold mb-4"
                  style={{ fontSize: "0.8125rem", color: "var(--accent)", letterSpacing: "0.2em" }}
                >
                  {item.n}
                </div>
                <h3
                  className="font-serif mb-4"
                  style={{ fontSize: "1.375rem", color: "var(--text-heading)" }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 300,
                    color: "var(--text-muted)",
                    lineHeight: 1.85,
                    fontSize: "0.9375rem",
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
