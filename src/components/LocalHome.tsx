import type { LocaleContent } from "@/data/i18n";
import { contact, projects } from "@/data/site";
import { services } from "@/data/pages";
import { ArrowRight, Check, WhatsApp } from "./Icons";
import { Logo } from "./Logo";
import { FaqList } from "./PageParts";
import { QuoteForm } from "./QuoteForm";
import { Browser } from "./Work";

/** One-page overview of Umair's work in Arabic or Urdu, laid out right to left. */
export function LocalHome({ t, fontClass }: { t: LocaleContent; fontClass: string }) {
  const results = t.results.items
    .map((r) => ({ r, p: projects.find((p) => p.slug === r.slug) }))
    .filter((x): x is { r: (typeof t.results.items)[number]; p: (typeof projects)[number] } => x.p !== undefined);
  const wa = `${contact.whatsapp}?text=${encodeURIComponent(t.locale === "ar" ? "مرحبًا عمير، أريد عرض سعر لموقعي." : "السلام علیکم عمیر، مجھے ویب سائٹ کے لیے قیمت معلوم کرنی ہے۔")}`;

  return (
    <div lang={t.locale} dir="rtl" className={`locale locale-${t.locale} ${fontClass}`}>
      <header className="page-hero hire-hero svc-hero" style={{ "--c": "#d4ff3a" } as React.CSSProperties}>
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="svc-hero__glow" aria-hidden="true" />
        <div className="container">
          <div className="hire-hero__grid">
            <div>
              <p className="eyebrow intro">
                <span className="status-dot" aria-hidden="true" /> {t.hero.eyebrow}
              </p>
              <h1 className="page-hero__title hire-hero__title intro" style={{ "--d": 1 } as React.CSSProperties}>
                {t.hero.h1}
              </h1>
              <p className="page-hero__lead intro" style={{ "--d": 2 } as React.CSSProperties}>
                {t.hero.lead}
              </p>
              <div className="page-hero__actions intro" style={{ "--d": 3 } as React.CSSProperties}>
                <a href="#quote" className="btn btn--accent btn--lg hire-hero__jump">
                  {t.hero.cta} <ArrowRight width={18} height={18} className="flip-rtl" />
                </a>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg">
                  <WhatsApp width={18} height={18} /> {t.hero.whatsapp}
                </a>
              </div>
              <p className="locale__hours intro" style={{ "--d": 4 } as React.CSSProperties}>
                <span className="status-dot" aria-hidden="true" /> {t.hero.hours}
              </p>
            </div>
            <div className="hire-hero__form intro" id="quote" style={{ "--d": 2 } as React.CSSProperties}>
              <QuoteForm title={t.form.title} types={t.form.types} t={t.form.text} />
            </div>
          </div>
          <ul className="svc-stats" role="list">
            {t.stats.map((st) => (
              <li key={st.label}>
                <strong>{st.value}</strong>
                <span>{st.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Services */}
      <section className="section" aria-labelledby="l-services">
        <div className="container">
          <h2 id="l-services" className="section-title fx-title" data-scroll="through">
            {t.services.title} {t.services.muted ? <span className="muted">{t.services.muted}</span> : null}
          </h2>
          <ul className="service-grid home-services" role="list">
            {t.services.items.map((it, i) => {
              const s = services.find((x) => x.slug === it.slug)!;
              return (
                <li key={it.slug} className="service-card fx-rise" data-scroll="through" style={{ "--c": s.color } as React.CSSProperties}>
                  <a href={`/services/${it.slug}/`} className="service-card__link" hrefLang="en">
                    <span className="service-card__num">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="service-card__title">{it.name}</h3>
                    <p className="service-card__text">{it.text}</p>
                    <span className="service-card__logos" aria-hidden="true">
                      {s.tools.slice(0, 5).map((tool) => (
                        <Logo key={tool.name} tool={tool} size={30} />
                      ))}
                    </span>
                    <span className="service-card__more">
                      {t.services.more} <ArrowRight width={16} height={16} className="flip-rtl" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Results */}
      <section className="section" aria-labelledby="l-results">
        <div className="container">
          <p className="eyebrow">{t.results.eyebrow}</p>
          <h2 id="l-results" className="section-title fx-title" data-scroll="through">
            {t.results.title} <span className="muted">{t.results.muted}</span>
          </h2>
          <p className="home-lead">{t.results.lead}</p>
          <ul className="related-grid hire-cases" role="list">
            {results.map(({ r, p }) => (
              <li key={p.slug} className="related fx-rise" data-scroll="through" style={{ "--c": p.color } as React.CSSProperties}>
                <Browser project={p} />
                <h3 className="related__name" dir="ltr">
                  <a href={`/work/${p.slug}/`} hrefLang="en">
                    {p.name}
                  </a>
                </h3>
                {p.via ? (
                  <p className="via">
                    <a href={p.via.url} target="_blank" rel="noopener noreferrer">
                      {t.results.via(p.via.name)}
                    </a>
                  </p>
                ) : null}
                <p className="related__text">{r.text}</p>
                <ul className="hire-case__stats" role="list">
                  {r.results.map((x) => (
                    <li key={x.label}>
                      <strong dir="ltr">{x.value}</strong> {x.label}
                    </li>
                  ))}
                </ul>
                <p className="locale__period">{r.period}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why */}
      <section className="section" aria-labelledby="l-why">
        <div className="container">
          <p className="eyebrow">{t.why.eyebrow}</p>
          <h2 id="l-why" className="section-title fx-title" data-scroll="through">
            {t.why.title}
          </h2>
          <ul className="deliver-grid hire-pk" role="list" style={{ "--c": "#d4ff3a" } as React.CSSProperties}>
            {t.why.items.map((d, i) => (
              <li key={d.title} className="deliver fx-rise" data-scroll="through">
                <span className="deliver__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="section" aria-labelledby="l-process">
        <div className="container">
          <p className="eyebrow">{t.process.eyebrow}</p>
          <h2 id="l-process" className="section-title fx-title" data-scroll="through">
            {t.process.title} <span className="muted">{t.process.muted}</span>
          </h2>
          <ol className="mini-steps svc-steps" role="list">
            {t.process.steps.map((st, i) => (
              <li key={st.title} className="fx-rise" data-scroll="through">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqList faqs={t.faq.items} title={t.faq.title} />

      {/* Final */}
      <section className="section hire-final" aria-labelledby="l-final">
        <div className="container hire-final__grid">
          <div>
            <p className="eyebrow">{t.final.eyebrow}</p>
            <h2 id="l-final" className="section-title fx-title" data-scroll="through">
              {t.final.title} <span className="muted">{t.final.muted}</span>
            </h2>
            <p className="home-lead">{t.final.lead}</p>
            <ul className="hire-final__contact" role="list">
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" dir="ltr">
                  <WhatsApp width={18} height={18} /> {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} dir="ltr">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href="/" hrefLang="en" className="locale__english">
                  <Check width={16} height={16} /> {t.final.english}
                </a>
              </li>
            </ul>
          </div>
          <div className="hire-final__form fx-rise" data-scroll="through">
            <QuoteForm title={t.form.title} source="quote-footer" types={t.form.types} t={t.form.text} />
          </div>
        </div>
      </section>
    </div>
  );
}
