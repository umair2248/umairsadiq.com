import { processSteps } from "@/data/site";

export function Process() {
  return (
    <section id="process" className="section process" aria-labelledby="process-title">
      <div className="container">
        <div className="process__head">
          <p className="eyebrow reveal">05 — How we&rsquo;ll work</p>
          <h2 id="process-title" className="section-title fx-title" data-scroll="through">
            From first call <span className="muted">to first customer.</span>
          </h2>
        </div>

        <div className="process__track" data-scroll="read">
        <div className="ruler" aria-hidden="true">
          <span className="ruler__fill" />
          {Array.from({ length: 41 }, (_, i) => (
            <span key={i} className={i % 10 === 0 ? "ruler__major" : i % 5 === 0 ? "ruler__mid" : undefined}>
              {i % 10 === 0 ? <em>{i / 10}</em> : null}
            </span>
          ))}
        </div>

        <ol className="steps">
          {processSteps.map((step, i) => (
            <li key={step.title} className="step" style={{ "--i": i } as React.CSSProperties}>
              <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__text">{step.description}</p>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
