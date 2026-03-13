import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import VideoSection from "../components/VideoSection";
import { hasSanityConfig, client } from "../lib/sanity";
import { videosQuery } from "../lib/queries";

export const revalidate = 60;

export const metadata = {
  title: "Videos — Michael Picard Philosophical Practice",
  description: "Watch Michael Picard discuss philosophical coaching, Café Philosophy, and more.",
};

async function getData() {
  if (!hasSanityConfig()) return [];
  return client.fetch(videosQuery);
}

export default async function VideosPage() {
  const data = await getData();

  return (
    <SiteLayout>
      <PageHeader
        label="Watch & Listen"
        title="Videos"
        subtitle="Talks, discussions, and demonstrations of philosophical practice in action."
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <VideoSection data={data} />
    </SiteLayout>
  );
}
