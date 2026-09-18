import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import Publications from "../components/Publications";
import { hasSanityConfig, client } from "../lib/sanity";
import { publicationsQuery, publicationsPageQuery } from "../lib/queries";

import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Publications & Books",
  description:
    "Books, essays, and translations by Michael Picard, PhD — including How to Play Philosophy and This is Not a Book.",
  alternates: {
    canonical: "/publications",
  },
};

async function getData() {
  if (!hasSanityConfig()) return { publications: [], pageSettings: null };
  const [publications, pageSettings] = await Promise.all([
    client.fetch(publicationsQuery),
    client.fetch(publicationsPageQuery),
  ]);
  return { publications, pageSettings };
}

export default async function PublicationsPage() {
  const { publications, pageSettings } = await getData();

  return (
    <SiteLayout>
      <PageHeader
        label="Written Works"
        title="Publications"
        subtitle="Books, essays, and translations that extend philosophical inquiry beyond the session room."
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <Publications data={publications} pageSettings={pageSettings || undefined} />
    </SiteLayout>
  );
}
