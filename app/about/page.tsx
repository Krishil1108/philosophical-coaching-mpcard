import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import About from "../components/About";
import { hasSanityConfig, client } from "../lib/sanity";
import { aboutQuery } from "../lib/queries";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Michael Picard: PhD (MIT), Faculty at Douglas College, Founder of Café Philosophy Victoria, and philosophical practitioner with 12+ years of experience.",
  alternates: {
    canonical: "/about",
  },
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
        label={about?.pageHeaderLabel || "The Philosopher"}
        title={about?.pageHeaderTitle || "About Michael"}
        subtitle={about?.pageHeaderSubtitle || "A life in philosophy — from MIT lecture halls to café tables to one-on-one inquiry."}
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <About data={about} />
    </SiteLayout>
  );
}
