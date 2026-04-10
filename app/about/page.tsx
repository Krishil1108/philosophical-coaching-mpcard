import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import About from "../components/About";
import AboutShowcaseCarousel from "../components/AboutShowcaseCarousel";
import { hasSanityConfig, client } from "../lib/sanity";
import { aboutQuery, publicationsQuery } from "../lib/queries";

export const revalidate = 0;

export const metadata = {
  title: "About Michael Picard — Philosophical Practice",
  description: "Meet Michael Picard: PhD (MIT), Faculty at Douglas College, Founder of Café Philosophy Victoria, and philosophical practitioner with 12+ years of experience.",
};

async function getData() {
  if (!hasSanityConfig()) return { about: null, publications: [] };

  const [about, publications] = await Promise.all([
    client.fetch(aboutQuery),
    client.fetch(publicationsQuery),
  ]);

  return { about, publications };
}

export default async function AboutPage() {
  const { about, publications } = await getData();

  return (
    <SiteLayout>
      <PageHeader
        label="The Philosopher"
        title="About Michael"
        subtitle="A life in philosophy — from MIT lecture halls to café tables to one-on-one inquiry."
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <About data={about} />
      <AboutShowcaseCarousel about={about} publications={publications} />
    </SiteLayout>
  );
}
