/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDIT ME — every personal detail, skill, project and link lives in this file.
 *
 *  Values marked "PLACEHOLDER" need your real information. Placeholder links
 *  are detected automatically (see `isPlaceholder`) and are left out of the
 *  structured data that search engines read.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Umair Sadiq",
  firstName: "Umair",
  initials: "US",
  role: "Full Stack Web & App Developer · SEO Specialist",
  shortRole: "Web & App Developer · SEO Specialist",
  websitesBuilt: "100+",
  // Shown in the header clock. Change if you are somewhere else.
  timeZone: "Asia/Karachi",
  // Working hours in that time zone: 9 AM to 2 AM the next morning.
  hours: { start: 9, end: 2, label: "9 AM – 2 AM", startLabel: "9 AM" },
  location: "Pakistan",
  availability: "Open to jobs & freelance projects",
  workStyle: "Remote · Hybrid · On-site",
  // Live domain (used for SEO metadata, sitemap and social previews)
  siteUrl: "https://umairsadiq.com",
  metaDescription:
    "Freelance WordPress developer and SEO expert, 100+ sites built. Custom plugins, WooCommerce, Next.js and SEO for clients in the US, UK, UAE and Australia.",
};

export const contact = {
  email: "hello@umairsadiq.com",
  phoneDisplay: "+92 324 4604162",
  phoneHref: "tel:+923244604162",
  // wa.me link: international format, digits only
  whatsapp: "https://wa.me/923244604162",
  linkedin: "https://www.linkedin.com/in/umair-sadiq-a24011359/",
  github: "https://github.com/umair2248",
  facebook: "https://www.facebook.com/umairsadiqdev",
  instagram: "https://www.instagram.com/uma.irsadiq/",
  x: "https://x.com/umai_rsadiq",
  reddit: "https://www.reddit.com/user/umair_sadiq/",
  pinterest: "https://www.pinterest.com/umair_sadiq/",
  // Generated from this file on every deploy (scripts/make-cv.mjs prints /cv/ to PDF).
  cv: "/cv/umair-sadiq-cv.pdf",
  cvPage: "/cv/",
};

/**
 * Trustpilot. Paste the IDs from Trustpilot Business → Integrations → TrustBox
 * (copy each widget's code: data-businessunit-id and data-template-id).
 * Leave them empty to show a plain "Review me on Trustpilot" link instead.
 * Add the rating widget's template only once there are a few reviews.
 */
export const trustpilot = {
  profileUrl: "https://www.trustpilot.com/review/umairsadiq.com",
  businessUnitId: "",
  collectorTemplateId: "",
  ratingTemplateId: "",
  /**
   * Real reviews copied from the Trustpilot profile, newest first. Only add reviews
   * that are actually on Trustpilot; the section links back there. Empty = show a
   * "leave a review" card instead.
   * Example: { name: "Jane D.", country: "US", rating: 5, title: "Great work", text: "…", date: "2026-11-20" }
   */
  reviews: [] as { name: string; country?: string; rating: number; title?: string; text: string; date: string }[],
};

/**
 * Form protection. Every form already uses a honeypot, a signed server token, a link
 * filter and a rate limit. To add the Cloudflare Turnstile captcha on top: create a free
 * widget at dash.cloudflare.com → Turnstile for umairsadiq.com, paste its Site Key here,
 * and put its Secret Key in form-data/turnstile-secret.txt on the server (outside public_html).
 */
export const security = {
  turnstileSiteKey: "0x4AAAAAAF_hCUa3-HAswO90",
};

