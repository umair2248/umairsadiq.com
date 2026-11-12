import type { MetadataRoute } from "next";
import { services } from "@/data/pages";
import { hreflang } from "@/data/i18n";
import { profile, projects } from "@/data/site";

export const dynamic = "force-static";

/** Every indexable page, with images for the home page and each case study. */
export default function sitemap(): MetadataRoute.Sitemap {
  const site = profile.siteUrl;
  const now = new Date();
  const abs = (path: string) => `${site}${path}`;
  const langs = Object.fromEntries(Object.entries(hreflang).map(([k, v]) => [k, abs(v)]));
  return [
    {
      url: `${site}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      images: ["/umair-sadiq.webp", ...projects.map((p) => p.image)].map(abs),
      alternates: { languages: langs },
    },
    { url: `${site}/ar/`, lastModified: now, changeFrequency: "monthly", priority: 0.8, alternates: { languages: langs } },
    { url: `${site}/ur/`, lastModified: now, changeFrequency: "monthly", priority: 0.8, alternates: { languages: langs } },
    { url: `${site}/services/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: `${site}/services/${s.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${site}/work/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({
      url: `${site}/work/${p.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [p.image, ...(p.proof ? [p.proof] : [])].map(abs),
    })),
    { url: `${site}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.7, images: [abs("/umair-sadiq.webp")] },
    { url: `${site}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site}/privacy-policy/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
