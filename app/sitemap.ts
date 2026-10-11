import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-24");
  return [
    { url: SITE, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/gurukul`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/gallery`, lastModified: new Date("2026-10-11"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/research`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