export function isPlaceholder(value: string) {
  return /example\.com|your-|0000000|wa\.me\/0+$/.test(value);
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Work", href: "/work/" },
  { label: "Toolkit", href: "/#toolkit" },
  { label: "Experience", href: "/#experience" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact/" },
] as const;

/** Words that cycle in the hero headline. */
export const heroWords = ["WordPress", "Next.js", "React", "PHP", "Flutter", "SEO"];

/** The tilt-and-flip card in the hero. Ratings are your own self-assessment out of 100. */
export const cardStats = [
  { label: "WordPress", value: 95 },
  { label: "SEO", value: 92 },
  { label: "Next.js", value: 88 },
  { label: "React", value: 88 },
  { label: "PHP", value: 85 },
  { label: "Flutter", value: 80 },
];

/** One door per discipline in the "hallway" section. */
export type Door = {
  title: string;
  /** Service page this door leads to */
  href: string;
  short: string;
  color: string;
  description: string;
  tools: string[];
  deliver: string[];
};

export const doors: Door[] = [
  {
    title: "WordPress Engineering",
    href: "/services/wordpress-development/",
    short: "Real code, not just page builders",
    color: "#ff6b4a",
    description:
      "I write custom themes, plugins and Gutenberg blocks in PHP, using hooks, custom post types and ACF, so sites stay fast, secure and easy for editors to run.",
    tools: ["PHP", "Hooks & filters", "Custom post types", "ACF", "Gutenberg", "REST API"],
    deliver: ["Custom plugins", "Custom themes", "Editor-friendly admin"],
  },
  {
    title: "Technical SEO",
    href: "/services/seo-services/",
    short: "Rankings you can measure",
    color: "#d4ff3a",
    description:
      "I find what stops Google from ranking a site, fix it, and prove the change in Search Console. Doctors Hospital Gujrat reached 578 clicks at an average position of 6.6.",
    tools: ["Screaming Frog", "Ahrefs", "Semrush", "Schema", "Search Console", "GA4"],
    deliver: ["Audits", "Fixes", "Clear reporting"],
  },
  {
    title: "Speed & Core Web Vitals",
    href: "/services/wordpress-speed-optimization/",
    short: "Green scores for real visitors",
    color: "#f3f1ea",
    description:
      "Caching, image and font optimization and trimming heavy plugins, measured before and after with PageSpeed Insights and Lighthouse, not guessed.",
    tools: ["WP Rocket", "NitroPack", "LiteSpeed", "Lighthouse", "Cloudflare"],
    deliver: ["Faster pages", "Better LCP & CLS", "Before/after report"],
  },
  {
    title: "E-commerce",
    href: "/services/woocommerce-development/",
    short: "Stores that are easy to buy from",
    color: "#b48cff",
    description:
      "WooCommerce stores with clean product catalogs, payments, a short checkout and product schema, set up so the owner can manage stock and orders alone.",
    tools: ["WooCommerce", "Payments", "Checkout", "Product schema", "Elementor"],
    deliver: ["Online stores", "Checkout fixes", "Store SEO"],
  },
  {
    title: "Modern Frontend",
    href: "/services/nextjs-react-development/",
    short: "Next.js, React & TypeScript",
    color: "#5ee0ff",
    description:
      "When a project needs to be an app, I build it with Next.js and React: this portfolio and the PalBreedHub calculator are both SEO-first Next.js builds.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js"],
    deliver: ["Web apps", "Interactive tools", "Fast marketing sites"],
  },
  {
    title: "AI-Assisted Workflow",
    href: "/#toolkit",
    short: "Faster delivery, still human-checked",
    color: "#e8a084",
    description:
      "I use Claude Code and Codex for boilerplate, refactors and checks, then review every line myself. Teams get work sooner without giving up quality.",
    tools: ["Claude Code", "Codex", "Cursor", "GitHub Copilot", "ChatGPT"],
    deliver: ["Shorter timelines", "Cleaner code", "Line-by-line review"],
  },
  {
    title: "Remote Teamwork",
    href: "/about/",
    short: "Easy to work with from anywhere",
    color: "#7ee8a6",
    description:
      "I work remotely for ABCDMEDIA LTD today: written updates, Git-based handovers and 9 AM to 2 AM Pakistan hours that overlap the UK, UAE and US working day.",
    tools: ["Git", "GitHub", "Notion", "Figma", "WhatsApp"],
    deliver: ["Daily updates", "Clean handovers", "Same-day replies"],
  },
  {
    title: "Mobile Apps",
    href: "/services/flutter-app-development/",
    short: "One codebase, two app stores",
    color: "#ffb02e",
    description:
      "Cross-platform Flutter apps for Android and iOS from one codebase, connected to Firebase or to the client's WordPress site and API.",
    tools: ["Flutter", "Dart", "Firebase", "REST APIs"],
    deliver: ["Android apps", "iOS apps", "App + web combos"],
  },
];

