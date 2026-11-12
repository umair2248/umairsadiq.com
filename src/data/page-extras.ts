/**
 * Extra sections and FAQs per page, merged into the long-form pages in all-pages.ts.
 * Each one is written for that page only.
 */
import type { Faq } from "./pages";
import type { Section } from "./service-pages";

export const extras: Record<string, { sections?: Section[]; faqs?: Faq[] }> = {
  "hire-dedicated-wordpress-developer": {
    sections: [
      {
        id: "typical-month",
        nav: "A typical month",
        eyebrow: "In practice",
        title: "What a month with a dedicated developer",
        muted: "looks like.",
        block: {
          kind: "cards",
          cols: 2,
          items: [
            { title: "Week 1: plan", text: "We agree the month's priorities: new pages, fixes, updates and any bigger feature, in your task board." },
            { title: "Weeks 1–4: build and fix", text: "I work through the list in order, with an end-of-day message so you always know where things stand." },
            { title: "Every week: updates", text: "WordPress, theme and plugin updates tested on staging first, then applied to the live site." },
            { title: "End of month: report", text: "Hours used, tasks done with links, and suggestions for next month." },
          ],
        },
      },
      {
        id: "vs-agency",
        nav: "Dedicated vs agency",
        eyebrow: "Comparison",
        title: "Dedicated developer",
        muted: "vs agency vs freelancer.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "Agency", text: "Several people and an account manager; good for big projects, expensive and slower for small weekly changes." },
            { title: "Project freelancer", text: "Fine for one-off builds, but hard to reach later and new to your site every time." },
            { title: "Dedicated developer", text: "One person who knows your sites, on a fixed monthly plan, for steady ongoing work." },
          ],
        },
      },
    ],
    faqs: [
      { q: "Can a dedicated developer work on several of our sites?", a: "Yes. Your hours can be used across any of your WordPress sites, and for agencies, across your clients' sites." },
      { q: "Do you sign an NDA?", a: "Yes, before I get access to any of your sites or client details." },
    ],
  },

  "healthcare-seo": {
    sections: [
      {
        id: "compliance",
        nav: "Privacy and compliance",
        eyebrow: "Care with data",
        title: "Patient privacy",
        muted: "built into the site.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "Forms", text: "Appointment forms that collect only what's needed and send it securely, not to a shared inbox." },
            { title: "Tracking", text: "Analytics set up with consent and without sending health details to third parties." },
            { title: "Reviews", text: "Replies that never confirm someone is a patient or mention treatment." },
          ],
        },
        note: "Rules differ by country (for example HIPAA in the US and UK GDPR), so your compliance team has the final say on forms and tracking. I build to their requirements.",
      },
      {
        id: "practice-types",
        nav: "Practice types",
        eyebrow: "Who it's for",
        title: "Medical SEO services",
        muted: "for every kind of practice.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "Hospitals", text: "Many departments and doctors: structure, internal linking and schema matter most." },
            { title: "Clinics", text: "A few specialties in one or two locations: local SEO and treatment pages first." },
            { title: "Individual doctors", text: "A strong profile, reviews and a Google Business Profile where allowed." },
          ],
        },
      },
    ],
    faqs: [
      { q: "How long does healthcare SEO take?", a: "Local results can improve within weeks of Google Business Profile work; department and treatment pages usually take a few months to rank well." },
      { q: "Can you build a new hospital or clinic website?", a: "Yes. I build fast WordPress sites with doctor and department pages, booking forms and medical schema, as I did for Doctors Hospital Gujrat." },
    ],
  },

  "dental-seo": {
    sections: [
      {
        id: "website",
        nav: "Website essentials",
        eyebrow: "Your website",
        title: "What a dental website needs",
        muted: "to turn searches into bookings.",
        block: {
          kind: "cards",
          cols: 2,
          items: [
            { title: "Online booking", text: "A booking button on every page, linked to your practice software where possible." },
            { title: "Team pages", text: "Each dentist's qualifications, interests and a real photo; patients choose people, not logos." },
            { title: "Fees page", text: "Clear fees or price guides, which patients search for before calling." },
            { title: "New patient information", text: "What to expect, payment options, insurance or plans, and parking." },
          ],
        },
      },
      {
        id: "timeline",
        nav: "Timeline",
        eyebrow: "Timeline",
        title: "What to expect",
        muted: "month by month.",
        block: {
          kind: "steps",
          items: [
            { title: "Check", time: "Week 1", text: "Site, Google Business Profile and competitors reviewed." },
            { title: "Fix", time: "Weeks 2–4", text: "Profile, speed, titles and booking path fixed." },
            { title: "Build", time: "Months 2–3", text: "Treatment pages written or improved, reviews routine started." },
            { title: "Grow", time: "Ongoing", text: "More treatments, content and monthly reports." },
          ],
        },
      },
    ],
    faqs: [
      { q: "Should every treatment have its own page?", a: "Yes, for the treatments you want more of. A single “services” page can't rank for implants, Invisalign and whitening at the same time." },
    ],
  },

  "travel-seo": {
    sections: [
      {
        id: "process",
        nav: "Process",
        eyebrow: "Process",
        title: "How I work",
        muted: "with travel companies.",
        block: {
          kind: "steps",
          items: [
            { title: "Check", text: "Your trip pages, booking flow and competitors for your main tours." },
            { title: "Fix templates", text: "Trip templates, schema and speed fixed once, so every trip benefits." },
            { title: "Improve trips", text: "Your best-selling trips rewritten with detailed itineraries and answers." },
            { title: "Destinations", text: "Destination guides that link to the right trips." },
            { title: "Report", text: "Monthly report on rankings, traffic and enquiries from Search Console and GA4." },
          ],
        },
      },
      {
        id: "speed",
        nav: "Speed",
        eyebrow: "Speed",
        title: "Fast trip pages,",
        muted: "even with big galleries.",
        block: {
          kind: "prose",
          paragraphs: [
            "Travel sites live on photos, and photos are what make them slow. I convert galleries to WebP, size them for the screen, lazy-load everything below the fold and set up caching that doesn't break booking forms. Travellers comparing trips on a phone won't wait for a slow page.",
          ],
        },
      },
    ],
    faqs: [
      { q: "Does schema help travel sites?", a: "Yes. Trip, offer, FAQ and breadcrumb markup help Google understand your tours and can improve how they appear in results." },
    ],
  },

  "seo-services-uae": {
    faqs: [
      { q: "Do you work with businesses in Sharjah and other Emirates?", a: "Yes. I work with businesses across the UAE, with pages and Google Business Profiles for each area you serve." },
    ],
  },

  "wordpress-developer-dubai": {
    sections: [
      {
        id: "process",
        nav: "Process",
        eyebrow: "Process",
        title: "How a project",
        muted: "runs.",
        block: {
          kind: "steps",
          items: [
            { title: "WhatsApp or call", text: "We talk about the business, languages and features." },
            { title: "Quote in AED", text: "A fixed price, timeline and list of what's included." },
            { title: "Build on staging", text: "You see progress on a private staging site." },
            { title: "Launch", text: "Go live with SEO, Search Console and analytics set up." },
            { title: "Support", text: "Updates and changes after launch, on WhatsApp." },
          ],
        },
      },
    ],
    faqs: [
      { q: "Can you take over an existing website?", a: "Yes. I start with a quick review of the theme, plugins and hosting, then fix what's needed before making changes." },
    ],
  },

  "seo-services-uk": {
    sections: [
      {
        id: "process",
        nav: "Process",
        eyebrow: "Process",
        title: "How monthly SEO",
        muted: "works.",
        block: {
          kind: "steps",
          items: [
            { title: "Baseline", time: "Week 1", text: "Search Console and GA4 access, a crawl and the pages that matter most." },
            { title: "Technical fixes", time: "Weeks 2–3", text: "Indexing, speed, redirects and schema first." },
            { title: "Pages and local", time: "Months 1–2", text: "Service and location pages, Google Business Profile and UK citations." },
            { title: "Report", time: "Monthly", text: "A plain-English report from your own data." },
          ],
        },
      },
    ],
    faqs: [
      { q: "Do you write in UK English?", a: "Yes. Pages for UK businesses use UK spelling and UK terms." },
    ],
  },

  "wordpress-developer-uk": {
    sections: [
      {
        id: "process",
        nav: "Process",
        eyebrow: "Process",
        title: "How a UK project",
        muted: "runs.",
        block: {
          kind: "steps",
          items: [
            { title: "Call", text: "A short video call about goals, pages and features." },
            { title: "Fixed quote", text: "A price in GBP, a timeline and a scope in writing." },
            { title: "Build", text: "Progress on a private staging site you can check any time." },
            { title: "Launch", text: "Go live with SEO basics, Search Console and analytics." },
            { title: "Aftercare", text: "Updates and support, monthly or as needed." },
          ],
        },
      },
    ],
    faqs: [
      { q: "Do you offer ongoing WordPress support?", a: "Yes: updates, backups, fixes and changes on a monthly plan or as needed." },
    ],
  },

  "seo-expert-usa": {
    sections: [
      {
        id: "process",
        nav: "Process",
        eyebrow: "Process",
        title: "How monthly SEO",
        muted: "works for US businesses.",
        block: {
          kind: "steps",
          items: [
            { title: "Free check", time: "Day 1", text: "Your site and Google Business Profile reviewed; the biggest issues sent to you." },
            { title: "Baseline", time: "Week 1", text: "Search Console and GA4 access, a crawl and keyword research." },
            { title: "Fixes", time: "Weeks 2–4", text: "Technical problems and Google Business Profile first." },
            { title: "Pages", time: "Months 2–3", text: "Service and city pages built around real searches." },
            { title: "Report", time: "Monthly", text: "What moved, why, and what's next." },
          ],
        },
      },
    ],
    faqs: [
      { q: "Do you work with businesses in every US state?", a: "Yes. Local SEO works the same way anywhere in the US; I research the searches and directories for your city." },
    ],
  },

  "seo-expert-australia": {
    sections: [
      {
        id: "process",
        nav: "Process",
        eyebrow: "Process",
        title: "How monthly SEO",
        muted: "works.",
        block: {
          kind: "steps",
          items: [
            { title: "Baseline", time: "Week 1", text: "Search Console and GA4 access, a crawl and keyword research for Australian searches." },
            { title: "Fixes", time: "Weeks 2–3", text: "Technical problems and Google Business Profile first." },
            { title: "Pages", time: "Months 1–2", text: "Service and suburb pages in Australian English." },
            { title: "Report", time: "Monthly", text: "A plain-English report from your own data." },
          ],
        },
      },
    ],
    faqs: [
      { q: "Do you write in Australian English?", a: "Yes. Pages for Australian businesses use Australian spelling and terms." },
    ],
  },

  "wordpress-developer-australia": {
    sections: [
      {
        id: "process",
        nav: "Process",
        eyebrow: "Process",
        title: "How a project",
        muted: "runs.",
        block: {
          kind: "steps",
          items: [
            { title: "Call", text: "A short video call in your afternoon about goals and features." },
            { title: "Fixed quote", text: "A price in AUD, a timeline and a written scope." },
            { title: "Build", text: "Progress on a private staging site you can check any time." },
            { title: "Launch", text: "Go live with SEO basics, Search Console and analytics." },
            { title: "Aftercare", text: "Updates and support after launch." },
          ],
        },
      },
    ],
    faqs: [
      { q: "Can you work with my Australian hosting provider?", a: "Yes. I work with any host that offers standard WordPress hosting, SSH or cPanel access." },
    ],
  },

  "white-label-seo": {
    sections: [
      {
        id: "quality",
        nav: "Quality control",
        eyebrow: "Quality",
        title: "Quality you can put",
        muted: "your name on.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "No shortcuts", text: "No paid link schemes or spun content that could come back on your agency." },
            { title: "Checked before delivery", text: "Every audit and report reviewed against the client's own data before it reaches you." },
            { title: "Clear notes", text: "What was done and why, so your account managers can answer client questions." },
          ],
        },
      },
    ],
    faqs: [
      { q: "Can you join client calls?", a: "Yes, as part of your team under your brand if you want, or I can brief your account manager beforehand." },
    ],
  },

  "ecommerce-seo": {
    sections: [
      {
        id: "process",
        nav: "Process",
        eyebrow: "Process",
        title: "How ecommerce SEO",
        muted: "works with me.",
        block: {
          kind: "steps",
          items: [
            { title: "Store check", time: "Week 1", text: "Categories, products, filters and speed reviewed, with Search Console data." },
            { title: "Technical fixes", time: "Weeks 2–4", text: "Duplicates, filters, pagination and schema fixed first." },
            { title: "Categories", time: "Months 1–2", text: "Top categories rewritten and linked properly." },
            { title: "Products and content", time: "Ongoing", text: "Best sellers improved, buying guides added." },
            { title: "Report", time: "Monthly", text: "Traffic, rankings and revenue from search, from your own data." },
          ],
        },
      },
    ],
    faqs: [
      { q: "Do you offer ecommerce SEO audit services on their own?", a: "Yes. The store audit package is a one-off review with a prioritised fix list, which your team or I can then work through." },
    ],
  },

  "small-business-seo": {
    faqs: [
      { q: "Can you work with my existing web designer?", a: "Yes. I can send changes to your designer or make them myself if you'd prefer." },
    ],
  },

  "seo-website-migration": {
    sections: [
      {
        id: "recovery",
        nav: "Already migrated?",
        eyebrow: "Too late?",
        title: "Already migrated",
        muted: "and lost traffic?",
        block: {
          kind: "prose",
          paragraphs: [
            "It's often recoverable. I compare old and new URLs using Search Console, analytics and archived crawls, find the pages that lost rankings, add the missing redirects, restore dropped content and fix internal links. The sooner it's done, the more you get back.",
          ],
        },
      },
    ],
  },

  "outsourced-seo": {
    sections: [
      {
        id: "start",
        nav: "Getting started",
        eyebrow: "Getting started",
        title: "Getting started",
        muted: "is simple.",
        block: {
          kind: "steps",
          items: [
            { title: "Free strategy call", text: "Your business, customers and goals." },
            { title: "Proposal", text: "What I'd do first and a fixed monthly fee in USD." },
            { title: "Access", text: "Read access to Search Console and GA4, plus your site if fixes are included." },
            { title: "First month", text: "Audit, quick wins and a plan, with a report at the end." },
          ],
        },
      },
    ],
  },

  "custom-wordpress-plugin-development": {
    faqs: [
      { q: "Can you build a WooCommerce extension?", a: "Yes. Custom product options, pricing rules, checkout fields, order workflows and integrations, built with WooCommerce's own hooks." },
    ],
  },
};

