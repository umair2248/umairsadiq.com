"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/site";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Theatre-curtain intro. The name sits across both curtain halves, counts up,
 * then the curtains part and the name splits with them. Click to skip.
 * Skipped entirely for reduced motion.
 */
export function Loader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"count" | "open" | "gone">("count");

  useEffect(() => {
    if (reducedMotion()) {
      document.documentElement.classList.add("intro-done");
      setPhase("gone");
      return;
    }
    document.documentElement.classList.add("curtain-lock");
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    let t1 = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(step);
      else t1 = window.setTimeout(() => setPhase((p) => (p === "count" ? "open" : p)), 250);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
    };
  }, []);

  useEffect(() => {
    if (phase !== "open") return;
    const html = document.documentElement;
    html.classList.add("intro-done");
    html.classList.remove("curtain-lock");
    const id = window.setTimeout(() => setPhase("gone"), 1500);
    return () => window.clearTimeout(id);
  }, [phase]);

  if (phase === "gone") return null;

  const letters = profile.name.split("");
  const stage = (
    <div className="curtain__stage">
      <p className="curtain__kicker">Portfolio · {new Date().getFullYear()}</p>
      <p className="curtain__name">
        {letters.map((ch, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </p>
      <p className="curtain__role">Websites that rank · Apps that ship</p>
      <div className="curtain__foot">
        <span>Raising the curtain</span>
        <span className="curtain__count">{String(count).padStart(3, "0")}</span>
      </div>
      <span className="curtain__bar" style={{ transform: `scaleX(${count / 100})` }} />
    </div>
  );

  return (
    <div
      className={`curtain${phase === "open" ? " is-open" : ""}`}
      aria-hidden="true"
      onClick={() => setPhase((p) => (p === "count" ? "open" : p))}
    >
      <div className="curtain__valance" />
      <div className="curtain__half curtain__half--l">{stage}</div>
      <div className="curtain__half curtain__half--r">{stage}</div>
    </div>
  );
}

/** Dot + ring cursor for mouse users. The native cursor stays visible. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || reducedMotion()) return;
    const d = dot.current!;
    const r = ring.current!;
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      d.style.transform = `translate(${x}px, ${y}px)`;
      const target = e.target as HTMLElement | null;
      const hover = !!target?.closest("a, button, [data-cursor='hover'], input, select, textarea, label");
      r.classList.toggle("is-hover", hover);
      document.documentElement.classList.add("has-cursor");
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const leave = () => document.documentElement.classList.remove("has-cursor");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

/** Thin progress bar at the top of the page. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current!.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return <div ref={bar} className="scroll-progress" aria-hidden="true" />;
}

/**
 * Fades `.reveal` elements up as they scroll into view. Content stays visible
 * without JavaScript or with reduced motion, because the hidden state only
 * applies once `reveal-ready` is set on <html>.
 */
export function RevealObserver() {
  useEffect(() => {
    if (reducedMotion() || !("IntersectionObserver" in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      else io.observe(el);
    }
    document.documentElement.classList.add("reveal-ready");
    return () => io.disconnect();
  }, []);
  return null;
}

/** Inner pages have no curtain intro: mark the intro as finished straight away. */
export function IntroDone() {
  useEffect(() => {
    document.documentElement.classList.add("intro-done");
  }, []);
  return null;
}
