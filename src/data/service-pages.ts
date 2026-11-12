/**
 * Long-form content for the service pages (each targets one "hire …" keyword).
 * Text may contain links written as [anchor text](/path/). Keep every claim true:
 * numbers come only from real Search Console data in site.ts.
 */
import type { Faq } from "./pages";
import { tools, type Tool } from "./site";

export type Item = { title: string; text: string; href?: string; linkLabel?: string };

export type Block =
  | { kind: "cards"; items: Item[]; cols?: 2 | 3 | 4 }
  | { kind: "stack"; items: Item[] }
  | { kind: "steps"; items: (Item & { time?: string })[] }
  | { kind: "proof"; slugs: string[] }
  | { kind: "projects"; slugs: string[] }
  | { kind: "prose"; paragraphs: string[] }
  | { kind: "toolcards"; items: { tool: Tool; text: string }[] }
  | { kind: "belt"; tools: Tool[] }
  | { kind: "metrics"; items: { name: string; short: string; good: string; text: string }[] }
  | { kind: "report"; period: string; rows: { label: string; before: string; after: string; change: string; note?: string }[]; covers: string[] }
  | { kind: "pricing"; text: string; items: Item[] }
  | { kind: "checklist"; items: { title: string; points: string[] }[] }
  | {
      kind: "audit";
      site: string;
      date: string;
      stats: { label: string; value: string; tone: "good" | "warn" | "neutral" }[];
      findings: { level: "High" | "Medium" | "Low" | "Passed"; text: string }[];
    }
  | { kind: "ticket"; rows: { label: string; text: string }[] }
  | { kind: "matrix"; cells: { title: string; sub: string; text: string }[] }
  | { kind: "packages"; items: { name: string; size: string; fit: string; points: string[]; featured?: boolean; price?: string }[] };

export type Section = {
  id: string;
  /** Short label for the "On this page" list */
  nav: string;
  eyebrow: string;
  title: string;
  muted?: string;
  lead?: string;
  block: Block;
  note?: string;
};

export type ServicePage = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  intro: string[];
  heroPoints: string[];
  /** Main call to action, repeated after the hero, mid-page and at the end */
  cta: string;
  formTitle: string;
  /** Line under the form title, when the default (fixed quote) doesn't fit */
  formSub?: string;
  types: string[];
  /** Index of the section after which the mid-page call to action appears */
  midAfter: number;
  sections: Section[];
  faqs: Faq[];
  final: { title: string; muted: string; text: string };
  updated: string;
  /** Fixed packages, used for Offer schema */
  offers?: { name: string; description: string }[];
};

const pricingNote =
  "Every quote is a fixed price in USD for an agreed scope, sent within 24 hours. Small fixes are hourly with an estimate first, and monthly work is a set number of hours.";

