"use client";

import { useEffect, useRef, useState } from "react";

type Line = { kind: "cmd" | "info" | "ok"; text: string };

/** A short, looping terminal session showing how AI tools fit into the work. */
const script: Line[] = [
  { kind: "cmd", text: 'claude "add schema markup to every service page"' },
  { kind: "info", text: "Reading 14 files in /wp-content/themes/clinic…" },
  { kind: "ok", text: "JSON-LD added to 6 pages · validated" },
  { kind: "cmd", text: 'codex "speed up the hero image and fonts"' },
  { kind: "ok", text: "LCP 3.8s → 1.4s · fonts preloaded" },
  { kind: "cmd", text: "npm run build && npm run deploy" },
  { kind: "ok", text: "Live on Hostinger · Lighthouse SEO 100" },
  { kind: "info", text: "Reviewed line by line by Umair before shipping." },
];

export function AITerminal() {
  const [shown, setShown] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = box.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(script);
      return;
    }
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));

    const run = async () => {
      while (!cancelled) {
        setShown([]);
        for (const line of script) {
          if (cancelled) return;
          if (line.kind === "cmd") {
            for (let i = 1; i <= line.text.length; i++) {
              if (cancelled) return;
              setTyping(line.text.slice(0, i));
              await wait(28);
            }
            await wait(280);
            setTyping("");
          } else {
            await wait(line.kind === "info" ? 520 : 380);
          }
          setShown((s) => [...s, line]);
        }
        await wait(4200);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          run();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div ref={box} className="term notranslate" translate="no" role="img" aria-label="Example terminal session: Claude Code and Codex adding schema markup, speeding up a page and deploying it">
      <div className="term__bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>example session · ~/client-site</em>
      </div>
      <div className="term__body" aria-hidden="true">
        {/* Invisible copy of the whole session reserves the final height, so the page never jumps while it types. */}
        <div className="term__ghost">
          {script.map((l, i) => (
            <p key={i} className="term__line">
              <b>$</b> {l.text}
            </p>
          ))}
          <p className="term__line">
            <b>$</b>
          </p>
        </div>
        <div className="term__live">
        {shown.map((l, i) => (
          <p key={i} className={`term__line term__line--${l.kind}`}>
            {l.kind === "cmd" ? <b>$</b> : l.kind === "ok" ? <b>✓</b> : <b>●</b>} {l.text}
          </p>
        ))}
        {typing || shown.length < script.length ? (
          <p className="term__line term__line--cmd">
            <b>$</b> {typing}
            <i className="term__caret" />
          </p>
        ) : null}
        </div>
      </div>
    </div>
  );
}