/**
 * Real tool logos live in /public/logos (brand colours baked in).
 * Edit these lists to add or remove tools. `logo` is a path inside /public/logos;
 * without an extension ".svg" is assumed. PNGs in logos/wp/ are full-bleed
 * plugin icons from wordpress.org.
 */
export type Tool = { name: string; logo: string };
const t = (name: string, logo: string): Tool => ({ name, logo });

export const tools = {
  // WordPress
  wordpress: t("WordPress", "wordpress"),
  plugindev: t("Plugin Development", "plugin-dev"),
  themedev: t("Theme Development", "theme-dev"),
  blocks: t("Gutenberg Blocks", "blocks-dev"),
  cpt: t("Custom Post Types", "cpt-dev"),
  woocommerce: t("WooCommerce", "wp/woo.png"),
  elementor: t("Elementor", "elementor"),
  acf: t("ACF", "wp/acf.png"),
  wptravel: t("WP Travel Engine", "wp/wp-travel-engine.png"),
  hubspot: t("HubSpot", "hubspot"),
  // WordPress plugins
  wprocket: t("WP Rocket", "wp/wp-rocket.svg"),
  nitropack: t("NitroPack", "wp/nitropack.png"),
  litespeed: t("LiteSpeed Cache", "wp/litespeed.png"),
  rankmath: t("Rank Math", "wp/rankmath.png"),
  yoast: t("Yoast SEO", "wp/yoast.png"),
  sitekit: t("Site Kit by Google", "wp/sitekit.png"),
  wordfence: t("Wordfence", "wp/wordfence.png"),
  ssl: t("Really Simple SSL", "wp/ssl.png"),
  jetpack: t("Jetpack", "wp/jetpack.png"),
  cf7: t("Contact Form 7", "wp/cf7.png"),
  wpforms: t("WPForms", "wp/wpforms.png"),
  duplicator: t("Duplicator", "wp/duplicator.png"),
  aiomigration: t("All-in-One WP Migration", "wp/aio-migration.png"),
  // Frontend
  html: t("HTML5", "html5"),
  css: t("CSS", "css"),
  js: t("JavaScript", "javascript"),
  ts: t("TypeScript", "typescript"),
  react: t("React", "react"),
  next: t("Next.js", "nextdotjs"),
  tailwind: t("Tailwind CSS", "tailwindcss"),
  bootstrap: t("Bootstrap", "bootstrap"),
  jquery: t("jQuery", "jquery"),
  three: t("Three.js", "threedotjs"),
  // Backend
  php: t("PHP", "php"),
  node: t("Node.js", "nodedotjs"),
  python: t("Python", "python"),
  fastapi: t("FastAPI", "fastapi"),
  mysql: t("MySQL", "mysql"),
  firebase: t("Firebase", "firebase"),
  postman: t("Postman", "postman"),
  // Mobile
  flutter: t("Flutter", "flutter"),
  dart: t("Dart", "dart"),
  androidstudio: t("Android Studio", "androidstudio"),
  xcode: t("Xcode", "xcode"),
  // SEO
  ahrefs: t("Ahrefs", "wp/ahrefs.png"),
  semrush: t("Semrush", "semrush"),
  screamingfrog: t("Screaming Frog", "wp/screamingfrog.png"),
  gsc: t("Search Console", "googlesearchconsole"),
  ga4: t("Google Analytics", "googleanalytics"),
  gtm: t("Tag Manager", "googletagmanager"),
  bing: t("Bing Webmaster Tools", "wp/bing.png"),
  pagespeed: t("PageSpeed Insights", "pagespeedinsights"),
  lighthouse: t("Lighthouse", "lighthouse"),
  // AI
  claudecode: t("Claude Code", "claude-code"),
  codex: t("Codex", "codex"),
  claude: t("Claude", "claude"),
  chatgpt: t("ChatGPT", "openai"),
  cursor: t("Cursor", "cursor"),
  copilot: t("GitHub Copilot", "copilot"),
  gemini: t("Gemini", "gemini"),
  perplexity: t("Perplexity", "perplexity"),
  replit: t("Replit Agent", "replit"),
  // Workflow
  vscode: t("VS Code", "vscode"),
  intellij: t("IntelliJ IDEA", "intellijidea"),
  git: t("Git", "git"),
  github: t("GitHub", "github"),
  npm: t("npm", "npm"),
  figma: t("Figma", "figma"),
  canva: t("Canva", "canva"),
  notion: t("Notion", "notion"),
  // Hosting
  hostinger: t("Hostinger", "hostinger"),
  vercel: t("Vercel", "vercel"),
  cloudflare: t("Cloudflare", "cloudflare"),
  cpanel: t("cPanel", "cpanel"),
} satisfies Record<string, Tool>;