export const servicePages: Record<string, ServicePage> = {
  /* ───────────────────────────── SEO ───────────────────────────── */
  "seo-services": {
    metaTitle: "Hire an SEO Expert | Technical, On-Page & Local SEO Services",
    metaDescription:
      "Hire an SEO expert who shows real Search Console results. Technical audits, on-page and local SEO for small businesses in the US, UK and Australia.",
    h1: "Hire an SEO Expert Who Shows You Real Search Console Results",
    lead: "Hire an SEO expert who proves the work with data, not promises. I'm Umair Sadiq, an SEO specialist and WordPress developer. I fix technical problems, rework pages around what people actually search for, and report every month from your own Google Search Console.",
    intro: [
      "Most people who need an SEO expert have been burned at least once: a monthly fee, a PDF full of jargon and no change in traffic. I work the other way round. Before I change anything, I connect to your Search Console and Google Analytics, record where you stand today, and agree with you which pages and searches matter to the business. Every month after that you see the same numbers, with the dates on them, and whether they moved.",
      "I'm also a developer, and that matters more than it sounds. When an audit finds a slow template, broken canonical tags or a messy redirect chain, I fix it in the code myself instead of handing you a list for someone else. That's why clients in the US, UK and Australia hire me as their SEO expert and their WordPress developer at the same time.",
    ],
    heroPoints: ["Real Search Console results, with dates", "Technical, on-page and local SEO", "Monthly reports from your own data", "Free mini SEO audit to start"],
    cta: "Get a free mini SEO audit",
    formTitle: "Get a free mini SEO audit",
    formSub: "Free, no obligation: the five biggest issues on your site and how I’d fix them.",
    types: ["Free mini SEO audit", "Technical SEO audit", "Monthly SEO", "Local SEO", "Ecommerce SEO", "Website migration", "White-label SEO", "Something else"],
    midAfter: 3,
    updated: "2026-11-11",
    sections: [
      {
        id: "results",
        nav: "Results",
        eyebrow: "Results first",
        title: "Real Search Console results",
        muted: "from client sites.",
        lead: "These are unedited screenshots from my clients' own Google Search Console accounts. The dates are on every report.",
        block: { kind: "proof", slugs: ["jankowski-import-auto", "doctors-hospital-gujrat"] },
        note: "[Jankowski Import Auto](/work/jankowski-import-auto/), a German and European auto repair shop in Long Beach, California, moved from an average position of 13.6 to 9.6 in a 28-day comparison, which puts its average result on page one. Clicks grew from 30 to 71 and impressions by 238% over the same period. [Doctors Hospital Gujrat](/work/doctors-hospital-gujrat/) earned 578 clicks and 17K impressions with an average position of 6.6 between 6 October and 7 November 2026.",
      },
      {
        id: "services",
        nav: "SEO services",
        eyebrow: "SEO services",
        title: "What you can hire me for",
        muted: "as your SEO expert.",
        lead: "This page is the overview. Each service below can be booked on its own or as part of a monthly plan.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "Technical SEO audit", text: "A full crawl with Screaming Frog, checked against Search Console: indexing, crawl errors, redirects, canonicals, duplicate pages, Core Web Vitals and structured data. You get a prioritized list, and I can fix every item myself.", href: "/services/technical-seo-audit/", linkLabel: "See technical SEO audit services" },
            { title: "On-page SEO", text: "Titles, meta descriptions, headings, internal links and copy reworked around real search demand, page by page, without keyword stuffing." },
            { title: "Local SEO", text: "Google Business Profile, location pages, local schema and consistent business details across directories. If you need to hire a local SEO expert for a city or region, this is where most quick wins are." },
            { title: "Ecommerce SEO", text: "Category and product structure, product schema, filters that don't create thousands of duplicate URLs, and crawl budget for [WooCommerce stores](/services/woocommerce-development/)." },
            { title: "SEO-safe website migration", text: "Moving to a new domain, platform or URL structure without losing rankings: URL mapping, 301 redirects, canonical checks and close Search Console monitoring after launch." },
            { title: "White-label SEO for agencies", text: "Audits, technical fixes and on-page work delivered under your agency's name. Several of my projects already come through agencies such as Visiventro and Revenue Pulses." },
          ],
        },
        note: "Need the site itself fixed or rebuilt? See [WordPress development](/services/wordpress-development/) and [WordPress speed optimization](/services/wordpress-speed-optimization/).",
      },
      {
        id: "tools",
        nav: "Tools",
        eyebrow: "Tools",
        title: "The SEO tools I use",
        muted: "and what each one is for.",
        block: {
          kind: "toolcards",
          items: [
            { tool: tools.ahrefs, text: "Keyword research, search volumes and difficulty, competitor content gaps and backlink checks." },
            { tool: tools.semrush, text: "Position tracking and a second opinion on site audits and competitor keywords." },
            { tool: tools.screamingfrog, text: "Crawls the whole site like Google does, to find broken links, redirect chains, duplicate titles and missing tags." },
            { tool: tools.gsc, text: "The source of truth: which searches show your site, clicks, positions and indexing problems. Every report starts here." },
            { tool: tools.ga4, text: "What visitors do after they land: form leads, calls, purchases and which pages bring them." },
            { tool: tools.pagespeed, text: "Core Web Vitals in the lab and from real Chrome users, before and after every speed fix." },
          ],
        },
      },
      {
        id: "monthly",
        nav: "Monthly SEO",
        eyebrow: "Monthly SEO",
        title: "How monthly SEO works,",
        muted: "step by step.",
        block: {
          kind: "steps",
          items: [
            { title: "Baseline and audit", time: "Week 1", text: "Search Console and GA4 access, a full crawl, keyword research and a list of the pages that matter most for leads or sales." },
            { title: "Technical fixes", time: "Weeks 2–3", text: "Indexing, speed, redirects, schema and internal links come first, because content can't rank on a broken base." },
            { title: "On-page work", time: "Months 1–2", text: "Titles, headings and copy reworked on priority pages, and new pages planned where there's search demand but no page to match it." },
            { title: "Content and local", time: "Ongoing", text: "New pages or posts, Google Business Profile updates and local citations, depending on your plan." },
            { title: "Report and next steps", time: "Every month", text: "A plain-English report from your Search Console and GA4: what changed, why, and what I'm doing next." },
          ],
        },
      },
      {
        id: "report",
        nav: "Reporting",
        eyebrow: "Reporting",
        title: "What a monthly report",
        muted: "looks like.",
        lead: "This is the summary from a real report, using Jankowski Import Auto's Search Console numbers.",
        block: {
          kind: "report",
          period: "Last 28 days vs the previous 28 days, to 7 Nov 2026 · Google web search",
          rows: [
            { label: "Clicks", before: "30", after: "71", change: "+137%" },
            { label: "Impressions", before: "2.29K", after: "7.73K", change: "+238%" },
            { label: "Average CTR", before: "1.3%", after: "0.9%", change: "−0.4 pts", note: "Normal when impressions grow fast: new rankings start lower on the page." },
            { label: "Average position", before: "13.6", after: "9.6", change: "4 places up" },
          ],
          covers: [
            "Summary numbers from your Search Console, with dates",
            "Pages and searches that moved up or down",
            "Leads, calls or sales from GA4",
            "Technical issues found and fixed",
            "Work completed this month",
            "The plan for next month",
          ],
        },
      },
      {
        id: "industries",
        nav: "Industries",
        eyebrow: "Industries",
        title: "Industries I've worked in",
        muted: "on SEO and web projects.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "Healthcare", text: "A hospital website ranking for local healthcare searches: 578 clicks and a 6.6 average position in a month.", href: "/work/doctors-hospital-gujrat/" },
            { title: "Automotive", text: "An auto repair shop in California, from a 13.6 to a 9.6 average position in 28 days.", href: "/work/jankowski-import-auto/" },
            { title: "Fashion e-commerce", text: "A WooCommerce streetwear store with variations, sale pricing and a phone-friendly checkout.", href: "/work/aujwear/" },
            { title: "Food and recipes", text: "A recipe blog and shop set up with Rank Math and Site Kit for search from day one.", href: "/work/cooking-nations/" },
            { title: "Software and agencies", text: "Service pages for a software house offering web, app and SEO services.", href: "/work/visiventro/" },
            { title: "Web tools and gaming", text: "A Next.js calculator that earned 1.6K impressions in its first 10 days on a new domain.", href: "/work/palbreedhub/" },
          ],
        },
      },
      {
        id: "mini-audit",
        nav: "Free mini audit",
        eyebrow: "Free mini SEO audit",
        title: "Not sure what your site needs?",
        muted: "Start with a free mini audit.",
        lead: "Before you hire an SEO expert, you should know what's actually holding your site back. Send me your website and I'll check the basics that cause most ranking problems, then send you the five biggest issues and how I'd fix them.",
        block: {
          kind: "cards",
          cols: 4,
          items: [
            { title: "Indexing", text: "Are your important pages in Google at all, and are pages that shouldn't be there taking their place?" },
            { title: "Titles and headings", text: "Does each key page target a real search, with a title and H1 that match it?" },
            { title: "Speed and mobile", text: "How your key pages score on Core Web Vitals, on the phones most of your visitors use." },
            { title: "Schema and local signals", text: "Structured data, business details and Google Business Profile basics for local searches." },
          ],
        },
        note: "It's free and there's no obligation. If you'd rather fix the issues yourself or with your own developer, the list is yours to keep.",
      },
      {
        id: "pricing",
        nav: "Pricing",
        eyebrow: "Pricing",
        title: "What it costs to hire",
        muted: "an SEO expert.",
        block: {
          kind: "pricing",
          text: `SEO pricing depends on your site and your market, so I don't publish one number. After the free mini audit I quote a fixed price for one-off work, like an audit or a migration, or a fixed monthly fee for ongoing SEO. ${pricingNote}`,
          items: [
            { title: "Size of the site", text: "A 10-page local business site and a 2,000-product store need very different amounts of work." },
            { title: "Competition", text: "Ranking for a city-level service is quicker than ranking nationally against big brands." },
            { title: "Content needed", text: "Whether we optimize existing pages or need new ones written." },
            { title: "Technical state", text: "Sites with indexing or speed problems need fixes before content can work." },
            { title: "One-off or monthly", text: "Audits and migrations are fixed projects; growth needs steady monthly work." },
          ],
        },
      },
    ],
    faqs: [
      { q: "How do I hire an SEO expert I can trust?", a: "Ask for proof from Search Console with dates, not just rank-tracker screenshots, and ask who will make the technical fixes. On this page you can see real client reports, and I start with a free mini audit so you can judge the work before paying anything." },
      { q: "How long does SEO take to show results?", a: "Technical fixes can show within weeks, once Google recrawls the pages. Competitive searches usually take three to six months. Jankowski Import Auto's average position moved from 13.6 to 9.6 in a 28-day comparison, but every site starts from a different place." },
      { q: "Can I hire a local SEO expert for my city?", a: "Yes. I set up and optimize your Google Business Profile, location pages, local schema and directory listings, and track calls, website visits and direction requests from Google." },
      { q: "What's in the free mini SEO audit?", a: "I review your homepage and key pages for indexing, speed, titles and headings, schema and obvious technical issues, then send you the five biggest problems and how to fix them. There's no obligation." },
      { q: "Can you work with my developer or agency?", a: "Yes. I can hand a prioritized list to your developer or make the fixes myself. Agencies can hire me for white-label SEO under their own brand." },
      { q: "Do you guarantee first-place rankings?", a: "No. Nobody controls Google's rankings, and anyone who guarantees the top spot is guessing. I guarantee the work: clear fixes, honest reporting and the numbers from your own Search Console." },
      { q: "Do you work as a freelance SEO expert for UK clients?", a: "Yes. I work remotely with clients in the UK, US and Australia. I'm online from 9 AM to 2 AM Pakistan time, which covers the whole UK working day." },
    ],
    final: { title: "Need an SEO expert?", muted: "Start with a free mini audit.", text: "Send me your website and goals. I'll reply with the five biggest issues I find and how I'd fix them, free." },
  },

  /* ─────────────────────────── WooCommerce ─────────────────────────── */
  "woocommerce-development": {
    metaTitle: "Hire a WooCommerce Developer | Stores, Plugins & Checkout Fixes",
    metaDescription:
      "Hire a WooCommerce developer for new stores, custom plugins, payment gateways and checkout fixes. Fast, SEO-ready online stores built on WordPress.",
    h1: "Hire a WooCommerce Developer to Build, Fix or Scale Your Store",
    lead: "Hire a WooCommerce developer who builds stores that load fast, show up on Google and are easy to run. I'm Umair Sadiq. I build new WooCommerce stores, write custom plugins, connect payments and shipping, and fix the checkout problems that cost you sales.",
    intro: [
      "WooCommerce runs on WordPress, so it can do almost anything a store needs. That flexibility is also how stores end up slow and fragile: thirty plugins doing one job each, a theme fighting the checkout, and nobody sure which update is safe. When you hire me, I keep the store lean, with the right extensions, custom code where it saves weight, and a setup your team can run every day without calling a developer.",
      "Because I also do SEO, product and category pages are built to be found: clean URLs, product schema, fast images and proper internal links. You get one person for the build, the fixes and the search side, from the first product to the thousandth order.",
    ],
    heroPoints: ["New stores, fixes and custom plugins", "Payments, shipping and checkout set up right", "Product SEO and schema included", "Fixed quote in USD within 24 hours"],
    cta: "Get a store quote",
    formTitle: "Get a store quote",
    types: ["New WooCommerce store", "Fix my store or checkout", "Custom WooCommerce plugin", "Payments & shipping setup", "Speed up my store", "Move my store to WooCommerce", "Dedicated monthly developer", "Something else"],
    midAfter: 3,
    updated: "2026-11-11",
    sections: [
      {
        id: "builds",
        nav: "Store builds",
        eyebrow: "Store builds",
        title: "New WooCommerce stores,",
        muted: "built to sell.",
        block: {
          kind: "cards",
          cols: 2,
          items: [
            { title: "Store setup from scratch", text: "Products, variations, categories, attributes, taxes, coupons and order emails, configured properly from the start." },
            { title: "Design that fits your brand", text: "A custom theme or a lean Elementor build, with product and category pages designed for phones first." },
            { title: "Moves from Shopify, Wix or an old store", text: "Products, customers and orders moved across, with 301 redirects so your Google rankings come with you." },
            { title: "A store you can run yourself", text: "Stock, orders, coupons and shipping managed from the dashboard. I show you how before handover." },
          ],
        },
        note: "See a store I built: [AUJ Wear, a WooCommerce streetwear store](/work/aujwear/).",
      },
      {
        id: "plugins",
        nav: "Custom plugins",
        eyebrow: "Custom plugins",
        title: "Custom WooCommerce plugins",
        muted: "when an extension won't do.",
        lead: "People usually hire a WooCommerce plugin developer when the available extensions are close but not quite right. I write custom plugins in PHP that use WooCommerce's own hooks, so they keep working through updates.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "Product options and types", text: "Custom fields, add-ons, bundles and product types your catalog needs." },
            { title: "Pricing and discount rules", text: "Tiered, wholesale, role-based or quantity pricing without stacking three plugins." },
            { title: "Integrations", text: "Connect orders and stock to your CRM, inventory, accounting or shipping software through their APIs." },
            { title: "Checkout fields and workflows", text: "Extra fields, conditional logic, custom order statuses and emails." },
            { title: "Admin tools and exports", text: "Reports, bulk edits and CSV exports built around how your team works." },
            { title: "Clean, update-safe code", text: "Your feature lives in its own plugin, following WordPress coding standards, so theme changes don't break it." },
          ],
        },
      },
      {
        id: "payments",
        nav: "Payments & shipping",
        eyebrow: "Payments & shipping",
        title: "Payment and shipping integrations,",
        muted: "set up right.",
        block: {
          kind: "cards",
          cols: 2,
          items: [
            { title: "Payment gateways", text: "Stripe, PayPal, card processors, local gateways and cash on delivery, tested end to end with real test orders." },
            { title: "Shipping zones and rates", text: "Flat, weight-based and free-shipping thresholds, local pickup and carrier rates where your carrier supports them." },
            { title: "Taxes", text: "US sales tax and UK VAT set up in WooCommerce's tax settings or with a tax extension, so prices and invoices are right." },
            { title: "Order emails that arrive", text: "Branded order emails sent through proper SMTP, so confirmations don't land in spam." },
          ],
        },
      },
      {
        id: "checkout",
        nav: "Checkout fixes",
        eyebrow: "Checkout & cart",
        title: "Checkout and cart fixes",
        muted: "that stop lost sales.",
        block: {
          kind: "stack",
          items: [
            { title: "Checkout errors and failed payments", text: "I trace the error through the logs, the gateway and the plugins until I find the cause, then fix it and test with real test payments." },
            { title: "Carts that empty or don't update", text: "Usually caching set up the wrong way. Cart, checkout and account pages must never be cached; I make sure they aren't." },
            { title: "Too many fields and steps", text: "Every extra field costs sales. I remove what you don't need and keep the checkout short, especially on phones." },
            { title: "Problems after updates", text: "Plugin conflicts are found on a staging copy, fixed, and only then pushed to your live store." },
          ],
        },
      },
      {
        id: "speed",
        nav: "Speed",
        eyebrow: "Speed for stores",
        title: "Fast stores sell more,",
        muted: "so speed is part of the build.",
        block: {
          kind: "prose",
          paragraphs: [
            "Stores are harder to speed up than brochure sites, because carts, accounts and checkout can't be cached like normal pages. I set up caching that leaves those pages out, compress and lazy-load product images, stop scripts from loading on pages that don't use them, and clean up the database: old sessions, expired transients and post revisions.",
            "For a store that's already slow, my [WordPress speed optimization service](/services/wordpress-speed-optimization/) starts with a free speed check and ends with a before-and-after report.",
          ],
        },
      },
      {
        id: "product-seo",
        nav: "Product SEO",
        eyebrow: "Product SEO",
        title: "Product SEO and schema,",
        muted: "built in.",
        block: {
          kind: "cards",
          cols: 2,
          items: [
            { title: "Product schema", text: "Price, availability and real reviews as structured data, so Google can show rich results for your products." },
            { title: "Category pages that rank", text: "Unique intro text, clean headings and filters that don't create thousands of duplicate URLs." },
            { title: "Clean URLs and canonicals", text: "One URL per product, variations handled properly, and canonical tags that point Google to the right page." },
            { title: "Search Console from day one", text: "Sitemaps submitted and product reports checked, so indexing problems show up early." },
          ],
        },
        note: "For ongoing store SEO, see my [SEO services](/services/seo-services/), which include ecommerce SEO.",
      },
      {
        id: "dedicated",
        nav: "Dedicated developer",
        eyebrow: "Dedicated developer",
        title: "Hire a dedicated WooCommerce developer,",
        muted: "monthly.",
        lead: "Some stores need a developer every week: new products and landing pages, plugin updates tested before they go live, small features and quick fixes. A monthly plan gives you a dedicated WooCommerce developer for a set number of hours.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "Updates and testing", text: "WordPress, WooCommerce and plugin updates tested on staging first." },
            { title: "Features and fixes", text: "New sections, landing pages, small features and bug fixes as you need them." },
            { title: "Priority replies", text: "Online from 9 AM to 2 AM Pakistan time, with a log of everything done each month." },
          ],
        },
      },
      {
        id: "case-study",
        nav: "Case study",
        eyebrow: "Case study",
        title: "WooCommerce stores",
        muted: "I've built.",
        block: { kind: "projects", slugs: ["aujwear", "cooking-nations"] },
        note: "AUJ Wear is a Pakistani streetwear brand selling graphic, embroidered and plain oversized tees. The store runs on WooCommerce with size and color variations, sale pricing, collection pages and LiteSpeed caching. Cooking Nations combines a recipe blog with a WooCommerce shop for chef knives.",
      },
      {
        id: "pricing",
        nav: "Pricing",
        eyebrow: "Pricing",
        title: "What it costs to hire",
        muted: "a WooCommerce developer.",
        block: {
          kind: "pricing",
          text: `A store's price depends on what it has to do, so I quote each one. ${pricingNote}`,
          items: [
            { title: "Products and variations", text: "Ten products and a thousand products with variations are different jobs, mainly in setup and import." },
            { title: "Payments and shipping", text: "One gateway and flat shipping is quick; several gateways, carriers and tax rules take longer." },
            { title: "Custom features", text: "A custom plugin, integration or checkout workflow adds build and testing time." },
            { title: "Design", text: "Building from your Figma file is quicker than designing every page from scratch." },
            { title: "Migration", text: "Moving products, customers and orders from another platform, with redirects." },
          ],
        },
      },
    ],
    faqs: [
      { q: "How much does it cost to hire a WooCommerce developer?", a: "It depends on the number of products, payment and shipping setup, custom features and design. Send me the details and you'll get a fixed quote in USD within 24 hours." },
      { q: "Can you fix my existing WooCommerce store?", a: "Yes. I start with a short review of the theme, plugins, hosting and checkout, tell you what's wrong, and fix it on a staging copy before it goes live." },
      { q: "Do you build custom WooCommerce plugins?", a: "Yes. I write custom plugins in PHP for product options, pricing rules, integrations, checkout fields and admin tools, using WooCommerce's own hooks so they survive updates." },
      { q: "Can you move my store from Shopify or Wix to WooCommerce?", a: "Yes. Products, customers and orders are moved across, and every old URL gets a 301 redirect so you keep your Google rankings." },
      { q: "Which payment gateways can you set up?", a: "Stripe, PayPal, card processors, local gateways and cash on delivery, plus any gateway that offers a WooCommerce extension or an API." },
      { q: "Can I hire a dedicated WooCommerce developer monthly?", a: "Yes. A monthly plan gives you a set number of hours for updates, features and fixes, with priority replies during your working day." },
      { q: "Will my store be SEO-friendly?", a: "Yes. Product schema, clean URLs, fast images, category structure and Search Console setup are part of every store I build." },
    ],
    final: { title: "Ready to hire a", muted: "WooCommerce developer?", text: "Tell me about your store. You'll get a fixed quote in USD, a timeline and a clear list of what's included within 24 hours." },
  },

  /* ─────────────────────────── Speed ─────────────────────────── */
  "wordpress-speed-optimization": {
    metaTitle: "WordPress Speed Optimization Service | Pass Core Web Vitals",
    metaDescription:
      "Slow WordPress site? I fix Core Web Vitals, LCP and INP with WP Rocket, LiteSpeed, image and code fixes. Before and after PageSpeed reports included.",
    h1: "WordPress Speed Optimization That Passes Core Web Vitals",
    lead: "My WordPress speed optimization service fixes the real causes of a slow site: heavy images, missing caching, render-blocking scripts, bloated plugins and slow hosting. I'm Umair Sadiq, a WordPress developer, and I measure every page before and after, so you see exactly what changed.",
    intro: [
      "A slow site costs you twice: visitors leave before the page loads, and Google uses Core Web Vitals as part of how it ranks pages. Installing a caching plugin and hoping is how most speed jobs end, and why so many sites still fail. I find what is actually slow on your pages, fix that at the source, and prove it with the same tests before and after.",
      "Because I build WordPress sites for a living, I can fix the theme and plugin code itself, not just the settings. That's the difference between a better score on the homepage and a site that's fast on every template.",
    ],
    heroPoints: ["Before and after PageSpeed reports", "LCP, INP and CLS fixed at the source", "WP Rocket, LiteSpeed or NitroPack set up right", "Free speed check to start"],
    cta: "Get a free speed check",
    formTitle: "Get a free speed check",
    formSub: "Free: I test your key pages and tell you what’s slowing them down and how I’d fix it.",
    types: ["Free speed check", "Speed up my site", "Fix Core Web Vitals", "Speed up my WooCommerce store", "Speed + hosting move", "Something else"],
    midAfter: 2,
    updated: "2026-11-11",
    sections: [
      {
        id: "before-after",
        nav: "Before & after",
        eyebrow: "Before & after",
        title: "Before and after PageSpeed scores,",
        muted: "on every job.",
        lead: "Every job starts and ends with the same tests on the same pages, on mobile and desktop. Your before-and-after report shows:",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "PageSpeed score", text: "Mobile and desktop performance scores from PageSpeed Insights, for your key templates." },
            { title: "Largest Contentful Paint", text: "How long the main content takes to appear, the metric most sites fail." },
            { title: "Interaction to Next Paint", text: "How quickly the page responds to taps and clicks." },
            { title: "Cumulative Layout Shift", text: "How much the page jumps around while it loads." },
            { title: "Server response time", text: "How fast your hosting answers, before anything else can start." },
            { title: "Page weight and requests", text: "How many files and kilobytes each page loads, before and after." },
          ],
        },
      },
      {
        id: "causes",
        nav: "What slows it down",
        eyebrow: "The causes",
        title: "What slows WordPress down",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "Oversized images", text: "Photos uploaded at 4,000 pixels wide and shown at 400, in JPEG instead of WebP." },
            { title: "No caching, or the wrong caching", text: "Every visit rebuilt from the database, or a cache that breaks carts and forms." },
            { title: "Render-blocking CSS and JavaScript", text: "Files the browser must download before it can show anything." },
            { title: "Plugin and page-builder bloat", text: "Every plugin adds files to every page, even pages that don't use it." },
            { title: "Slow hosting", text: "Cheap shared servers and old PHP versions that answer slowly before anything loads." },
            { title: "Third-party scripts", text: "Chat widgets, trackers, embedded videos and web fonts loading from other servers." },
          ],
        },
      },
      {
        id: "fixes",
        nav: "What I fix",
        eyebrow: "What I fix",
        title: "What I fix,",
        muted: "and how.",
        block: {
          kind: "stack",
          items: [
            { title: "Images", text: "Converted to WebP, resized to the size they're shown at, lazy-loaded below the fold, and the main hero image preloaded so it appears first." },
            { title: "Caching", text: "Page, browser and object caching with WP Rocket, LiteSpeed Cache or NitroPack, set up so carts, checkouts and forms keep working, plus Cloudflare where it helps." },
            { title: "Scripts and CSS", text: "JavaScript deferred or delayed until it's needed, unused CSS removed, plugin files unloaded on pages that don't use them, and fonts hosted locally." },
            { title: "Hosting and server", text: "Current PHP version, compression and HTTP/2 or HTTP/3. If the hosting is the bottleneck, I tell you and can move the site for you." },
            { title: "Database", text: "Old revisions, expired transients, spam comments and oversized autoloaded options cleaned out, so every query is faster." },
          ],
        },
      },
      {
        id: "core-web-vitals",
        nav: "Core Web Vitals",
        eyebrow: "Core Web Vitals",
        title: "Core Web Vitals,",
        muted: "explained simply.",
        lead: "Google's three Core Web Vitals measure how a page feels to a real visitor. These are Google's own thresholds for a good score:",
        block: {
          kind: "metrics",
          items: [
            { name: "Largest Contentful Paint", short: "LCP", good: "2.5 s or less", text: "How long until the biggest thing on screen, usually the hero image or headline, has loaded." },
            { name: "Interaction to Next Paint", short: "INP", good: "200 ms or less", text: "How quickly the page reacts when someone taps a button, opens a menu or types." },
            { name: "Cumulative Layout Shift", short: "CLS", good: "0.1 or less", text: "How much things move around while loading, like a button that jumps just as you tap it." },
          ],
        },
        note: "Google judges Core Web Vitals on data from real Chrome users over the last 28 days, so after the fixes the Search Console report turns green gradually, not overnight. I check it again once the new data is in.",
      },
      {
        id: "process",
        nav: "Process",
        eyebrow: "Process",
        title: "How a speed job works,",
        muted: "start to finish.",
        block: {
          kind: "steps",
          items: [
            { title: "Free speed check", time: "Day 1", text: "I test your key pages and tell you what's slowing them down and what I'd fix." },
            { title: "Baseline report", time: "Day 1–2", text: "PageSpeed, Core Web Vitals and page weight recorded for each template." },
            { title: "Fixes on staging", time: "Days 2–5", text: "A full backup, then images, caching, scripts and database fixed on a staging copy." },
            { title: "Test and launch", time: "Day 5–6", text: "Forms, carts and checkout tested, then the changes go live." },
            { title: "After report", time: "Day 6–7", text: "The same tests again, side by side, plus a Search Console check after 28 days." },
          ],
        },
        note: "Need new pages or a rebuild too? See [WordPress development](/services/wordpress-development/). Speed is also part of every [technical SEO audit](/services/technical-seo-audit/).",
      },
      {
        id: "pricing",
        nav: "Pricing",
        eyebrow: "Pricing",
        title: "What WordPress speed",
        muted: "optimization costs.",
        block: {
          kind: "pricing",
          text: `After the free speed check you get a fixed price for the whole job. ${pricingNote}`,
          items: [
            { title: "Number of templates", text: "Home, service, blog, product and checkout pages each need their own fixes." },
            { title: "Page builder", text: "Elementor and similar builders need more work than a lean theme." },
            { title: "Plugins", text: "More plugins means more files to unload and more conflicts to test." },
            { title: "Store or not", text: "WooCommerce stores need careful caching around cart and checkout." },
            { title: "Hosting", text: "If a hosting move is needed, it's quoted as part of the job." },
          ],
        },
      },
    ],
    faqs: [
      { q: "How much does WordPress speed optimization cost?", a: "It depends on the number of templates, the page builder, plugins and whether it's a store. After the free speed check you get a fixed price in USD for the whole job." },
      { q: "Will my site pass Core Web Vitals?", a: "That's the goal of every job, and most of it is in my control. On very slow hosting I'll tell you upfront if a move is needed to pass. Google updates its field data over 28 days, so Search Console turns green gradually." },
      { q: "Will speed optimization break my site?", a: "No. I take a full backup and make the changes on a staging copy, then test forms, carts and checkout before anything goes live." },
      { q: "Which caching plugin is best: WP Rocket, LiteSpeed or NitroPack?", a: "It depends on your hosting. LiteSpeed Cache is best on LiteSpeed servers, WP Rocket works well almost anywhere, and NitroPack suits sites that need a hosted optimization service. I set up the one that fits your server." },
      { q: "Why is my PageSpeed score different every time I test?", a: "Lab tests vary with network and server load from run to run. That's why I test the same pages several times and compare averages, and why Google's real-user data matters more than one score." },
      { q: "Does site speed help SEO?", a: "Yes. Core Web Vitals are part of Google's page experience signals, and faster pages keep more visitors, which helps leads and sales as well as rankings." },
      { q: "Do I need to change my hosting?", a: "Not always. Many sites get fast on their current hosting after the fixes. If your server's response time is the bottleneck, I'll show you the numbers and recommend a move." },
    ],
    final: { title: "Is your WordPress site slow?", muted: "Get a free speed check.", text: "Send me your website. I'll test your key pages and tell you what's slowing them down and how I'd fix it, free." },
  },

  /* ─────────────────────────── React / Next.js ─────────────────────────── */
  "nextjs-react-development": {
    metaTitle: "Hire a Freelance React & Next.js Developer | Fast Web Apps",
    metaDescription:
      "Hire a freelance React and Next.js developer for fast marketing sites, dashboards and web apps. Server-rendered, SEO-friendly and built with TypeScript.",
    h1: "Hire a Freelance React and Next.js Developer",
    lead: "Hire a freelance React developer who builds fast, SEO-friendly websites and web apps with Next.js and TypeScript. I'm Umair Sadiq. I built PalBreedHub, a Next.js app that earned 1.6K Google impressions in its first 10 days, and the site you're reading now.",
    intro: [
      "React is great at interfaces and bad at being found, unless it's set up properly. A plain single-page app sends Google an empty HTML shell, and many projects only discover that after launch. I build with Next.js, so every page is rendered as real HTML, with its own title, description, structured data and sitemap entry, and still feels like an app once it loads.",
      "I work as a remote React developer for clients in the US and UK, on new builds and on existing codebases. You talk to the person writing the code, and you get TypeScript, clean components and a project another developer can pick up later.",
    ],
    heroPoints: ["Next.js, React and TypeScript", "Server-rendered and SEO-friendly", "Remote, with long overlap with US and UK hours", "Fixed quote in USD within 24 hours"],
    cta: "Discuss your app",
    formTitle: "Discuss your app",
    types: ["Marketing website", "Web app or dashboard", "SaaS front end", "Headless WordPress + Next.js", "Work on my existing React app", "Something else"],
    midAfter: 2,
    updated: "2026-11-11",
    sections: [
      {
        id: "what-i-build",
        nav: "What I build",
        eyebrow: "What I build",
        title: "What I build",
        muted: "with React and Next.js.",
        block: {
          kind: "stack",
          items: [
            { title: "Marketing websites", text: "Fast, static or server-rendered sites that score well in PageSpeed, rank in Google and are easy to update." },
            { title: "Dashboards and internal tools", text: "Tables, charts, filters, forms and logins, connected to your APIs and databases." },
            { title: "SaaS front ends", text: "TypeScript components, design systems, onboarding flows, settings and billing pages." },
            { title: "Headless WordPress", text: "Your team keeps editing in WordPress, and visitors get a fast Next.js front end." },
            { title: "Interactive tools", text: "Calculators, configurators and in-browser tools like my free online microphone tester." },
          ],
        },
      },
      {
        id: "why-nextjs",
        nav: "Why Next.js",
        eyebrow: "Next.js and SEO",
        title: "Why Next.js is good for SEO",
        block: {
          kind: "cards",
          cols: 2,
          items: [
            { title: "Real HTML for Google", text: "Pages are rendered on the server or at build time, so search engines see the full content without running JavaScript." },
            { title: "Metadata on every page", text: "Titles, descriptions, canonical tags, Open Graph images and hreflang set per page from your data." },
            { title: "Fast by default", text: "Code splitting, optimized images and fonts keep Core Web Vitals green without extra plugins." },
            { title: "Structured data and sitemaps", text: "JSON-LD schema and sitemaps generated at build time, so they never go out of date." },
          ],
        },
        note: "This site is built that way: a Next.js static export hosted on Hostinger, with schema, sitemap and hreflang generated on every build.",
      },
      {
        id: "stack",
        nav: "Stack",
        eyebrow: "Stack",
        title: "The stack",
        muted: "I build with.",
        block: { kind: "belt", tools: [tools.next, tools.react, tools.ts, tools.js, tools.tailwind, tools.node, tools.firebase, tools.php, tools.mysql, tools.vercel, tools.cloudflare, tools.git, tools.github, tools.figma] },
        note: "TypeScript everywhere, Tailwind CSS or plain CSS depending on the project, Firebase or your own API for data, and hosting on Vercel, Cloudflare or your own server.",
      },
      {
        id: "projects",
        nav: "Projects",
        eyebrow: "Projects",
        title: "React and Next.js projects",
        muted: "live right now.",
        block: { kind: "projects", slugs: ["palbreedhub", "mic-testing-tool"] },
        note: "[PalBreedHub](/work/palbreedhub/) is a Palworld breeding calculator with reverse search, built with Next.js and SEO-first from launch. On a brand-new domain it earned 1.6K impressions and 9 clicks in Google Search Console between 29 October and 7 November 2026. The [Mic Testing Tool](/work/mic-testing-tool/) is a React app that tests, records and plays back your microphone, with recordings kept in the browser.",
      },
      {
        id: "how-i-work",
        nav: "How I work",
        eyebrow: "How I work",
        title: "What you get when you hire",
        muted: "a React developer like me.",
        block: {
          kind: "cards",
          cols: 2,
          items: [
            { title: "TypeScript and clean components", text: "Typed props and data, small reusable components and a folder structure another developer can understand on day one." },
            { title: "Performance budgets", text: "Images, fonts and JavaScript kept in check from the start, so Core Web Vitals stay green as the project grows." },
            { title: "Accessible by default", text: "Semantic HTML, keyboard navigation, labels and focus states, not bolted on at the end." },
            { title: "Preview links and Git", text: "Every stage is visible on a preview link, and the code lives in your Git repository with clear commit history." },
            { title: "SEO built in", text: "Metadata, structured data, sitemaps and redirects handled as part of the build, from the same person who does SEO." },
            { title: "A clean handover", text: "A README covering setup, deployment and content updates, so you're never locked in to me." },
          ],
        },
      },
      {
        id: "engagement",
        nav: "Engagement",
        eyebrow: "Ways to work together",
        title: "Engagement models",
        muted: "that fit your project.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "Fixed project", text: "A website or app with an agreed scope, one fixed price in USD and milestones you approve as we go." },
            { title: "Hourly", text: "For features, fixes and work on an existing codebase. Estimate first, time tracked, no surprises." },
            { title: "Monthly", text: "A set block of hours each month as your remote React developer, with priority replies." },
          ],
        },
      },
      {
        id: "pricing",
        nav: "Pricing",
        eyebrow: "Pricing",
        title: "What it costs to hire",
        muted: "a React developer.",
        block: {
          kind: "pricing",
          text: `Every project is quoted on its scope. ${pricingNote}`,
          items: [
            { title: "Pages and screens", text: "A five-page marketing site and a 30-screen app are different jobs." },
            { title: "Data and integrations", text: "APIs, databases, payments and third-party services each add work." },
            { title: "Accounts and roles", text: "Logins, permissions and user settings add build and testing time." },
            { title: "Design", text: "Building from your Figma file is quicker than designing from scratch." },
            { title: "Migration", text: "Moving an existing site to Next.js with SEO-safe redirects." },
          ],
        },
        note: "Moving an existing site to Next.js? I map every URL and set up 301 redirects so you keep your rankings, as part of my [SEO services](/services/seo-services/).",
      },
    ],
    faqs: [
      { q: "Why hire a freelance React developer instead of an agency?", a: "You work directly with the person writing the code, decisions are faster, and you pay for development rather than account management. For larger teams I can also work alongside your developers." },
      { q: "Can I hire a remote React developer who overlaps with my time zone?", a: "Yes. I'm online from 9 AM to 2 AM Pakistan time, which covers the whole UK working day and most of the US East Coast working day." },
      { q: "Do you use Next.js or plain React?", a: "Next.js for anything that needs to be found on Google or load fast, which is most projects. Plain React for tools that live behind a login or inside another app." },
      { q: "Can you work on an existing React codebase?", a: "Yes. I start by reading the code and running it locally, then fix bugs, add features or refactor in small, reviewed steps." },
      { q: "Is Next.js good for SEO?", a: "Yes. Pages are rendered as real HTML with their own metadata, structured data and sitemap entries. PalBreedHub earned 1.6K Google impressions in its first 10 days on a new domain." },
      { q: "Can you connect Next.js to WordPress?", a: "Yes. With headless WordPress your team keeps editing in WordPress and visitors get a fast Next.js front end, using the WordPress REST API." },
      { q: "How much does it cost to hire a React developer?", a: "It depends on the number of pages or screens, data, integrations and design. Send me the details and you'll get a fixed quote in USD within 24 hours." },
    ],
    final: { title: "Have an app or site in mind?", muted: "Let's discuss it.", text: "Tell me what you're building. You'll get a plan, a timeline and a fixed quote in USD within 24 hours." },
  },

  /* ─────────────────────────── Flutter ─────────────────────────── */
  "flutter-app-development": {
    metaTitle: "Hire a Flutter App Developer | Android & iOS From One Codebase",
    metaDescription:
      "Hire a Flutter app developer to ship Android and iOS apps from one codebase. Firebase, REST APIs and app store launch included.",
    h1: "Hire a Flutter App Developer for Android and iOS",
    lead: "Hire a Flutter app developer to build one app that runs on both Android and iOS. I'm Umair Sadiq. I build Flutter apps in Dart, connect them to Firebase or your own REST API, and help you through the Google Play and App Store launch.",
    intro: [
      "Building two native apps means two codebases, two sets of bugs and two bills. Flutter compiles one Dart codebase into native apps for both platforms, so features ship to Android and iOS at the same time and look the same on both. For most business apps, MVPs and companion apps, that's the fastest and most affordable way to launch.",
      "Because I'm also a web developer, I can build your app and the website or API behind it, and connect the two properly. One freelance mobile app developer for the whole thing, instead of three people who have to agree on how it fits together.",
      "I start every app the same way: by agreeing on the smallest version worth launching. Fewer screens done well beat a long feature list that ships late, and real users tell you what to build next far better than a plan written before launch.",
    ],
    heroPoints: ["One codebase for Android and iOS", "Firebase or REST API backends", "App and website from one developer", "Help with Play Store and App Store launch"],
    cta: "Get an app estimate",
    formTitle: "Get an app estimate",
    types: ["New Flutter app", "App for my website or store", "MVP for a startup", "Firebase backend", "Update an existing app", "Something else"],
    midAfter: 2,
    updated: "2026-11-11",
    sections: [
      {
        id: "why-flutter",
        nav: "Why Flutter",
        eyebrow: "Why Flutter",
        title: "Why Flutter",
        muted: "for your app.",
        block: {
          kind: "cards",
          cols: 2,
          items: [
            { title: "One codebase, two platforms", text: "Android and iOS from the same Dart code, so features and fixes ship to both at once." },
            { title: "Native performance", text: "Flutter compiles to native code and draws its own interface, so scrolling and animations stay smooth." },
            { title: "Fast to build and change", text: "Hot reload shows changes in seconds, which keeps design rounds and fixes quick." },
            { title: "Lower cost to run", text: "One app to maintain, update and test instead of two." },
          ],
        },
      },
      {
        id: "app-types",
        nav: "App types",
        eyebrow: "App types",
        title: "Apps I build",
        muted: "with Flutter.",
        block: {
          kind: "stack",
          items: [
            { title: "Business and booking apps", text: "Appointments, services, customer accounts and push notifications for your customers." },
            { title: "Store companion apps", text: "An app connected to your WooCommerce store: products, cart, orders and offers." },
            { title: "Content and community apps", text: "News, guides, courses or member content pulled from your website or API." },
            { title: "Internal and field apps", text: "Forms, checklists, photos and offline-friendly tools for your team." },
            { title: "MVPs for startups", text: "A focused first version to test with real users before you invest in more." },
          ],
        },
      },
      {
        id: "backend",
        nav: "Firebase & APIs",
        eyebrow: "Firebase & APIs",
        title: "Firebase and API integration",
        block: {
          kind: "cards",
          cols: 2,
          items: [
            { title: "Firebase", text: "Sign-in with email, Google or Apple, Firestore database, file storage and push notifications with Cloud Messaging." },
            { title: "Your own REST API", text: "Connect to an existing backend, or I build one in PHP, Node.js or Python with FastAPI." },
            { title: "WordPress and WooCommerce", text: "Use the WordPress REST API so your app and website share the same content, products and users." },
            { title: "Analytics and crash reports", text: "Know which screens people use and catch crashes before reviews mention them." },
          ],
        },
      },
      {
        id: "every-app",
        nav: "What you get",
        eyebrow: "Included",
        title: "What you get",
        muted: "with every app.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "Source code you own", text: "The full Flutter project in your own Git repository, with clear setup notes." },
            { title: "Builds for both stores", text: "Signed Android and iOS builds ready for Google Play and the App Store." },
            { title: "Real-device testing", text: "Tested on Android phones and iPhones of different sizes, not just the simulator." },
            { title: "Clean architecture", text: "Screens, state and data kept separate, so new features don't break old ones." },
            { title: "Privacy and store rules", text: "Permission prompts, a privacy policy page and the data forms both stores ask for." },
            { title: "Support after launch", text: "Fixes for anything that slipped through, and help with the first updates after release." },
          ],
        },
      },
      {
        id: "app-and-website",
        nav: "App + website",
        eyebrow: "App + website",
        title: "Your app and website,",
        muted: "from one developer.",
        block: {
          kind: "prose",
          paragraphs: [
            "Most apps need a website too: a landing page that ranks, a privacy policy the stores require, and often an admin area or API. I build both, so the app, the website and the data behind them are designed together from the start.",
            "For a fast marketing site or web app, see [React and Next.js development](/services/nextjs-react-development/). For a site your team edits themselves, see [WordPress development](/services/wordpress-development/).",
          ],
        },
      },
      {
        id: "launch",
        nav: "Process to launch",
        eyebrow: "Process",
        title: "From idea",
        muted: "to the app stores.",
        block: {
          kind: "steps",
          items: [
            { title: "Plan", text: "Screens, features, data and the smallest version worth launching, agreed in writing." },
            { title: "Design", text: "Screens designed for both platforms, approved before the build starts." },
            { title: "Build and test", text: "Built in stages you can try on your own phone, tested on Android and iOS devices." },
            { title: "Beta", text: "Testers through Google Play internal testing and Apple TestFlight before launch." },
            { title: "Store launch", text: "Listings, screenshots and review submission on Google Play and the App Store, under your developer accounts." },
          ],
        },
        note: "You'll need your own developer accounts so the apps belong to you: Google Play charges a one-time $25 fee and the Apple Developer Program costs $99 a year.",
      },
      {
        id: "pricing",
        nav: "Pricing",
        eyebrow: "Pricing",
        title: "What it costs to hire",
        muted: "a Flutter app developer.",
        block: {
          kind: "pricing",
          text: `Every app is quoted on its scope. ${pricingNote}`,
          items: [
            { title: "Screens and features", text: "A five-screen app and a 40-screen app with accounts and payments are different jobs." },
            { title: "Backend", text: "Firebase is quickest; a custom API or integrations with existing systems take longer." },
            { title: "Design", text: "Working from your designs is quicker than designing every screen from scratch." },
            { title: "Offline and real-time", text: "Offline storage, sync and live updates add build and testing time." },
            { title: "Launch and updates", text: "Store setup, launch support and ongoing updates after release." },
          ],
        },
      },
    ],
    faqs: [
      { q: "How much does it cost to hire a Flutter app developer?", a: "It depends on the number of screens, features, backend and design. Send me the details and you'll get a fixed estimate in USD within 24 hours." },
      { q: "Is Flutter as good as native Android and iOS development?", a: "For most business apps, yes. Flutter compiles to native code and runs smoothly. Apps that rely heavily on very new platform-specific features may still need some native code, which Flutter supports." },
      { q: "Can you publish my app to Google Play and the App Store?", a: "Yes. I prepare the builds, listings and screenshots and submit them for review under your own developer accounts, so the apps are yours." },
      { q: "Can the app connect to my website or WooCommerce store?", a: "Yes. Through the WordPress REST API, the app can share content, products and users with your site." },
      { q: "How long does it take to build a Flutter app?", a: "A focused first version usually takes a few weeks to a few months, depending on screens and backend. The exact timeline is in your estimate." },
      { q: "Can I hire a freelance mobile app developer for an existing app?", a: "Yes. I can fix bugs, add features or update an existing Flutter app after reading through the code." },
      { q: "Will you maintain the app after launch?", a: "Yes. Monthly support covers updates for new Android and iOS versions, bug fixes and small features." },
    ],
    final: { title: "Planning an app?", muted: "Get an estimate.", text: "Tell me what the app should do. You'll get a plan, a timeline and a fixed estimate in USD within 24 hours." },
  },
  /* ─────────────────────────── Technical SEO audit ─────────────────────────── */
  "technical-seo-audit": {
    metaTitle: "Technical SEO Audit Services | Fixed-Price Audit in 5 Days",
    metaDescription:
      "Technical SEO audit services with a clear fix list: crawl errors, indexing, Core Web Vitals, schema and internal links. Fixed price, delivered in 5 days.",
    h1: "Technical SEO Audit Services With a Fix List You Can Act On",
    lead: "My SEO technical audit services find what stops Google from crawling, indexing and ranking your site, then turn it into a fix list your developer (or I) can work through. Fixed price, delivered in 5 working days. I'm Umair Sadiq, a technical SEO expert and WordPress developer.",
    intro: [
      "Most SEO audits are a 90-page export from a tool, sorted by warning colors, and nobody acts on them. A crawler can tell you 400 images are missing alt text. It can't tell you that one canonical tag is quietly removing your best service page from Google, or that a single line in robots.txt blocks every filter page in your store. Deciding what actually matters is the audit.",
      "I run the crawl, check it against your own Search Console data, and test the pages that make you money by hand. Every issue in the report says what's wrong, where, why it matters and exactly how to fix it, ranked by impact and effort. Because I'm also a developer, I can fix everything on the list for you if you want.",
    ],
    heroPoints: ["Fixed price, delivered in 5 working days", "Crawl + Search Console + manual checks", "Fix list ranked by impact and effort", "Optional: I fix it for you"],
    cta: "Order your audit",
    formTitle: "Order a technical SEO audit",
    formSub: "Fixed price quoted within 24 hours. Not ready yet? Choose the free mini audit instead.",
    types: ["Technical SEO audit", "Free mini SEO audit", "Audit + fixes", "Audit before a site migration", "Store or large site audit", "Something else"],
    midAfter: 3,
    updated: "2026-11-12",
    offers: [
      { name: "Small site technical SEO audit", description: "Up to 50 URLs. All 12 audit areas, prioritized fix list and crawl data, delivered in 5 working days." },
      { name: "Business site technical SEO audit", description: "Up to 500 URLs. All 12 areas plus internal linking and content-duplication review and a walkthrough call, delivered in 5 working days." },
      { name: "Store and large site technical SEO audit", description: "500+ URLs or ecommerce. Adds faceted navigation, product schema and crawl budget analysis." },
    ],
    sections: [
      {
        id: "covers",
        nav: "What it covers",
        eyebrow: "What the audit covers",
        title: "What my technical SEO audit services cover:",
        muted: "12 areas, every time.",
        lead: "Every audit checks the same 12 areas, so nothing depends on what a tool happens to flag. Each one is checked against your Search Console data, not just a crawl.",
        block: {
          kind: "checklist",
          items: [
            { title: "Crawling and access", points: ["robots.txt rules", "Blocked CSS and JavaScript", "Server errors and timeouts", "How deep key pages sit"] },
            { title: "Indexing", points: ["Pages in Google vs pages that should be", "noindex tags and headers", "“Crawled, not indexed” pages", "Soft 404s"] },
            { title: "Duplicates and canonicals", points: ["Canonicals pointing the wrong way", "HTTP/HTTPS and www versions", "Parameter and filter URLs", "Thin or duplicate pages"] },
            { title: "Redirects and status codes", points: ["Redirect chains and loops", "404s that still get links or traffic", "302s that should be 301s", "Internal links to redirects"] },
            { title: "Site structure and internal links", points: ["Orphan pages", "Clicks from the home page", "Anchor text", "Links into your money pages"] },
            { title: "Core Web Vitals and speed", points: ["LCP, INP and CLS from real users", "Slow templates", "Heavy images, scripts and fonts", "Server response time"] },
            { title: "Mobile rendering", points: ["Mobile layout and tap targets", "Content hidden on mobile", "Viewport and font sizes"] },
            { title: "JavaScript and rendering", points: ["Content that needs JavaScript to appear", "Links Google can't follow", "Rendered vs source HTML"] },
            { title: "Structured data", points: ["Schema present and valid", "Errors in Search Console enhancement reports", "Missing schema on key templates"] },
            { title: "Titles, descriptions and headings", points: ["Missing, duplicate or cut-off titles", "Meta descriptions", "One H1 per page and heading order"] },
            { title: "Sitemaps and international", points: ["XML sitemap matches indexable pages", "Sitemap in robots.txt and Search Console", "hreflang for multi-language sites"] },
            { title: "AI search readiness", points: ["AI crawlers allowed or blocked on purpose", "Business and person schema", "Clear answers AI tools can quote", "llms.txt"] },
          ],
        },
      },
      {
        id: "sample",
        nav: "Sample audit",
        eyebrow: "Sample audit",
        title: "A real audit summary,",
        muted: "from my own site.",
        lead: "This is the summary of a technical audit I ran on umairsadiq.com on 12 November 2026. Same checks you'd get, and yes, it found problems on my own site.",
        block: {
          kind: "audit",
          site: "umairsadiq.com",
          date: "Crawled 12 Nov 2026 · 22 indexable URLs from the XML sitemap",
          stats: [
            { label: "Pages crawled", value: "22", tone: "neutral" },
            { label: "Non-200 pages", value: "0", tone: "good" },
            { label: "Broken internal links", value: "0", tone: "good" },
            { label: "Correct canonicals", value: "22/22", tone: "good" },
            { label: "Titles over 60 characters", value: "6", tone: "warn" },
            { label: "Largest HTML page", value: "361 KB", tone: "warn" },
          ],
          findings: [
            { level: "Medium", text: "6 titles are over 60 characters and may be cut off in Google: three service pages and three case studies." },
            { level: "Low", text: "The home page HTML is 361 KB, mostly inline markup and structured data. Worth trimming for a faster first load." },
            { level: "Low", text: "The privacy policy meta description is 91 characters, shorter than it needs to be." },
            { level: "Passed", text: "robots.txt allows crawling and lists the sitemap. Every page returns 200 with one H1 and a self-referencing canonical. No images missing alt text. Arabic and Urdu pages carry hreflang." },
          ],
        },
      },
      {
        id: "ticket",
        nav: "From finding to fix",
        eyebrow: "From finding to fix",
        title: "Every issue becomes",
        muted: "a ticket you can act on.",
        lead: "A tool says “Title too long”. My report turns the same finding from the sample above into this:",
        block: {
          kind: "ticket",
          rows: [
            { label: "Issue", text: "Titles over 60 characters on 6 pages" },
            { label: "Where", text: "/services/woocommerce-development/, /services/flutter-app-development/, /services/wordpress-development/ and 3 case studies (full list in the sheet)" },
            { label: "Why it matters", text: "Google shortens titles at roughly 600 pixels, so the end of the title, often the offer or the brand, disappears from results and can cost clicks." },
            { label: "Fix", text: "Cut each title to about 55–60 characters with the main keyword first. Example: “Hire a WooCommerce Developer | Stores, Plugins & Checkout Fixes” (63) → “Hire a WooCommerce Developer | Stores & Checkout Fixes” (54)." },
            { label: "Priority", text: "Quick win: medium impact, low effort" },
            { label: "Owner", text: "Content editor · about 15 minutes" },
          ],
        },
      },
      {
        id: "priorities",
        nav: "What to fix first",
        eyebrow: "Priorities",
        title: "What to fix first:",
        muted: "impact versus effort.",
        lead: "Every finding lands in one of four groups, so your team starts where it pays off and doesn't burn a sprint on alt text while a money page sits out of Google.",
        block: {
          kind: "matrix",
          cells: [
            { title: "Quick wins", sub: "High impact · low effort", text: "Fix this week: a noindex tag on a money page, robots.txt blocking key sections, canonicals pointing to the wrong URL." },
            { title: "Big projects", sub: "High impact · high effort", text: "Plan them: slow templates, site structure and internal linking, migration clean-up." },
            { title: "Fill-ins", sub: "Low impact · low effort", text: "Batch them: alt text, short meta descriptions, minor heading fixes." },
            { title: "Later", sub: "Low impact · high effort", text: "Park them: cosmetic HTML validation and rare edge-case URLs." },
          ],
        },
      },
      {
        id: "tools",
        nav: "Tools",
        eyebrow: "Tools used",
        title: "The tools I audit with,",
        muted: "and what each one checks.",
        lead: "Tools find the candidates. I decide what matters, and check it by hand in Chrome DevTools and Google's Rich Results Test.",
        block: {
          kind: "toolcards",
          items: [
            { tool: tools.screamingfrog, text: "The full crawl: status codes, canonicals, redirects, titles, headings, internal links and JavaScript rendering." },
            { tool: tools.gsc, text: "Indexing reports, Core Web Vitals from real users, schema enhancement errors and the searches each page shows for." },
            { tool: tools.pagespeed, text: "Lab tests plus Chrome user data for every key template, on mobile and desktop." },
            { tool: tools.ahrefs, text: "Backlinks pointing to broken or redirected pages, and keyword data for pages worth saving." },
            { tool: tools.semrush, text: "A second crawl and site audit to cross-check findings, so nothing is missed." },
            { tool: tools.ga4, text: "Which pages bring leads and sales, so fixes are ranked by business impact, not just warnings." },
          ],
        },
      },
      {
        id: "search-console",
        nav: "Search Console",
        eyebrow: "Search Console",
        title: "Every audit starts from",
        muted: "your own Google data.",
        lead: "These are real client reports from Google Search Console. In an audit, the same reports show which problems are actually costing you impressions and clicks.",
        block: { kind: "proof", slugs: ["jankowski-import-auto", "doctors-hospital-gujrat"] },
        note: "After technical and on-page work, [Jankowski Import Auto](/work/jankowski-import-auto/) moved from an average position of 13.6 to 9.6 in a 28-day comparison, with clicks up from 30 to 71.",
      },
      {
        id: "deliverables",
        nav: "Deliverables",
        eyebrow: "Deliverables",
        title: "What you get",
        muted: "at the end of the audit.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "The audit report", text: "Every issue explained in plain English: what's wrong, where, why it matters and how to fix it." },
            { title: "Prioritized fix list", text: "A spreadsheet with impact, effort, owner and status columns, ready to paste into Jira, Trello or Asana." },
            { title: "Crawl data", text: "The full crawl export, so your developer can filter and check any URL themselves." },
            { title: "Core Web Vitals summary", text: "Scores and the main cause of slowness for each key template, on mobile and desktop." },
            { title: "Developer notes", text: "Code-level instructions for WordPress, Next.js or your platform, not just “fix this”." },
            { title: "Walkthrough call", text: "A screen-share call to go through the findings and answer your team's questions." },
          ],
        },
      },
      {
        id: "process",
        nav: "5-day process",
        eyebrow: "Process",
        title: "Five working days,",
        muted: "start to finish.",
        block: {
          kind: "steps",
          items: [
            { title: "Access and crawl", time: "Day 1", text: "Search Console and GA4 access, a full crawl and a list of your most important pages." },
            { title: "Indexing and structure", time: "Day 2", text: "Indexing, canonicals, redirects, internal links and sitemaps checked against Google's data." },
            { title: "Speed, rendering and schema", time: "Day 3", text: "Core Web Vitals per template, mobile and JavaScript rendering, structured data." },
            { title: "Prioritize and write", time: "Day 4", text: "Findings ranked by impact and effort, with exact fixes written for each one." },
            { title: "Walkthrough and handover", time: "Day 5", text: "Report, fix list and crawl data delivered, then a call to go through it together." },
          ],
        },
      },
      {
        id: "packages",
        nav: "Packages",
        eyebrow: "Fixed packages",
        title: "Fixed-price",
        muted: "audit packages.",
        lead: "Pick by the size of your site. Every package covers all 12 areas; bigger sites get deeper checks. You get the exact price in USD before you pay anything.",
        block: {
          kind: "packages",
          items: [
            { name: "Small site", size: "Up to 50 URLs", fit: "Local businesses and brochure sites", points: ["All 12 audit areas", "Prioritized fix list", "Crawl data export", "Delivered in 5 working days"] },
            { name: "Business site", size: "Up to 500 URLs", fit: "Service businesses, blogs and multi-location sites", points: ["Everything in Small site", "Internal linking and content-duplication review", "Core Web Vitals per template", "30-minute walkthrough call"], featured: true },
            { name: "Store and large site", size: "500+ URLs or ecommerce", fit: "WooCommerce stores and large content sites", points: ["Everything in Business site", "Faceted navigation and filter URLs", "Product schema and merchant listings", "Crawl budget analysis"] },
          ],
        },
        note: "Not sure which one you need? Ask for the free mini audit first. I'll check your homepage and key pages and tell you which package fits.",
      },
      {
        id: "fix-it",
        nav: "I fix it for you",
        eyebrow: "Optional",
        title: "No developer?",
        muted: "I'll fix it for you.",
        block: {
          kind: "prose",
          paragraphs: [
            "Most audits die in a shared folder. If your team is busy, I can work through the fix list myself, starting with the quick wins. I build WordPress and Next.js sites for a living, so fixes happen in the code and templates, not just in plugin settings.",
            "Speed problems go to my [WordPress speed optimization service](/services/wordpress-speed-optimization/). For growth after the fixes, see [monthly SEO services](/services/seo-services/). Fix work is quoted separately, after you've seen the audit, so you never pay for fixes you don't need.",
          ],
        },
      },
      {
        id: "when",
        nav: "When you need one",
        eyebrow: "Timing",
        title: "When you need",
        muted: "a technical SEO audit.",
        block: {
          kind: "cards",
          cols: 3,
          items: [
            { title: "Before or after a migration", text: "New domain, platform or URL structure. An audit before the move protects rankings; one after finds what broke." },
            { title: "When traffic drops", text: "Sudden falls are often technical: an accidental noindex, a broken redirect or a robots.txt change." },
            { title: "When pages won't get indexed", text: "New pages stuck in “Discovered” or “Crawled, not indexed” for weeks." },
            { title: "Before you invest in content", text: "Fix the base first, so new pages can rank instead of disappearing into a broken structure." },
            { title: "When AI answers ignore you", text: "If ChatGPT, Perplexity or Google's AI Overviews never mention your business, crawl access and schema are the first checks." },
            { title: "For multi-language sites", text: "hreflang, regional URLs and duplicate translations are easy to get wrong and hard to spot." },
          ],
        },
      },
      {
        id: "audit-types",
        nav: "Technical vs full audit",
        eyebrow: "Which audit?",
        title: "Technical SEO audit",
        muted: "or a full SEO audit?",
        block: {
          kind: "cards",
          cols: 2,
          items: [
            { title: "Technical SEO audit", text: "Can Google crawl, render, index and understand your site? Everything on this page: structure, speed, indexing, schema and code-level problems." },
            { title: "Full SEO audit", text: "Adds keyword strategy, content quality, competitors and backlinks. It's the first month of my [monthly SEO services](/services/seo-services/)." },
          ],
        },
      },
    ],
    faqs: [
      { q: "What's included in your SEO technical audit services?", a: "All 12 areas on this page: crawling, indexing, canonicals, redirects, internal links, Core Web Vitals, mobile, JavaScript rendering, structured data, titles and headings, sitemaps and hreflang, and AI search readiness. You get a report, a prioritized fix list, the crawl data and developer notes." },
      { q: "How long does a technical SEO audit take?", a: "Five working days from the day I get access to Search Console and Analytics. For very large sites I give you a delivery date before we start." },
      { q: "How much does a technical SEO audit cost?", a: "It's a fixed price based on the size of your site and the package you pick. You get the exact price in USD within 24 hours, before you pay anything." },
      { q: "What access do you need?", a: "Read access to Google Search Console and GA4 is enough for the audit. Access to your CMS or a staging site is only needed if you want me to fix the issues as well." },
      { q: "Is a free SEO audit tool enough?", a: "Free tools are a good first check, but they list warnings without context and can't see your Search Console data. A professional audit decides which issues actually cost you traffic and how to fix them on your platform." },
      { q: "Can you fix the issues you find?", a: "Yes. I'm a WordPress and Next.js developer, so I can fix the code, templates and settings myself. Fix work is quoted separately after you've seen the audit." },
      { q: "Will a technical audit improve my rankings?", a: "The audit itself changes nothing until the fixes are made. Fixing technical problems removes what's holding pages back, but nobody can guarantee positions in Google. You'll see the effect in your own Search Console data." },
      { q: "Do you audit sites that aren't on WordPress?", a: "Yes. A technical SEO audit works on any platform, including Shopify, Wix, Webflow and custom builds. For platforms I don't develop on, the fix list is written for your developer." },
    ],
    final: { title: "Ready for an audit", muted: "you can actually act on?", text: "Send me your website. You'll get a fixed price within 24 hours, or start with a free mini audit to see how I work first." },
  },
};
