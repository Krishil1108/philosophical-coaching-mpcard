import SiteLayout from "../components/SiteLayout";
import PageHeader from "../components/PageHeader";
import Publications from "../components/Publications";
import { hasSanityConfig, client } from "../lib/sanity";
import { publicationsQuery } from "../lib/queries";

export const revalidate = 60;

export const metadata = {
  title: "Publications — Michael Picard",
  description: "Books, essays, and translations by Michael Picard PhD — including How to Play Philosophy and This is Not a Book.",
};

async function getData() {
  if (!hasSanityConfig()) return [];
  return client.fetch(publicationsQuery);
}

export default async function PublicationsPage() {
  const data = await getData();

  return (
    <SiteLayout>
      <PageHeader
        label="Written Works"
        title="Publications"
        subtitle="Books, essays, and translations that extend philosophical inquiry beyond the session room."
        breadcrumb={{ label: "Home", href: "/" }}
      />
      <Publications data={data} />
    </SiteLayout>
  );
}
