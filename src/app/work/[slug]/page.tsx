import type { Metadata } from "next";
import { clip } from "@/data/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Check } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { CtaBand, JsonLd, PageHero, breadcrumbLd } from "@/components/PageParts";
import { SiteChrome } from "@/components/SiteChrome";
import { Browser } from "@/components/Work";
import { caseStudies, services } from "@/data/pages";
import { profile, projects, tools } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const cs = caseStudies[p.slug];
  const title = `${p.name}: ${p.tags.join(" & ")} Case Study`;
  const description = clip(cs?.meta ?? p.description);
  const url = `/work/${p.slug}/`;
  return {
    title: `${title} | ${profile.name}`,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description, images: [{ url: p.image, width: 1440, height: 900, alt: `${p.name} homepage` }] },
    twitter: { title, description, images: [p.image] },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const cs = caseStudies[p.slug];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const linkedServices = (cs?.services ?? []).map((s) => services.find((x) => x.slug === s)).filter((s) => s !== undefined);
  const crumbs = [
    { name: "Work", href: "/work/" },
    { name: p.name, href: `/work/${p.slug}/` },
  ];

  return (
    <SiteChrome>
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            "@type": "CreativeWork",
            name: p.name,
            url: `${profile.siteUrl}/work/${p.slug}/`,
            about: p.url,
            description: cs?.summary ?? p.description,
            image: `${profile.siteUrl}${p.image}`,
            creator: { "@id": `${profile.siteUrl}/#person` },
            keywords: p.tags.join(", "),
          },
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={`Case study · ${p.category}`}
        title={p.name}
        lead={cs?.summary ?? p.description}
        color={p.color}
      >
        <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn--accent btn--lg">
          Visit {host(p.url)} <ArrowUpRight width={18} height={18} />
        </a>
      </PageHero>

      <section className="section case-page" style={{ "--c": p.color } as React.CSSProperties}>
        <div className="container case-page__grid">
          <div className="case-page__shot fx-rise" data-scroll="through">
            <Browser project={p} priority />
          </div>
          <aside className="case-page__facts fx-rise" data-scroll="through" aria-label="Project facts">
            <dl>
              <div>
                <dt>Client</dt>
                <dd>{p.name}</dd>
              </div>
              {p.via ? (
                <div>
                  <dt>Delivered via</dt>
                  <dd>
                    <a href={p.via.url} target="_blank" rel="noopener noreferrer">
                      {p.via.name}
                    </a>{" "}
                    (agency)
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>Type</dt>
                <dd>{p.category}</dd>
              </div>
              <div>
                <dt>Built with</dt>
                <dd>{p.tags.join(", ")}</dd>
              </div>
              <div>
                <dt>Live site</dt>
                <dd>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {host(p.url)}
                  </a>
                </dd>
              </div>
            </dl>
            {cs?.scope ? (
              <>
                <h2 className="service-intro__label">What I did</h2>
                <ul role="list" className="case-page__scope">
                  {cs.scope.map((s) => (
                    <li key={s}>
                      <Check width={18} height={18} /> {s}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </aside>
        </div>
      </section>

      {p.results ? (
        <section className="section" aria-labelledby="results-title" style={{ "--c": p.color } as React.CSSProperties}>
          <div className="container">
            <p className="eyebrow">Results</p>
            <h2 id="results-title" className="section-title fx-title" data-scroll="through">
              What changed <span className="muted">in Google.</span>
            </h2>
            {cs?.outcome ? <p className="case-page__outcome">{cs.outcome}</p> : null}
            {p.period ? (
              <p className="case__period">
                <Calendar width={15} height={15} /> {p.period}
              </p>
            ) : null}
            <dl className="case__results case-page__results">
              {p.results.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            {p.proof ? (
              <figure className="proof case-page__proof">
                <figcaption className="proof__head">
                  <span className="proof__title">
                    <Logo tool={tools.gsc} size={26} />
                    <span>
                      <strong>Google Search Console</strong>
                      <small>{p.resultsNote}</small>
                    </span>
                  </span>
                  {p.period ? (
                    <span className="proof__period">
                      <Calendar width={15} height={15} /> {p.period}
                    </span>
                  ) : null}
                </figcaption>
                <Image
                  src={p.proof}
                  alt={`Google Search Console performance report for ${p.name}, ${p.period ?? ""}`}
                  width={1500}
                  height={800}
                  sizes="(min-width: 1100px) 1100px, 100vw"
                  className="case-page__proof-img"
                />
              </figure>
            ) : null}
          </div>
        </section>
      ) : null}

      {linkedServices.length ? (
        <section className="section" aria-labelledby="svc-title">
          <div className="container">
            <h2 id="svc-title" className="experience__sub">
              Services used on this project
            </h2>
            <ul className="other-services" role="list">
              {linkedServices.map((o) => (
                <li key={o.slug}>
                  <a href={`/services/${o.slug}/`} style={{ "--c": o.color } as React.CSSProperties}>
                    {o.name} <ArrowRight width={16} height={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <nav className="section case-nav" aria-label="More case studies">
        <div className="container case-nav__grid">
          <a href={`/work/${prev.slug}/`} className="case-nav__link">
            <small>
              <ArrowLeft width={14} height={14} /> Previous
            </small>
            <strong>{prev.name}</strong>
          </a>
          <a href={`/work/${next.slug}/`} className="case-nav__link case-nav__link--next">
            <small>
              Next <ArrowRight width={14} height={14} />
            </small>
            <strong>{next.name}</strong>
          </a>
        </div>
      </nav>

      <CtaBand
        title={
          <>
            Want a site that <em>performs like this?</em>
          </>
        }
        text="Tell me about your project and I'll reply with a plan and the next steps."
      />
    </SiteChrome>
  );
}
