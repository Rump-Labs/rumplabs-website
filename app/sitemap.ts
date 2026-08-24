import type { MetadataRoute } from "next";

const SITE = "https://rumplabs.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-24");
  return [
    { url: SITE, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/gurukul`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
