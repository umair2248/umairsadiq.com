import type { Metadata } from "next";
import Image from "next/image";
import { HireButton } from "@/components/HireButton";
import { ArrowRight, Check, WhatsApp } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { CtaBand, FaqList, JsonLd, breadcrumbLd, faqLd } from "@/components/PageParts";
import { QuoteForm } from "@/components/QuoteForm";
import { SiteChrome } from "@/components/SiteChrome";
import { Browser, Via } from "@/components/Work";
import { hireWp } from "@/data/hire-wordpress";
import { caseStudies, services } from "@/data/pages";
import { ogImage } from "@/data/seo";
import { contact, profile, projects } from "@/data/site";

const SLUG = "wordpress-development";
const path = `/services/${SLUG}/`;
const url = `${profile.siteUrl}${path}`;
const color = "#21759B";
const CTA = "Get a quote in 24 hours";
const quoteHref = `${contact.whatsapp}?text=${encodeURIComponent("Hi Umair, I'd like to hire a WordPress developer. Can I get a quote?")}`;
const updatedLabel = new Date(`${hireWp.updated}T12:00:00Z`).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

export const metadata: Metadata = {
  title: { absolute: hireWp.metaTitle },
  description: hireWp.metaDescription,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    url: path,
    title: hireWp.metaTitle,
    description: hireWp.metaDescription,
    images: [ogImage],
    locale: "en_US",
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title: hireWp.metaTitle, description: hireWp.metaDescription, images: [ogImage.url] },
};

/** Section heading: eyebrow, H2 with a muted second half. */
function Head({ id, eyebrow, title, muted }: { id: string; eyebrow: string; title: string; muted: string }) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-title fx-title" data-scroll="through">
        {title} <span className="muted">{muted}</span>
      </h2>
    </>
  );
}

