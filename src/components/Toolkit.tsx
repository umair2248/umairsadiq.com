import { aiTools, stats, toolGroups } from "@/data/site";
import { AITerminal } from "./AITerminal";
import { Counter } from "./Counter";
import { Logo } from "./Logo";

export function Toolkit() {
  const total = new Set([...toolGroups.flatMap((g) => g.tools), ...aiTools].map((t) => t.name)).size;
  return (
    <section id="toolkit" className="section toolkit" data-scroll="enter" aria-labelledby="toolkit-title">
      <div className="container">
        <ul className="stats" role="list">
          {stats.map((s, i) => (
            <li key={s.label} className="stats__item reveal" style={{ "--i": i } as React.CSSProperties}>
              <span className="stats__value">
                <Counter value={s.value} />
              </span>
              <span className="stats__label">{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="toolkit__head">
          <p className="eyebrow reveal">02 — Toolkit</p>
          <h2 id="toolkit-title" className="section-title fx-title" data-scroll="through">
            Everything I use, <span className="muted">from first line of code to page one of Google.</span>
          </h2>
          <p className="toolkit__lead reveal">
            {total} tools across development, SEO and AI. These are the ones I open every week.
          </p>
        </div>

        <article className="ai-box fx-rise" data-scroll="through" aria-labelledby="ai-title">
          <div className="ai-box__copy">
            <p className="ai-box__tag">
              <span className="status-dot" aria-hidden="true" /> AI-powered workflow
            </p>
            <h3 id="ai-title" className="ai-box__title">
              I build <em>with</em> AI, <span className="muted">so you get it faster.</span>
            </h3>
            <p className="ai-box__text">
              Claude Code and Codex handle the repetitive work: boilerplate, refactors, schema markup and speed fixes. That
              leaves my time for design, SEO strategy and checking every line before it goes live.
            </p>
            <ul className="ai-box__perks" role="list">
              <li>
                <strong>Faster delivery</strong>
                <span>Days, not weeks, for most builds</span>
              </li>
              <li>
                <strong>Cleaner code</strong>
                <span>AI review on every change</span>
              </li>
              <li>
                <strong>Human-checked</strong>
                <span>Nothing ships without my review</span>
              </li>
            </ul>
            <ul className="logo-grid logo-grid--ai" role="list" aria-label="AI tools">
              {aiTools.map((tool) => (
                <li key={tool.name}>
                  <Logo tool={tool} size={34} label />
                </li>
              ))}
            </ul>
          </div>
          <AITerminal />
        </article>

        <div className="stack-grid">
          {toolGroups.map((group, g) => (
            <article
              key={group.title}
              className={`stack fx-rise${group.span >= 6 ? " stack--full" : ""}`}
              data-scroll="through"
              style={{ "--i": g % 3, "--c": group.color, "--span": group.span } as React.CSSProperties}
            >
              <header className="stack__head">
                <span className="stack__index">{String(g + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.caption}</p>
                </div>
                <span className="stack__count">{group.tools.length}</span>
              </header>
              <ul role="list" className="logo-grid">
                {group.tools.map((tool) => (
                  <li key={tool.name}>
                    <Logo tool={tool} size={34} label />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
