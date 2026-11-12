import { landingPages } from "@/data/all-pages";
import { TrustpilotWidget } from "./Trustpilot";
import { services } from "@/data/pages";
import { contact, navLinks, profile, tools } from "@/data/site";
import { CookieSettingsButton } from "./CookieConsent";
import { CopyEmail } from "./CopyEmail";
import { HireButton } from "./HireButton";
import { ArrowRight, ArrowUp, Download, GitHub, LinkedIn, Mail, MapPin, Phone, WhatsApp } from "./Icons";
import { CurrentYear, LocalTime } from "./LocalTime";
import { Logo } from "./Logo";

export function Footer() {
  const socials = [
    { label: "LinkedIn", href: contact.linkedin, Icon: LinkedIn },
    { label: "GitHub", href: contact.github, Icon: GitHub },
    { label: "WhatsApp", href: contact.whatsapp, Icon: WhatsApp },
    { label: "Email", href: `mailto:${contact.email}`, Icon: Mail },
  ];
  return (
    <footer className="footer" data-scroll="enter">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container">
        <div className="footer__cta">
          <div>
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" /> {profile.availability}
            </p>
            <h2 className="footer__title">
              Let&rsquo;s make your <br />
              website <em>rank.</em>
            </h2>
            <div className="footer__buttons">
              <HireButton className="btn btn--accent btn--lg">
                Start a project <ArrowRight width={18} height={18} />
              </HireButton>
              <a href={contact.cv} className="btn btn--ghost btn--lg" download>
                <Download width={18} height={18} /> Download CV
              </a>
            </div>
          </div>

          <div className="footer__card">
            <p className="footer__label">Write to me</p>
            <CopyEmail email={contact.email} />
            <ul className="footer__facts" role="list">
              <li>
                <Phone width={18} height={18} />
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              </li>
              <li>
                <MapPin width={18} height={18} />
                <span>
                  Gujrat, {profile.location} · <LocalTime />
                </span>
              </li>
            </ul>
            <TrustpilotWidget className="footer__tp" />
            <ul className="footer__socials" role="list">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <Icon width={20} height={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__cols">
          <nav aria-label="Footer">
            <h2 className="footer__label">Navigate</h2>
            <ul role="list">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="footer__label">Services</h2>
            <ul role="list">
              {services.map((sv) => (
                <li key={sv.slug}>
                  <a href={`/services/${sv.slug}/`}>{sv.name}</a>
                </li>
              ))}
              <li>
                <a href="/work/">Case studies</a>
              </li>
              <li>
                <a href="/privacy-policy/">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer__label">Industries &amp; locations</h2>
            <ul role="list">
              {landingPages.map((p) => (
                <li key={p.slug}>
                  <a href={`/${p.slug}/`}>{p.name}</a>
                </li>
              ))}
              <li>
                <a href="/ar/" hrefLang="ar" lang="ar">
                  العربية
                </a>{" "}
                ·{" "}
                <a href="/ur/" hrefLang="ur" lang="ur">
                  اردو
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__built">
            <h2 className="footer__label">Built with</h2>
            <ul role="list" className="footer__stack">
              {[tools.next, tools.react, tools.ts, tools.claudecode, tools.hostinger].map((t) => (
                <li key={t.name}>
                  <Logo tool={t} size={22} /> <span translate="no" className="notranslate">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footer__giant" aria-hidden="true">
          {profile.name}
        </p>

        <div className="footer__bottom">
          <p>
            &copy; <CurrentYear /> {profile.name}. Designed &amp; built by me. ·{" "}
            <a href="/privacy-policy/">Privacy</a> · <CookieSettingsButton className="footer__cookie" />
          </p>
          <a href="#top" className="footer__top">
            Back to top
            <span>
              <ArrowUp width={16} height={16} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
