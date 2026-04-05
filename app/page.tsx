import SiteLayout from "@/app/components/SiteLayout";
import StatsSection from "@/app/components/StatsSection";
import ImageCarousel from "@/app/components/ImageCarousel";
import HomeClient from "./HomeClient";
import { hasSanityConfig, client } from "./lib/sanity";
import { heroQuery, galleryQuery } from "./lib/queries";

export const revalidate = 0; // Disable caching to get fresh data

async function getData() {
  if (!hasSanityConfig()) return { hero: null, galleryData: [] };
  
  try {
    const [hero, galleryData] = await Promise.all([
      client.fetch(heroQuery),
      client.fetch(galleryQuery),
    ]);
    
    return { hero, galleryData };
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    return { hero: null, galleryData: [] };
  }
}

export default async function Home() {
  const { hero, galleryData } = await getData();
  
  return <HomeClient hero={hero} galleryData={galleryData} />;
}
