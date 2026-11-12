"use client";

import { useEffect, useState } from "react";

/** Cycles through words with a vertical slide. The full list is available to screen readers. */
export function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2000);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <span className="rotator">
      <span className="sr-only">{words.join(", ")}</span>
      <span className="rotator__track" aria-hidden="true">
        {words.map((w, n) => (
          <span key={w} className={`rotator__word${n === i ? " is-active" : ""}${n === (i - 1 + words.length) % words.length ? " is-leaving" : ""}`}>
            {w}
          </span>
        ))}
        {/* invisible sizer keeps the width of the longest word */}
        <span className="rotator__sizer">{words.reduce((a, b) => (b.length > a.length ? b : a))}</span>
      </span>
    </span>
  );
}
