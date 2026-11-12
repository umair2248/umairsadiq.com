"use client";

import { useEffect } from "react";

/**
 * Sticky stacked cards: sets --cover (0 → 1) on each card in `#listId` as the
 * next card slides over it, so CSS can shrink and dim the card underneath.
 */
export function StackCover({ listId, item = ":scope > li" }: { listId: string; item?: string }) {
  useEffect(() => {
    const list = document.getElementById(listId);
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(list.querySelectorAll<HTMLElement>(item));
    let raf = 0;
    const update = () => {
      raf = 0;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const a = card.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        card.style.setProperty("--cover", Math.max(0, Math.min(1, (a.bottom - b.top) / a.height)).toFixed(3));
      });
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
      cancelAnimationFrame(raf);
    };
  }, [listId, item]);
  return null;
}
