"use client";

import { useEffect } from "react";

/**
 * Pointer-driven hero effects: a spotlight that follows the mouse across the
 * grid, and floating logos that drift with depth (parallax).
 * Sets --mx / --my (px) and --px / --py (-1 → 1) on the hero.
 */
export function HeroFX() {
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0, mx = 0, my = 0;
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      tx = (mx / r.width) * 2 - 1;
      ty = (my / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      hero.style.setProperty("--mx", `${mx.toFixed(0)}px`);
      hero.style.setProperty("--my", `${my.toFixed(0)}px`);
      hero.style.setProperty("--px", cx.toFixed(3));
      hero.style.setProperty("--py", cy.toFixed(3));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(loop) : 0;
    };
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.classList.add("has-spot");
    return () => {
      hero.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
