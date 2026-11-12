"use client";

import { useEffect, useState } from "react";

/**
 * Cookie banner wired to Google Consent Mode v2. The default state (everything
 * denied except strictly necessary storage) is set before Google Tag Manager
 * loads, in layout.tsx; this banner sends the visitor's choice as a consent
 * update and remembers it. "Cookie settings" links anywhere on the site reopen
 * it via the `cookies:open` event.
 */
export const CONSENT_KEY = "cookie-consent-v1";
export const OPEN_EVENT = "cookies:open";

type Choice = { analytics: boolean; marketing: boolean };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** window.gtag is defined in layout.tsx before Google Tag Manager loads. */
function applyConsent(c: Choice) {
  window.gtag?.("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "consent_update", consent_analytics: c.analytics, consent_marketing: c.marketing });
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [choice, setChoice] = useState<Choice>({ analytics: true, marketing: false });

  useEffect(() => {
    let saved: Choice | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
    } catch {}
    if (saved) setChoice(saved);
    // First visit: ask after the page (and the home page curtain) has settled.
    else window.setTimeout(() => setOpen(true), 2200);
    const reopen = () => {
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("cookies-open", open);
  }, [open]);

  const save = (c: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
    } catch {}
    setChoice(c);
    applyConsent(c);
    setOpen(false);
    setDetails(false);
  };

  if (!open) return null;
  return (
    <section className="cookies" role="dialog" aria-modal="false" aria-labelledby="cookies-title">
      <div className="cookies__top">
        <span className="cookies__icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-5-5z" />
            <circle cx="8.5" cy="11.5" r="1" fill="currentColor" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
            <circle cx="15.5" cy="13" r="1" fill="currentColor" />
          </svg>
        </span>
        <div>
          <h2 id="cookies-title" className="cookies__title">
            Cookies, but only with your say-so
          </h2>
          <p className="cookies__text">
            I use Google Analytics to see which pages help visitors. Nothing is tracked until you allow it.{" "}
            <a href="/privacy-policy/">Privacy policy</a>
          </p>
        </div>
      </div>

      {details ? (
        <ul className="cookies__options" role="list">
          <li>
            <span>
              <strong>Necessary</strong>
              <small>Theme choice and this cookie setting. Always on.</small>
            </span>
            <span className="cookies__switch is-locked" aria-label="Always on">
              <input type="checkbox" checked disabled aria-label="Necessary storage, always on" />
              <i aria-hidden="true" />
            </span>
          </li>
          <li>
            <label htmlFor="ck-analytics">
              <strong>Analytics</strong>
              <small>Google Analytics 4: anonymous visit and page statistics.</small>
            </label>
            <span className="cookies__switch">
              <input
                id="ck-analytics"
                type="checkbox"
                checked={choice.analytics}
                onChange={(e) => setChoice((c) => ({ ...c, analytics: e.target.checked }))}
              />
              <i aria-hidden="true" />
            </span>
          </li>
          <li>
            <label htmlFor="ck-marketing">
              <strong>Marketing</strong>
              <small>Ad measurement, if ads are ever run. Currently not used.</small>
            </label>
            <span className="cookies__switch">
              <input
                id="ck-marketing"
                type="checkbox"
                checked={choice.marketing}
                onChange={(e) => setChoice((c) => ({ ...c, marketing: e.target.checked }))}
              />
              <i aria-hidden="true" />
            </span>
          </li>
        </ul>
      ) : null}

      <div className="cookies__actions">
        <button type="button" className="btn btn--accent btn--sm" onClick={() => save({ analytics: true, marketing: true })}>
          Accept all
        </button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => save({ analytics: false, marketing: false })}>
          Reject all
        </button>
        {details ? (
          <button type="button" className="cookies__link" onClick={() => save(choice)}>
            Save my choice
          </button>
        ) : (
          <button type="button" className="cookies__link" onClick={() => setDetails(true)}>
            Customize
          </button>
        )}
      </div>
    </section>
  );
}

/** A link-style button that reopens the cookie settings. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
