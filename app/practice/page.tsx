import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import PhilosophySection from "../components/PhilosophySection";
import Link from "next/link";
import { client, hasSanityConfig } from "../lib/sanity";
import { practicePageQuery } from "../lib/queries";
import { defaultPracticePageData } from "../lib/practiceContent";

import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "The Practice & Methodology",
  description:
    "Neo-Socratic inquiry, semantic analysis, and independent thinking. Explore Michael Picard's philosophical coaching methodology.",
  alternates: {
    canonical: "/practice",
  },
};

async function getData() {
  if (!hasSanityConfig()) return null;
  return client.fetch(practicePageQuery);
}

export default async function PracticePage() {
  const data = await getData();
  const practiceData = data ?? defaultPracticePageData;

  return (
    <SiteLayout>
      <PageHeader
        label={practiceData.headerLabel}
        title={practiceData.headerTitle}
        subtitle={practiceData.headerSubtitle}
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <PhilosophySection data={practiceData} />

      {/* CTA */}
      <section className="py-28 text-center" style={{ background: "var(--bg-muted)" }}>
        <div className="inner-max" style={{ maxWidth: "48rem" }}>
          <span className="section-label" style={{ marginBottom: "1.5rem", display: "block" }}>{practiceData.ctaLabel}</span>
          <h2 className="font-serif mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--text-heading)" }}>
            {practiceData.ctaTitle}
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
            {practiceData.ctaBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={practiceData.ctaPrimaryLink}
              className="btn-primary"
            >
              <span>{practiceData.ctaPrimaryText}</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href={practiceData.ctaSecondaryLink} className="btn-outline">{practiceData.ctaSecondaryText}</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
