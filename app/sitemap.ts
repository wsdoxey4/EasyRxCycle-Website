import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/capabilities", "/resources", "/get-a-quote", "/our-solutions/controlled-substance-destruction"]; // extend as product-pillar, ICP, and geo pages ship
  return routes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date("2026-07-31"),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
