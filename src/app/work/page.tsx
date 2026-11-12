import type { Metadata } from "next";
import { ogImage } from "@/data/seo";
import { ArrowRight } from "@/components/Icons";
import { CtaBand, JsonLd, PageHero, breadcrumbLd } from "@/components/PageParts";
import { SiteChrome } from "@/components/SiteChrome";
import { Browser, Via } from "@/components/Work";
import { caseStudies } from "@/data/pages";
import { profile, projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies: WordPress, SEO & Next.js | Umair Sadiq",
  description:
    "Case studies by Umair Sadiq: WordPress websites, SEO results from Google Search Console, and Next.js and React web apps, all live today.",
  alternates: { canonical: "/work/" },
  openGraph: { url: "/work/", title: "Portfolio & Case Studies | Umair Sadiq", images: [ogImage] },
};

export default function WorkIndex() {
  const crumbs = [{ name: "Work", href: "/work/" }];
  return (
    <SiteChrome>
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            "@type": "CollectionPage",
            name: "Portfolio & case studies",
            url: `${profile.siteUrl}/work/`,
            hasPart: projects.map((p) => ({ "@type": "CreativeWork", name: p.name, url: `${profile.siteUrl}/work/${p.slug}/` })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Portfolio"
        title={
          <>
            Case studies <span className="muted">with real numbers.</span>
          </>
        }
        lead="A selection of the 100+ sites I've built. Every site here is live, and the SEO results are taken straight from each site's Google Search Console, with dates."
      />

      <section className="section">
        <div className="container">
          <ul className="work-grid" role="list">
            {projects.map((p) => (
              <li key={p.slug} className="work-card fx-rise" data-scroll="through" style={{ "--c": p.color } as React.CSSProperties}>
                <Browser project={p} />
                <div className="work-card__body">
                  <p className="case__top">
                    <span className="case__cat">{p.category}</span>
                  </p>
                  <h2 className="work-card__title">
                    <a href={`/work/${p.slug}/`}>{p.name}</a>
                  </h2>
                  <Via project={p} />
                  <p className="work-card__text">{caseStudies[p.slug]?.summary ?? p.description}</p>
                  {p.results ? (
                    <ul className="work-card__results" role="list">
                      {p.results.map((r) => (
                        <li key={r.label}>
                          <strong>{r.value}</strong> {r.label}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <a href={`/work/${p.slug}/`} className="related__more">
                    Read the case study <ArrowRight width={14} height={14} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Want results like <em>these?</em>
          </>
        }
        text="Tell me about your site and goals. I'll reply with what I'd fix first and how we'd measure it."
      />
    </SiteChrome>
  );
}
