import type { Metadata } from "next";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import { LocalHome } from "@/components/LocalHome";
import { JsonLd, faqLd } from "@/components/PageParts";
import { SiteChrome } from "@/components/SiteChrome";
import { hreflang, ur } from "@/data/i18n";
import { ogImage } from "@/data/seo";

const nastaliq = Noto_Nastaliq_Urdu({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-locale", display: "swap" });

export const metadata: Metadata = {
  title: { absolute: ur.meta.title },
  description: ur.meta.description,
  alternates: { canonical: ur.path, languages: hreflang },
  openGraph: { url: ur.path, locale: "ur_PK", title: ur.meta.title, description: ur.meta.description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: ur.meta.title, description: ur.meta.description, images: [ogImage.url] },
};

export default function UrduHome() {
  return (
    <SiteChrome>
      <JsonLd graph={[{ ...faqLd(ur.faq.items), inLanguage: "ur" }]} />
      <LocalHome t={ur} fontClass={nastaliq.variable} />
    </SiteChrome>
  );
}
