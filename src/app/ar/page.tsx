import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { LocalHome } from "@/components/LocalHome";
import { JsonLd, faqLd } from "@/components/PageParts";
import { SiteChrome } from "@/components/SiteChrome";
import { ar, hreflang } from "@/data/i18n";
import { ogImage } from "@/data/seo";

const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "600", "800"], variable: "--font-locale", display: "swap" });

export const metadata: Metadata = {
  title: { absolute: ar.meta.title },
  description: ar.meta.description,
  alternates: { canonical: ar.path, languages: hreflang },
  openGraph: { url: ar.path, locale: "ar_AE", title: ar.meta.title, description: ar.meta.description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: ar.meta.title, description: ar.meta.description, images: [ogImage.url] },
};

export default function ArabicHome() {
  return (
    <SiteChrome>
      <JsonLd graph={[{ ...faqLd(ar.faq.items), inLanguage: "ar" }]} />
      <LocalHome t={ar} fontClass={cairo.variable} />
    </SiteChrome>
  );
}
