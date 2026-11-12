import type { Metadata } from "next";
import { ogImage } from "@/data/seo";
import { CopyEmail } from "@/components/CopyEmail";
import { TrustpilotWidget } from "@/components/Trustpilot";
import { HireButton } from "@/components/HireButton";
import { ArrowRight, ArrowUpRight, Download, GitHub, LinkedIn, Mail, MapPin, Phone, WhatsApp } from "@/components/Icons";
import { FaqList, JsonLd, PageHero, breadcrumbLd, faqLd } from "@/components/PageParts";
import { SiteChrome } from "@/components/SiteChrome";
import { WorkingHours } from "@/components/WorkingHours";
import { contactFaqs } from "@/data/pages";
import { contact, profile } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Umair Sadiq: Hire a WordPress Developer & SEO Expert",
  description:
    "Contact Umair Sadiq by email, WhatsApp or phone. Available 9 AM to 2 AM Pakistan time for WordPress, SEO, Next.js and Flutter projects worldwide.",
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/", title: "Contact Umair Sadiq", images: [ogImage] },
};

export default function ContactPage() {
  const crumbs = [{ name: "Contact", href: "/contact/" }];
  const channels = [
    { label: "WhatsApp", value: contact.phoneDisplay, href: contact.whatsapp, Icon: WhatsApp, note: "Fastest reply" },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, Icon: Mail, note: "For project details" },
    { label: "Phone", value: contact.phoneDisplay, href: contact.phoneHref, Icon: Phone, note: "9 AM – 2 AM PKT" },
    { label: "LinkedIn", value: "in/umair-sadiq", href: contact.linkedin, Icon: LinkedIn, note: "Connect" },
    { label: "GitHub", value: "@umair2248", href: contact.github, Icon: GitHub, note: "See code" },
  ];
  return (
    <SiteChrome>
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            "@type": "ContactPage",
            name: `Contact ${profile.name}`,
            url: `${profile.siteUrl}/contact/`,
            mainEntity: {
              "@id": `${profile.siteUrl}/#person`,
            },
          },
          faqLd(contactFaqs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Contact"
        title={
          <>
            Got a project? <span className="accent-text">Let&rsquo;s talk.</span>
          </>
        }
        lead="Tell me what you need: a new website, an SEO fix, a store or an app. I'm online from 9 AM to 2 AM Pakistan time, and you can message me any time."
      >
        <HireButton className="btn btn--accent btn--lg">
          Start a project <ArrowRight width={18} height={18} />
        </HireButton>
        <a href={contact.cv} download className="btn btn--ghost btn--lg">
          <Download width={18} height={18} /> Download CV
        </a>
      </PageHero>

      <section className="section">
        <div className="container contact-page">
          <ul className="contact-page__channels" role="list">
            {channels.map(({ label, value, href, Icon, note }) => (
              <li key={label} className="fx-rise" data-scroll="through">
                <a
                  href={href}
                  className="channel"
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon width={22} height={22} />
                  <span className="channel__label">{label}</span>
                  <span className="channel__value">{value}</span>
                  <small className="contact-page__note">{note}</small>
                  <ArrowUpRight className="channel__arrow" width={18} height={18} />
                </a>
              </li>
            ))}
          </ul>
          <aside className="footer__card contact-page__card fx-rise" data-scroll="through">
            <p className="footer__label">Write to me</p>
            <CopyEmail email={contact.email} />
            <ul className="footer__facts" role="list">
              <li>
                <Phone width={18} height={18} />
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              </li>
              <li>
                <MapPin width={18} height={18} />
                <span>Gujrat, Punjab, Pakistan · Remote worldwide</span>
              </li>
            </ul>
            <TrustpilotWidget className="contact-page__tp" />
            <p className="footer__label">Working hours</p>
            <p className="contact-page__hours">
              <WorkingHours />
            </p>
          </aside>
        </div>
      </section>

      <FaqList faqs={contactFaqs} title="Before you get in touch" />
    </SiteChrome>
  );
}
