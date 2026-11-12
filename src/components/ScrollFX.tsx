"use client";

import { useEffect } from "react";

const clamp = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * Tiny scroll engine. Every element with `data-scroll="<mode>"` gets a CSS
 * variable `--p` from 0 to 1 that tracks its position in the viewport, and
 * the stylesheet turns that number into motion. Modes:
 *
 *  - exit:    0 while the element's top is at the viewport top, 1 once it has scrolled out
 *  - enter:   0 when its top reaches the bottom of the screen, 1 when its top is 30% from the top
 *  - through: 0 when it appears at the bottom, 1 when it leaves at the top
 *  - read:    0 when its top is at 85% of the screen, 1 when its bottom is at 50% (good for text)
 *
 * It also drives the marquee from scroll velocity. With reduced motion,
 * everything is set to its finished state and nothing moves.
 */
export function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      els.forEach((el) => el.style.setProperty("--p", el.dataset.scroll === "exit" ? "0" : "1"));
      return;
    }

    const progress = (el: HTMLElement, vh: number) => {
      const r = el.getBoundingClientRect();
      switch (el.dataset.scroll) {
        case "exit":
          return -r.top / Math.max(1, r.height * 0.8);
        case "enter":
          return (vh - r.top) / (vh * 0.7);
        case "through":
          return (vh - r.top) / (vh + r.height);
        case "read":
        default:
          return (vh * 0.85 - r.top) / (vh * 0.35 + r.height);
      }
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) el.style.setProperty("--p", clamp(progress(el, vh)).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Marquee: drifts on its own, speeds up with scroll velocity and follows scroll direction.
    const track = document.querySelector<HTMLElement>(".marquee__track");
    let loop = 0;
    if (track) {
      root.classList.add("marquee-js");
      let x = 0;
      let dir = -1;
      let lastY = window.scrollY;
      let boost = 0;
      const tick = () => {
        const y = window.scrollY;
        const dy = y - lastY;
        lastY = y;
        if (dy !== 0) dir = dy > 0 ? -1 : 1;
        boost = boost * 0.9 + Math.abs(dy) * 0.12;
        x += dir * (0.6 + boost);
        const half = track.scrollWidth / 2;
        if (half > 0) {
          if (x <= -half) x += half;
          if (x > 0) x -= half;
        }
        track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
        loop = requestAnimationFrame(tick);
      };
      loop = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loop);
    };
  }, []);

  return null;
}
