import { profile } from "@/data/site";
import type { Faq } from "@/data/pages";
import { HireButton } from "./HireButton";
import { ArrowRight } from "./Icons";

export type Crumb = { name: string; href: string };

/** schema.org BreadcrumbList for a page. Home is always the first crumb. */
export function breadcrumbLd(crumbs: Crumb[]) {
  const all = [{ name: "Home", href: "/" }, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${profile.siteUrl}${c.href}`,
    })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** Writes one JSON-LD block with an @graph of the given nodes. */
export function JsonLd({ graph }: { graph: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  color,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  color?: string;
}) {
  return (
    <header className="page-hero" style={color ? ({ "--c": color } as React.CSSProperties) : undefined}>
      <div className="page-hero__bg" aria-hidden="true" />
      <div className="container">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.href}>
                {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <a href={c.href}>{c.name}</a>}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow intro">{eyebrow}</p>
        <h1 className="page-hero__title intro" style={{ "--d": 1 } as React.CSSProperties}>
          {title}
        </h1>
        {lead ? (
          <p className="page-hero__lead intro" style={{ "--d": 2 } as React.CSSProperties}>
            {lead}
          </p>
        ) : null}
        {children ? (
          <div className="page-hero__actions intro" style={{ "--d": 3 } as React.CSSProperties}>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}

export function FaqList({ faqs, title = "Frequently asked questions" }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="section faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="section-title fx-title" data-scroll="through">
            {title}
          </h2>
        </div>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <details key={f.q} className="faq__item" open={i === 0}>
              <summary>
                <span>{f.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ title, text, button = "Start a project" }: { title: React.ReactNode; text: string; button?: string }) {
  return (
    <section className="section cta-band">
      <div className="container">
        <div className="cta-band__box fx-rise" data-scroll="through">
          <div>
            <h2 className="cta-band__title">{title}</h2>
            <p>{text}</p>
          </div>
          <HireButton className="btn btn--accent btn--lg">
            {button} <ArrowRight width={18} height={18} />
          </HireButton>
        </div>
      </div>
    </section>
  );
}
