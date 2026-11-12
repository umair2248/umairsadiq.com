import { CookieConsent } from "./CookieConsent";
import { Cursor, IntroDone, RevealObserver, ScrollProgress } from "./Effects";
import { FloatingContact } from "./FloatingContact";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HireModal } from "./HireModal";
import { ScrollFX } from "./ScrollFX";

/** Header, footer and site-wide extras for every page except the home page (which adds the curtain intro). */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroDone />
      <ScrollProgress />
      <Header />
      <main id="main" className="page">
        {children}
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
