import HomeClient from "./HomeClient";
import { hasSanityConfig, client } from "./lib/sanity";
import { aboutQuery, heroQuery, publicationsQuery } from "./lib/queries";

export const revalidate = 0; // Disable caching to get fresh data

async function getData() {
  if (!hasSanityConfig()) return { hero: null, about: null, publications: [] };
  
  try {
    const [hero, about, publications] = await Promise.all([
      client.fetch(heroQuery),
      client.fetch(aboutQuery),
      client.fetch(publicationsQuery),
    ]);
    return { hero, about, publications };
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    return { hero: null, about: null, publications: [] };
  }
}

export default async function Home() {
  const { hero, about, publications } = await getData();
  
  return <HomeClient hero={hero} about={about} publications={publications} />;
}
