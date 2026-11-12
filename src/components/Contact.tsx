import { contact, profile } from "@/data/site";
import { HireButton } from "./HireButton";
import { ArrowRight, ArrowUpRight, Download, GitHub, LinkedIn, Mail, Phone, WhatsApp } from "./Icons";

export function Contact() {
  const channels = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, Icon: Mail },
    { label: "WhatsApp", value: contact.phoneDisplay, href: contact.whatsapp, Icon: WhatsApp },
    { label: "Phone", value: contact.phoneDisplay, href: contact.phoneHref, Icon: Phone },
    { label: "LinkedIn", value: "in/umair-sadiq", href: contact.linkedin, Icon: LinkedIn },
    { label: "GitHub", value: "@umair2248", href: contact.github, Icon: GitHub },
  ];
  return (
    <section id="contact" className="section contact" data-scroll="enter" aria-labelledby="contact-title">
      <div className="container">
        <p className="eyebrow reveal">
          <span className="status-dot" aria-hidden="true" /> {profile.availability}
        </p>
        <h2 id="contact-title" className="contact__title">
          Got an idea? <br />
          <span className="accent-text">Let&rsquo;s build it.</span>
        </h2>
        <p className="contact__lede reveal">
          A new website, a Flutter app, or an SEO fix for a site that isn&rsquo;t ranking yet: answer five quick
          questions and I&rsquo;ll get back to you with a plan.
        </p>
        <div className="contact__actions reveal">
          <HireButton className="btn btn--accent btn--xl">
            Start a project <ArrowRight width={20} height={20} />
          </HireButton>
          <a href={contact.cv} className="btn btn--ghost btn--xl" download>
            <Download width={20} height={20} /> Download CV
          </a>
        </div>

        <ul className="channels" role="list">
          {channels.map(({ label, value, href, Icon }, i) => (
            <li key={label} className="reveal" style={{ "--i": i } as React.CSSProperties}>
              <a href={href} className="channel" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Icon width={22} height={22} />
                <span className="channel__label">{label}</span>
                <span className="channel__value">{value}</span>
                <ArrowUpRight className="channel__arrow" width={18} height={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
