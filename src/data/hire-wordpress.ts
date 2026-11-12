/**
 * Content for /services/wordpress-development/ (target keyword: "hire wordpress developer").
 * Keep every claim true. Results come only from real Search Console data in site.ts.
 */
import type { Faq } from "./pages";
import { tools } from "./site";

export const hireWp = {
  metaTitle: "Hire a WordPress Developer | Custom Builds, Fixes & Redesigns",
  metaDescription:
    "Hire a WordPress developer with 100+ sites shipped. Custom themes, plugins, Elementor and WooCommerce, built fast and SEO-ready. Get a quote in 24 hours.",
  h1: "Hire a WordPress Developer for Custom Sites That Load Fast and Rank",
  lead: "I'm Umair Sadiq, a WordPress developer with 100+ sites shipped. Hire me for custom themes, plugins, Elementor and WooCommerce builds that load fast, rank on Google and stay easy for your team to edit.",
  updated: "2026-11-10",


  /** Hero trust points, next to the quote form. */
  heroPoints: ["100+ WordPress sites shipped", "Fixed quote in USD within 24 hours", "Online 9 AM – 2 AM Pakistan time", "You own the site, code and logins"],

  /** "On this page" jump links. id must match the section ids on the page. */
  toc: [
    { id: "what-you-get", label: "What you get" },
    { id: "good-fit", label: "Is it a good fit?" },
    { id: "services", label: "Services" },
    { id: "fixes", label: "WordPress fixes" },
    { id: "how-i-build", label: "How I build" },
    { id: "engagement", label: "Engagement models" },
    { id: "tech-stack", label: "Tech stack" },
    { id: "case-studies", label: "Case studies" },
    { id: "process", label: "Process & timeline" },
    { id: "pricing", label: "Pricing" },
    { id: "why-pakistan", label: "Why Pakistan" },
    { id: "faq-title", label: "FAQ" },
    { id: "quote", label: "Get a quote" },
  ],

  fit: {
    good: [
      "You need a new business website, a redesign or a WooCommerce store, built properly the first time.",
      "Your site is slow, broken or hard to edit and you want someone who will fix the cause, not patch the symptom.",
      "You want SEO and speed handled by the same person who writes the code.",
      "You're an agency or studio that needs a reliable WordPress developer to build from your designs.",
      "You want to talk to the developer directly, with clear prices and dates.",
    ],
    notFit: [
      "You want the cheapest possible site from a $20 theme with no changes. A ready-made builder will suit you better.",
      "You need someone in your office every day. I work remotely.",
    ],
  },

  fixes: [
    { title: "White screen or critical error", text: "Find the plugin, theme or PHP error behind it and get the site back up." },
    { title: "Hacked or infected site", text: "Clean malware, close the hole it came through, reset access and harden the install." },
    { title: "Broken after an update", text: "Roll back safely, then fix the conflict so you can keep updating." },
    { title: "Slow pages", text: "Trace what's actually slow: hosting, images, plugins, scripts or the theme, and fix it." },
    { title: "Forms and emails not arriving", text: "Set up proper SMTP sending and test every form end to end." },
    { title: "Layout and mobile issues", text: "Fix broken sections, overlapping text and menus that fail on phones." },
    { title: "PHP and plugin upgrades", text: "Move to a supported PHP version and replace abandoned plugins without breaking features." },
    { title: "Lost rankings after a move", text: "Map old URLs, add 301 redirects, fix canonicals and resubmit to Search Console." },
  ],

  standards: [
    { title: "WordPress coding standards", text: "PHP, JavaScript and CSS follow the official WordPress standards, so any good developer can pick up the code later." },
    { title: "Mobile-first", text: "Every layout starts at phone width and scales up, because most visitors arrive on a phone." },
    { title: "Few plugins, chosen carefully", text: "Well-maintained plugins only, and custom code where a plugin would add bloat or risk." },
    { title: "Accessible by default", text: "Real headings, alt text, labels, keyboard navigation and readable contrast, following WCAG guidance." },
    { title: "Staging before live", text: "Changes are built and tested on a staging copy, never directly on your live site." },
    { title: "Version control and backups", text: "Custom code is kept in Git, and a full backup is taken before every significant change." },
    { title: "Tested for speed", text: "Pages are checked in PageSpeed Insights and Lighthouse and on real phones before launch." },
    { title: "Secure setup", text: "SSL, security plugin, limited login attempts, strong admin accounts and no unused plugins or themes left behind." },
    { title: "Built to be found", text: "Schema markup, clean HTML, fast pages and clear answers help Google, and AI tools like ChatGPT, understand and cite your site." },
  ],

  skills: [
    "Custom themes and child themes",
    "Custom plugins in PHP",
    "Gutenberg blocks and block patterns",
    "Custom post types and taxonomies",
    "Advanced Custom Fields (ACF)",
    "Elementor templates and global styles",
    "WooCommerce stores and checkout",
    "Stripe and PayPal payments",
    "Booking and travel sites (WP Travel Engine)",
    "HubSpot and Mailchimp forms",
    "WPForms and Contact Form 7",
    "WordPress REST API",
    "Headless WordPress with Next.js",
    "Migrations from Wix, Squarespace and old builds",
    "Hosting moves (Hostinger, cPanel, Cloudflare)",
    "Rank Math and Yoast SEO setup",
    "Schema markup (JSON-LD)",
    "Caching with WP Rocket, NitroPack or LiteSpeed",
  ],

  intro: [
    "If you want to hire a WordPress developer, you're usually trying to fix one of three things: you need a new site built properly, your current site is slow or broken, or it looks fine but doesn't bring in leads. I've dealt with all three across more than 100 WordPress sites, for local businesses in Pakistan and for international clients through the agency I work with full-time.",
    "I write the code myself, you talk to me directly, and every build ships with technical SEO, so the site is ready to rank the day it goes live. You get one person who understands both the development side and the search side, which is rare when you hire a WordPress website developer.",
  ],

  benefits: [
    { title: "One developer, start to finish", text: "You talk to the person writing the code. No account managers, no hand-offs, and no messages relayed through three people before they reach me." },
    { title: "A site your team can edit", text: "Pages are built from blocks or Elementor sections your editors can change safely. Before handover I show you how to update pages, posts, menus and products yourself." },
    { title: "SEO built in, not bolted on", text: "Clean heading structure, schema markup, XML sitemaps, redirects and Search Console setup are part of every build, not an extra you pay for later." },
    { title: "Speed that holds up", text: "Lightweight theme code, compressed WebP images, proper caching and only the plugins you actually need. Speed is checked on real devices before launch." },
    { title: "Clean, update-safe code", text: "Custom work lives in a child theme or its own plugin, never hacked into WordPress core or a parent theme, so routine updates don't break your site." },
    { title: "A fixed quote in 24 hours", text: "Send me the scope and I reply within 24 hours with a fixed price in USD, a timeline and a clear list of what's included." },
  ],

  services: [
    { title: "Custom theme development", text: "A theme written for your design and content instead of a heavy multipurpose theme loaded with features you'll never use. Fewer scripts, faster pages and a layout that matches your brand exactly, built from your Figma file or designed with you." },
    { title: "Custom plugin development", text: "When no existing plugin does the job well, I write one in PHP: integrations with CRMs and booking systems, custom admin screens, REST API endpoints, calculators and business logic. Your feature stays in its own plugin, so it survives theme changes." },
    { title: "Elementor builds", text: "If your team wants visual, drag-and-drop editing, I build with Elementor and keep it lean: global styles, reusable templates and no pile of add-on packs slowing every page down." },
    { title: "ACF & Gutenberg blocks", text: "Custom post types, Advanced Custom Fields and custom Gutenberg blocks turn your content into structured, reusable pieces. Editors fill in fields; the design stays consistent on every page." },
    { title: "Redesigns & migrations", text: "I move outdated sites to a modern build or a new host without losing content or rankings. Every old URL is mapped and redirected, and Search Console is watched closely after launch." },
    { title: "Maintenance & fixes", text: "Plugin and core updates, backups, security hardening, broken layouts, white screens and PHP errors. If another developer built your site, I can take it over after a quick review." },
  ],

  engagements: [
    { title: "Fixed project", best: "New sites, redesigns, custom plugins", text: "We agree the scope in writing, I give you one fixed price in USD, and work is split into milestones you approve as we go. The price doesn't change unless the scope does." },
    { title: "Hourly", best: "Small fixes, changes and audits", text: "For jobs that are hard to scope up front. I give you an estimate before starting, track the time, and stop to check with you before going over it." },
    { title: "Monthly support", best: "Ongoing updates, content and SEO", text: "A set block of hours each month for updates, new pages, fixes and SEO work, with priority replies. Good for businesses that keep improving their site after launch." },
  ],

  stack: [
    tools.wordpress,
    tools.php,
    tools.mysql,
    tools.js,
    tools.themedev,
    tools.plugindev,
    tools.blocks,
    tools.acf,
    tools.elementor,
    tools.woocommerce,
    tools.wprocket,
    tools.nitropack,
    tools.litespeed,
    tools.rankmath,
    tools.yoast,
    tools.wordfence,
    tools.gsc,
    tools.figma,
    tools.git,
    tools.cpanel,
  ],

  /** Project slugs from site.ts, in display order. */
  cases: ["doctors-hospital-gujrat", "aujwear", "cooking-nations", "jankowski-import-auto", "visiventro", "mdn-express-ab"],

  timeline: [
    { title: "Call & quote", time: "Within 24 hours", text: "A short call or message about your goals. You get a fixed quote, scope and timeline." },
    { title: "Plan", time: "2 – 3 days", text: "Sitemap, page layouts, features and SEO structure are agreed before any build work starts." },
    { title: "Design & build", time: "1 – 4 weeks", text: "I build on a staging site you can see at any time. Bigger sites and stores take longer." },
    { title: "Review", time: "3 – 5 days", text: "You test on your own devices, we fix anything that's off, and I run speed and SEO checks." },
    { title: "Launch & handover", time: "1 – 2 days", text: "Go live, redirects, Search Console and analytics set up, and a walkthrough of the dashboard." },
  ],

  pricing: [
    { title: "Number of pages and templates", text: "A five-page business site and a 40-page site with a blog, landing pages and service areas are very different jobs." },
    { title: "Custom features", text: "Bookings, memberships, multilingual content, integrations or a custom plugin each add build and testing time." },
    { title: "Design work", text: "Building from your Figma file or brand guide is quicker than designing every page from scratch." },
    { title: "Store size", text: "For WooCommerce, the number of products, variations, payment gateways and shipping rules matter most." },
    { title: "Content and SEO", text: "Technical SEO is always included. Keyword research, copywriting and ongoing SEO are quoted separately." },
  ],

  pakistan: [
    { title: "Your working day is covered", text: "I'm online from 9 AM to 2 AM Pakistan time (UTC+5). That covers the whole UK working day, most of the US East Coast working day and Australian afternoons, so questions don't sit waiting overnight." },
    { title: "Lower cost, same standard", text: "Living costs in Pakistan are lower, so you pay less than you would for a developer of similar skill in London, New York or Sydney, without cutting corners on code quality, testing or SEO." },
    { title: "Proven with international clients", text: "I build WordPress sites full-time for an international agency's clients, I'm finishing a BS in IT at the University of Gujrat, and my real Search Console results are public on this site." },
    { title: "Clear communication", text: "Fluent written English, quick replies on email or WhatsApp, video calls when they help, and progress you can see on a staging site instead of vague status updates." },
  ],

  faqs: [
    { q: "How much does it cost to hire a WordPress developer?", a: "It depends on the number of pages, custom features, design work and whether you need a store. I don't charge one flat rate. Send me the scope and you'll get a fixed quote in USD within 24 hours, with everything that's included written down." },
    { q: "How quickly can you start?", a: "Usually within the same week, depending on my current projects. The exact start date and delivery date are in the quote, so you can plan around them." },
    { q: "Do you work with clients in the UK, US and Australia?", a: "Yes. I work remotely with clients worldwide. My hours, 9 AM to 2 AM Pakistan time, overlap with the UK working day, most of the US East Coast day and Australian afternoons." },
    { q: "Can I hire you for a small fix or a few hours of work?", a: "Yes. Small fixes, changes and audits are billed hourly. I send an estimate first and check with you before going over it." },
    { q: "Will I own the website and the code?", a: "Yes. Once the project is paid, the site, the custom code, the design files and every login are yours. Nothing is locked to my accounts." },
    { q: "Do you build custom themes or use page builders?", a: "Both. For most business sites I build a lightweight custom theme with Gutenberg blocks. If your team prefers visual editing, I build with Elementor and keep it lean." },
    { q: "Is SEO included when I hire you?", a: "Technical SEO foundations are part of every build: clean structure, fast loading, schema markup, XML sitemaps and Search Console setup. Ongoing SEO campaigns are a separate service." },
    { q: "Can you take over a site another developer built?", a: "Yes. I start with a short review of the theme, plugins, hosting and code, tell you what I found and what needs fixing first, then take over updates and new work." },
  ] satisfies Faq[],
};
