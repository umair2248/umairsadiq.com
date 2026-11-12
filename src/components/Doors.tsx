"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { doors } from "@/data/site";
import { ArrowLeft, ArrowRight } from "./Icons";

/**
 * A hallway with one door per discipline.
 *
 * Large screens: the section pins to the viewport and vertical scrolling moves
 * the hallway sideways. Small screens: the hallway is swiped sideways.
 * In both cases each door swings open as it reaches the middle of the screen
 * (`--open`, 0 → 1). Hover, tap or Enter opens a door fully at any time.
 */
export function Doors() {
  // Doors the visitor opened or closed by hand; the rest follow the scroll.
  const [manual, setManual] = useState<Record<number, boolean>>({});
  const [pinned, setPinned] = useState(false);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const distance = useRef(0);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  useEffect(() => {
    const sec = section.current!;
    const tr = track.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Pinned on every screen that is tall enough, phones included.
    const mq = window.matchMedia("(min-height: 520px)");
    const doorEls = Array.from(tr.querySelectorAll<HTMLElement>(".door"));
    let raf = 0;
    let isPinned = false;
    let lastW = 0;
    let lastH = 0;

    /**
     * A door opens as it slides in from the right and stays open once it has
     * passed, so the hallway behind you is all open doors. Scrolling back moves
     * doors to the right again, which closes them in reverse. With the hallway
     * at its start, the first three doors are already open.
     */
    const updateDoors = () => {
      const vw = window.innerWidth;
      for (const el of doorEls) {
        if (reduce) {
          el.style.setProperty("--open", "1");
          continue;
        }
        const r = el.getBoundingClientRect();
        const center = r.left + r.width / 2;
        const o = Math.max(0, Math.min(1, (vw * 0.95 - center) / (vw * 0.23)));
        el.style.setProperty("--open", o.toFixed(3));
      }
    };

    const layout = () => {
      isPinned = mq.matches && !reduce;
      setPinned(isPinned);
      tr.style.transform = "";
      sec.style.height = "";
      if (!isPinned) return;
      // Measure how far the hallway must travel, then make the section tall enough to scroll that far.
      distance.current = Math.max(0, tr.scrollWidth - window.innerWidth);
      // svh stays the same when the mobile address bar shows or hides, so the page doesn't jump.
      sec.style.height = `calc(100svh + ${distance.current}px)`;
    };

    const update = () => {
      raf = 0;
      if (isPinned) {
        const top = sec.getBoundingClientRect().top;
        const p = Math.max(0, Math.min(1, -top / Math.max(1, distance.current)));
        tr.style.transform = `translate3d(${(-p * distance.current).toFixed(1)}px,0,0)`;
        sec.style.setProperty("--p", p.toFixed(4));
      }
      updateDoors();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      // Phones fire resize when the address bar slides in or out. Only the width matters here.
      const w = window.innerWidth;
      const h = window.innerHeight;
      const onlyToolbar = isPinned && w === lastW && Math.abs(h - lastH) < 160;
      lastW = w;
      lastH = h;
      if (!onlyToolbar) layout();
      update();
    };

    // Wait a frame so fonts and layout have settled before measuring.
    requestAnimationFrame(onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    tr.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    mq.addEventListener("change", onResize);
    document.fonts?.ready.then(onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      tr.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const card = track.current!.querySelector<HTMLElement>(".door");
    const amount = dir * ((card?.offsetWidth ?? 320) + 28);
    // When pinned, one pixel of vertical scroll moves the hallway one pixel sideways.
    if (pinned) window.scrollBy({ top: amount, behavior: "smooth" });
    else track.current!.scrollBy({ left: amount, behavior: "smooth" });
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (pinned || e.pointerType !== "mouse") return;
    drag.current = { down: true, x: e.clientX, left: track.current!.scrollLeft, moved: false };
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) {
      d.moved = true;
      track.current!.classList.add("is-dragging");
    }
    track.current!.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    drag.current.down = false;
    track.current?.classList.remove("is-dragging");
  };

  return (
    <section
      ref={section}
      id="doors"
      className={`doors${pinned ? " is-pinned" : " section"}`}
      aria-labelledby="doors-title"
    >
      <div className="doors__sticky">
        <div className="container doors__head">
          <div>
            <p className="eyebrow">01 — What I do</p>
            <h2 id="doors-title" className="section-title">
              What I bring <span className="muted">to your team or project.</span>
            </h2>
          </div>
          <div className="doors__aside">
            <p>
              {pinned
                ? "Keep scrolling: each door swings open as it walks in and stays open behind you. Scroll back up to close them."
                : "Swipe along the hallway: each door swings open as it arrives. Tap a door to open or close it."}
            </p>
            <div className="doors__nav">
              <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous door">
                <ArrowLeft />
              </button>
              <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next door">
                <ArrowRight />
              </button>
              <span className="doors__meter" aria-hidden="true">
                <span />
              </span>
            </div>
          </div>
        </div>

        <div
          ref={track}
          className="doors__track"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          onClickCapture={(e) => {
            if (drag.current.moved) {
              e.preventDefault();
              e.stopPropagation();
              drag.current.moved = false;
            }
          }}
        >
          {doors.map((door, i) => {
            const forced = manual[i];
            const isOpen = forced ?? false;
            const id = `door-room-${i}`;
            return (
              <article
                key={door.title}
                className="door"
                data-open={forced === undefined ? undefined : String(forced)}
                style={{ "--door": door.color, "--i": i } as React.CSSProperties}
              >
                <div className="door__frame">
                  <div className="door__room" id={id}>
                    <p className="door__room-kicker">Room {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="door__room-title">{door.title}</h3>
                    <p className="door__room-text">{door.description}</p>
                    <ul className="door__tools notranslate" translate="no" role="list">
                      {door.tools.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <p className="door__deliver">
                      <span>What you get</span> {door.deliver.join(" · ")}
                    </p>
                    <a href={door.href} className="door__more">
                      Explore {door.title} <ArrowRight width={14} height={14} />
                    </a>
                  </div>

                  <button
                    type="button"
                    className="door__panel"
                    aria-expanded={forced ?? undefined}
                    aria-controls={id}
                    onClick={(e) => {
                      const door = e.currentTarget.closest<HTMLElement>(".door");
                      const looksOpen = forced ?? Number(door?.style.getPropertyValue("--open") || 0) > 0.5;
                      setManual((m) => ({ ...m, [i]: !looksOpen }));
                    }}
                  >
                    <span className="door__number">{String(i + 1).padStart(2, "0")}</span>
                    <span className="door__inset" aria-hidden="true" />
                    <span className="door__inset door__inset--low" aria-hidden="true" />
                    <span className="door__knob" aria-hidden="true" />
                    <span className="door__label">
                      <span className="door__title">{door.title}</span>
                      <span className="door__short">{door.short}</span>
                    </span>
                    <span className="sr-only">{isOpen ? "Close door" : "Open or close door"}</span>
                  </button>
                  <span className="door__light" aria-hidden="true" />
                </div>
              </article>
            );
          })}
          <div className="doors__end" aria-hidden="true">
            <span>Your project</span>
            <span>could be next door.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