/** Meta descriptions trimmed to 155 characters. */
export const metaFixes: Record<string, string> = {
  "hire-dedicated-wordpress-developer": "Hire a dedicated WordPress developer on a monthly plan: US/UK working-hour overlap, daily updates and 100+ sites of experience, for less than an agency.",
  "auto-repair-seo": "Auto repair SEO services that brought a German auto shop 137% more clicks in 28 days. Local SEO, Google Business Profile and service pages for shops.",
  "seo-services-uae": "SEO services in UAE for Dubai and Abu Dhabi businesses. Local SEO, Google Business Profile, English and Arabic keyword research. Same-day WhatsApp replies.",
  "seo-services-uk": "Affordable SEO services for UK businesses: technical audits, local SEO and content, priced in GBP, with UK working-day overlap and Search Console reports.",
  "seo-expert-gujrat": "SEO expert and web developer in Gujrat, Pakistan. Websites and SEO for local hospitals, shops and businesses, with results like Doctors Hospital Gujrat.",
  "ecommerce-seo": "Ecommerce SEO services for online stores: category and product page SEO, product schema, filter fixes and speed. Built by a WooCommerce developer.",
  "small-business-seo": "Small business SEO services that fit a small budget: Google Business Profile, local pages, reviews and on-page fixes. Monthly plans, no long contracts.",
  "seo-website-migration": "SEO website migration services for redesigns, domain moves and WordPress to Next.js. Redirect maps, crawl checks and monitoring to protect rankings.",
};
