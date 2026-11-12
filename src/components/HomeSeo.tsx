import { landingPages } from "@/data/all-pages";
import { homeFaqs, homeSeo, recruiter } from "@/data/home";
import { caseStudies, services } from "@/data/pages";
import { contact, projects } from "@/data/site";
import { CountriesStack } from "./CountriesStack";
import { HireButton } from "./HireButton";
import { ArrowRight, Calendar, Check, Download, LinkedIn, Mail, WhatsApp } from "./Icons";
import { Logo } from "./Logo";
import { FaqList } from "./PageParts";

const callHref = `${contact.whatsapp}?text=${encodeURIComponent(homeSeo.callMessage)}`;

/** "Book a free 15-minute call" + "Hire me", reused after the hero, mid-page and at the end. */
export function CallCta({ title, text }: { title: React.ReactNode; text: string }) {
  return (
    <section className="section cta-band home-cta">
      <div className="container">
        <div className="cta-band__box fx-rise" data-scroll="through">
          <div>
            <h2 className="cta-band__title">{title}</h2>
            <p>{text}</p>
          </div>
          <div className="home-cta__buttons">
            <a href={callHref} target="_blank" rel="noopener noreferrer" className="btn btn--accent btn--lg">
              <WhatsApp width={18} height={18} /> Book a free 15-min call
            </a>
            <HireButton className="btn btn--ghost btn--lg">
              Hire me <ArrowRight width={18} height={18} />
            </HireButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeServices() {
  return (
    <section id="services" className="section" aria-labelledby="home-services-title">
      <div className="container">
        <p className="eyebrow reveal">Services</p>
        <h2 id="home-services-title" className="section-title fx-title" data-scroll="through">
          Hire a freelance WordPress developer <span className="muted">for every part of your site.</span>
        </h2>
        <p className="home-lead reveal">
          Most clients come to me for one of six things, and the most common is to{" "}
          <a href="/services/wordpress-development/" className="text-link">hire a WordPress developer</a> for a new build, a
          redesign or a fix. You can also{" "}
          <a href="/services/seo-services/" className="text-link">hire an SEO expert</a>, order a{" "}
          <a href="/services/technical-seo-audit/" className="text-link">technical SEO audit</a>,{" "}
          <a href="/services/woocommerce-development/" className="text-link">hire a WooCommerce developer</a>, get{" "}
          <a href="/services/wordpress-speed-optimization/" className="text-link">WordPress speed optimization</a>,{" "}
          <a href="/services/nextjs-react-development/" className="text-link">hire a freelance React developer</a> or{" "}
          <a href="/services/flutter-app-development/" className="text-link">hire a Flutter app developer</a>. Each has its own page with what&rsquo;s included, the tools I use
          and real examples, so you can see exactly what you get before we talk.
        </p>
        <ul className="service-grid home-services" role="list">
          {services.filter((s) => s.core !== false).map((s, i) => (
            <li key={s.slug} className="service-card fx-rise" data-scroll="through" style={{ "--c": s.color } as React.CSSProperties}>
              <a href={`/services/${s.slug}/`} className="service-card__link">
                <span className="service-card__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="service-card__title">{s.name}</h3>
                <p className="service-card__text">{s.tagline}</p>
                <span className="service-card__logos" aria-hidden="true">
                  {s.tools.slice(0, 5).map((t) => (
                    <Logo key={t.name} tool={t} size={30} />
                  ))}
                </span>
                <span className="service-card__more">
                  {s.name} details <ArrowRight width={16} height={16} />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="home-more">
          {(["industry", "location"] as const).map((g) => (
            <div key={g} className="home-more__group reveal">
              <p className="home-more__label">{g === "industry" ? "Industries and engagement" : "Locations"}</p>
              <ul className="other-services" role="list">
                {landingPages
                  .filter((p) => p.group === g)
                  .map((p) => (
                    <li key={p.slug}>
                      <a href={`/${p.slug}/`} style={{ "--c": p.color } as React.CSSProperties}>
                        {p.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeResults() {
  const seo = projects.filter((p) => p.results);
  return (
    <section className="section home-results" aria-labelledby="home-results-title">
      <div className="container">
        <p className="eyebrow reveal">Results</p>
        <h2 id="home-results-title" className="section-title fx-title" data-scroll="through">
          Real Search Console numbers, <span className="muted">not promises.</span>
        </h2>
        <p className="home-lead reveal">
          An expert WordPress developer should be able to show results, not just screenshots of designs. These numbers come
          straight from my clients&rsquo; Google Search Console accounts, with the dates they cover.
        </p>
        <ul className="results-strip" role="list">
          {seo.map((p) => (
            <li key={p.slug} className="results-strip__item fx-rise" data-scroll="through" style={{ "--c": p.color } as React.CSSProperties}>
              <p className="results-strip__name">
                <a href={`/work/${p.slug}/`}>{p.name}</a>
              </p>
              <dl>
                {p.results!.map((r) => (
                  <div key={r.label}>
                    <dd>{r.value}</dd>
                    <dt>{r.label}</dt>
                  </div>
                ))}
              </dl>
              {p.period ? (
                <p className="results-strip__period">
                  <Calendar width={14} height={14} /> {p.period}
                </p>
              ) : null}
              <p className="results-strip__text">{caseStudies[p.slug]?.outcome}</p>
              <a href={`/work/${p.slug}/`} className="related__more">
                {p.name} case study <ArrowRight width={14} height={14} />
              </a>
            </li>
          ))}
        </ul>
        <p className="home-more reveal">
          <a href="/work/" className="btn btn--ghost btn--sm">
            See all case studies <ArrowRight width={16} height={16} />
          </a>
        </p>
      </div>
    </section>
  );
}

export function HomeCountries() {
  return (
    <section id="countries" className="section" aria-labelledby="home-countries-title">
      <div className="container">
        <p className="eyebrow reveal">Where my clients are</p>
        <h2 id="home-countries-title" className="section-title fx-title" data-scroll="through">
          Hire a freelance web developer <span className="muted">who works in your time zone.</span>
        </h2>
        <p className="home-lead reveal">
          I work remotely from Pakistan with clients in the US, UK, UAE, Australia and at home. I&rsquo;m online from 9 AM
          to 2 AM Pakistan time, every day. Scroll through to see exactly when that is where you are, live:
        </p>
        <CountriesStack />
      </div>
    </section>
  );
}

export function HomePricing() {
  const factors = [
    { t: "Pages and content", d: "A five-page business site is a very different job from a 40-page site with a blog and landing pages." },
    { t: "Features", d: "Online stores, bookings, memberships, multilingual content or a custom plugin each add build and testing time." },
    { t: "Design", d: "Working from your existing brand or Figma file is quicker than designing every page from scratch." },
    { t: "SEO and speed", d: "Technical SEO foundations are always included. Keyword research, content and ongoing SEO are priced separately." },
  ];
  return (
    <section className="section" aria-labelledby="home-pricing-title">
      <div className="container home-pricing">
        <div>
          <p className="eyebrow reveal">Pricing</p>
          <h2 id="home-pricing-title" className="section-title fx-title" data-scroll="through">
            What does a professional WordPress developer <span className="muted">cost?</span>
          </h2>
          <p className="home-lead reveal">
            I quote a fixed price in USD for the agreed scope, so you know the full cost before anything starts. Small fixes are
            billed hourly with an estimate first, so there are no surprise invoices. These four things decide the price:
          </p>
          <div className="home-cta__buttons reveal">
            <a href={callHref} target="_blank" rel="noopener noreferrer" className="btn btn--accent btn--lg">
              <WhatsApp width={18} height={18} /> Get a fixed quote
            </a>
          </div>
        </div>
        <ul className="pricing-factors" role="list">
          {factors.map((f, i) => (
            <li key={f.t} className="fx-rise" data-scroll="through">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeFaq() {
  return <FaqList faqs={homeFaqs} title="Questions about hiring a freelance WordPress developer" />;
}

/** The 30-second version for recruiters and hiring managers. */
export function HomeRecruiter() {
  const jobMail = `mailto:${contact.email}?subject=${encodeURIComponent("Job opportunity for Umair Sadiq")}`;
  return (
    <section id="hiring" className="section recruiter" aria-labelledby="recruiter-title">
      <div className="container">
        <p className="eyebrow reveal">
          <span className="status-dot" aria-hidden="true" /> For recruiters &amp; hiring managers
        </p>
        <h2 id="recruiter-title" className="section-title fx-title" data-scroll="through">
          Hiring a WordPress developer? <span className="muted">Here&rsquo;s the 30-second version.</span>
        </h2>
        <div className="recruiter__grid">
          <div className="recruiter__card fx-rise" data-scroll="through">
            <dl className="recruiter__facts">
              {recruiter.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="recruiter__actions">
              <a href={contact.cv} download className="btn btn--accent btn--sm">
                <Download width={16} height={16} /> Download CV
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
                <LinkedIn width={16} height={16} /> LinkedIn
              </a>
              <a href={jobMail} className="btn btn--ghost btn--sm">
                <Mail width={16} height={16} /> Email about a role
              </a>
            </div>
          </div>
          <div className="recruiter__why">
            <h3 className="experience__sub">Why teams hire me</h3>
            <ul role="list">
              {recruiter.reasons.map((r) => (
                <li key={r.title} className="fx-rise" data-scroll="through">
                  <Check width={20} height={20} />
                  <span>
                    <strong>{r.title}</strong>
                    <span>{r.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="recruiter__links">
              <a href="/work/" className="related__more">
                Case studies <ArrowRight width={14} height={14} />
              </a>
              <a href="#experience" className="related__more">
                Full experience <ArrowRight width={14} height={14} />
              </a>
              <a href="/about/" className="related__more">
                About me <ArrowRight width={14} height={14} />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
