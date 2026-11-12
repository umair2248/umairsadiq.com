/**
 * Home page SEO content (target keyword: "wordpress developer freelance").
 * Visible FAQ text and the FAQPage schema both read from `homeFaqs`, so they always match.
 */
import type { Faq } from "./pages";

export const homeSeo = {
  title: "Freelance WordPress Developer & SEO Expert | Umair Sadiq",
  description:
    "Freelance WordPress developer and SEO expert, 100+ sites built. Custom plugins, WooCommerce, Next.js and SEO for clients in the US, UK, UAE and Australia.",
  /** WhatsApp text for the "free 15-minute call" CTA */
  callMessage: "Hi Umair, I'd like to book a free 15-minute call about my website project.",
};

/**
 * Countries section (sticky stacked cards). The 24-hour bar and live clock are
 * worked out in the browser from these time zones and Umair's hours (site.ts).
 */
export const countries = [
  {
    code: "US",
    flag: "/flags/us.svg",
    name: "United States",
    city: "New York",
    tz: "America/New_York",
    text: "I'm online through your morning and early afternoon on the East Coast, and your whole morning on the West Coast. Jankowski Import Auto in Long Beach, California is one of my US SEO clients.",
  },
  {
    code: "UK",
    flag: "/flags/gb.svg",
    name: "United Kingdom",
    city: "London",
    tz: "Europe/London",
    text: "My working day covers your entire business day, so questions get answered the same day and changes go live before you log off.",
  },
  {
    code: "UAE",
    flag: "/flags/ae.svg",
    name: "United Arab Emirates",
    city: "Dubai",
    tz: "Asia/Dubai",
    text: "Just one hour apart, so we can talk in real time on WhatsApp throughout your day, from first coffee to late evening.",
  },
  {
    code: "AU",
    flag: "/flags/au.svg",
    name: "Australia",
    city: "Sydney",
    tz: "Australia/Sydney",
    text: "Send a brief in your afternoon and wake up to progress. My day runs while you sleep, so work moves around the clock.",
  },
  {
    code: "PK",
    flag: "/flags/pk.svg",
    name: "Pakistan",
    city: "Gujrat",
    tz: "Asia/Karachi",
    text: "Based in Gujrat, Punjab. Local businesses like Doctors Hospital Gujrat get the same build quality and SEO process as my international clients.",
  },
];

export const homeFaqs: Faq[] = [
  {
    q: "How do I hire you as a freelance WordPress developer?",
    a: "Send me a WhatsApp message or fill in the 'Start a project' form with a short description of your site. We'll have a free 15-minute call, then I'll send you a written scope, a fixed price in USD and a timeline before any work starts.",
  },
  {
    q: "How much does a freelance WordPress developer cost?",
    a: "It depends on the number of pages, the features (a store, bookings, a custom plugin) and whether you want SEO included. I quote a fixed price in USD for the agreed scope, so there are no hourly surprises. A simple business site costs far less than a custom WooCommerce store or plugin.",
  },
  {
    q: "Do you work with clients in the US, UK, UAE and Australia?",
    a: "Yes. I work remotely from Pakistan and I'm online from 9 AM to 2 AM Pakistan time, which overlaps with the full working day in the UK and UAE, most of the US working day, and the Australian afternoon and evening.",
  },
  {
    q: "Should I hire a freelance web developer or an agency?",
    a: "A freelancer is usually the better fit for business sites, stores and SEO projects: you talk directly to the person building your site, decisions are faster and you don't pay for agency overhead. An agency makes sense when you need a large team working in parallel.",
  },
  {
    q: "Do you include SEO with WordPress development?",
    a: "Yes. Every site I build ships with technical SEO foundations: clean structure, fast loading, schema markup, sitemaps and Search Console setup. Ongoing SEO, such as keyword research, content and audits, is available as a separate service.",
  },
  {
    q: "Will I be able to update the website myself?",
    a: "Yes. I set up WordPress so you can edit pages, posts and products from the dashboard, and I show you how. You get full admin access to your site.",
  },
];

/** "For recruiters" section: the 30-second version for hiring managers. */
export const recruiter = {
  facts: [
    { label: "Current role", value: "WordPress Developer, ABCDMEDIA LTD (Jan 2026 – present, remote)" },
    { label: "Previous", value: "WordPress Developer & SEO, Technogic Systems (Aug 2025 – Apr 2026)" },
    { label: "Track record", value: "100+ websites built; SEO results verified in Google Search Console" },
    { label: "Core stack", value: "WordPress, PHP, WooCommerce, technical SEO, Next.js, React, TypeScript" },
    { label: "Education", value: "BS Information Technology, University of Gujrat (2023 – 2027)" },
    { label: "Location", value: "Gujrat, Punjab, Pakistan (UTC+5)" },
    { label: "Open to", value: "Full-time, contract and freelance · On-site, hybrid or remote" },
  ],
  reasons: [
    { title: "Proven, measurable results", text: "Live client sites with Search Console data: 578 clicks at position 6.6 for Doctors Hospital Gujrat, +137% clicks for Jankowski Import Auto." },
    { title: "Already working remotely", text: "I build WordPress sites for international clients at ABCDMEDIA today, so I'm used to briefs, deadlines and async updates." },
    { title: "Development and SEO in one hire", text: "I write the PHP and also know why a page ranks, so SEO doesn't get bolted on after launch." },
    { title: "Fast without cutting corners", text: "Claude Code and Codex speed up the repetitive parts; I review every change before it ships." },
  ],
};
