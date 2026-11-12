/**
 * Small building blocks shared by the long-form pages, so the real numbers
 * (Search Console results, working hours) are written in one place only.
 */
import type { Section } from "./service-pages";

/** Search Console proof from Jankowski Import Auto and Doctors Hospital Gujrat. */
export const gscProof = (opts: { id?: string; nav?: string; eyebrow?: string; title?: string; muted?: string; lead?: string; note?: string; slugs?: string[] } = {}): Section => ({
  id: opts.id ?? "results",
  nav: opts.nav ?? "Results",
  eyebrow: opts.eyebrow ?? "Results",
  title: opts.title ?? "Real Search Console results",
  muted: opts.muted ?? "from client sites.",
  lead: opts.lead ?? "Unedited screenshots from my clients' own Google Search Console accounts, with the dates on every report.",
  block: { kind: "proof", slugs: opts.slugs ?? ["jankowski-import-auto", "doctors-hospital-gujrat"] },
  note:
    opts.note ??
    "[Jankowski Import Auto](/work/jankowski-import-auto/), an auto repair shop in Long Beach, California: clicks up from 30 to 71 (+137%), impressions up 238% and average position from 13.6 to 9.6 in a 28-day comparison. [Doctors Hospital Gujrat](/work/doctors-hospital-gujrat/): 578 clicks, 17K impressions and a 6.6 average position between 6 October and 7 November 2026.",
});

/** The usual monthly SEO rhythm. */
export const monthlySteps = (first = "Baseline and audit"): Section["block"] => ({
  kind: "steps",
  items: [
    { title: first, time: "Week 1", text: "Search Console and Analytics access, a full crawl, keyword research and the pages that matter most for leads." },
    { title: "Technical fixes", time: "Weeks 2–3", text: "Indexing, speed, redirects, schema and internal links fixed first, so content has a solid base." },
    { title: "Pages and local", time: "Months 1–2", text: "Key pages reworked around real searches, new pages where there's demand, Google Business Profile tidied up." },
    { title: "Grow", time: "Ongoing", text: "New content, local citations and review requests, depending on the plan." },
    { title: "Report", time: "Every month", text: "A plain-English report from your own Search Console and Analytics: what moved, why, and what's next." },
  ],
});

export const fixedQuote = (currency: string) =>
  `I don't publish one price for everyone, because a five-page local site and a large store need very different amounts of work. You tell me what you need and get a fixed price in ${currency} within 24 hours, before anything starts. Monthly plans are a fixed fee for an agreed set of work, and you can stop at the end of any month.`;
