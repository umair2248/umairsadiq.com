import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { services } from "@/data/pages";
import { certifications, contact, education, experience, profile, projects, toolGroups } from "@/data/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const title = `${profile.name} | WordPress Developer & SEO Specialist in Pakistan`;
const GTM_ID = "GTM-K8WZCTJX";
const site = profile.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description: profile.metaDescription,
  applicationName: profile.name,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: site }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  keywords: [
    "Umair Sadiq",
    "WordPress developer",
    "WordPress developer Pakistan",
    "WordPress plugin developer",
    "WordPress theme developer",
    "WooCommerce developer",
    "SEO specialist",
    "SEO expert Pakistan",
    "technical SEO",
    "Next.js developer",
    "React developer",
    "PHP developer",
    "Flutter app developer",
    "freelance web developer",
    "web developer Gujrat",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.metaDescription,
    locale: "en_US",
    firstName: "Umair",
    lastName: "Sadiq",
    username: "umair2248",
  },
  twitter: { card: "summary_large_image", title, description: profile.metaDescription },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0e",
  colorScheme: "dark light",
};

/**
 * Structured data (schema.org JSON-LD) so search engines and AI answers know
 * who Umair is, what he offers, where he works and which sites he built.
 */
const personId = `${site}/#person`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site}/#website`,
      url: `${site}/`,
      name: profile.name,
      description: profile.metaDescription,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site}/#profile`,
      url: `${site}/`,
      name: title,
      isPartOf: { "@id": `${site}/#website` },
      mainEntity: { "@id": personId },
      primaryImageOfPage: `${site}/umair-sadiq.webp`,
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      givenName: "Umair",
      familyName: "Sadiq",
      jobTitle: "WordPress Developer & SEO Specialist",
      description: profile.metaDescription,
      url: `${site}/`,
      image: `${site}/umair-sadiq.webp`,
      email: `mailto:${contact.email}`,
      telephone: contact.phoneHref.replace("tel:", ""),
      address: { "@type": "PostalAddress", addressLocality: "Gujrat", addressRegion: "Punjab", addressCountry: "PK" },
      nationality: { "@type": "Country", name: "Pakistan" },
      worksFor: { "@type": "Organization", name: experience[0].company, url: experience[0].url },
      alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.place, url: e.url })),
      hasCredential: certifications.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.title,
        credentialCategory: c.title.includes("Internship") ? "Internship" : "Certificate",
        url: c.url.startsWith("/") ? `${site}${c.url}` : c.url,
        recognizedBy: { "@type": "Organization", name: c.issuer, url: c.issuerUrl },
      })),
      sameAs: [contact.linkedin, contact.github, contact.facebook, contact.instagram, contact.x, contact.reddit, contact.pinterest],
      knowsAbout: [
        "WordPress development",
        "WordPress plugin development",
        "WordPress theme development",
        "WooCommerce",
        "Technical SEO",
        "On-page SEO",
        "Core Web Vitals",
        "Schema markup",
        ...toolGroups.flatMap((g) => g.tools.map((t) => t.name)).filter((v, i, a) => a.indexOf(v) === i),
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site}/#service`,
      name: `${profile.name}: Web Development & SEO`,
      url: `${site}/`,
      image: `${site}/umair-sadiq.webp`,
      email: contact.email,
      telephone: contact.phoneHref.replace("tel:", ""),
      founder: { "@id": personId },
      areaServed: "Worldwide",
      address: { "@type": "PostalAddress", addressLocality: "Gujrat", addressRegion: "Punjab", addressCountry: "PK" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((sv) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: sv.name, description: sv.metaDescription, url: `${site}/services/${sv.slug}/` },
        })),
      },
    },
    {
      "@type": "ItemList",
      "@id": `${site}/#work`,
      name: "Selected work",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.name,
          url: p.url,
          description: p.description,
          image: `${site}${p.image}`,
          creator: { "@id": personId },
          keywords: p.tags.join(", "),
        },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before paint: marks JS as available (so intro animations never hide content without JS)
            and applies the saved theme so white mode never flashes dark first. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}try{if(matchMedia('(max-width: 899px)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('curtain-seen'))d.classList.add('no-curtain','intro-done')}catch(e){}",
          }}
        />
        <link rel="me" href={contact.linkedin} />
        <link rel="me" href={contact.github} />
        <link rel="me" href={contact.facebook} />
        <link rel="me" href={contact.instagram} />
        <link rel="me" href={contact.x} />
        <link rel="me" href={contact.reddit} />
        <link rel="me" href={contact.pinterest} />
        {/* Google Consent Mode v2: everything denied by default, then the visitor's saved choice (if any).
            Must run before Google Tag Manager. The banner is components/CookieConsent.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});try{var c=JSON.parse(localStorage.getItem('cookie-consent-v1')||'null');if(c){gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:c.marketing?'granted':'denied',ad_user_data:c.marketing?'granted':'denied',ad_personalization:c.marketing?'granted':'denied'})}}catch(e){}`,
          }}
        />
        {/* Google Tag Manager, loaded on the first interaction (or 4 s after load) so it never blocks the first paint. GA4 is configured inside GTM. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){var done=false;function load(){if(done)return;done=true;w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}['scroll','pointerdown','keydown','touchstart'].forEach(function(e){w.addEventListener(e,load,{once:true,passive:true})});w.addEventListener('load',function(){setTimeout(load,4000)});})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
