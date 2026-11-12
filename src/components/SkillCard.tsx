"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { cardStats, profile } from "@/data/site";
import { Rotate } from "./Icons";

/** A collectible-style "player card" that tilts toward the pointer and flips on click or Enter. */
export function SkillCard() {
  const wrap = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setLive(true), 300);
    return () => window.clearTimeout(id);
  }, []);

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = wrap.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 16).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 18).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };
  const reset = () => {
    const el = wrap.current!;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="skill-card-wrap" ref={wrap} onPointerMove={tilt} onPointerLeave={reset}>
      <button
        type="button"
        className={`skill-card${flipped ? " is-flipped" : ""}${live ? " is-live" : ""}`}
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
      >
        <span className="sr-only">{flipped ? "Skill card, back side. Press to flip to the front." : "Skill card, front side. Press to flip."}</span>
        <span className="skill-card__face skill-card__front">
          <span className="skill-card__shine" aria-hidden="true" />
          <span className="skill-card__top">
            <span className="skill-card__overall">
              <strong>{Math.round(cardStats.reduce((sum, s) => sum + s.value, 0) / cardStats.length)}</strong>
              <small>OVR</small>
            </span>
            <span className="skill-card__badge">Full stack</span>
          </span>
          <span className="skill-card__avatar" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="skill-card__name">{profile.name}</span>
          <span className="skill-card__role">Web · App · SEO</span>
          <span className="skill-card__stats">
            {cardStats.map((s) => (
              <span key={s.label} className="skill-card__stat">
                <span className="skill-card__stat-label">{s.label}</span>
                <span className="skill-card__meter" aria-hidden="true">
                  <span style={{ width: `${s.value}%` }} />
                </span>
                <span className="skill-card__stat-value">{s.value}</span>
              </span>
            ))}
          </span>
        </span>

        <span className="skill-card__face skill-card__back">
          <span className="skill-card__shine" aria-hidden="true" />
          <span className="skill-card__big">{profile.websitesBuilt}</span>
          <span className="skill-card__big-label">websites shipped</span>
          <span className="skill-card__list">
            <span>WordPress &amp; WooCommerce</span>
            <span>Next.js &amp; React.js</span>
            <span>PHP, MySQL &amp; APIs</span>
            <span>Flutter apps for Android &amp; iOS</span>
            <span>Technical &amp; on-page SEO</span>
          </span>
          <span className="skill-card__sig">— {profile.firstName}</span>
        </span>
      </button>
      <p className="skill-card__hint">
        <Rotate width={14} height={14} /> Tilt me, tap to flip
      </p>
    </div>
  );
}
