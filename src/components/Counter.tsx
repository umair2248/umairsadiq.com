"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up from 0 when scrolled into view. Values without a number (e.g. "SEO") render as-is. */
export function Counter({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already on screen
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          setN(Math.round((1 - Math.pow(1 - t, 4)) * target));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
