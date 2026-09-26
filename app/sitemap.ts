import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** The five public routes — nothing else is published. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...site.nav.map((item) => item.href)];
  return routes.map((path) => ({
    url: `${site.seo.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