/** `span` is how many of the 6 desktop columns the card takes. */
export const toolGroups: { title: string; caption: string; color: string; span: number; tools: Tool[] }[] = [
  {
    title: "WordPress Development",
    caption: "Custom builds, not just installs",
    color: "#21759B",
    span: 3,
    tools: [tools.wordpress, tools.plugindev, tools.themedev, tools.blocks, tools.cpt, tools.woocommerce, tools.elementor, tools.acf, tools.wptravel, tools.hubspot],
  },
  {
    title: "WordPress Plugins",
    caption: "Speed, SEO, security and forms",
    color: "#F56E28",
    span: 3,
    tools: [tools.wprocket, tools.nitropack, tools.litespeed, tools.rankmath, tools.yoast, tools.sitekit, tools.wordfence, tools.ssl, tools.jetpack, tools.cf7, tools.wpforms, tools.duplicator, tools.aiomigration],
  },
  {
    title: "SEO & Analytics",
    caption: "Research, audit, rank, measure",
    color: "#458CF5",
    span: 3,
    tools: [tools.ahrefs, tools.semrush, tools.rankmath, tools.yoast, tools.screamingfrog, tools.gsc, tools.ga4, tools.gtm, tools.bing, tools.pagespeed, tools.lighthouse, tools.sitekit],
  },
  {
    title: "Frontend",
    caption: "Fast, modern interfaces",
    color: "#61DAFB",
    span: 3,
    tools: [tools.html, tools.css, tools.js, tools.ts, tools.react, tools.next, tools.tailwind, tools.bootstrap, tools.jquery, tools.three],
  },
  {
    title: "Backend & Data",
    caption: "APIs, logic and databases",
    color: "#777BB4",
    span: 2,
    tools: [tools.php, tools.node, tools.python, tools.fastapi, tools.mysql, tools.firebase, tools.postman],
  },
  {
    title: "Mobile Apps",
    caption: "Android and iOS from one codebase",
    color: "#02569B",
    span: 2,
    tools: [tools.flutter, tools.dart, tools.firebase, tools.androidstudio, tools.xcode],
  },
  {
    title: "Hosting & Deploy",
    caption: "Getting it live and keeping it fast",
    color: "#673DE6",
    span: 2,
    tools: [tools.hostinger, tools.vercel, tools.cloudflare, tools.cpanel],
  },
  {
    title: "Workflow & Design",
    caption: "Where the work gets done",
    color: "#F24E1E",
    span: 6,
    tools: [tools.vscode, tools.intellij, tools.git, tools.github, tools.npm, tools.figma, tools.canva, tools.notion],
  },
];

/** The AI tools I pair-program with. */
export const aiTools: Tool[] = [
  tools.claudecode,
  tools.codex,
  tools.claude,
  tools.chatgpt,
  tools.cursor,
  tools.copilot,
  tools.gemini,
  tools.perplexity,
  tools.replit,
];

