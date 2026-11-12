import type { Metadata } from "next";
import { ogImage } from "@/data/seo";
import Image from "next/image";
import { Experience } from "@/components/Experience";
import { HireButton } from "@/components/HireButton";
import { ArrowRight, Download } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { CtaBand, JsonLd, PageHero, breadcrumbLd } from "@/components/PageParts";
import { SiteChrome } from "@/components/SiteChrome";
import { services } from "@/data/pages";
import { aiTools, contact, profile, stats, tools } from "@/data/site";

export const metadata: Metadata = {
  title: "About Umair Sadiq: WordPress Developer & SEO Specialist",
  description:
    "About Umair Sadiq, a WordPress developer and SEO specialist from Gujrat, Pakistan with 100+ websites built, working remotely with clients worldwide.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/", title: "About Umair Sadiq", images: [ogImage] },
};

const favourites = [tools.wordpress, tools.woocommerce, tools.rankmath, tools.ahrefs, tools.next, tools.react, tools.php, tools.flutter, tools.gsc, tools.claudecode];

export default function AboutPage() {
  const crumbs = [{ name: "About", href: "/about/" }];
  return (
    <SiteChrome>
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            "@type": "AboutPage",
            name: `About ${profile.name}`,
            url: `${profile.siteUrl}/about/`,
            mainEntity: { "@id": `${profile.siteUrl}/#person` },
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="About me"
        title={
          <>
            Hi, I&rsquo;m Umair. <span className="muted">I build websites that get found.</span>
          </>
        }
        lead="WordPress developer and SEO specialist from Gujrat, Pakistan, working remotely with clients around the world."
      >
        <HireButton className="btn btn--accent btn--lg">
          Work with me <ArrowRight width={18} height={18} />
        </HireButton>
        <a href={contact.cv} download className="btn btn--ghost btn--lg">
          <Download width={18} height={18} /> Download CV
        </a>
      </PageHero>

      <section className="section">
        <div className="container about-page">
          <figure className="about-page__photo fx-rise" data-scroll="through">
            <Image src="/umair-sadiq.webp" alt={`${profile.name}, WordPress developer and SEO specialist`} width={960} height={1200} sizes="(min-width: 1000px) 420px, 90vw" />
          </figure>
          <div className="prose fx-rise" data-scroll="through">
            <p>
              I care about two things: how a website looks, and whether anyone can find it. So far I&rsquo;ve
              built more than {profile.websitesBuilt} websites, most of them on WordPress, plus Next.js and React apps and
              Flutter mobile apps.
            </p>
            <p>
              Today I work as a WordPress Developer at ABCDMEDIA LTD, building sites for international agency clients. Before
              that I worked on WordPress and SEO at Technogic Systems in Gujrat, where I also completed a six-month SEO and
              WordPress internship. Alongside work, I&rsquo;m studying for a Bachelor&rsquo;s in Information Technology at the
              University of Gujrat.
            </p>
            <p>
              My approach is simple: build on the right stack, keep the site fast, put SEO in from day one, and measure
              everything in Search Console. I use AI tools like Claude Code and Codex to move faster on repetitive work, and I
              review every line before it ships.
            </p>
            <ul className="about-page__stats" role="list">
              {stats.map((s) => (
                <li key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="fav-title">
        <div className="container">
          <p className="eyebrow">Toolkit</p>
          <h2 id="fav-title" className="section-title fx-title" data-scroll="through">
            The tools I reach for <span className="muted">most.</span>
          </h2>
          <ul className="logo-grid service-tools" role="list">
            {[...favourites, ...aiTools.slice(1, 3)].map((t) => (
              <li key={t.name}>
                <Logo tool={t} size={34} label />
              </li>
            ))}
          </ul>
          <p className="about-page__more">
            <a href="/#toolkit" className="related__more">
              See all the tools I use <ArrowRight width={14} height={14} />
            </a>
          </p>
        </div>
      </section>

      <Experience />

      <section className="section" aria-labelledby="svc-title">
        <div className="container">
          <h2 id="svc-title" className="experience__sub">
            What I can do for you
          </h2>
          <ul className="other-services" role="list">
            {services.map((o) => (
              <li key={o.slug}>
                <a href={`/services/${o.slug}/`} style={{ "--c": o.color } as React.CSSProperties}>
                  {o.name} <ArrowRight width={16} height={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Let&rsquo;s build something <em>that ranks.</em>
          </>
        }
        text="Tell me about your project in five quick questions and I'll get back to you with a plan."
      />
    </SiteChrome>
  );
}
