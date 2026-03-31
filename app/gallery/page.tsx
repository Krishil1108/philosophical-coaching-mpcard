import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import ImageCarousel from "../components/ImageCarousel";
import { hasSanityConfig, client } from "../lib/sanity";
import { galleryQuery } from "../lib/queries";

export const revalidate = 60;

export const metadata = {
  title: "Gallery — Michael Picard Philosophical Practice",
  description: "Photo gallery from Café Philosophy sessions, Philosophy Sports events, and one-on-one coaching.",
};

async function getData() {
  if (!hasSanityConfig()) return [];
  return client.fetch(galleryQuery);
}

export default async function GalleryPage() {
  const data = await getData();

  return (
    <SiteLayout>
      <PageHeader
        label="Visual Journey"
        title="Gallery"
        subtitle="Moments from Café Philosophy sessions, public lectures, and philosophical practice."
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <section className="section-pad-xl" style={{ background: "var(--bg)" }}>
        <ImageCarousel data={data} />
      </section>
    </SiteLayout>
  );
}
