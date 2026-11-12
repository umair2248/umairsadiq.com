import type { Metadata } from "next";
import { aiTools, certifications, contact, education, experience, profile, projects, toolGroups } from "@/data/site";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: `CV | ${profile.name}`,
  description: `Curriculum vitae of ${profile.name}, ${profile.shortRole}.`,
  alternates: { canonical: "/cv/" },
  robots: { index: false, follow: true },
};

// Certificates from the same issuer share one line, so the CV stays on one page.
const shortTitle = (t: string) =>
  t.replace(/^Introduction to /, "").replace("Advanced Styling with Responsive Design", "Responsive Design").replace("Interactivity with JavaScript", "JavaScript")
    .replace("SEO (Search Engine Optimization)", "SEO")
    .replace(" Development Internship", " Internship");
const certGroups = certifications.reduce<{ key: string; issuer: string; platform?: string; date: string; titles: string[] }[]>((acc, c) => {
  const key = `${c.issuer}|${c.platform ?? ""}`;
  const g = acc.find((x) => x.key === key);
  if (g) g.titles.push(shortTitle(c.title));
  else acc.push({ key, issuer: c.issuer, platform: c.platform, date: c.date, titles: [shortTitle(c.title)] });
  return acc;
}, []);

// Each tool once: groups share a few (e.g. Rank Math is both a plugin and an SEO tool).
const seen = new Set<string>();
const skillRows = toolGroups.map((g) => ({
  title: g.title,
  names: g.tools.map((t) => t.name).filter((n) => !seen.has(n) && seen.add(n)),
}));

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/**
 * Printable A4 CV built from src/data/site.ts. `npm run deploy` prints this
 * page to /cv/umair-sadiq-cv.pdf, so the PDF always matches the website.
 */
export default function CVPage() {
  return (
    <main className="cv-page">
      <div className="cv-toolbar">
        <a href="/">← Back to website</a>
        <span>
          <a href={contact.cv} download>
            Download PDF
          </a>
          <PrintButton />
        </span>
      </div>

      <article className="cv">
        <header className="cv__head">
          <div>
            <h1>{profile.name}</h1>
            <p className="cv__role">Full Stack Web Developer &amp; SEO Specialist</p>
          </div>
          <ul className="cv__contact">
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            </li>
            <li>
              <a href={profile.siteUrl}>{host(profile.siteUrl)}</a>
            </li>
            <li>
              <a href={contact.linkedin}>{host(contact.linkedin)}</a>
            </li>
            <li>
              <a href={contact.github}>{host(contact.github)}</a>
            </li>
            <li>Gujrat, Pakistan · Remote worldwide</li>
          </ul>
        </header>

        <section>
          <h2>Profile</h2>
          <p>
            Full stack developer and SEO specialist with {profile.websitesBuilt} websites built in WordPress, PHP, React and
            Next.js, plus Flutter mobile apps. I build technical SEO in from day one and use AI tools (Claude Code, Codex) to
            ship faster, with every change reviewed by hand.
          </p>
        </section>

        <section>
          <h2>Experience</h2>
          {experience.map((job) => (
            <div key={job.company} className="cv__item">
              <div className="cv__item-head">
                <h3>
                  {job.role}, {job.company}
                </h3>
                <span>{job.period}</span>
              </div>
              <p className="cv__meta">{job.meta}</p>
              <ul>
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Selected projects</h2>
          {projects.map((p) => (
            <div key={p.name} className="cv__item cv__item--tight">
              <div className="cv__item-head">
                <h3>
                  {p.name} <span className="cv__muted">· {host(p.url)}</span>
                </h3>
                <span>{p.tags.join(" · ")}</span>
              </div>
              <p>
                {p.description}
                {p.results ? (
                  <>
                    {" "}
                    <strong>Results:</strong> {p.results.map((r) => `${r.value} ${r.label.toLowerCase()}`).join(", ")}
                    {p.period ? ` (Google Search Console, ${p.period})` : ""}.
                  </>
                ) : null}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2>Skills &amp; tools</h2>
          <dl className="cv__skills">
            {skillRows.map((g) => (
              <div key={g.title}>
                <dt>{g.title}</dt>
                <dd>{g.names.join(", ")}</dd>
              </div>
            ))}
            <div>
              <dt>AI tools</dt>
              <dd>{aiTools.map((t) => t.name).join(", ")}</dd>
            </div>
          </dl>
        </section>

        <div className="cv__cols">
          <section>
            <h2>Education</h2>
            {education.map((e) => (
              <p key={e.title} className="cv__line">
                <strong>{e.title}</strong>
                <span className="cv__meta">
                  {e.place} · {e.period}
                </span>
              </p>
            ))}
          </section>
          <section>
            <h2>Certifications</h2>
            {certGroups.map((g) => (
              <p key={g.key} className="cv__line cv__line--inline">
                <strong>{g.titles.join(", ")}</strong>{" "}
                <span className="cv__meta">
                  · {g.issuer}
                  {g.platform === "Coursera" ? " (Coursera)" : ""}, {g.date}
                </span>
              </p>
            ))}
          </section>
        </div>
      </article>
    </main>
  );
}
