import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./sanityStructure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "yg5jn21b";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  name: "philosophy_coaching",
  title: "Michael Picard — Philosophy Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => schemaType !== "about" && schemaType !== "contactPage" && schemaType !== "servicesPage"),
  },
});
