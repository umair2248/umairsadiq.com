import Image from "next/image";
import { homeSeo } from "@/data/home";
import { contact, heroWords, marquee, profile, tools } from "@/data/site";
import { HeroFX } from "./HeroFX";
import { HireButton } from "./HireButton";
import { ArrowRight, WhatsApp } from "./Icons";
import { Logo } from "./Logo";
import { RotatingWord } from "./RotatingWord";
import { TrustBadge } from "./TrustReviews";

/** Logos floating around the skill card: [tool, top %, left %, depth, delay s]. */
const floaters = [
  [tools.wordpress, 10, 4, 1.4, 0],
  [tools.next, 6, 84, 0.8, 0.6],
  [tools.claudecode, 46, -4, 1.1, 1.2],
  [tools.gsc, 40, 96, 1.6, 0.3],
  [tools.react, 74, 2, 0.9, 0.9],
  [tools.flutter, 70, 94, 1.2, 1.5],
] as const;

export function Hero() {
  return (
    <section id="home" className="hero" data-scroll="exit" aria-labelledby="hero-title">
      <HeroFX />
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__spot" aria-hidden="true" />
      <div className="hero__aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__kicker intro">
            <span className="status-dot" aria-hidden="true" />
            {profile.availability} · {profile.workStyle}
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="hero__line hero__line--kicker intro" style={{ "--d": 1 } as React.CSSProperties}>
              <span className="hero__shift">Freelance WordPress Developer &amp; SEO Expert</span>
            </span>{" "}
            <span className="hero__line intro" style={{ "--d": 2 } as React.CSSProperties}>
              <span className="hero__shift">who builds sites</span>
            </span>{" "}
            <span className="hero__line intro" style={{ "--d": 3 } as React.CSSProperties}>
              <span className="hero__shift">
                that <em>rank.</em>
              </span>
            </span>
          </h1>

          <p className="hero__lede intro" style={{ "--d": 4 } as React.CSSProperties}>
            Hi, I&rsquo;m {profile.firstName}, a freelance WordPress developer and SEO expert with{" "}
            <strong>{profile.websitesBuilt} websites</strong> built. I make custom WordPress sites, plugins and WooCommerce
            stores that load fast and climb Google, for clients in the US, UK, UAE and Australia. Today I&rsquo;m working
            in <RotatingWord words={heroWords} />
          </p>

          <div className="hero__actions intro" style={{ "--d": 5 } as React.CSSProperties}>
            <HireButton className="btn btn--accent btn--lg">
              Hire me <ArrowRight width={18} height={18} />
            </HireButton>
            <a
              href={`${contact.whatsapp}?text=${encodeURIComponent(homeSeo.callMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--lg"
            >
              <WhatsApp width={18} height={18} /> Free 15-min call
            </a>
          </div>
          <div className="hero__trust intro" style={{ "--d": 5.5 } as React.CSSProperties}>
            <TrustBadge />
          </div>

          <div className="hero__ai intro" style={{ "--d": 6 } as React.CSSProperties}>
            <span className="hero__ai-logos" aria-hidden="true">
              <Logo tool={tools.claudecode} size={26} />
              <Logo tool={tools.codex} size={26} />
              <Logo tool={tools.cursor} size={26} />
            </span>
            <span>
              <strong>AI-powered workflow.</strong> I build with Claude Code &amp; Codex, so you get it faster.
            </span>
          </div>
        </div>

        <div className="hero__visual intro" style={{ "--d": 3 } as React.CSSProperties}>
          <div className="hero__parallax">
            <figure className="portrait">
              <div className="portrait__arch" aria-hidden="true">
                <span className="portrait__ring" />
                <span className="portrait__ring portrait__ring--2" />
              </div>
              <Image
                src="/umair-sadiq.webp"
                alt={`${profile.name}, full stack developer and SEO specialist`}
                width={960}
                height={1200}
                priority
                sizes="(min-width: 1000px) 460px, 80vw"
                className="portrait__img"
              />
              <figcaption className="portrait__chip portrait__chip--top">
                <strong>{profile.websitesBuilt}</strong> websites built
              </figcaption>
              <span className="portrait__chip portrait__chip--bottom" aria-hidden="true">
                <span className="status-dot" /> Open to new projects
              </span>
            </figure>
            <div className="hero__floaters" aria-hidden="true">
              {floaters.map(([tool, top, left, depth, delay]) => (
                <span
                  key={tool.name}
                  className="hero__floater"
                  style={{ top: `${top}%`, left: `${left}%`, "--depth": depth, "--delay": `${delay}s` } as React.CSSProperties}
                >
                  <Logo tool={tool} size={42} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a href="#doors" className="scroll-cue" aria-label="Scroll to explore">
        <span>Scroll to explore</span>
        <span className="scroll-cue__line" aria-hidden="true" />
      </a>

      <div className="marquee" aria-label="Technologies I work with">
        <ul className="marquee__track notranslate" translate="no" role="list">
          {[...marquee, ...marquee].map((tool, i) => (
            <li key={i} aria-hidden={i >= marquee.length ? true : undefined}>
              <Logo tool={tool} size={30} />
              {tool.name}
              <span className="marquee__star" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
