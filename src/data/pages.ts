/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Content for the SEO pages: services, case studies, About, Contact, Privacy.
 *  Edit the words here; the page templates in src/app read from this file.
 *  Keep every claim true: results come only from real Search Console data.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { tools, type Tool } from "./site";

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  /** H1 on the page */
  title: string;
  /** Short name for menus and cards */
  name: string;
  /** <title> tag, keep under ~60 characters */
  metaTitle: string;
  /** Meta description, keep under ~155 characters */
  metaDescription: string;
  /** One line under the H1 */
  tagline: string;
  intro: string[];
  deliverables: { title: string; text: string }[];
  tools: Tool[];
  /** Project slugs shown as related work */
  related: string[];
  faqs: Faq[];
  color: string;
};

export const services: Service[] = [
  {
    slug: "wordpress-development",
    name: "WordPress Development",
    title: "WordPress Development",
    metaTitle: "Hire a WordPress Developer | Custom Builds, Fixes & Redesigns",
    metaDescription:
      "Hire a WordPress developer with 100+ sites shipped. Custom themes, plugins, Elementor and WooCommerce, built fast and SEO-ready. Get a quote in 24 hours.",
    tagline: "Custom WordPress sites you can run yourself, built clean and fast with SEO from day one.",
    intro: [
      "WordPress powers a huge share of the web because it is easy to manage. The difference between a good WordPress site and a slow, fragile one is how it is built. I build WordPress sites with clean custom themes, only the plugins you need, and an editing experience your team can use without calling a developer.",
      "When an off-the-shelf plugin cannot do the job, I write a custom one. When a theme fights your design, I build one that fits it. Every site ships with technical SEO, structured data and Core Web Vitals in mind.",
    ],
    deliverables: [
      { title: "Custom theme development", text: "A theme built for your design and content, not a heavy multipurpose theme with features you never use." },
      { title: "Custom plugin development", text: "Bespoke PHP plugins for features plugins can't cover: integrations, custom logic, admin tools and APIs." },
      { title: "Gutenberg blocks & ACF", text: "Custom blocks, custom post types and ACF fields so editors build pages from safe, on-brand components." },
      { title: "Elementor builds", text: "Fast, tidy Elementor sites when you want visual editing, without the usual bloat." },
      { title: "Redesigns & migrations", text: "Move an old site to a modern build, or to a new host, without losing content or rankings." },
      { title: "Maintenance & fixes", text: "Updates, backups, security hardening and bug fixes so the site keeps working after launch." },
    ],
    tools: [tools.wordpress, tools.plugindev, tools.themedev, tools.blocks, tools.acf, tools.elementor, tools.php, tools.mysql, tools.woocommerce, tools.wptravel],
    related: ["doctors-hospital-gujrat", "jankowski-import-auto", "aujwear", "cooking-nations", "visiventro", "mdn-express-ab"],
    color: "#21759B",
    faqs: [
      { q: "Do you build custom themes or use page builders?", a: "Both. For most business sites I build a lightweight custom theme with Gutenberg blocks. If your team prefers visual editing, I build with Elementor and keep it lean." },
      { q: "Can you build a custom WordPress plugin for my site?", a: "Yes. I write custom PHP plugins for features that existing plugins can't handle well, such as integrations with other systems, booking or travel logic, custom admin screens and REST API endpoints." },
      { q: "Will I be able to edit the website myself?", a: "Yes. Every site I build is set up so you can edit pages, posts and products from the WordPress dashboard, and I show you how." },
      { q: "How long does a WordPress website take?", a: "It depends on the number of pages, custom features and how ready the content is. After a short call I give you a clear timeline and plan before any work starts." },
      { q: "Is SEO included?", a: "Technical SEO foundations are part of every build: clean structure, fast loading, schema markup, sitemaps and Search Console setup. Ongoing SEO campaigns are a separate service." },
    ],
  },
  {
    slug: "seo-services",
    name: "SEO Services",
    title: "SEO Services",
    metaTitle: "SEO Services: Technical SEO, On-Page SEO & Audits",
    metaDescription:
      "SEO services by Umair Sadiq: technical SEO audits, keyword research, on-page SEO, schema markup and Core Web Vitals, backed by real Search Console results.",
    tagline: "Technical and on-page SEO that helps Google crawl, understand and rank your site.",
    intro: [
      "Good SEO starts with a site search engines can read. I fix the technical problems that hold rankings back, then build pages around what your customers actually search for.",
      "Everything is measured in Google Search Console and GA4, so you see clicks, impressions and positions move, not just a list of tasks. You can see real results from my client sites on this page.",
    ],
    deliverables: [
      { title: "Technical SEO audit", text: "Crawl the site with Screaming Frog and Search Console, then fix indexing, redirects, canonicals, sitemaps and broken links." },
      { title: "Keyword research", text: "Find the searches your customers make with Ahrefs and Semrush, and map each one to the right page." },
      { title: "On-page SEO", text: "Titles, meta descriptions, headings, internal links and content structure written for people and search engines." },
      { title: "Schema markup", text: "Structured data for your business, services, articles, FAQs and products so Google can show rich results." },
      { title: "Core Web Vitals", text: "Faster loading and a stable layout, measured with PageSpeed Insights and Lighthouse." },
      { title: "Tracking & reporting", text: "Search Console, GA4 and Tag Manager set up properly, with clear reporting on what changed." },
    ],
    tools: [tools.ahrefs, tools.semrush, tools.screamingfrog, tools.rankmath, tools.yoast, tools.gsc, tools.ga4, tools.gtm, tools.bing, tools.pagespeed],
    related: ["doctors-hospital-gujrat", "jankowski-import-auto", "palbreedhub"],
    color: "#458CF5",
    faqs: [
      { q: "How long does SEO take to show results?", a: "Technical fixes can show in Search Console within weeks. Rankings for competitive terms usually take a few months of steady work. My case studies show the real timelines and numbers." },
      { q: "Can you guarantee first place on Google?", a: "No honest SEO can guarantee a position, because Google decides rankings. What I can promise is a technically sound site, well-targeted pages and clear reporting on progress." },
      { q: "Do you work on WordPress SEO?", a: "Yes, most of my SEO work is on WordPress with Rank Math or Yoast. I also do SEO for Next.js and React sites." },
      { q: "What do you need from me to start?", a: "Access to Google Search Console and Analytics (or I can set them up), and a short list of your services, locations and competitors." },
    ],
  },
  {
    slug: "woocommerce-development",
    name: "WooCommerce Development",
    title: "WooCommerce Development",
    metaTitle: "WooCommerce Developer: Online Stores on WordPress",
    metaDescription:
      "WooCommerce development by Umair Sadiq: online store setup, product catalogs, payments, checkout customization and store speed optimization.",
    tagline: "Online stores on WordPress that are easy to manage and quick to check out.",
    intro: [
      "WooCommerce turns WordPress into a full online store that you own and control. I set up stores that are simple for you to manage and smooth for customers to buy from.",
      "From product catalogs and variations to payments, shipping rules and checkout tweaks, I build the store around how you sell, and keep it fast so customers don't leave before paying.",
    ],
    deliverables: [
      { title: "Store setup", text: "WooCommerce installed, configured and designed to match your brand, with taxes, shipping and emails set up." },
      { title: "Products & catalogs", text: "Categories, attributes, variations and product pages that are easy to browse and easy to update." },
      { title: "Payments & checkout", text: "Payment gateways connected and the checkout simplified to reduce drop-offs." },
      { title: "Custom features", text: "Custom PHP for pricing rules, product options or integrations when a plugin isn't enough." },
      { title: "Store SEO", text: "Product and category pages structured for search, with product schema." },
      { title: "Speed & security", text: "Caching, image optimization and security hardening for a store that stays fast under load." },
    ],
    tools: [tools.woocommerce, tools.wordpress, tools.elementor, tools.acf, tools.php, tools.wprocket, tools.wordfence, tools.rankmath],
    related: ["aujwear", "cooking-nations"],
    color: "#7F54B3",
    faqs: [
      { q: "Can you move my existing store to WooCommerce?", a: "Yes. I can migrate products, categories and content to WooCommerce and set up redirects so you keep your search rankings." },
      { q: "Which payment methods can you connect?", a: "Any gateway with a WooCommerce integration, such as Stripe or PayPal, plus local options where a plugin is available." },
      { q: "Will I be able to add products myself?", a: "Yes. You manage products, stock and orders from the WordPress dashboard, and I walk you through it." },
      { q: "Can you speed up a slow WooCommerce store?", a: "Yes. Caching, image optimization, trimming heavy plugins and database clean-up usually make a clear difference." },
    ],
  },
  {
    slug: "wordpress-speed-optimization",
    name: "WordPress Speed Optimization",
    title: "WordPress Speed Optimization",
    metaTitle: "WordPress Speed Optimization & Core Web Vitals",
    metaDescription:
      "Make your WordPress site fast: Core Web Vitals fixes, caching with WP Rocket, NitroPack or LiteSpeed, image optimization and plugin clean-up.",
    tagline: "A faster WordPress site for visitors, conversions and Google's Core Web Vitals.",
    intro: [
      "Slow pages lose visitors and rankings. Most slow WordPress sites suffer from the same few problems: heavy themes, too many plugins, unoptimized images and no caching.",
      "I measure first with PageSpeed Insights and Lighthouse, fix the real causes, and set up caching with WP Rocket, NitroPack or LiteSpeed Cache depending on your hosting.",
    ],
    deliverables: [
      { title: "Speed audit", text: "Measure Core Web Vitals (LCP, INP, CLS) and find what is actually slowing each page down." },
      { title: "Caching setup", text: "WP Rocket, NitroPack or LiteSpeed Cache configured properly for your host and theme." },
      { title: "Image optimization", text: "Modern formats, correct sizes and lazy loading so images stop dragging pages down." },
      { title: "Plugin & theme clean-up", text: "Remove or replace heavy plugins and unused scripts that load on every page." },
      { title: "Fonts & scripts", text: "Preload what matters, defer the rest and stop third-party scripts from blocking the page." },
      { title: "Before & after report", text: "Clear before and after numbers from PageSpeed Insights so you can see the difference." },
    ],
    tools: [tools.wprocket, tools.nitropack, tools.litespeed, tools.pagespeed, tools.lighthouse, tools.cloudflare, tools.wordpress, tools.gsc],
    related: [],
    color: "#F56E28",
    faqs: [
      { q: "Which caching plugin is best?", a: "It depends on your hosting. LiteSpeed Cache is best on LiteSpeed servers, WP Rocket works well almost everywhere, and NitroPack suits sites that need an all-in-one CDN and optimization service." },
      { q: "Will speed optimization break my site?", a: "I test every change on the pages that matter and keep backups, so anything that conflicts can be rolled back straight away." },
      { q: "Does speed affect SEO?", a: "Yes. Core Web Vitals are part of Google's page experience signals, and faster pages also keep visitors on the site longer." },
    ],
  },
  {
    slug: "nextjs-react-development",
    name: "Next.js & React Development",
    title: "Next.js & React Development",
    metaTitle: "Next.js & React Developer: Fast, SEO-Friendly Sites",
    metaDescription:
      "Next.js and React development by Umair Sadiq: fast, SEO-friendly websites, web apps and tools with TypeScript, built to score well on Lighthouse.",
    tagline: "Fast, SEO-friendly websites and web apps built with Next.js, React and TypeScript.",
    intro: [
      "When a site needs to be extremely fast, highly interactive or more like an app than a brochure, I build it with Next.js and React. Pages are pre-rendered for speed and search engines, and interactive parts load only where they are needed.",
      "This very website is built with Next.js, as are tools like PalBreedHub. They start SEO-first: clean URLs, metadata, structured data and sitemaps from the first commit.",
    ],
    deliverables: [
      { title: "Marketing websites", text: "Static or server-rendered Next.js sites that load fast and score well on Lighthouse." },
      { title: "Web apps & tools", text: "Interactive React tools, calculators and dashboards with smooth, responsive interfaces." },
      { title: "SEO-first setup", text: "Metadata, Open Graph images, JSON-LD, sitemaps and robots built into the project." },
      { title: "Headless CMS", text: "Connect Next.js to WordPress or another CMS so editors keep a familiar dashboard." },
      { title: "APIs & integrations", text: "Connect to your backend, third-party APIs or a Python/FastAPI service." },
      { title: "Deployment", text: "Deploy to Vercel, Hostinger or your own server, with a simple process for future updates." },
    ],
    tools: [tools.next, tools.react, tools.ts, tools.tailwind, tools.node, tools.three, tools.fastapi, tools.vercel, tools.hostinger],
    related: ["palbreedhub", "mic-testing-tool"],
    color: "#61DAFB",
    faqs: [
      { q: "Should I use Next.js or WordPress?", a: "WordPress is best when non-technical editors need to manage lots of content. Next.js is best for speed-critical sites, web apps and interactive tools. I'll recommend the right one for your project." },
      { q: "Are Next.js sites good for SEO?", a: "Yes. Pages are pre-rendered as HTML, which search engines read easily, and they tend to be very fast." },
      { q: "Can you host it on my existing hosting?", a: "Often, yes. A static Next.js export runs on standard hosting like Hostinger. Apps that need a server can run on Vercel or a Node.js host." },
    ],
  },
  {
    slug: "flutter-app-development",
    name: "Flutter App Development",
    title: "Flutter App Development",
    metaTitle: "Flutter App Developer: Android & iOS Apps",
    metaDescription:
      "Flutter app development by Umair Sadiq: cross-platform Android and iOS apps from one codebase, connected to Firebase, your website or your API.",
    tagline: "Android and iOS apps from one Flutter codebase, connected to your website or API.",
    intro: [
      "Flutter lets one codebase run natively on both Android and iOS, which saves time and keeps both apps in sync. I build Flutter apps with clean interfaces and smooth performance.",
      "Apps can connect to Firebase for authentication and data, or to your existing website and API, so your app and site share the same content and users.",
    ],
    deliverables: [
      { title: "Cross-platform apps", text: "One Flutter codebase that runs on Android and iOS." },
      { title: "UI built from your design", text: "Screens built to match your brand, with smooth animations and responsive layouts." },
      { title: "Firebase backend", text: "Authentication, database, storage and push notifications with Firebase." },
      { title: "API integration", text: "Connect the app to your WordPress site, REST API or custom backend." },
      { title: "Store release", text: "Help preparing and publishing to Google Play and the App Store." },
      { title: "App + website combos", text: "A website and an app that share content and users, built together." },
    ],
    tools: [tools.flutter, tools.dart, tools.firebase, tools.androidstudio, tools.xcode, tools.postman],
    related: [],
    color: "#02569B",
    faqs: [
      { q: "Do I need separate apps for Android and iOS?", a: "No. Flutter builds both from one codebase, which keeps cost and maintenance lower." },
      { q: "Can the app use my website's content?", a: "Yes. The app can read content from your WordPress site or API, so you update it in one place." },
      { q: "Can you publish the app for me?", a: "I can prepare the builds and help with the Google Play and App Store listings. Publishing needs developer accounts in your name." },
    ],
  },
];

