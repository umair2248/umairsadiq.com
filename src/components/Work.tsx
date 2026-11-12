"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, tools, type Project } from "@/data/site";
import { ArrowRight, ArrowUpRight, Calendar, Zoom } from "./Icons";
import { Logo } from "./Logo";

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** A screenshot inside a small browser frame, linking to the live site. */
export function Browser({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="browser"
      style={{ "--c": project.color } as React.CSSProperties}
    >
      <span className="browser__bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>{host(project.url)}</em>
      </span>
      <span className="browser__shot">
        <Image
          src={project.image}
          alt={`Homepage of the ${project.name} website`}
          width={1440}
          height={900}
          sizes="(min-width: 1000px) 640px, 100vw"
          priority={priority}
        />
        <span className="browser__visit">
          Visit site <ArrowUpRight />
        </span>
      </span>
      <span className="sr-only"> (opens {project.name} in a new tab)</span>
    </a>
  );
}

/** "Delivered via <agency>" line for projects that came through an agency. */
export function Via({ project, className = "via" }: { project: Project; className?: string }) {
  if (!project.via) return null;
  return (
    <p className={className}>
      Delivered via{" "}
      <a href={project.via.url} target="_blank" rel="noopener noreferrer">
        {project.via.name}
      </a>
    </p>
  );
}

export function Work() {
  const featured = projects.filter((p) => p.results);
  const rest = projects.filter((p) => !p.results);
  const [proof, setProof] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (proof && !d.open) d.showModal();
    if (!proof && d.open) d.close();
  }, [proof]);

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <div className="work__head">
          <p className="eyebrow reveal">03 — Selected work</p>
          <h2 id="work-title" className="section-title fx-title" data-scroll="through">
            A few of the <span className="accent-text">100+</span> sites <br className="hide-sm" />
            <span className="muted">I&rsquo;ve built.</span>
          </h2>
          <p className="work__lead reveal">
            Real sites, live right now. The SEO numbers are screenshots from each site&rsquo;s own Google Search Console, with the dates they cover.
          </p>
        </div>

        <ol className="case-list">
          {featured.map((p, i) => (
            <li key={p.name} className="case fx-rise" data-scroll="through" style={{ "--c": p.color } as React.CSSProperties}>
              <div className="case__media">
                <Browser project={p} priority={i === 0} />
              </div>

              <div className="case__info">
                <p className="case__top">
                  <span className="case__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="case__cat">{p.category}</span>
                </p>
                <h3 className="case__name">{p.name}</h3>
                <Via project={p} />
                <p className="case__desc">{p.description}</p>
                <ul className="case__tags notranslate" translate="no" aria-label="Built with">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                {p.results ? (
                  <>
                    {p.period ? (
                      <p className="case__period">
                        <Calendar width={15} height={15} /> {p.period}
                      </p>
                    ) : null}
                    <dl className="case__results">
                      {p.results.map((r) => (
                        <div key={r.label}>
                          <dt>{r.label}</dt>
                          <dd>{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                ) : null}

                <p className="case__links">
                  <a href={`/work/${p.slug}/`} className="btn btn--ghost btn--sm">
                    Read the case study <ArrowRight width={16} height={16} />
                  </a>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="case__link">
                    {host(p.url)} <ArrowUpRight />
                  </a>
                </p>
              </div>

              {p.proof ? (
                <figure className="proof">
                  <figcaption className="proof__head">
                    <span className="proof__title">
                      <Logo tool={tools.gsc} size={26} />
                      <span>
                        <strong>Google Search Console</strong>
                        <small>{p.resultsNote}</small>
                      </span>
                    </span>
                    {p.period ? (
                      <span className="proof__period">
                        <Calendar width={15} height={15} /> {p.period}
                      </span>
                    ) : null}
                  </figcaption>
                  <button type="button" className="proof__shot" data-scroll="through" onClick={() => setProof(p)}>
                    <Image
                      src={p.proof}
                      alt={`Google Search Console performance report for ${p.name}, ${p.period ?? ""}`}
                      width={1500}
                      height={800}
                      sizes="(min-width: 1100px) 1100px, 100vw"
                    />
                    <span className="proof__zoom">
                      <Zoom width={16} height={16} /> Click to enlarge
                    </span>
                  </button>
                </figure>
              ) : null}
            </li>
          ))}
        </ol>

        {rest.length ? (
          <>
            <h3 className="work__sub reveal">More recent builds</h3>
            <ul className="mini-grid">
              {rest.map((p) => (
                <li key={p.name} className="mini fx-rise" data-scroll="through" style={{ "--c": p.color } as React.CSSProperties}>
                  <Browser project={p} />
                  <div className="mini__info">
                    <div>
                      <h4 className="mini__name">
                        <a href={`/work/${p.slug}/`}>{p.name}</a>
                      </h4>
                      <Via project={p} />
                      <p className="mini__desc">{p.description}</p>
                    </div>
                    <ul className="case__tags notranslate" translate="no" aria-label="Built with">
                      <li>{p.category}</li>
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <dialog
        ref={dialog}
        className="proof-dialog"
        aria-label={proof ? `Search Console results for ${proof.name}` : "Search Console results"}
        onClose={() => setProof(null)}
        onClick={(e) => e.target === e.currentTarget && setProof(null)}
      >
        {proof?.proof ? (
          <figure>
            <Image
              src={proof.proof}
              alt={`Google Search Console performance report for ${proof.name}`}
              width={1500}
              height={800}
              sizes="(min-width: 1100px) 1000px, 94vw"
            />
            <figcaption>
              <span>
                <strong>{proof.name}</strong> · {proof.resultsNote}
                {proof.period ? ` · ${proof.period}` : ""}
              </span>
              <button type="button" onClick={() => setProof(null)}>
                Close
              </button>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </section>
  );
}
