import { certifications, education, experience } from "@/data/site";

function OrgLogo({ src, name, size = 56 }: { src: string; name: string; size?: number }) {
  return (
    <span className="org-logo" style={{ "--s": `${size}px` } as React.CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`${name} logo`} width={size} height={size} loading="lazy" decoding="async" />
    </span>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <div className="experience__head">
          <p className="eyebrow reveal">04 — Experience</p>
          <h2 id="experience-title" className="section-title fx-title" data-scroll="through">
            Where I&rsquo;ve <span className="accent-text">worked</span> <span className="muted">and studied.</span>
          </h2>
        </div>

        <ol className="jobs">
          {experience.map((job, i) => (
            <li key={job.company} className="job fx-rise" data-scroll="through" style={{ "--i": i } as React.CSSProperties}>
              <div className="job__side">
                <OrgLogo src={job.logo} name={job.company} size={64} />
                <span className="job__period">
                  {job.period.endsWith("Present") ? <span className="status-dot" aria-hidden="true" /> : null}
                  {job.period}
                </span>
              </div>
              <div className="job__body">
                <h3 className="job__role">
                  {job.role} <span className="muted">at</span>{" "}
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="job__company">
                    {job.company}
                  </a>
                </h3>
                <p className="job__meta">{job.meta}</p>
                <ul className="job__points">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="experience__grid">
          <div className="fx-slide-l" data-scroll="through">
            <h3 className="experience__sub">Education</h3>
            <ul className="cred-list">
              {education.map((e) => (
                <li key={e.title}>
                  <OrgLogo src={e.logo} name={e.place} size={48} />
                  <span className="cred-list__text">
                    <strong>{e.title}</strong>
                    <span>
                      <a href={e.url} target="_blank" rel="noopener noreferrer" className="cred-link">
                        {e.place}
                      </a>{" "}
                      · {e.period}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="fx-slide-r experience__certs" data-scroll="through">
            <h3 className="experience__sub">Certifications &amp; courses</h3>
            <ul className="cred-list cred-list--grid">
              {certifications.map((c) => (
                <li key={c.title + c.date}>
                  <OrgLogo src={c.logo} name={c.issuer} size={48} />
                  <span className="cred-list__text">
                    <strong>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="cred-title">
                        {c.title}
                      </a>
                    </strong>
                    <span>
                      <a href={c.issuerUrl} target="_blank" rel="noopener noreferrer" className="cred-link">
                        {c.issuer}
                      </a>
                      {c.platform ? (
                        <>
                          {" "}
                          · {c.platformUrl ? "via " : ""}
                          {c.platformUrl ? (
                            <a href={c.platformUrl} target="_blank" rel="noopener noreferrer" className="cred-link">
                              {c.platform}
                            </a>
                          ) : (
                            c.platform
                          )}
                        </>
                      ) : null}{" "}
                      · {c.date}
                    </span>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="cred-verify">
                      {c.linkLabel ?? "Verify"}
                      {c.credentialId ? ` · ID ${c.credentialId}` : ""} ↗
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
