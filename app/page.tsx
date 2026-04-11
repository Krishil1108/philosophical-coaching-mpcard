import HomeClient from "./HomeClient";
import { hasSanityConfig, client } from "./lib/sanity";
import { heroQuery, publicationsQuery } from "./lib/queries";

export const revalidate = 0; // Disable caching to get fresh data

async function getData() {
  if (!hasSanityConfig()) return { hero: null, publications: [] };
  
  try {
    const [hero, publications] = await Promise.all([
      client.fetch(heroQuery),
      client.fetch(publicationsQuery),
    ]);
    return { hero, publications };
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    return { hero: null, publications: [] };
  }
}

export default async function Home() {
  const { hero, publications } = await getData();
  
  return <HomeClient hero={hero} publications={publications} />;
}