/** Logos that scroll along the bottom of the hero. */
export const marquee: Tool[] = [
  tools.wordpress,
  tools.next,
  tools.react,
  tools.gsc,
  tools.claudecode,
  tools.php,
  tools.flutter,
  tools.woocommerce,
  tools.ts,
  tools.codex,
  tools.elementor,
  tools.tailwind,
  tools.ga4,
  tools.python,
  tools.mysql,
  tools.firebase,
];

export const stats = [
  { value: "100+", label: "Websites built" },
  { value: "6", label: "Core stacks" },
  { value: "Web + App", label: "Under one roof" },
  { value: "SEO", label: "Built in from day one" },
];

export type Project = {
  /** URL of the case study page: /work/<slug>/ */
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  /** Live site URL. Leave empty ("") to show the row without a link. */
  url: string;
  /** Screenshot inside /public, e.g. "/projects/visiventro.webp". Empty shows a designed preview. */
  image: string;
  /** Accent color for the designed preview. */
  color: string;
  /** Optional Google Search Console results, shown as small stat chips. */
  results?: { value: string; label: string }[];
  /** What the report shows, e.g. "3-month view, web search". */
  resultsNote?: string;
  /** Exact dates the Search Console numbers cover. */
  period?: string;
  /** Screenshot of the Search Console report inside /public. */
  proof?: string;
  /** Agency the project came through, shown as "Delivered via …". */
  via?: { name: string; url: string };
};

const revenuePulses = { name: "Revenue Pulses", url: "https://revenuepulses.com/" };
const visiventroAgency = { name: "Visiventro", url: "https://visiventro.com/" };

// Screenshots live in /public/projects/. `proof` is the Search Console screenshot.
export const projects: Project[] = [
  {
    slug: "doctors-hospital-gujrat",
    via: visiventroAgency,
    name: "Doctors Hospital Gujrat",
    category: "Healthcare",
    description: "Hospital website built on WordPress, with technical and on-page SEO for local healthcare searches.",
    tags: ["WordPress", "SEO"],
    url: "https://doctorshospitalgujrat.com/",
    image: "/projects/doctors.webp",
    proof: "/projects/doctors-gsc.webp",
    color: "#d4ff3a",
    results: [
      { value: "578", label: "Clicks" },
      { value: "17K", label: "Impressions" },
      { value: "6.6", label: "Avg. position" },
    ],
    resultsNote: "Search Console · 3-month view · Web search",
    period: "6 Oct – 7 Nov 2026",
  },
  {
    slug: "jankowski-import-auto",
    via: revenuePulses,
    name: "Jankowski Import Auto",
    category: "Automotive",
    description: "WordPress site and ongoing SEO for a German and European auto repair shop.",
    tags: ["WordPress", "SEO"],
    url: "https://jankowskiimportautoinc.com/",
    image: "/projects/jankowski.webp",
    proof: "/projects/jankowski-gsc.webp",
    color: "#ff6b4a",
    results: [
      { value: "+137%", label: "Clicks (30 → 71)" },
      { value: "+238%", label: "Impressions" },
      { value: "13.6 → 9.6", label: "Avg. position" },
    ],
    resultsNote: "Search Console · last 28 days vs previous 28 days",
    period: "11 Oct – 7 Nov 2026 vs 13 Sep – 10 Oct 2026",
  },
  {
    slug: "palbreedhub",
    name: "PalBreedHub",
    category: "Web app",
    description: "Palworld breeding calculator with reverse search, built with Next.js and SEO-first from launch.",
    tags: ["Next.js", "SEO"],
    url: "https://palbreedhub.com/",
    image: "/projects/palbreedhub.webp",
    proof: "/projects/palbreedhub-gsc.webp",
    color: "#5ee0ff",
    results: [
      { value: "1.6K", label: "Impressions" },
      { value: "9", label: "Clicks" },
    ],
    resultsNote: "Search Console · first days on a brand-new domain",
    period: "29 Oct – 7 Nov 2026",
  },
  {
    slug: "mic-testing-tool",
    name: "Mic Testing Tool",
    category: "Web tool",
    description: "Free online microphone test and recorder built in React. Recordings stay in the browser.",
    tags: ["React"],
    url: "https://mictestingtool.com/",
    image: "/projects/mictest.webp",
    color: "#ffb02e",
  },
  {
    slug: "aujwear",
    via: visiventroAgency,
    name: "AUJ Wear",
    category: "Fashion e-commerce",
    description: "WooCommerce store for a Pakistani streetwear brand selling oversized tees, with variations, sale pricing and a fast checkout.",
    tags: ["WordPress", "WooCommerce"],
    url: "https://aujwear.pk/",
    image: "/projects/aujwear.webp",
    color: "#f5b301",
  },
  {
    slug: "cooking-nations",
    name: "Cooking Nations",
    category: "Food & recipes",
    description: "Recipe blog and shop built on WordPress with Elementor and WooCommerce, set up for SEO with Rank Math and Site Kit.",
    tags: ["WordPress", "SEO"],
    url: "https://cookingnations.com/",
    image: "/projects/cookingnations.webp",
    color: "#e8806f",
  },
  {
    slug: "visiventro",
    name: "Visiventro",
    category: "Software house",
    description: "WordPress website for a Pakistani software house offering web, app and SEO services.",
    tags: ["WordPress"],
    url: "https://visiventro.com/",
    image: "/projects/visiventro.webp",
    color: "#a08bff",
  },
  {
    slug: "mdn-express-ab",
    via: revenuePulses,
    name: "MDN Express AB",
    category: "Chauffeur & transport",
    description: "WordPress website for a chauffeur and transport company.",
    tags: ["WordPress"],
    url: "https://mdnexpressab.com/",
    image: "/projects/mdn.webp",
    color: "#f3f1ea",
  },
];

