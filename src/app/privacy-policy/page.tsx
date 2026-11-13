import type { Metadata } from "next";
import { JsonLd, PageHero, breadcrumbLd } from "@/components/PageParts";
import { SiteChrome } from "@/components/SiteChrome";
import { privacyUpdated } from "@/data/pages";
import { contact, profile } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Umair Sadiq",
  description: "How umairsadiq.com uses analytics, cookies, translation and the details you send through its forms, and how to ask for your data to be deleted.",
  alternates: { canonical: "/privacy-policy/" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const crumbs = [{ name: "Privacy policy", href: "/privacy-policy/" }];
  return (
    <SiteChrome>
      <JsonLd graph={[breadcrumbLd(crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow="Legal" title="Privacy policy" lead={`Last updated ${privacyUpdated}.`} />
      <section className="section">
        <div className="container">
          <div className="prose prose--legal">
            <p>
              This website, {profile.siteUrl.replace("https://", "")}, is the personal portfolio of {profile.name}. This page
              explains what information is collected when you visit it and how it is used.
            </p>

            <h2>Who is responsible</h2>
            <p>
              {profile.name}, Gujrat, Punjab, Pakistan. You can reach me at <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>

            <h2>Analytics and cookies</h2>
            <p>
              This site uses Google Tag Manager and Google Analytics 4 to understand how visitors use it, for example which
              pages are viewed and how people arrive. Google Analytics uses cookies and collects information such as your
              approximate location, device, browser and the pages you visit. It does not give me your name or contact details.
              Google processes this data under its own privacy policy at{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                policies.google.com/privacy
              </a>
              .
            </p>
            <p>
              Analytics cookies are only set after you allow them in the cookie banner. Until then, Google receives only
              cookieless, anonymous signals (Google Consent Mode). You can change your choice at any time with the
              &ldquo;Cookie settings&rdquo; link in the footer.
            </p>
            <p>
              You can also block these cookies in your browser settings or with the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                Google Analytics opt-out add-on
              </a>
              .
            </p>

            <h2>Information you send me</h2>
            <p>
              When you send the &ldquo;Start a project&rdquo; or quote form, the details you enter (name, email, optional
              phone number, project details and the page you sent it from) are emailed to my inbox at {contact.email}. A copy
              is kept in a private folder on my web host so no enquiry gets lost; it is never public. When you contact me by
              email, WhatsApp or phone, I use what you send only to reply and to discuss your project. I don&rsquo;t sell or
              share it with anyone else, and you can ask me to delete it at any time.
            </p>

            <h2>Translation</h2>
            <p>
              If you pick Arabic or Urdu in the language menu, the page is translated by Google Translate, which loads from
              Google&rsquo;s servers and receives the page text. Your choice is saved in a small cookie called
              &ldquo;googtrans&rdquo; so every page stays in that language. Pick English to switch it off and remove the cookie.
            </p>

            <h2>Spam protection</h2>
            <p>
              To keep bots out of the contact forms, the site checks how the form was sent (a hidden field, timing and a
              short-lived security token) and may show a Cloudflare Turnstile check, which Cloudflare runs under its own
              privacy policy. Your IP address is used only to limit how many messages can be sent per hour.
            </p>

            <h2>Trustpilot</h2>
            <p>
              Reviews are collected and shown through Trustpilot. The Trustpilot widget loads from Trustpilot&rsquo;s
              servers only when it scrolls into view, and leaving a review happens on Trustpilot&rsquo;s own site under
              their privacy policy.
            </p>

            <h2>Chat assistant</h2>
            <p>
              The chat assistant on this site runs entirely in your browser. It answers from the information on this
              website, and your messages are not sent to me or to any other service. The conversation is kept in your
              browser tab until you close it. If you choose to continue on WhatsApp, WhatsApp&rsquo;s own privacy policy
              applies there.
            </p>

            <h2>Stored on your device</h2>
            <p>
              The site remembers whether you chose the light or dark theme and your cookie choice, using your browser&rsquo;s
              local storage. This stays on your device and is never sent to me.
            </p>

            <h2>Hosting</h2>
            <p>
              The site is hosted by Hostinger. Like most web hosts, their servers keep standard access logs (such as IP
              address, time and page requested) for security and reliability.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask me what information I hold about you from our conversations, and ask me to correct or delete it.
              Email <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>

            <h2>Changes</h2>
            <p>If this policy changes, the new version will be posted on this page with a new date at the top.</p>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
