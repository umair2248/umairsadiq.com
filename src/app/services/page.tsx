import type { Metadata } from "next";
import { ogImage } from "@/data/seo";
import { CtaBand, JsonLd, PageHero, breadcrumbLd } from "@/components/PageParts";
import { ArrowRight } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { SiteChrome } from "@/components/SiteChrome";
import { services } from "@/data/pages";
import { profile } from "@/data/site";

export const metadata: Metadata = {
  title: "Services: WordPress, SEO, Next.js & Flutter | Umair Sadiq",
  description:
    "Web development and SEO services by Umair Sadiq: WordPress development, SEO, WooCommerce, speed optimization, Next.js & React, and Flutter apps.",
  alternates: { canonical: "/services/" },
  openGraph: { url: "/services/", title: "Services | Umair Sadiq", images: [ogImage] },
};

export default function ServicesPage() {
  const crumbs = [{ name: "Services", href: "/services/" }];
  return (
    <SiteChrome>
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            "@type": "ItemList",
            name: "Services",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${profile.siteUrl}/services/${s.slug}/`,
              name: s.name,
            })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Services"
        title={
          <>
            Websites, SEO and apps, <span className="muted">built to be found.</span>
          </>
        }
        lead="Six things I do every week for clients around the world. Pick the one you need, or tell me about your project and I'll suggest the right mix."
      />

      <section className="section">
        <div className="container">
          <ul className="service-grid" role="list">
            {services.map((s, i) => (
              <li key={s.slug} className="service-card fx-rise" data-scroll="through" style={{ "--c": s.color } as React.CSSProperties}>
                <a href={`/services/${s.slug}/`} className="service-card__link">
                  <span className="service-card__num">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="service-card__title">{s.name}</h2>
                  <p className="service-card__text">{s.tagline}</p>
                  <span className="service-card__logos" aria-hidden="true">
                    {s.tools.slice(0, 5).map((t) => (
                      <Logo key={t.name} tool={t} size={30} />
                    ))}
                  </span>
                  <span className="service-card__more">
                    Learn more <ArrowRight width={16} height={16} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Not sure which one <em>you need?</em>
          </>
        }
        text="Answer five quick questions and I'll come back with a plan and the right stack for your project."
      />
    </SiteChrome>
  );
}