/** Jobs, newest first. */
export const experience = [
  {
    role: "WordPress Developer",
    company: "ABCDMEDIA LTD",
    url: "https://abcdmedia.co.uk/",
    logo: "/orgs/abcdmedia.png",
    period: "Jan 2026 – Present",
    meta: "Full-time · Remote · Wazirabad, Pakistan",
    points: [
      "Build and maintain WordPress websites for international agency clients.",
      "Handle site builds, PHP customization and SEO for client projects.",
    ],
  },
  {
    role: "WordPress Developer & SEO",
    company: "Technogic Systems",
    url: "https://technogicsystems.com/",
    logo: "/orgs/technogic.png",
    period: "Aug 2025 – Apr 2026",
    meta: "Full-time · On-site · Gujrat, Pakistan",
    points: [
      "Built WordPress sites and ran SEO: keyword research, on-page and technical SEO.",
      "Completed a 6-month SEO & WordPress internship (Sep 2025 – Feb 2026), with a letter from the CEO.",
    ],
  },
];

export const education = [
  {
    title: "Bachelor's in Information Technology",
    place: "University of Gujrat",
    url: "https://uog.edu.pk/",
    logo: "/orgs/uog.png",
    period: "2023 – 2027",
  },
  {
    title: "ICS, Computer Science",
    place: "Punjab College Jalalpur Jattan",
    url: "https://pgc.edu/",
    logo: "/orgs/pgc.png",
    period: "2019 – 2021",
  },
];

export type Certification = {
  title: string;
  /** Who made the course */
  issuer: string;
  issuerUrl: string;
  /** Where it was taken, if different from the issuer */
  platform?: string;
  platformUrl?: string;
  date: string;
  logo: string;
  /** Public verification link or the document itself */
  url: string;
  /** Shown when the verify page needs an ID typed in */
  credentialId?: string;
  linkLabel?: string;
};

