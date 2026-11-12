import type { Metadata } from "next";
import Image from "next/image";
import { caseStudies, services } from "@/data/pages";
import { budgetsBy, quoteEn, type Choice } from "@/data/quote";
import { ogImage } from "@/data/seo";
import type { Section, ServicePage } from "@/data/service-pages";
import { contact, profile, projects, type Tool } from "@/data/site";
import { HireButton } from "./HireButton";
import { ArrowRight, Check, WhatsApp } from "./Icons";
import { Logo } from "./Logo";
import { CtaBand, FaqList, JsonLd, breadcrumbLd, faqLd } from "./PageParts";
import { QuoteForm } from "./QuoteForm";
import { SiteChrome } from "./SiteChrome";
import { StackCover } from "./StackCover";
import { Browser, Via } from "./Work";

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
                  {it.linkLabel ?? "See the project"} <ArrowRight width={14} height={14} />
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
    case "checklist":
      return (
        <ol className="svc-checklist" role="list">
          {b.items.map((it, i) => (
            <li key={it.title} className="fx-rise" data-scroll="through">
              <span className="svc-checklist__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{it.title}</h3>
              <ul role="list">
                {it.points.map((pt) => (
                  <li key={pt}>
                    <Check width={14} height={14} /> {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      );
    case "audit":
      return (
        <div className="svc-audit fx-rise" data-scroll="through">
          <div className="svc-report__head">
            <p className="svc-report__brand">
              <span className="wordmark__mark" aria-hidden="true">
                {profile.initials}
              </span>{" "}
              Technical SEO audit · {b.site}
            </p>
            <p className="svc-report__period">{b.date}</p>
          </div>
          <ul className="svc-audit__stats" role="list">
            {b.stats.map((st) => (
              <li key={st.label} className={`is-${st.tone}`}>
                <strong>{st.value}</strong>
                <span>{st.label}</span>
              </li>
            ))}
          </ul>
          <ul className="svc-audit__findings" role="list">
            {b.findings.map((f) => (
              <li key={f.text}>
                <span className={`svc-audit__level is-${f.level.toLowerCase()}`}>{f.level}</span>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    case "ticket":
      return (
        <div className="svc-ticket fx-rise" data-scroll="through">
          <div className="svc-ticket__tool">
            <span>Tool warning</span>
            <code>Page Titles: Over 60 Characters (6)</code>
          </div>
          <span className="svc-ticket__arrow" aria-hidden="true">
            <ArrowRight width={22} height={22} />
          </span>
          <dl className="svc-ticket__card">
            {b.rows.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "matrix":
      return (
        <div className="svc-matrix fx-rise" data-scroll="through">
          <span className="svc-matrix__y" aria-hidden="true">
            Impact →
          </span>
          <span className="svc-matrix__x" aria-hidden="true">
            Effort →
          </span>
          <ul role="list">
            {b.cells.map((cell, i) => (
              <li key={cell.title} className={`svc-matrix__cell is-${i}`}>
                <p className="svc-matrix__sub">{cell.sub}</p>
                <h3>{cell.title}</h3>
                <p>{cell.text}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    case "packages":
      return (
        <ul className="svc-packages" role="list">
          {b.items.map((pk) => (
            <li key={pk.name} className={`svc-package fx-rise${pk.featured ? " is-featured" : ""}`} data-scroll="through">
              {pk.featured ? <span className="svc-package__badge">Most popular</span> : null}
              <h3>{pk.name}</h3>
              <p className="svc-package__size">{pk.size}</p>
              <p className="svc-package__fit">{pk.fit}</p>
              <p className="svc-package__price">{pk.price ?? "Fixed price, quoted in 24 hours"}</p>
              <ul role="list">
                {pk.points.map((pt) => (
                  <li key={pt}>
                    <Check width={16} height={16} /> {pt}
                  </li>
                ))}
              </ul>
              <HireButton className={`btn ${pk.featured ? "btn--accent" : "btn--ghost"} svc-package__btn`}>
                {b.cta ?? `Order ${pk.name.toLowerCase()} audit`} <ArrowRight width={16} height={16} />
              </HireButton>
            </li>
          ))}
        </ul>
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


export type LongPageProps = {
  /** Path of the page, e.g. "/services/seo-services/" or "/auto-repair-seo/" */
  path: string;
  name: string;
  color: string;
  tools: Tool[];
  related: string[];
  pg: ServicePage;
  /** Schema areaServed; defaults to the five main countries */
  areaServed?: object[];
  /** Extra JSON-LD nodes, e.g. LocalBusiness on the Gujrat page */
  extraSchema?: object[];
  /** Main call to action opens WhatsApp instead of the quote dialog */
  whatsappCta?: boolean;
};

const defaultArea = ["United States", "United Kingdom", "Australia", "United Arab Emirates", "Pakistan"].map((name) => ({ "@type": "Country", name }));

/** Metadata for a long-form service or landing page. */
export function longPageMetadata(pg: ServicePage, path: string): Metadata {
  return {
    title: { absolute: pg.metaTitle },
    description: pg.metaDescription,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: pg.metaTitle, description: pg.metaDescription, images: [ogImage], siteName: profile.name, locale: "en_US" },
    twitter: { card: "summary_large_image", title: pg.metaTitle, description: pg.metaDescription, images: [ogImage.url] },
  };
}

/** The long-form page used by every service, industry and location page. */
export function LongPage({ path, name, color, tools, related: relatedSlugs, pg, areaServed, extraSchema = [], whatsappCta = false }: LongPageProps) {
  const url = `${profile.siteUrl}${path}`;
  const crumbs = [
    { name: "Services", href: "/services/" },
    { name, href: path },
  ];
  const related = relatedSlugs.map(findProject).filter((p) => p !== undefined);
  const proof = related.find((p) => p.results);
  const others = services.filter((x) => `/services/${x.slug}/` !== path);
  const c = { "--c": color } as React.CSSProperties;
  const cta = pg.cta;
  const types: Choice[] = pg.types.map((value) => ({ value }));
  const faqs = pg.faqs;
  const cur = pg.currency ?? "USD";
  const formText = {
    ...quoteEn,
    ...(pg.formSub ? { sub: pg.formSub } : {}),
    budget: `Budget (${cur})`,
    budgets: budgetsBy[cur] ?? quoteEn.budgets,
  };
  const whatsapp = `${contact.whatsapp}?text=${encodeURIComponent(`Hi Umair, I found you on your ${name} page.`)}`;
  const ctaHref = whatsappCta ? whatsapp : "#quote";
  const stats = [
    { value: "100+", label: "sites shipped" },
    { value: "24h", label: "fixed quote" },
    { value: "17h", label: "online every day (PKT)" },
    proof?.results ? { value: proof.results[0].value, label: `${proof.results[0].label.toLowerCase()} · ${proof.name}` } : { value: `${tools.length}+`, label: "tools in my stack" },
  ];
  const sections = pg.sections;
  const toc = [...sections.map((x) => ({ id: x.id, label: x.nav })), { id: "faq-title", label: "FAQ" }, { id: "final-title", label: "Get started" }];
  const updated = new Date(`${pg.updated}T12:00:00Z`).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  const CtaButton = ({ className, small }: { className: string; small?: boolean }) =>
    whatsappCta ? (
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={className}>
        <WhatsApp width={small ? 16 : 18} height={small ? 16 : 18} /> {cta}
      </a>
    ) : (
      <HireButton className={className}>
        {cta} <ArrowRight width={small ? 16 : 18} height={small ? 16 : 18} />
      </HireButton>
    );

  return (
    <SiteChrome>
      <JsonLd
        graph={[
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: pg.metaTitle,
            description: pg.metaDescription,
            inLanguage: "en",
            isPartOf: { "@id": `${profile.siteUrl}/#website` },
            about: { "@id": `${url}#service` },
            author: { "@id": `${profile.siteUrl}/#person` },
            dateModified: pg.updated,
            breadcrumb: { "@id": `${url}#breadcrumb` },
          },
          { ...breadcrumbLd(crumbs), "@id": `${url}#breadcrumb` },
          {
            "@type": "Service",
            "@id": `${url}#service`,
            name,
            serviceType: name,
            description: pg.metaDescription,
            url,
            areaServed: areaServed ?? defaultArea,
            provider: { "@id": `${profile.siteUrl}/#person` },
            ...(pg.offers
              ? {
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name,
                    itemListElement: pg.offers.map((o) => ({
                      "@type": "Offer",
                      name: o.name,
                      description: o.description,
                      priceCurrency: o.currency ?? "USD",
                      availability: "https://schema.org/InStock",
                      seller: { "@id": `${profile.siteUrl}/#person` },
                      itemOffered: { "@type": "Service", name: o.name, description: o.description },
                    })),
                  },
                }
              : {}),
          },
          faqLd(faqs),
          ...extraSchema,
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
                <span aria-current="page">{name}</span>
              </li>
            </ol>
          </nav>
          <div className="hire-hero__grid">
            <div>
              <p className="eyebrow intro">
                <span className="status-dot" aria-hidden="true" /> {name} · available for new projects
              </p>
              <h1 className="page-hero__title hire-hero__title intro" style={{ "--d": 1 } as React.CSSProperties}>
                {pg.h1}
              </h1>
              <p className="page-hero__lead intro" style={{ "--d": 2 } as React.CSSProperties}>
                {pg.lead}
              </p>
              <ul className="hire-hero__points intro" role="list" style={{ "--d": 3 } as React.CSSProperties}>
                {pg.heroPoints.map((t) => (
                  <li key={t}>
                    <Check width={16} height={16} /> {t}
                  </li>
                ))}
              </ul>
              <ul className="svc-hero__tools intro notranslate" translate="no" role="list" aria-label="Main tools" style={{ "--d": 3 } as React.CSSProperties}>
                {tools.slice(0, 6).map((t) => (
                  <li key={t.name}>
                    <Logo tool={t} size={22} /> {t.name}
                  </li>
                ))}
              </ul>
              <div className="page-hero__actions intro" style={{ "--d": 3 } as React.CSSProperties}>
                <a
                  href={ctaHref}
                  {...(whatsappCta ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`btn btn--accent btn--lg${whatsappCta ? "" : " hire-hero__jump"}`}
                >
                  {whatsappCta ? <WhatsApp width={18} height={18} /> : null} {cta} {whatsappCta ? null : <ArrowRight width={18} height={18} />}
                </a>
                {whatsappCta ? (
                  <a href={contact.phoneHref} className="btn btn--ghost btn--lg">
                    Call {contact.phoneDisplay}
                  </a>
                ) : (
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg">
                    <WhatsApp width={18} height={18} /> WhatsApp me
                  </a>
                )}
              </div>
              <p className="hire-hero__byline intro" style={{ "--d": 4 } as React.CSSProperties}>
                By <a href="/about/">{profile.name}</a>, WordPress developer &amp; SEO specialist · Updated <time dateTime={pg.updated}>{updated}</time>
              </p>
            </div>
            <div className="hire-hero__form intro" id="quote" style={{ "--d": 2 } as React.CSSProperties}>
              <QuoteForm title={pg.formTitle} types={types} t={formText} />
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
            {pg.intro.map((p) => (
              <p key={p.slice(0, 24)}>
                <Rich text={p} />
              </p>
            ))}
          </div>
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
            <CtaButton className="btn btn--accent hire-glance__btn" small />
          </nav>
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
              <SectionBlock sec={sec} color={color} />
              {sec.note ? (
                <p className="hire-note">
                  <Rich text={sec.note} />
                </p>
              ) : null}
            </div>
          </section>
          {i === pg.midAfter ? (
            <CtaBand
              title={
                <>
                  {pg.final.title} <em>{pg.final.muted}</em>
                </>
              }
              text={pg.final.text}
              button={cta}
              href={whatsappCta ? whatsapp : undefined}
            />
          ) : null}
        </div>
      ))}

      <FaqList faqs={faqs} title={`${name}: questions before you hire`} />

      {/* Final CTA with the form */}
      <section className="section hire-final" aria-labelledby="final-title" style={c}>
        <div className="container hire-final__grid">
          <div>
            <p className="eyebrow">Let&rsquo;s talk</p>
            <h2 id="final-title" className="section-title fx-title" data-scroll="through">
              {pg.final.title} <span className="muted">{pg.final.muted}</span>
            </h2>
            <p className="home-lead">{pg.final.text}</p>
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
            {whatsappCta ? (
              <div className="hire-inline-cta">
                <CtaButton className="btn btn--accent btn--lg" />
              </div>
            ) : null}
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
            <QuoteForm title={pg.formTitle} source="quote-footer" types={types} t={formText} />
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
