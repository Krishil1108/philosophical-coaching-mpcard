import HomeClient from "./HomeClient";
import { hasSanityConfig, client } from "./lib/sanity";
import { heroQuery } from "./lib/queries";

export const revalidate = 0;

async function getHero() {
  if (!hasSanityConfig()) return null;
  return client.fetch(heroQuery);
}

export default async function Home() {
  const hero = await getHero();

  return <HomeClient hero={hero} />;
}
