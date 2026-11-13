"use client";

import { useEffect, useRef } from "react";
import { trustpilot } from "@/data/site";

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void };
  }
}

const SCRIPT = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
let loading: Promise<void> | null = null;

/** Loads Trustpilot's widget script once, only when a widget is about to be seen. */
function loadScript() {
  if (window.Trustpilot) return Promise.resolve();
  if (!loading) {
    loading = new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = SCRIPT;
      s.async = true;
      s.onload = () => resolve();
      document.head.appendChild(s);
    });
  }
  return loading;
}

const Star = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <rect width="24" height="24" rx="3" fill="#00b67a" />
    <path fill="#fff" d="M12 4.6l2.2 5.2 5.6.4-4.3 3.6 1.4 5.5L12 16.3l-4.9 3 1.4-5.5-4.3-3.6 5.6-.4z" />
  </svg>
);

/**
 * Trustpilot widget. With IDs set in site.ts it shows the official widget, loaded
 * lazily so it never slows the page; without them it shows a plain review link.
 */
export function TrustpilotWidget({ kind = "collector", className = "" }: { kind?: "collector" | "rating"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const templateId = kind === "rating" ? trustpilot.ratingTemplateId : trustpilot.collectorTemplateId;
  const live = Boolean(trustpilot.businessUnitId && templateId);

  useEffect(() => {
    const el = ref.current;
    if (!live || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        loadScript().then(() => window.Trustpilot?.loadFromElement(el, true));
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [live]);

  // The rating widget only makes sense once there are reviews to show.
  if (kind === "rating" && !live) return null;

  if (!live) {
    return (
      <a href={trustpilot.profileUrl} target="_blank" rel="noopener noreferrer" className={`tp-link ${className}`}>
        <Star /> <span className="tp-long">Worked with me? </span><strong>Review me on Trustpilot</strong>
      </a>
    );
  }

  return (
    <div
      ref={ref}
      className={`trustpilot-widget tp-widget ${className}`}
      data-locale="en-US"
      data-template-id={templateId}
      data-businessunit-id={trustpilot.businessUnitId}
      data-style-height={kind === "rating" ? "24px" : "52px"}
      data-style-width="100%"
      data-theme="dark"
    >
      <a href={trustpilot.profileUrl} target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}
