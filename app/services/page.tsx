import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import Services from "../components/Services";
import { hasSanityConfig, client } from "../lib/sanity";
import { servicesQuery } from "../lib/queries";

export const revalidate = 0;

export const metadata = {
  title: "Services — Michael Picard Philosophical Practice",
  description: "1-on-1 philosophical coaching, Café Philosophy facilitation, and Philosophy Sports with Michael Picard, PhD (MIT).",
};

async function getData() {
  if (!hasSanityConfig()) return [];
  return client.fetch(servicesQuery);
}

export default async function ServicesPage() {
  const data = await getData();

  return (
    <SiteLayout>
      <PageHeader
        label="Offerings"
        title="Services"
        subtitle="Choose the format that fits your path — from intimate one-on-one dialogue to public philosophical conversation."
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <Services data={data} />
    </SiteLayout>
  );
}
