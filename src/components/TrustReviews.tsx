import { trustpilot } from "@/data/site";
import { ArrowRight } from "./Icons";

/** Trustpilot's green star boxes. `filled` is out of five. */
export function TpStars({ filled = 5, size = 20 }: { filled?: number; size?: number }) {
  return (
    <span className="tp-stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" className={i < Math.round(filled) ? "is-on" : ""}>
          <rect width="24" height="24" rx="2" />
          <path d="M12 4.6l2.2 5.2 5.6.4-4.3 3.6 1.4 5.5L12 16.3l-4.9 3 1.4-5.5-4.3-3.6 5.6-.4z" />
        </svg>
      ))}
    </span>
  );
}

const reviews = trustpilot.reviews;
const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

/** Small Trustpilot badge for the hero: the real average once there are reviews, otherwise an invitation. */
export function TrustBadge() {
  return (
    <a href={trustpilot.profileUrl} target="_blank" rel="noopener noreferrer" className="tp-badge">
      {reviews.length ? (
        <>
          <TpStars filled={avg} size={18} />
          <span>
            <strong>{avg.toFixed(1)}/5</strong> on Trustpilot · {reviews.length} review{reviews.length === 1 ? "" : "s"}
          </span>
        </>
      ) : (
        <>
          <TpStars filled={0} size={18} />
          <span>
            <strong>Trustpilot</strong> · Worked with me? Leave a review
          </span>
        </>
      )}
      <ArrowRight width={14} height={14} />
    </a>
  );
}

/** Home page reviews section: real Trustpilot reviews, or an invitation for the first ones. */
export function TrustReviews() {
  return (
    <section className="section tp-section" aria-labelledby="reviews-title">
      <div className="container">
        <p className="eyebrow reveal">Reviews</p>
        <h2 id="reviews-title" className="section-title fx-title" data-scroll="through">
          What clients say, <span className="muted">on Trustpilot.</span>
        </h2>
        {reviews.length ? (
          <>
            <p className="tp-summary reveal">
              <TpStars filled={avg} size={26} /> <strong>{avg.toFixed(1)} out of 5</strong> from {reviews.length} review
              {reviews.length === 1 ? "" : "s"} on Trustpilot
            </p>
            <ul className="tp-grid" role="list">
              {reviews.map((r) => (
                <li key={r.name + r.date} className="tp-card fx-rise" data-scroll="through">
                  <TpStars filled={r.rating} size={18} />
                  {r.title ? <h3>{r.title}</h3> : null}
                  <blockquote>{r.text}</blockquote>
                  <p className="tp-card__by">
                    <strong>{r.name}</strong>
                    {r.country ? ` · ${r.country}` : ""} ·{" "}
                    <time dateTime={r.date}>
                      {new Date(`${r.date}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </time>
                  </p>
                </li>
              ))}
            </ul>
            <a href={trustpilot.profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost tp-all">
              Read all reviews on Trustpilot <ArrowRight width={16} height={16} />
            </a>
          </>
        ) : (
          <div className="tp-empty fx-rise" data-scroll="through">
            <TpStars filled={0} size={34} />
            <div>
              <h3>Worked with me? I&rsquo;d love your review.</h3>
              <p>
                Reviews on Trustpilot are public and I can&rsquo;t edit them, so they&rsquo;re the most honest way for new
                clients to judge my work. It takes about a minute.
              </p>
            </div>
            <a href={trustpilot.profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn--accent">
              Review me on Trustpilot <ArrowRight width={16} height={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
