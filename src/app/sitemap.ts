import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { services } from "@/data/pages";
import { landingPages } from "@/data/all-pages";
import { hreflang } from "@/data/i18n";
import { profile, projects } from "@/data/site";

export const dynamic = "force-static";

/**
 * Real last-change date of a page: the newest git commit touching its source files.
 * Google ignores lastmod when it changes on every build, so we never use "now"
 * unless git is unavailable.
 */
function modified(...paths: string[]): Date {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], { encoding: "utf8" }).trim();
    if (out) return new Date(out);
  } catch {}
  return new Date();
}

/** Files every page shares (layout, header, footer); a change here touches every page. */
const shell = ["src/app/layout.tsx", "src/components/Header.tsx", "src/components/Footer.tsx"];
const newest = (...dates: Date[]) => new Date(Math.max(...dates.map((d) => d.getTime())));

/** Every indexable page, with images for the home page, About and each case study. */
export default function sitemap(): MetadataRoute.Sitemap {
  const site = profile.siteUrl;
  const abs = (path: string) => `${site}${path}`;
  const langs = Object.fromEntries(Object.entries(hreflang).map(([k, v]) => [k, abs(v)]));
  const shellDate = modified(...shell);

  const home = modified("src/app/page.tsx", "src/components", "src/data/site.ts", "src/data/home.ts");
  const i18n = modified("src/app/ar", "src/app/ur", "src/data/i18n.ts");
  const servicesHub = modified("src/app/services/page.tsx", "src/data/pages.ts");
  const servicePage = modified(
    "src/app/services",
    "src/components/LongPage.tsx",
    "src/data/pages.ts",
    "src/data/all-pages.ts",
    "src/data/service-pages.ts",
    "src/data/service-pages-extra.ts",
    "src/data/hire-wordpress.ts",
    "src/data/page-kit.ts",
    "src/data/page-extras.ts",
  );
  const landing = modified("src/app/[landing]", "src/components/LongPage.tsx");
  const work = modified("src/app/work", "src/data/site.ts");

  return [
    {
      url: `${site}/`,
      lastModified: home,
      changeFrequency: "weekly",
      priority: 1,
      images: ["/umair-sadiq.webp", ...projects.map((p) => p.image)].map(abs),
      alternates: { languages: langs },
    },
    { url: `${site}/services/`, lastModified: newest(servicesHub, shellDate), changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: `${site}/services/${s.slug}/`,
      lastModified: newest(servicePage, shellDate),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...landingPages.map((p) => ({
      url: `${site}/${p.slug}/`,
      lastModified: newest(new Date(`${p.updated}T12:00:00Z`), landing, shellDate),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site}/work/`, lastModified: newest(work, shellDate), changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({
      url: `${site}/work/${p.slug}/`,
      lastModified: newest(work, shellDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [p.image, ...(p.proof ? [p.proof] : [])].map(abs),
    })),
    {
      url: `${site}/about/`,
      lastModified: newest(modified("src/app/about"), shellDate),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [abs("/umair-sadiq.webp")],
    },
    { url: `${site}/contact/`, lastModified: newest(modified("src/app/contact"), shellDate), changeFrequency: "yearly", priority: 0.7 },
    { url: `${site}/ar/`, lastModified: newest(i18n, shellDate), changeFrequency: "monthly", priority: 0.6, alternates: { languages: langs } },
    { url: `${site}/ur/`, lastModified: newest(i18n, shellDate), changeFrequency: "monthly", priority: 0.6, alternates: { languages: langs } },
    { url: `${site}/privacy-policy/`, lastModified: modified("src/app/privacy-policy"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