/** Extra details for each project's case study page, keyed by project slug. */
export const caseStudies: Record<
  string,
  { summary: string; scope: string[]; services: string[]; outcome?: string; /** meta description */ meta: string }
> = {
  "doctors-hospital-gujrat": {
    meta: "WordPress + SEO case study: Doctors Hospital Gujrat reached 578 Google clicks, 17K impressions and a 6.6 average position (6 Oct – 7 Nov 2026).",
    summary:
      "A website for Doctors Hospital Gujrat, a healthcare provider in Gujrat, Pakistan. The goal was a clear, trustworthy site that patients can find on Google when they search for local healthcare.",
    scope: ["WordPress website build", "On-page SEO", "Technical SEO", "Search Console setup and tracking"],
    services: ["wordpress-development", "seo-services"],
    outcome:
      "Google Search Console for 6 Oct – 7 Nov 2026 shows 578 clicks and 17K impressions from Google web search, with an average position of 6.6.",
  },
  "jankowski-import-auto": {
    meta: "SEO case study: Jankowski Import Auto grew Google clicks 137% (30 → 71) and impressions 238%, average position 13.6 → 9.6, in 28 days.",
    summary:
      "Jankowski Import Auto is a German and European auto repair shop. The site needed to rank for repair searches and turn visitors into booked appointments.",
    scope: ["WordPress website", "Ongoing SEO", "On-page SEO", "Search Console tracking"],
    services: ["wordpress-development", "seo-services"],
    outcome:
      "Comparing the last 28 days with the previous 28 (to 7 Nov 2026), clicks grew from 30 to 71 (+137%), impressions grew by 238%, and average position improved from 13.6 to 9.6.",
  },
  palbreedhub: {
    meta: "Next.js + SEO case study: PalBreedHub, a Palworld breeding calculator, earned 1.6K Google impressions in its first days on a new domain.",
    summary:
      "PalBreedHub is a Palworld breeding calculator. Players pick two parents to see the child, or search every parent pair for any Pal. It was built with Next.js and set up for SEO from launch.",
    scope: ["Next.js web app", "Breeding calculator and reverse search", "SEO-first architecture", "Search Console setup"],
    services: ["nextjs-react-development", "seo-services"],
    outcome:
      "In its first days on a brand-new domain (29 Oct – 7 Nov 2026), Google Search Console recorded 1.6K impressions and 9 clicks.",
  },
  "mic-testing-tool": {
    meta: "React case study: a free online microphone test and recorder. Check your mic, record, play back and download, with recordings kept in the browser.",
    summary:
      "A free online microphone test and recorder. Visitors check their live mic input, record their voice, listen back and download the clip. Recordings stay in the browser.",
    scope: ["React web tool", "Browser audio recording", "Responsive interface"],
    services: ["nextjs-react-development"],
  },
  aujwear: {
    meta: "WooCommerce case study: AUJ Wear, a Pakistani streetwear store for oversized tees, built on WordPress with Elementor and WooCommerce.",
    summary:
      "AUJ Wear is a Pakistani streetwear brand selling graphic, embroidered and plain oversized tees. The store needed a bold look, clear collections and a checkout that works well on phones.",
    scope: ["WooCommerce store", "Product variations and sale pricing", "Collection pages", "Elementor design", "LiteSpeed caching"],
    services: ["woocommerce-development", "wordpress-development"],
  },
  "cooking-nations": {
    meta: "WordPress case study: Cooking Nations, a recipe blog with web stories and a chef knife shop, built with Elementor, WooCommerce and Rank Math SEO.",
    summary:
      "Cooking Nations is a recipe site with easy meals, meal prep ideas and cooking tips, plus a small shop for chef knives. It needed recipe categories readers can browse quickly and a structure built for search.",
    scope: ["WordPress website", "Recipe categories and blog", "WooCommerce shop", "Rank Math SEO setup", "Site Kit by Google"],
    services: ["wordpress-development", "seo-services", "woocommerce-development"],
  },
  visiventro: {
    meta: "WordPress case study: the website for Visiventro, a software house in Pakistan offering web, app, custom software and SEO services.",
    summary: "A WordPress website for Visiventro, a software house in Pakistan offering web and app development, custom software, SEO and digital marketing.",
    scope: ["WordPress website", "Service pages", "Responsive design"],
    services: ["wordpress-development"],
  },
  "mdn-express-ab": {
    meta: "WordPress case study: the website for MDN Express AB, a chauffeur and transport company, built to present services and take ride bookings.",
    summary: "A WordPress website for MDN Express AB, a chauffeur and transport company, built to present their services and take ride bookings.",
    scope: ["WordPress website", "Booking-focused layout", "Responsive design"],
    services: ["wordpress-development"],
  },
};

export const contactFaqs: Faq[] = [
  { q: "How quickly do you reply?", a: "I'm online from 9 AM to 2 AM Pakistan time and aim to reply within a few hours in that window. Messages sent outside it get a reply the next morning." },
  { q: "Do you work with clients outside Pakistan?", a: "Yes. I work remotely with clients worldwide and currently work with international agency clients." },
  { q: "What's the best way to start?", a: "Use the 'Start a project' form, which takes about a minute, or message me on WhatsApp with a short description of what you need." },
  { q: "Do you sign NDAs?", a: "Yes, if your project needs one." },
];

export const privacyUpdated = "10 November 2026";
