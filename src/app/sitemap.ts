import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/a-propos", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/devenir-carrier", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/suivi", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
