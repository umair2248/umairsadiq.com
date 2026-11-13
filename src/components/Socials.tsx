import { contact } from "@/data/site";
import { Facebook, GitHub, Instagram, LinkedIn, Reddit, XLogo } from "./Icons";

/** Every public profile, in one place: footer, menu, contact sections and schema sameAs all read this. */
export const socialLinks = [
  { label: "LinkedIn", handle: "in/umair-sadiq", href: contact.linkedin, Icon: LinkedIn },
  { label: "GitHub", handle: "@umair2248", href: contact.github, Icon: GitHub },
  { label: "Facebook", handle: "umairsadiqdev", href: contact.facebook, Icon: Facebook },
  { label: "Instagram", handle: "@uma.irsadiq", href: contact.instagram, Icon: Instagram },
  { label: "X", handle: "@umai_rsadiq", href: contact.x, Icon: XLogo },
  { label: "Reddit", handle: "u/umair_sadiq", href: contact.reddit, Icon: Reddit },
];

/** "Follow me" row of labelled social pills. */
export function SocialRow({ title = "Follow my work", className = "" }: { title?: string; className?: string }) {
  return (
    <div className={`social-row ${className}`}>
      <p className="footer__label">{title}</p>
      <ul role="list">
        {socialLinks.map(({ label, handle, href, Icon }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer me" aria-label={`${label}: ${handle}`}>
              <Icon width={18} height={18} />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
