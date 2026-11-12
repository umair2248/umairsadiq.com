/**
 * Free, rule-based website assistant. Runs entirely in the visitor's browser:
 * no AI API, no server, no cost. It matches the question to an intent using
 * keywords (English, Roman Urdu and Urdu) and answers from the site data, so
 * answers stay in sync with the website.
 *
 * To teach it something new: add an intent to `intents` below.
 */
import { caseStudies, services } from "@/data/pages";
import { contact, experience, profile, projects } from "@/data/site";

export type Reply = { text: string; chips?: string[] };
type Lang = "en" | "ur";

const site = profile.siteUrl;
const wa = (q?: string) =>
  `${contact.whatsapp}?text=${encodeURIComponent(q ? `Hi Umair, ${q}` : `Hi Umair, I found your website and I'd like to talk about a project.`)}`;

/** Roman Urdu / Urdu detection: reply in the same style when the visitor writes that way. */
function detectLang(text: string): Lang {
  if (/[؀-ۿ]/.test(text)) return "ur";
  const romanUrdu =
    /\b(kya|kia|kaya|hai|ha|hain|kitna|kitne|kitni|paisa|paise|pese|chahiye|chahye|chahay|mujhe|muje|muja|mujhy|aap|ap|apka|apki|karte|krte|karo|kar|krna|karna|banwani|banani|bana|banao|bata|batao|btao|kaise|kese|kab|kahan|kidhar|nahi|nai|haan|han|salam|shukriya|theek|thik|wala|wali|yar|yaar|bhai|website ki|kitny)\b/i;
  return romanUrdu.test(text) ? "ur" : "en";
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^\p{L}\p{N}\s.+#]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

type Intent = {
  id: string;
  /** Words or phrases; each match adds its weight. Regex strings are tested on the normalised text. */
  keys: (string | RegExp)[];
  weight?: number;
  answer: (lang: Lang, q: string) => Reply;
};

const serviceLink = (slug: string) => {
  const s = services.find((x) => x.slug === slug)!;
  return `[${s.name}](${site}/services/${s.slug}/)`;
};

const seoProjects = projects.filter((p) => p.results);

const intents: Intent[] = [
  {
    id: "greeting",
    keys: [/^(hi|hello|hey|hy|hlo|salam|assalam|aoa|asalam|assalamualaikum|salaam)\b/, "good morning", "good evening"],
    weight: 0.6,
    answer: (l) =>
      l === "ur"
        ? { text: `Walaikum assalam! 👋 Main ${profile.firstName} ka assistant hoon. Aap ko website, SEO ya app ke baare mein kya jaanna hai?`, chips: ["Services kya hain?", "Price kitni hai?", "Projects dikhao"] }
        : { text: `Hi there! 👋 I'm ${profile.firstName}'s assistant. What would you like to know: services, projects, prices or how to hire him?`, chips: ["What services do you offer?", "How much does a website cost?", "Show me your projects"] },
  },
  {
    id: "price",
    keys: ["price", "pricing", "cost", "costs", "rate", "rates", "budget", "charge", "charges", "fee", "fees", "quote", "quotation", "how much", "expensive", "cheap", "paisa", "paise", "pese", "pesa", "kitna", "kitne", "kitni", "kharcha", "qeemat", "keemat", "rupees", "dollar", "$", "قیمت", "پیسے"],
    weight: 1.4,
    answer: (l, q) =>
      l === "ur"
        ? {
            text: `Umair har project ka price us ke kaam ke hisaab se batate hain: kitne pages, kaun se features (store, booking, custom plugin), aur SEO chahiye ya nahi. Koi fixed rate nahi, taake aap sirf apne kaam ke paise dein.\n\nApni details WhatsApp par bhej dein, Umair khud quote denge: [WhatsApp par poochein](${wa(q)})`,
            chips: ["Kitne din lagenge?", "Projects dikhao", "Contact kaise karun?"],
          }
        : {
            text: `Umair quotes per project, based on what you need: how many pages, which features (store, booking, custom plugin) and whether you want SEO. There's no fixed price list, so you only pay for your scope.\n\nSend a few details and he'll reply with a quote: [Ask on WhatsApp](${wa(q)}) or use the [Start a project form](${site}/contact/).`,
            chips: ["How long does a website take?", "Show me your projects", "What services do you offer?"],
          },
  },
  {
    id: "hire",
    keys: ["hire", "hiring", "contact", "reach", "whatsapp", "email", "mail", "phone", "call", "number", "talk", "start a project", "work with", "get in touch", "rabta", "raabta", "baat", "number do", "contact kaise", "kaam karwana", "karwana", "banwani", "banwana", "chahiye", "need a website", "want a website", "build my", "make my", "رابطہ"],
    weight: 1.1,
    answer: (l) =>
      l === "ur"
        ? {
            text: `Umair se rabta karne ke tareeqe:\n- [WhatsApp](${wa()}) (sab se jaldi jawab)\n- Email: [${contact.email}](mailto:${contact.email})\n- Phone: ${contact.phoneDisplay}\n- Ya [Start a project form](${site}/contact/) bhar dein\n\nWoh ${profile.hours.label} (Pakistan time) online hote hain.`,
            chips: ["Price kitni hai?", "Services kya hain?"],
          }
        : {
            text: `Here's how to reach Umair:\n- [WhatsApp](${wa()}) (fastest reply)\n- Email: [${contact.email}](mailto:${contact.email})\n- Phone: ${contact.phoneDisplay}\n- Or fill in the [Start a project form](${site}/contact/)\n\nHe's online ${profile.hours.label} Pakistan time, and you can message any time.`,
            chips: ["How much does a website cost?", "What services do you offer?"],
          },
  },
  {
    id: "services",
    keys: ["service", "services", "offer", "what do you do", "what can you do", "skills", "provide", "kya karte", "kya kaam", "kaam kya", "services kya", "kya kya", "خدمات"],
    answer: (l) => {
      const list = services.map((s) => `- [${s.name}](${site}/services/${s.slug}/)`).join("\n");
      return l === "ur"
        ? { text: `Umair yeh kaam karte hain:\n${list}\n\nKis cheez ke baare mein mazeed jaanna hai?`, chips: ["WordPress", "SEO", "Price kitni hai?"] }
        : { text: `Umair offers:\n${list}\n\nWhich one would you like to know more about?`, chips: ["WordPress development", "SEO services", "How much does it cost?"] };
    },
  },
  {
    id: "wordpress",
    keys: ["wordpress", "wp", "elementor", "plugin", "theme", "gutenberg", "acf", "word press", "ورڈپریس"],
    answer: (l) =>
      l === "ur"
        ? { text: `Haan, WordPress Umair ka main kaam hai: custom themes, custom plugins, Gutenberg blocks, Elementor sites aur redesigns, sab SEO ke saath. Aap khud dashboard se site chala sakte hain.\n\nTafseel: ${serviceLink("wordpress-development")}`, chips: ["WordPress projects dikhao", "Price kitni hai?"] }
        : { text: `Yes, WordPress is Umair's main work: custom themes, custom plugins, Gutenberg blocks, Elementor builds and redesigns, all with SEO built in, and you can edit everything yourself.\n\nMore: ${serviceLink("wordpress-development")}`, chips: ["Show me WordPress projects", "How much does it cost?"] },
  },
  {
    id: "woocommerce",
    keys: ["woocommerce", "woo", "store", "shop", "ecommerce", "e commerce", "online store", "products", "sell online", "dukaan", "dukan", "online dukan"],
    weight: 1.2,
    answer: (l) =>
      l === "ur"
        ? { text: `Online store ke liye Umair WooCommerce (WordPress) par kaam karte hain: products, payments, checkout aur store ki speed. Store aap khud chala sakte hain.\n\nTafseel: ${serviceLink("woocommerce-development")}`, chips: ["Price kitni hai?", "Contact kaise karun?"] }
        : { text: `For online stores Umair builds on WooCommerce: product catalogues, payments, checkout tweaks and store speed, and you manage products and orders yourself.\n\nMore: ${serviceLink("woocommerce-development")}`, chips: ["How much does it cost?", "How can I hire Umair?"] },
  },
  {
    id: "seo",
    keys: ["seo", "rank", "ranking", "google", "search engine", "traffic", "keywords", "first page", "page one", "backlink", "audit", "search console", "rank math", "yoast", "ahrefs", "semrush"],
    answer: (l) => {
      const proof = seoProjects
        .map((p) => `- [${p.name}](${site}/work/${p.slug}/): ${p.results!.map((r) => `${r.value} ${r.label.toLowerCase()}`).join(", ")}`)
        .join("\n");
      return l === "ur"
        ? { text: `Umair technical aur on-page SEO karte hain: audits, keyword research, schema aur speed. Asli results (Google Search Console se):\n${proof}\n\nTafseel: ${serviceLink("seo-services")}`, chips: ["Price kitni hai?", "Kitna time lagta hai?"] }
        : { text: `Umair does technical and on-page SEO: audits, keyword research, schema and speed. Real results from Google Search Console:\n${proof}\n\nMore: ${serviceLink("seo-services")}`, chips: ["How long does SEO take?", "How much does it cost?"] };
    },
  },
  {
    id: "speed",
    keys: ["speed", "slow", "fast", "loading", "core web vitals", "pagespeed", "lighthouse", "wp rocket", "nitropack", "litespeed", "optimize", "optimization", "optimise", "dheemi", "slow hai"],
    answer: (l) =>
      l === "ur"
        ? { text: `Slow WordPress site ko Umair fast karte hain: caching (WP Rocket, NitroPack, LiteSpeed), images, aur bhaari plugins ki safai, saath PageSpeed ka pehle/baad ka report.\n\nTafseel: ${serviceLink("wordpress-speed-optimization")}` }
        : { text: `Umair speeds up slow WordPress sites: caching with WP Rocket, NitroPack or LiteSpeed, image optimisation and plugin clean-up, with a before-and-after PageSpeed report.\n\nMore: ${serviceLink("wordpress-speed-optimization")}` },
  },
  {
    id: "next",
    keys: ["next", "nextjs", "next.js", "react", "reactjs", "javascript", "typescript", "web app", "webapp", "frontend", "front end", "tool"],
    answer: (l) =>
      l === "ur"
        ? { text: `Haan, Umair Next.js aur React mein fast, SEO-friendly websites aur web apps banate hain. Misal: [PalBreedHub](${site}/work/palbreedhub/) aur [Mic Testing Tool](${site}/work/mic-testing-tool/). Yeh website bhi Next.js par bani hai.\n\nTafseel: ${serviceLink("nextjs-react-development")}` }
        : { text: `Yes, Umair builds fast, SEO-friendly sites and web apps with Next.js and React, for example [PalBreedHub](${site}/work/palbreedhub/) and the [Mic Testing Tool](${site}/work/mic-testing-tool/). This website is built with Next.js too.\n\nMore: ${serviceLink("nextjs-react-development")}` },
  },
  {
    id: "flutter",
    keys: ["flutter", "app", "apps", "mobile", "android", "ios", "iphone", "play store", "app store", "dart", "firebase", "application"],
    answer: (l) =>
      l === "ur"
        ? { text: `Haan, Umair Flutter mein Android aur iOS dono ki apps ek hi code se banate hain, Firebase ya aap ki website/API ke saath.\n\nTafseel: ${serviceLink("flutter-app-development")}` }
        : { text: `Yes, Umair builds Flutter apps that run on both Android and iOS from one codebase, connected to Firebase or your website/API.\n\nMore: ${serviceLink("flutter-app-development")}` },
  },
  {
    id: "projects",
    keys: ["project", "projects", "portfolio", "work", "examples", "example", "samples", "case study", "case studies", "previous", "clients", "websites made", "dikhao", "dekhna", "kaam dikhao", "results"],
    answer: (l) => {
      const list = projects.map((p) => `- [${p.name}](${site}/work/${p.slug}/): ${p.category}, ${p.tags.join(" + ")}`).join("\n");
      return l === "ur"
        ? { text: `Umair ki kuch live websites:\n${list}\n\nSab dekhein: [Case studies](${site}/work/)`, chips: ["SEO results?", "Price kitni hai?"] }
        : { text: `Some of Umair's live sites:\n${list}\n\nSee them all: [Case studies](${site}/work/)`, chips: ["Show me SEO results", "How much does a website cost?"] };
    },
  },
  {
    id: "timeline",
    keys: ["how long", "time", "timeline", "days", "weeks", "deadline", "deliver", "delivery", "kitne din", "kitna time", "kab tak", "jaldi", "urgent", "fast delivery"],
    answer: (l) =>
      l === "ur"
        ? { text: `Time kaam par depend karta hai: pages, features aur content kitna tayyar hai. Pehli baat cheet ke baad Umair aap ko saaf timeline aur plan dete hain. AI tools (Claude Code, Codex) ki wajah se kaam aam tor par jaldi hota hai.\n\n[WhatsApp par apna project batayein](${wa("mujhe website ka timeline jaanna hai.")})` }
        : { text: `It depends on the number of pages, the features and how ready your content is. After a short first call Umair gives you a clear timeline and plan. He uses AI tools like Claude Code and Codex for the repetitive parts, so most builds move quickly.\n\n[Tell him about your project on WhatsApp](${wa("I'd like a timeline for my project.")})` },
  },
  {
    id: "hours",
    keys: ["available", "availability", "online", "hours", "timing", "timings", "when", "open", "reply", "respond", "time zone", "timezone", "kab", "online ho", "waqt"],
    weight: 0.9,
    answer: (l) =>
      l === "ur"
        ? { text: `Umair rozana ${profile.hours.label} (Pakistan time) online hote hain. Is waqt ke bahar bhi message chhor dein, subah jawab mil jayega. [WhatsApp](${wa()})` }
        : { text: `Umair is online ${profile.hours.label} Pakistan time (UTC+5), every day. Outside those hours you can still leave a message and he'll reply in the morning. [WhatsApp](${wa()})` },
  },
  {
    id: "location",
    keys: ["where", "location", "located", "country", "city", "pakistan", "gujrat", "remote", "abroad", "uk", "usa", "international", "kahan", "kidhar"],
    weight: 0.9,
    answer: (l) =>
      l === "ur"
        ? { text: `Umair Gujrat, Punjab (Pakistan) se hain aur poori duniya ke clients ke saath remote kaam karte hain.` }
        : { text: `Umair is based in Gujrat, Punjab, Pakistan, and works remotely with clients worldwide, including international agency clients.` },
  },
  {
    id: "about",
    keys: ["who", "about", "experience", "background", "education", "study", "degree", "university", "cv", "resume", "company", "job", "kaun", "tajurba", "experience kitna"],
    answer: (l) => {
      const jobs = experience.map((j) => `- ${j.role}, ${j.company} (${j.period})`).join("\n");
      return l === "ur"
        ? { text: `${profile.name} WordPress developer aur SEO specialist hain, ${profile.websitesBuilt} websites bana chuke hain.\n${jobs}\n- BS IT, University of Gujrat\n\n[About page](${site}/about/) · [CV download](${site}${contact.cv})` }
        : { text: `${profile.name} is a WordPress developer and SEO specialist with ${profile.websitesBuilt} websites built.\n${jobs}\n- BS Information Technology, University of Gujrat\n\n[About Umair](${site}/about/) · [Download CV](${site}${contact.cv})` };
    },
  },
  {
    id: "bot",
    keys: ["are you human", "are you a bot", "are you ai", "real person", "robot", "bot ho", "insaan", "are you umair", "who are you"],
    weight: 1.5,
    answer: (l) =>
      l === "ur"
        ? { text: `Main ${profile.firstName} ka automatic assistant hoon, insaan nahi. Umair se seedhi baat ke liye [WhatsApp](${wa()}) karein.` }
        : { text: `I'm ${profile.firstName}'s automated assistant, not a person. To talk to Umair himself, [message him on WhatsApp](${wa()}).` },
  },
  {
    id: "thanks",
    keys: [/^(thanks|thank you|thx|ty|shukriya|shukria|jazakallah|ok|okay|great|nice|cool|bye|allah hafiz)\b/],
    weight: 0.8,
    answer: (l) =>
      l === "ur"
        ? { text: `Shukriya! 😊 Kuch aur poochna ho to batayein, ya [WhatsApp par Umair se baat karein](${wa()}).` }
        : { text: `You're welcome! 😊 Anything else? You can also [message Umair on WhatsApp](${wa()}).` },
  },
];

/** Projects mentioned by name get their own answer. */
function projectAnswer(q: string, lang: Lang): Reply | null {
  const p = projects.find((x) => {
    const words = norm(x.name).split(" ").filter((w) => w.length > 3);
    return words.some((w) => q.includes(w));
  });
  if (!p) return null;
  const cs = caseStudies[p.slug];
  const result = cs?.outcome ? `\n\n${cs.outcome}` : "";
  return {
    text:
      lang === "ur"
        ? `**${p.name}** (${p.category}, ${p.tags.join(" + ")}): ${cs?.summary ?? p.description}${result}\n\n[Case study](${site}/work/${p.slug}/) · [Live site](${p.url})`
        : `**${p.name}** (${p.category}, ${p.tags.join(" + ")}): ${cs?.summary ?? p.description}${result}\n\n[Read the case study](${site}/work/${p.slug}/) · [Visit the site](${p.url})`,
  };
}

function score(intent: Intent, q: string) {
  let s = 0;
  for (const k of intent.keys) {
    if (k instanceof RegExp) {
      if (k.test(q)) s += 1;
    } else if (k.includes(" ") || k.length <= 3) {
      // Phrases and short words must match as whole words.
      if (new RegExp(`(^|\\s)${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`).test(q)) s += 1.2;
    } else if (q.includes(k)) {
      s += 1;
    }
  }
  return s * (intent.weight ?? 1);
}

export function answer(question: string): Reply {
  const lang = detectLang(question);
  const q = norm(question);
  if (!q) return { text: lang === "ur" ? "Kuch likhein, main madad karta hoon." : "Type a question and I'll help." };

  const ranked = intents.map((i) => ({ i, s: score(i, q) })).sort((a, b) => b.s - a.s);
  const best = ranked[0];

  // A named project beats generic topics like "seo" or "wordpress".
  const proj = projectAnswer(q, lang);
  if (proj && (!best || best.s < 1.4 || ["projects", "seo", "wordpress", "next"].includes(best.i.id))) return proj;

  if (best && best.s >= 0.6) {
    // Greeting + a real question ("hi, how much is a website?"): answer the question.
    const real = ranked.find((r) => r.i.id !== "greeting" && r.i.id !== "thanks" && r.s >= 0.9);
    return (real ?? best).i.answer(lang, question);
  }

  return lang === "ur"
    ? {
        text: `Yeh sawal main theek se nahi samjha. 🙏 Umair khud jawab de denge: [WhatsApp par yahi sawal bhejein](${wa(question)}).\n\nYa in mein se kuch poochein:`,
        chips: ["Services kya hain?", "Price kitni hai?", "Projects dikhao", "Contact kaise karun?"],
      }
    : {
        text: `I'm not sure about that one. 🙏 Umair can answer it directly: [send this question on WhatsApp](${wa(question)}).\n\nOr try one of these:`,
        chips: ["What services do you offer?", "How much does a website cost?", "Show me your projects", "How can I hire Umair?"],
      };
}