/** Newest first. Every item links to a public verification page or the original document. */
export const certifications: Certification[] = [
  {
    title: "SEO & WordPress Development Internship (6 months)",
    issuer: "Technogic Systems",
    issuerUrl: "https://technogicsystems.com/",
    date: "Feb 2026",
    logo: "/orgs/technogic.png",
    url: "/certificates/technogic-internship-letter.pdf",
    linkLabel: "View letter",
  },
  {
    title: "SEO (Search Engine Optimization)",
    issuer: "DigiSkills.pk",
    issuerUrl: "https://digiskills.pk/",
    platform: "Govt. of Pakistan program",
    date: "Dec 2025",
    logo: "/orgs/digiskills.png",
    url: "https://digiskills.pk/verify",
    credentialId: "684FVXEMK",
  },
  {
    title: "Freelancing",
    issuer: "DigiSkills.pk",
    issuerUrl: "https://digiskills.pk/",
    platform: "Govt. of Pakistan program",
    date: "Dec 2025",
    logo: "/orgs/digiskills.png",
    url: "https://digiskills.pk/verify",
    credentialId: "KFUHSTQMK",
  },
  {
    title: "Advanced Styling with Responsive Design",
    issuer: "University of Michigan",
    issuerUrl: "https://umich.edu/",
    platform: "Coursera",
    platformUrl: "https://www.coursera.org/",
    date: "Jun 2025",
    logo: "/orgs/umich.svg",
    url: "https://coursera.org/verify/Q8XZMLPKWYT2",
  },
  {
    title: "Interactivity with JavaScript",
    issuer: "University of Michigan",
    issuerUrl: "https://umich.edu/",
    platform: "Coursera",
    platformUrl: "https://www.coursera.org/",
    date: "Jun 2025",
    logo: "/orgs/umich.svg",
    url: "https://coursera.org/verify/DCXASE1VEO0T",
  },
  {
    title: "Introduction to CSS3",
    issuer: "University of Michigan",
    issuerUrl: "https://umich.edu/",
    platform: "Coursera",
    platformUrl: "https://www.coursera.org/",
    date: "Jun 2025",
    logo: "/orgs/umich.svg",
    url: "https://coursera.org/verify/DHN9M30ITY7W",
  },
  {
    title: "Introduction to HTML5",
    issuer: "University of Michigan",
    issuerUrl: "https://umich.edu/",
    platform: "Coursera",
    platformUrl: "https://www.coursera.org/",
    date: "Jun 2025",
    logo: "/orgs/umich.svg",
    url: "https://coursera.org/verify/1QR7F3VBO1IB",
  },
  {
    title: "Introduction to Cybersecurity Essentials",
    issuer: "IBM",
    issuerUrl: "https://www.ibm.com/",
    platform: "Coursera",
    platformUrl: "https://www.coursera.org/",
    date: "Apr 2025",
    logo: "/orgs/ibm.svg",
    url: "https://coursera.org/verify/JZKKIF4AHDJ2",
  },
];

export const processSteps = [
  {
    title: "Understand the goal",
    description: "We talk through what the website or app needs to do, who it is for and what success looks like.",
  },
  {
    title: "Plan the structure",
    description: "Pages, screens, content and SEO foundations are mapped out before any design, so the build has a clear direction.",
  },
  {
    title: "Design & build",
    description: "I build on the right stack (WordPress, Next.js, PHP or Flutter) with speed and search visibility in mind.",
  },
  {
    title: "Review & refine",
    description: "We test and refine together on real devices, and I check every technical detail before launch.",
  },
  {
    title: "Launch & grow",
    description: "Go live, submit to Search Console, track performance and keep improving after launch.",
  },
];

/** The multi-step "Hire me" form. */
export const hireSteps = {
  needs: [
    "WordPress website",
    "Next.js / React app",
    "Flutter mobile app",
    "SEO & audit",
    "PHP / custom backend",
    "Something else",
  ],
  stage: ["Brand-new build", "Redesign", "Fix & speed up", "Ongoing support"],
  currencies: [
    { code: "USD", symbol: "$" },
    { code: "GBP", symbol: "£" },
    { code: "EUR", symbol: "€" },
  ],
  budgets: ["Under 500", "500 – 1,500", "1,500 – 5,000", "5,000+", "Not sure yet"],
  timelines: ["ASAP", "2 – 4 weeks", "1 – 3 months", "Flexible"],
};
