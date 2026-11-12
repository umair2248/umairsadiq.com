import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HireButton } from "@/components/HireButton";
import { ArrowRight, Check, WhatsApp } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { CtaBand, FaqList, JsonLd, breadcrumbLd, faqLd } from "@/components/PageParts";
import { QuoteForm } from "@/components/QuoteForm";
import { quoteEn, type Choice } from "@/data/quote";
import { SiteChrome } from "@/components/SiteChrome";
import { StackCover } from "@/components/StackCover";
import { Browser, Via } from "@/components/Work";
import { caseStudies, services } from "@/data/pages";
import { ogImage } from "@/data/seo";
import { servicePages, type Section } from "@/data/service-pages";
import { contact, processSteps, profile, projects } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** WordPress has its own page at services/wordpress-development/page.tsx. */
const OWN_PAGE = new Set(["wordpress-development"]);

export function generateStaticParams() {
  return services.filter((s) => !OWN_PAGE.has(s.slug)).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  const pg = servicePages[slug];
  const title = pg?.metaTitle ?? `${s.metaTitle} | ${profile.name}`;
  const description = pg?.metaDescription ?? s.metaDescription;
  const url = `/services/${s.slug}/`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, images: [ogImage], siteName: profile.name, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}

/** Text with [anchor](/path/) links. */
function Rich({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a key={m.index} href={m[2]}>
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

const findProject = (slug: string) => projects.find((p) => p.slug === slug);

function SectionBlock({ sec, color }: { sec: Section; color: string }) {
  const b = sec.block;
  switch (b.kind) {
    case "cards":
      return (
        <ul className={`deliver-grid svc-cards svc-cards--${b.cols ?? 3}`} role="list">
          {b.items.map((it, i) => (
            <li key={it.title} className="deliver fx-rise" data-scroll="through">
              <span className="deliver__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{it.href ? <a href={it.href}>{it.title}</a> : it.title}</h3>
              <p>
                <Rich text={it.text} />
              </p>
              {it.href ? (
                <a href={it.href} className="related__more">
                  See the project <ArrowRight width={14} height={14} />
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      );
    case "stack":
      return (
        <>
          <ol id={`stack-${sec.id}`} className="svc-stack" role="list">
            {b.items.map((it, i) => (
              <li key={it.title} className="svc-card" style={{ "--i": i } as React.CSSProperties}>
                <div className="svc-card__inner">
                  <span className="svc-card__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="svc-card__body">
                    <p className="svc-card__kicker">
                      {String(i + 1).padStart(2, "0")} / {String(b.items.length).padStart(2, "0")}
                    </p>
                    <h3>{it.title}</h3>
                    <p>
                      <Rich text={it.text} />
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <StackCover listId={`stack-${sec.id}`} />
        </>
      );
    case "steps":
      return (
        <ol className="mini-steps svc-steps" role="list">
          {b.items.map((st, i) => (
            <li key={st.title} className="fx-rise" data-scroll="through">
              <span>
                {String(i + 1).padStart(2, "0")}
                {st.time ? ` · ${st.time}` : ""}
              </span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      );
    case "proof":
      return (
        <ul className="hire-proof" role="list">
          {b.slugs.map(findProject).map((p) =>
            p?.proof ? (
              <li key={p.slug} className="fx-rise" data-scroll="through">
                <figure>
                  <Image
                    src={p.proof}
                    alt={`Google Search Console performance report for ${p.name}, ${p.period}`}
                    width={1450}
                    height={660}
                    sizes="(min-width: 1000px) 560px, 100vw"
                    loading="lazy"
                  />
                  <figcaption>
                    <strong>{p.name}</strong>
                    {p.results?.map((r) => `${r.value} ${r.label.toLowerCase()}`).join(" · ")}
                    <span>
                      {p.resultsNote} · {p.period}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ) : null,
          )}
        </ul>
      );
    case "projects":
      return (
        <ul className="related-grid" role="list">
          {b.slugs.map(findProject).map((p) =>
            p ? (
              <li key={p.slug} className="related fx-rise" data-scroll="through" style={{ "--c": p.color } as React.CSSProperties}>
                <Browser project={p} />
                <h3 className="related__name">
                  <a href={`/work/${p.slug}/`}>{p.name}</a>
                </h3>
                <Via project={p} />
                <p className="related__text">{caseStudies[p.slug]?.outcome ?? p.description}</p>
                {p.results ? (
                  <ul className="hire-case__stats" role="list">
                    {p.results.map((r) => (
                      <li key={r.label}>
                        <strong>{r.value}</strong> {r.label}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <a href={`/work/${p.slug}/`} className="related__more">
                  Read the {p.name} case study <ArrowRight width={14} height={14} />
                </a>
              </li>
            ) : null,
          )}
        </ul>
      );
    case "prose":
      return (
        <div className="prose svc-prose fx-rise" data-scroll="through">
          {b.paragraphs.map((t) => (
            <p key={t.slice(0, 24)}>
              <Rich text={t} />
            </p>
          ))}
        </div>
      );
    case "toolcards":
      return (
        <ul className="svc-toolcards" role="list">
          {b.items.map(({ tool, text }) => (
            <li key={tool.name} className="fx-rise" data-scroll="through">
              <Logo tool={tool} size={44} />
              <div>
                <h3 className="notranslate" translate="no">
                  {tool.name}
                </h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      );
    case "belt": {
      const loop = [...b.tools, ...b.tools];
      return (
        <>
          <div className="svc-belt svc-belt--inline" aria-hidden="true">
            <ul className="svc-belt__track notranslate" translate="no">
              {loop.map((t, i) => (
                <li key={`${t.name}-${i}`}>
                  <Logo tool={t} size={30} /> {t.name}
                </li>
              ))}
            </ul>
          </div>
          <ul className="sr-only">
            {b.tools.map((t) => (
              <li key={t.name}>{t.name}</li>
            ))}
          </ul>
        </>
      );
    }
    case "metrics":
      return (
        <ul className="svc-metrics" role="list" style={{ "--c": color } as React.CSSProperties}>
          {b.items.map((m) => (
            <li key={m.short} className="fx-rise" data-scroll="through">
              <span className="svc-metrics__short notranslate" translate="no">
                {m.short}
              </span>
              <h3>{m.name}</h3>
              <p className="svc-metrics__good">
                <Check width={16} height={16} /> Good: {m.good}
              </p>
              <p>{m.text}</p>
            </li>
          ))}
        </ul>
      );
    case "report":
      return (
        <div className="svc-report fx-rise" data-scroll="through">
          <div className="svc-report__head">
            <p className="svc-report__brand">
              <span className="wordmark__mark" aria-hidden="true">
                {profile.initials}
              </span>{" "}
              Monthly SEO report · Jankowski Import Auto
            </p>
            <p className="svc-report__period">{b.period}</p>
          </div>
          <div className="svc-report__scroll">
            <table className="svc-report__table">
              <thead>
                <tr>
                  <th scope="col">Metric</th>
                  <th scope="col">Previous 28 days</th>
                  <th scope="col">Last 28 days</th>
                  <th scope="col">Change</th>
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">
                      {r.label}
                      {r.note ? <small>{r.note}</small> : null}
                    </th>
                    <td>{r.before}</td>
                    <td>
                      <strong>{r.after}</strong>
                    </td>
                    <td className="svc-report__change">{r.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="svc-report__covers">
            <p>Every report also covers</p>
            <ul role="list">
              {b.covers.map((c) => (
                <li key={c}>
                  <Check width={16} height={16} /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "pricing":
      return (
        <div className="home-pricing svc-pricing">
          <p className="home-lead">{b.text}</p>
          <ul className="pricing-factors" role="list">
            {b.items.map((f, i) => (
              <li key={f.title} className="fx-rise" data-scroll="through">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const pg = servicePages[slug];

  const url = `${profile.siteUrl}/services/${s.slug}/`;
  const crumbs = [
    { name: "Services", href: "/services/" },
    { name: s.name, href: `/services/${s.slug}/` },
  ];
  const related = s.related.map(findProject).filter((p) => p !== undefined);
  const proof = related.find((p) => p.results);
  const others = services.filter((x) => x.slug !== s.slug);
  const c = { "--c": s.color } as React.CSSProperties;
  const cta = pg?.cta ?? "Get a quote in 24 hours";
  const types: Choice[] = (pg?.types ?? [s.name, "Something else"]).map((value) => ({ value }));
  const faqs = pg?.faqs ?? s.faqs;
  const formText = pg?.formSub ? { ...quoteEn, sub: pg.formSub } : quoteEn;
  const whatsapp = `${contact.whatsapp}?text=${encodeURIComponent(`Hi Umair, I'm interested in your ${s.name} service.`)}`;
  const stats = [
    { value: "100+", label: "sites shipped" },
    { value: "24h", label: "fixed quote" },
    { value: "17h", label: "online every day (PKT)" },
    proof?.results ? { value: proof.results[0].value, label: `${proof.results[0].label.toLowerCase()} · ${proof.name}` } : { value: `${s.tools.length}+`, label: "tools in my stack" },
  ];
  const sections = pg?.sections ?? [];
  const toc = [...sections.map((x) => ({ id: x.id, label: x.nav })), { id: "faq-title", label: "FAQ" }, { id: "final-title", label: "Get started" }];

  return (
    <SiteChrome>
      <JsonLd
        graph={[
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: pg?.metaTitle ?? s.metaTitle,
            description: pg?.metaDescription ?? s.metaDescription,
            inLanguage: "en",
            isPartOf: { "@id": `${profile.siteUrl}/#website` },
            about: { "@id": `${url}#service` },
            author: { "@id": `${profile.siteUrl}/#person` },
            ...(pg ? { dateModified: pg.updated } : {}),
            breadcrumb: { "@id": `${url}#breadcrumb` },
          },
          { ...breadcrumbLd(crumbs), "@id": `${url}#breadcrumb` },
          {
            "@type": "Service",
            "@id": `${url}#service`,
            name: s.name,
            serviceType: s.name,
            description: pg?.metaDescription ?? s.metaDescription,
            url,
            areaServed: ["United States", "United Kingdom", "Australia", "United Arab Emirates", "Pakistan"].map((name) => ({ "@type": "Country", name })),
            provider: { "@id": `${profile.siteUrl}/#person` },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: s.name,
              itemListElement: s.deliverables.map((d) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: d.title, description: d.text },
              })),
            },
          },
          faqLd(faqs),
        ]}
      />

      {/* Hero: pitch on the left, quote form on the right */}
      <header className="page-hero hire-hero svc-hero" style={c}>
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="svc-hero__glow" aria-hidden="true" />
        <div className="container">
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/services/">Services</a>
              </li>
              <li>
                <span aria-current="page">{s.name}</span>
              </li>
            </ol>
          </nav>
          <div className="hire-hero__grid">
            <div>
              <p className="eyebrow intro">
                <span className="status-dot" aria-hidden="true" /> {s.name} · available for new projects
              </p>
              <h1 className="page-hero__title hire-hero__title intro" style={{ "--d": 1 } as React.CSSProperties}>
                {pg?.h1 ?? s.title}
              </h1>
              <p className="page-hero__lead intro" style={{ "--d": 2 } as React.CSSProperties}>
                {pg?.lead ?? s.tagline}
              </p>
              {pg ? (
                <ul className="hire-hero__points intro" role="list" style={{ "--d": 3 } as React.CSSProperties}>
                  {pg.heroPoints.map((t) => (
                    <li key={t}>
                      <Check width={16} height={16} /> {t}
                    </li>
                  ))}
                </ul>
              ) : null}
              <ul className="svc-hero__tools intro notranslate" translate="no" role="list" aria-label="Main tools" style={{ "--d": 3 } as React.CSSProperties}>
                {s.tools.slice(0, 6).map((t) => (
                  <li key={t.name}>
                    <Logo tool={t} size={22} /> {t.name}
                  </li>
                ))}
              </ul>
              <div className="page-hero__actions intro" style={{ "--d": 3 } as React.CSSProperties}>
                <a href="#quote" className="btn btn--accent btn--lg hire-hero__jump">
                  {cta} <ArrowRight width={18} height={18} />
                </a>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg">
                  <WhatsApp width={18} height={18} /> WhatsApp me
                </a>
              </div>
              {pg ? (
                <p className="hire-hero__byline intro" style={{ "--d": 4 } as React.CSSProperties}>
                  By <a href="/about/">{profile.name}</a>, WordPress developer &amp; SEO specialist · Updated{" "}
                  <time dateTime={pg.updated}>
                    {new Date(`${pg.updated}T12:00:00Z`).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                </p>
              ) : null}
            </div>
            <div className="hire-hero__form intro" id="quote" style={{ "--d": 2 } as React.CSSProperties}>
              <QuoteForm title={pg?.formTitle ?? `Get a quote for ${s.name}`} types={types} t={formText} />
            </div>
          </div>

          <ul className="svc-stats" role="list">
            {stats.map((st, i) => (
              <li key={st.label} className="intro" style={{ "--d": 4 + i * 0.4 } as React.CSSProperties}>
                <strong>{st.value}</strong>
                <span>{st.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Intro + on-this-page links */}
      <section className="section service-intro" style={c}>
        <div className="container service-intro__grid">
          <div className="prose fx-rise" data-scroll="through">
            {(pg?.intro ?? s.intro).map((p) => (
              <p key={p.slice(0, 24)}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          {pg ? (
            <nav className="service-intro__card hire-toc" aria-label="On this page">
              <p className="service-intro__label">On this page</p>
              <ol>
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>
                      <span>{String(i + 1).padStart(2, "0")}</span> {t.label}
                    </a>
                  </li>
                ))}
              </ol>
              <HireButton className="btn btn--accent hire-glance__btn">
                {cta} <ArrowRight width={16} height={16} />
              </HireButton>
            </nav>
          ) : (
            <aside className="service-intro__card fx-rise" data-scroll="through">
              <h2 className="service-intro__label">What you get</h2>
              <ul role="list">
                {s.deliverables.map((d) => (
                  <li key={d.title}>
                    <Check width={18} height={18} /> {d.title}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </section>

      {sections.map((sec, i) => (
        <div key={sec.id}>
          <section className="section" aria-labelledby={sec.id} style={c}>
            <div className="container">
              <p className="eyebrow">{sec.eyebrow}</p>
              <h2 id={sec.id} className="section-title fx-title" data-scroll="through">
                {sec.title} {sec.muted ? <span className="muted">{sec.muted}</span> : null}
              </h2>
              {sec.lead ? (
                <p className="home-lead svc-lead">
                  <Rich text={sec.lead} />
                </p>
              ) : null}
              <SectionBlock sec={sec} color={s.color} />
              {sec.note ? (
                <p className="hire-note">
                  <Rich text={sec.note} />
                </p>
              ) : null}
            </div>
          </section>
          {pg && i === pg.midAfter ? (
            <CtaBand
              title={
                <>
                  {pg.final.title} <em>{pg.final.muted}</em>
                </>
              }
              text={pg.final.text}
              button={cta}
            />
          ) : null}
        </div>
      ))}

      {!pg ? (
        <section className="section" aria-labelledby="how-title">
          <div className="container">
            <p className="eyebrow">How we&rsquo;ll work</p>
            <h2 id="how-title" className="section-title fx-title" data-scroll="through">
              Five clear steps, <span className="muted">no surprises.</span>
            </h2>
            <ol className="mini-steps svc-steps" role="list">
              {processSteps.map((st, i) => (
                <li key={st.title} className="fx-rise" data-scroll="through">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{st.title}</h3>
                  <p>{st.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <FaqList faqs={faqs} title={`${s.name}: questions before you hire`} />

      {/* Final CTA with the form */}
      <section className="section hire-final" aria-labelledby="final-title" style={c}>
        <div className="container hire-final__grid">
          <div>
            <p className="eyebrow">Let&rsquo;s talk</p>
            <h2 id="final-title" className="section-title fx-title" data-scroll="through">
              {pg ? pg.final.title : "Ready to start your"} <span className="muted">{pg ? pg.final.muted : `${s.name} project?`}</span>
            </h2>
            <p className="home-lead">{pg?.final.text ?? "Send me the details. Within 24 hours you'll have a fixed quote in USD, a timeline and a clear list of what's included."}</p>
            <ul className="hire-final__contact" role="list">
              <li>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsApp width={18} height={18} /> {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            </ul>
            <h3 className="hire-skills__title">Other services</h3>
            <ul className="other-services" role="list">
              {others.map((o) => (
                <li key={o.slug}>
                  <a href={`/services/${o.slug}/`} style={{ "--c": o.color } as React.CSSProperties}>
                    {o.name} <ArrowRight width={16} height={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hire-final__form fx-rise" data-scroll="through">
            <QuoteForm title={pg?.formTitle ?? `Get your quote for ${s.name}`} source="quote-footer" types={types} t={formText} />
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
