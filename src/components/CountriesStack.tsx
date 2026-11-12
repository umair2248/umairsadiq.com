"use client";

import { useEffect, useRef, useState } from "react";
import { countries } from "@/data/home";
import { profile } from "@/data/site";

/** Minutes east of UTC for a time zone at a given moment (DST-aware). */
function offsetMinutes(tz: string, at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(at);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUtc - at.getTime()) / 60000);
}

const fmtHour = (h: number) => {
  const hh = ((Math.round(h) % 24) + 24) % 24;
  const suffix = hh < 12 ? "AM" : "PM";
  const twelve = hh % 12 === 0 ? 12 : hh % 12;
  return `${twelve} ${suffix}`;
};

type Info = {
  time: string;
  /** Umair's online window in the visitor's local hours, as 0-24 segments */
  segments: [number, number][];
  startLocal: number;
  endLocal: number;
  nowLocal: number;
  online: boolean;
};

function compute(tz: string): Info {
  const now = new Date();
  const home = offsetMinutes(profile.timeZone, now);
  const there = offsetMinutes(tz, now);
  const shift = (there - home) / 60; // hours to add to Pakistan time
  const norm = (h: number) => ((h % 24) + 24) % 24;
  const start = norm(profile.hours.start + shift);
  const length = (profile.hours.end - profile.hours.start + 24) % 24; // 17 hours
  const end = norm(start + length);
  const segments: [number, number][] = start < end ? [[start, end]] : [[start, 24], [0, end]];
  const nowLocal = norm(now.getUTCHours() + now.getUTCMinutes() / 60 + there / 60);
  const pkHour = norm(now.getUTCHours() + home / 60);
  const online = pkHour >= profile.hours.start || pkHour < profile.hours.end;
  const time = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(now);
  return { time, segments, startLocal: start, endLocal: end, nowLocal, online };
}

function DayBar({ info }: { info: Info | null }) {
  return (
    <div className="daybar" aria-hidden="true">
      <div className="daybar__track">
        <span className="daybar__work" />
        {info?.segments.map(([a, b]) => (
          <span key={a} className="daybar__on" style={{ left: `${(a / 24) * 100}%`, width: `${((b - a) / 24) * 100}%` }} />
        ))}
        {info ? <span className="daybar__now" style={{ left: `${(info.nowLocal / 24) * 100}%` }} /> : null}
      </div>
      <div className="daybar__ticks">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>12 AM</span>
      </div>
    </div>
  );
}

/**
 * One full-width card per country. Cards stick and stack as you scroll; the card
 * underneath shrinks and dims as the next one slides over it (--cover, 0 → 1).
 */
export function CountriesStack() {
  const [infos, setInfos] = useState<(Info | null)[]>(() => countries.map(() => null));
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const tick = () => setInfos(countries.map((c) => compute(c.tz)));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const cards = Array.from(list.current?.querySelectorAll<HTMLElement>(".country") ?? []);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const a = card.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        const cover = Math.max(0, Math.min(1, (a.bottom - b.top) / a.height));
        card.style.setProperty("--cover", cover.toFixed(3));
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
  }, []);

  return (
    <ol ref={list} className="countries-stack" role="list">
      {countries.map((c, i) => {
        const info = infos[i];
        return (
          <li key={c.code} className="country" style={{ "--i": i } as React.CSSProperties}>
            <div className="country__inner">
              <div className="country__flagwrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.flag} alt={`Flag of ${c.name}`} width={640} height={480} loading="lazy" className="country__flag" />
                <span className="country__num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="country__body">
                <p className="country__top">
                  <span className="country__code">{c.code}</span>
                  <span className={`country__live${info?.online ? " is-on" : ""}`}>
                    <i aria-hidden="true" />
                    {info ? (
                      <>
                        {info.time} in {c.city}
                      </>
                    ) : (
                      <>Local time in {c.city}</>
                    )}
                  </span>
                </p>
                <h3 className="country__name">{c.name}</h3>
                <p className="country__text">{c.text}</p>
                <div className="country__overlap">
                  <p>
                    <strong>
                      {info ? `${fmtHour(info.startLocal)} – ${fmtHour(info.endLocal)}` : `${profile.hours.label} PKT`}
                    </strong>
                    <span>{c.code === "PK" ? "My working hours" : "When I'm online, in your time"}</span>
                  </p>
                  <DayBar info={info} />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
