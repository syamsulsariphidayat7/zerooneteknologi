import type { MetadataRoute } from "next";

const BASE = "https://zerooneteknologi.web.id";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/portfolio-details`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
