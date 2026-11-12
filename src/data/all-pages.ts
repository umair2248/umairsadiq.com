import { industryPages } from "./landing-industry";
import { locationPages } from "./landing-locations";
import type { Landing } from "./landing-types";
import { extras, metaFixes } from "./page-extras";
import { servicePages, type ServicePage } from "./service-pages";
import { extraServicePages } from "./service-pages-extra";

/** Adds a page's extra sections (before its last section) and FAQs, and applies meta fixes. */
function withExtras<T extends ServicePage>(slug: string, pg: T): T {
  const x = extras[slug];
  const sections = x?.sections ? [...pg.sections.slice(0, -1), ...x.sections, ...pg.sections.slice(-1)] : pg.sections;
  return {
    ...pg,
    sections,
    faqs: [...pg.faqs, ...(x?.faqs ?? [])].slice(0, 8),
    metaDescription: metaFixes[slug] ?? pg.metaDescription,
  };
}

/** Long-form content for every page under /services/. */
export const allServicePages: Record<string, ServicePage> = Object.fromEntries(
  Object.entries({ ...servicePages, ...extraServicePages }).map(([slug, pg]) => [slug, withExtras(slug, pg)]),
);

/** Industry, engagement and location pages at the site root. */
export const landingPages: Landing[] = [...industryPages, ...locationPages].map((p) => withExtras(p.slug, p));