export default function HireWordPressDeveloperPage() {
  const crumbs = [
    { name: "Services", href: "/services/" },
    { name: "WordPress Development", href: path },
  ];
  const cases = hireWp.cases.map((slug) => projects.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  const proofs = projects.filter((p) => p.proof && p.tags.includes("WordPress"));
  const others = services.filter((x) => x.slug !== SLUG);
  const c = { "--c": color } as React.CSSProperties;

  return (
    <SiteChrome>
      <JsonLd
        graph={[
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: hireWp.metaTitle,
            description: hireWp.metaDescription,
            inLanguage: "en",
            isPartOf: { "@id": `${profile.siteUrl}/#website` },
            about: { "@id": `${url}#service` },
            author: { "@id": `${profile.siteUrl}/#person` },
            dateModified: hireWp.updated,
            primaryImageOfPage: `${profile.siteUrl}${ogImage.url}`,
            breadcrumb: { "@id": `${url}#breadcrumb` },
          },
          { ...breadcrumbLd(crumbs), "@id": `${url}#breadcrumb` },
          {
            "@type": "Service",
            "@id": `${url}#service`,
            name: "WordPress Development",
            alternateName: ["Hire a WordPress Developer", "WordPress expert for hire"],
            serviceType: "WordPress development",
            description: hireWp.metaDescription,
            url,
            areaServed: ["United States", "United Kingdom", "Australia", "United Arab Emirates", "Pakistan"].map((name) => ({
              "@type": "Country",
              name,
            })),
            provider: { "@id": `${profile.siteUrl}/#person` },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "WordPress development services",
              itemListElement: hireWp.services.map((d) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: d.title, description: d.text },
              })),
            },
          },
          faqLd(hireWp.faqs),
        ]}
      />

      {/* Hero: pitch on the left, quote form on the right */}
      <header className="page-hero hire-hero" style={c}>
        <div className="page-hero__bg" aria-hidden="true" />
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
                <span aria-current="page">WordPress Development</span>
              </li>
            </ol>
          </nav>
          <div className="hire-hero__grid">
            <div>
              <p className="eyebrow intro">
                <span className="status-dot" aria-hidden="true" /> Available for new projects
              </p>
              <h1 className="page-hero__title hire-hero__title intro" style={{ "--d": 1 } as React.CSSProperties}>
                {hireWp.h1}
              </h1>
              <p className="page-hero__lead intro" style={{ "--d": 2 } as React.CSSProperties}>
                {hireWp.lead}
              </p>
              <ul className="hire-hero__points intro" role="list" style={{ "--d": 3 } as React.CSSProperties}>
                {hireWp.heroPoints.map((t) => (
                  <li key={t}>
                    <Check width={16} height={16} /> {t}
                  </li>
                ))}
              </ul>
              <div className="page-hero__actions intro" style={{ "--d": 3 } as React.CSSProperties}>
                <a href="#quote" className="btn btn--accent btn--lg hire-hero__jump">
                  {CTA} <ArrowRight width={18} height={18} />
                </a>
                <a href={quoteHref} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg">
                  <WhatsApp width={18} height={18} /> WhatsApp me
                </a>
              </div>
              <p className="hire-hero__byline intro" style={{ "--d": 4 } as React.CSSProperties}>
                By <a href="/about/">{profile.name}</a>, WordPress developer &amp; SEO specialist · Updated{" "}
                <time dateTime={hireWp.updated}>{updatedLabel}</time>
              </p>
            </div>
            <div className="hire-hero__form intro" id="quote" style={{ "--d": 2 } as React.CSSProperties}>
              <QuoteForm />
            </div>
          </div>
        </div>
      </header>

      {/* Intro + on-this-page links */}
      <section className="section service-intro" style={c}>
        <div className="container service-intro__grid">
          <div className="prose fx-rise" data-scroll="through">
            {hireWp.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p>
              Below you&rsquo;ll find exactly what you get, how I work, real projects with Google Search Console results,
              pricing and answers to the questions clients ask before they hire me.
            </p>
          </div>
          <nav className="service-intro__card hire-toc" aria-label="On this page">
            <p className="service-intro__label">On this page</p>
            <ol>
              {hireWp.toc.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`}>
                    <span>{String(i + 1).padStart(2, "0")}</span> {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* What you get */}
      <section className="section" aria-labelledby="what-you-get" style={c}>
        <div className="container">
          <Head id="what-you-get" eyebrow="Why clients hire me" title="What you get" muted="when you hire me." />
          <ul className="deliver-grid" role="list">
            {hireWp.benefits.map((d, i) => (
              <li key={d.title} className="deliver fx-rise" data-scroll="through">
                <span className="deliver__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Good fit */}
      <section className="section" aria-labelledby="good-fit" style={c}>
        <div className="container">
          <Head id="good-fit" eyebrow="Honest check" title="Am I the right WordPress developer" muted="for your project?" />
          <div className="hire-fit">
            <div className="hire-fit__col is-yes fx-rise" data-scroll="through">
              <h3>A great fit if&hellip;</h3>
              <ul role="list">
                {hireWp.fit.good.map((t) => (
                  <li key={t}>
                    <Check width={18} height={18} /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hire-fit__col is-no fx-rise" data-scroll="through">
              <h3>Probably not a fit if&hellip;</h3>
              <ul role="list">
                {hireWp.fit.notFit.map((t) => (
                  <li key={t}>
                    <span aria-hidden="true">✕</span> {t}
                  </li>
                ))}
              </ul>
              <p>Not sure? Send me a message anyway. If I&rsquo;m not the right person, I&rsquo;ll tell you who or what is.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" aria-labelledby="services" style={c}>
        <div className="container">
          <Head id="services" eyebrow="Services" title="WordPress services" muted="you can hire me for." />
          <ul className="hire-services" role="list">
            {hireWp.services.map((d) => (
              <li key={d.title} className="fx-rise" data-scroll="through">
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
          <p className="hire-note fx-rise" data-scroll="through">
            Selling online? See my <a href="/services/woocommerce-development/">WooCommerce development service</a>. Site
            too slow? Start with <a href="/services/wordpress-speed-optimization/">WordPress speed optimization</a>. Want a
            headless build? I also pair WordPress with <a href="/services/nextjs-react-development/">Next.js and React</a>.
            Need more traffic after launch? My <a href="/services/seo-services/">SEO services</a> pick up where the build
            ends.
          </p>
        </div>
      </section>

      {/* Fixes */}
      <section className="section" aria-labelledby="fixes" style={c}>
        <div className="container">
          <Head id="fixes" eyebrow="Rescue & repair" title="WordPress problems" muted="I fix every week." />
          <p className="home-lead">
            Not every job is a new build. If your WordPress site is down, hacked, slow or acting strangely, hire me to find
            the cause and fix it properly, usually within a day or two.
          </p>
          <ul className="hire-fixes" role="list">
            {hireWp.fixes.map((f) => (
              <li key={f.title} className="fx-rise" data-scroll="through">
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
          <div className="hire-inline-cta">
            <a href={quoteHref} target="_blank" rel="noopener noreferrer" className="btn btn--accent">
              <WhatsApp width={17} height={17} /> Site broken? Message me now
            </a>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="section" aria-labelledby="how-i-build" style={c}>
        <div className="container">
          <Head id="how-i-build" eyebrow="How I work" title="How I build," muted="the standards in every site." />
          <ul className="hire-standards" role="list">
            {hireWp.standards.map((d, i) => (
              <li key={d.title} className="fx-rise" data-scroll="through">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Engagement models */}
      <section className="section" aria-labelledby="engagement" style={c}>
        <div className="container">
          <Head id="engagement" eyebrow="Ways to work together" title="Engagement models:" muted="fixed project, hourly or monthly." />
          <ul className="hire-models" role="list">
            {hireWp.engagements.map((m, i) => (
              <li key={m.title} className={`hire-model fx-rise${i === 0 ? " is-main" : ""}`} data-scroll="through">
                <h3>{m.title}</h3>
                <p className="hire-model__best">Best for: {m.best}</p>
                <p>{m.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tech stack + skills */}
      <section className="section" aria-labelledby="tech-stack">
        <div className="container">
          <Head id="tech-stack" eyebrow="Tech stack" title="The tools and skills" muted="behind every build." />
          <p className="home-lead">
            WordPress, PHP and MySQL at the core, ACF and Gutenberg blocks for content, Elementor when you want visual
            editing, WooCommerce for stores, and WP Rocket, NitroPack or LiteSpeed for caching. Rank Math or Yoast and
            Search Console handle the SEO side, with Wordfence for security.
          </p>
          <ul className="logo-grid service-tools" role="list" style={c}>
            {hireWp.stack.map((t) => (
              <li key={t.name}>
                <Logo tool={t} size={34} label />
              </li>
            ))}
          </ul>
          <h3 className="hire-skills__title">WordPress skills and integrations</h3>
          <ul className="hire-skills" role="list">
            {hireWp.skills.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Case studies */}
      <section className="section" aria-labelledby="case-studies">
        <div className="container">
          <Head id="case-studies" eyebrow="Case studies" title="WordPress sites I've built," muted="live right now." />
          <ul className="related-grid hire-cases" role="list">
            {cases.map((p) => (
              <li key={p.slug} className="related fx-rise" data-scroll="through" style={{ "--c": p.color } as React.CSSProperties}>
                <Browser project={p} />
                <p className="hire-case__cat">{p.category}</p>
                <h3 className="related__name">
                  <a href={`/work/${p.slug}/`}>{p.name}</a>
                </h3>
                <Via project={p} />
                <p className="related__text">{caseStudies[p.slug]?.summary ?? p.description}</p>
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
            ))}
          </ul>

          <h3 className="hire-skills__title">Proof from Google Search Console</h3>
          <p className="hire-note hire-note--tight">
            Real, unedited Search Console reports from WordPress sites I built and optimized, with the exact dates.
          </p>
          <ul className="hire-proof" role="list">
            {proofs.map((p) => (
              <li key={p.slug} className="fx-rise" data-scroll="through">
                <figure>
                  <Image
                    src={p.proof!}
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
            ))}
          </ul>
          <p className="hire-note">
            More projects are on the <a href="/work/">case studies page</a>.
          </p>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Like what you see? <em>Let&rsquo;s talk about your site.</em>
          </>
        }
        text="Tell me what you need in five quick questions. You'll get a fixed price, a timeline and the next steps within 24 hours."
        button={CTA}
      />

      {/* Process & timeline */}
      <section className="section" aria-labelledby="process">
        <div className="container">
          <Head id="process" eyebrow="Process" title="Process and timeline," muted="step by step." />
          <ol className="mini-steps" role="list">
            {hireWp.timeline.map((st, i) => (
              <li key={st.title} className="fx-rise" data-scroll="through">
                <span>
                  {String(i + 1).padStart(2, "0")} · {st.time}
                </span>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>
          <p className="hire-note">
            A typical business site with 5 to 10 pages takes two to four weeks from the call to launch. The exact timeline
            is in your quote.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" aria-labelledby="pricing">
        <div className="container home-pricing">
          <div>
            <Head id="pricing" eyebrow="Pricing" title="What it costs to hire" muted="a WordPress developer." />
            <p className="home-lead">
              I don&rsquo;t publish one price, because a five-page brochure site and a 40-page WooCommerce store are
              different jobs. Projects get a fixed price in USD for the agreed scope, so you know the full cost before
              anything starts. Small fixes are hourly, with an estimate first. These five things decide the price:
            </p>
            <div className="home-cta__buttons">
              <a href="#quote" className="btn btn--accent btn--lg">
                {CTA} <ArrowRight width={18} height={18} />
              </a>
            </div>
          </div>
          <ul className="pricing-factors" role="list">
            {hireWp.pricing.map((f, i) => (
              <li key={f.title} className="fx-rise" data-scroll="through">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Pakistan */}
      <section className="section" aria-labelledby="why-pakistan" style={c}>
        <div className="container">
          <Head id="why-pakistan" eyebrow="Remote, worldwide" title="Why hire a WordPress developer" muted="from Pakistan?" />
          <ul className="deliver-grid hire-pk" role="list">
            {hireWp.pakistan.map((d) => (
              <li key={d.title} className="deliver fx-rise" data-scroll="through">
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
          <p className="hire-note">
            Want to know more about me first? Read <a href="/about/">my background and experience</a>.
          </p>
        </div>
      </section>

      <FaqList faqs={hireWp.faqs} title="Questions before you hire a WordPress developer" />

      {/* Final CTA with the form */}
      <section className="section hire-final" aria-labelledby="final-title" style={c}>
        <div className="container hire-final__grid">
          <div>
            <p className="eyebrow">Let&rsquo;s talk</p>
            <h2 id="final-title" className="section-title fx-title" data-scroll="through">
              Ready to hire a <span className="muted">WordPress developer?</span>
            </h2>
            <p className="home-lead">
              Send me your project details. Within 24 hours you&rsquo;ll have a fixed quote in USD, a timeline and a clear
              list of what&rsquo;s included.
            </p>
            <ul className="hire-final__contact" role="list">
              <li>
                <a href={quoteHref} target="_blank" rel="noopener noreferrer">
                  <WhatsApp width={18} height={18} /> {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <HireButton className="hire-final__more">
                  Prefer a guided form? Start a project <ArrowRight width={14} height={14} />
                </HireButton>
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
            <QuoteForm title="Get your WordPress quote" source="quote-footer" />
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
