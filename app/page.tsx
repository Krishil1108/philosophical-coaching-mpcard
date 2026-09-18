import HomeClient from "./HomeClient";
import { hasSanityConfig, client } from "./lib/sanity";
import { heroQuery } from "./lib/queries";
import type { Metadata } from "next";

export const revalidate = 0; // Disable caching to get fresh data

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

async function getData() {
  if (!hasSanityConfig()) return { hero: null };
  
  try {
    const hero = await client.fetch(heroQuery);
    return { hero };
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    return { hero: null };
  }
}

export default async function Home() {
  const { hero } = await getData();
  
  return <HomeClient hero={hero} />;
}
