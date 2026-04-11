import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import About from "../components/About";
import { hasSanityConfig, client } from "../lib/sanity";
import { aboutQuery } from "../lib/queries";

export const revalidate = 0;

export const metadata = {
  title: "About Michael Picard — Philosophical Practice",
  description: "Meet Michael Picard: PhD (MIT), Faculty at Douglas College, Founder of Café Philosophy Victoria, and philosophical practitioner with 12+ years of experience.",
};

async function getData() {
  if (!hasSanityConfig()) return { about: null };

  const about = await client.fetch(aboutQuery);

  return { about };
}

export default async function AboutPage() {
  const { about } = await getData();

  return (
    <SiteLayout>
      <PageHeader
        label="The Philosopher"
        title="About Michael"
        subtitle="A life in philosophy — from MIT lecture halls to café tables to one-on-one inquiry."
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <About data={about} />
    </SiteLayout>
  );
}
