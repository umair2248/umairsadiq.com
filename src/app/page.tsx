import type { Metadata } from "next";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CookieConsent } from "@/components/CookieConsent";
import { Doors } from "@/components/Doors";
import { Cursor, Loader, RevealObserver, ScrollProgress } from "@/components/Effects";
import { Experience } from "@/components/Experience";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HireModal } from "@/components/HireModal";
import { CallCta, HomeCountries, HomeFaq, HomePricing, HomeRecruiter, HomeResults, HomeServices } from "@/components/HomeSeo";
import { JsonLd, faqLd } from "@/components/PageParts";
import { Process } from "@/components/Process";
import { ScrollFX } from "@/components/ScrollFX";
import { Toolkit } from "@/components/Toolkit";
import { Work } from "@/components/Work";
import { homeFaqs, homeSeo } from "@/data/home";
import { hreflang } from "@/data/i18n";
import { ogImage } from "@/data/seo";

export const metadata: Metadata = {
  title: { absolute: homeSeo.title },
  description: homeSeo.description,
  alternates: { canonical: "/", languages: hreflang },
  openGraph: { url: "/", title: homeSeo.title, description: homeSeo.description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: homeSeo.title, description: homeSeo.description, images: [ogImage.url] },
};

export default function Home() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Header />
      <JsonLd graph={[faqLd(homeFaqs)]} />
      <main id="main">
        <Hero />
        <CallCta
          title={
            <>
              Not sure where to start? <em>Let&rsquo;s talk for 15 minutes.</em>
            </>
          }
          text="Tell me about your site on a free call or WhatsApp. You'll get honest advice and a clear next step, even if you don't hire me."
        />
        <About />
        <HomeRecruiter />
        <HomeServices />
        <Doors />
        <HomeResults />
        <Toolkit />
        <Work />
        <CallCta
          title={
            <>
              Want results like these <em>on your site?</em>
            </>
          }
          text="Book a free 15-minute call. I'll look at your current site or idea and tell you what I'd build or fix first."
        />
        <HomeCountries />
        <Experience />
        <Process />
        <HomePricing />
        <HomeFaq />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
      <HireModal />
      <CookieConsent />
      <Cursor />
      <RevealObserver />
      <ScrollFX />
    </>
  );
}
