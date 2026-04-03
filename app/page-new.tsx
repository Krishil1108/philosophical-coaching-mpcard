import HomeClient from "./HomeClient";
import { hasSanityConfig, client } from "./lib/sanity";
import { heroQuery, galleryQuery } from "./lib/queries";

export const revalidate = 60;

async function getHero() {
  if (!hasSanityConfig()) return null;
  return client.fetch(heroQuery);
}

async function getGalleryData() {
  if (!hasSanityConfig()) return [];
  return client.fetch(galleryQuery);
}

export default async function Home() {
  const hero = await getHero();
  const galleryData = await getGalleryData();

  return <HomeClient hero={hero} galleryData={galleryData} />;
}
