"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";
const EVENT = "themechange";

const current = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

/**
 * A pendant lamp hanging from the top of the screen. Click it (or press
 * Enter/Space) to switch themes: lamp off = dark mode, lamp on = white mode.
 *
 * The choice is saved in localStorage (read again before paint by the inline
 * script in layout.tsx). Where View Transitions are supported, the new theme
 * spreads out in a circle from the bulb.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [swing, setSwing] = useState(0);
  const btn = useRef<HTMLButtonElement>(null);
  const bulb = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setTheme(current());
    const sync = () => setTheme(current());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  const toggle = () => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    setSwing((n) => n + 1);
    const apply = () => {
      const root = document.documentElement;
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f3f1ea" : "#0b0b0e");
      flushSync(() => setTheme(next));
      window.dispatchEvent(new Event(EVENT));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      apply();
      return;
    }

    const rect = (bulb.current ?? btn.current!).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    // A short delay so the lamp starts swinging before the room changes.
    window.setTimeout(() => {
      const transition = document.startViewTransition(apply);
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 900, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
          );
        })
        .catch(() => {});
    }, 120);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      toggle();
    }
  };

  const on = theme === "light";
  const label = on ? "Turn the lamp off (switch to dark mode)" : "Turn the lamp on (switch to white mode)";

  return (
    <button
      ref={btn}
      type="button"
      className={`lamp${on ? " is-on" : ""} ${className}`}
      onClick={toggle}
      onKeyDown={onKeyDown}
      aria-label={label}
      aria-pressed={on}
      title={on ? "Turn the light off" : "Turn the light on"}
      data-cursor="hover"
    >
      <span key={swing} className={`lamp__swing${swing ? " is-swinging" : ""}`} aria-hidden="true">
        <span className="lamp__wire" />
        <svg className="lamp__body" viewBox="0 0 44 34" width="54" height="42">
          <defs>
            <linearGradient id="lamp-shade" x1="0" x2="1">
              <stop offset="0" stopColor="#2b2b33" />
              <stop offset="0.45" stopColor="#4a4a55" />
              <stop offset="1" stopColor="#1b1b21" />
            </linearGradient>
          </defs>
          <rect x="18.5" y="0" width="7" height="6" rx="1.5" fill="#3a3a44" />
          <path d="M3 28 C 5 13, 13 6, 22 6 C 31 6, 39 13, 41 28 Z" fill="url(#lamp-shade)" />
          <path className="lamp__rim" d="M3 28 L41 28" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M9 18 C 12 12, 16 10, 20 9.5" stroke="rgba(255,255,255,0.28)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>
        <span ref={bulb} className="lamp__bulb">
          <span className="lamp__filament" />
        </span>
        <span className="lamp__halo" />
        <span className="lamp__cone" />
      </span>
    </button>
  );
}
