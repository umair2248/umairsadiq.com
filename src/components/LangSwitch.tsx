"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { languages } from "@/data/i18n";
import { Check } from "./Icons";

type Code = "en" | "ar" | "ur";

const Globe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className="lang__globe">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);

/** The language Google Translate is set to, from its `googtrans` cookie ("/en/ar"). */
function readCookie(): Code {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/(ar|ur)/);
  return (m?.[1] as Code) ?? "en";
}

function writeCookie(code: Code) {
  const host = location.hostname;
  const domains = ["", `; domain=${host}`, host.includes(".") ? `; domain=.${host.split(".").slice(-2).join(".")}` : ""];
  for (const d of domains) {
    document.cookie = code === "en" ? `googtrans=; path=/; max-age=0${d}` : `googtrans=/en/${code}; path=/; max-age=31536000; samesite=lax${d}`;
  }
}

let loading = false;
/** Loads Google's website translator once; it reads the cookie and translates the page in place. */
function loadTranslator() {
  if (loading) return;
  loading = true;
  const w = window as unknown as {
    googleTranslateInit?: () => void;
    google?: { translate: { TranslateElement: new (o: object, id: string) => unknown } };
  };
  w.googleTranslateInit = () => {
    if (w.google) new w.google.translate.TranslateElement({ pageLanguage: "en", includedLanguages: "ar,ur", autoDisplay: false }, "gt-el");
  };
  const fonts = document.createElement("link");
  fonts.rel = "stylesheet";
  fonts.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap";
  document.head.appendChild(fonts);
  const s = document.createElement("script");
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
  s.async = true;
  document.body.appendChild(s);
}

/**
 * Language picker: English (US/UK/AU), Arabic (UAE) and Urdu (Pakistan).
 * Picking Arabic or Urdu translates the whole site (every page, until you switch back).
 */
export function LangSwitch() {
  const id = useId();
  const path = usePathname() || "/";
  const localePage: Code | null = path.startsWith("/ar") ? "ar" : path.startsWith("/ur") ? "ur" : null;
  const [current, setCurrent] = useState<Code>(localePage ?? "en");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // English pages: translate if a language was picked earlier.
  useEffect(() => {
    if (localePage) {
      setCurrent(localePage);
      return;
    }
    const code = readCookie();
    setCurrent(code);
    if (code !== "en") {
      document.documentElement.classList.add("is-translating", `tr-${code}`);
      loadTranslator();
    }
  }, [localePage]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code: Code) => {
    setOpen(false);
    if (code === current) return;
    writeCookie(code);
    // The Arabic/Urdu overview pages are already in their language: go to the English site to translate it.
    if (localePage) location.href = "/";
    else location.reload();
  };

  const active = languages.find((l) => l.code === current)!;

  return (
    <div ref={box} className={`lang notranslate${open ? " is-open" : ""}`} translate="no">
      <button
        type="button"
        className="lang__btn"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-label={`Language: ${active.english}. Change language`}
        onClick={() => setOpen((v) => !v)}
      >
        <Globe />
        <span className="lang__code">{current.toUpperCase()}</span>
        <span className="lang__mini" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/flags/${active.flags[0]}.svg`} alt="" width={18} height={13} />
        </span>
      </button>

      <div id={`${id}-panel`} className="lang__panel" hidden={!open}>
        <p className="lang__title">Translate the whole site</p>
        <ul role="list">
          {languages.map((l, i) => (
            <li key={l.code} style={{ "--i": i } as React.CSSProperties}>
              <button
                type="button"
                lang={l.code}
                className={`lang__opt${l.code === current ? " is-active" : ""}`}
                aria-pressed={l.code === current}
                onClick={() => choose(l.code)}
              >
                <span className="lang__flags" aria-hidden="true">
                  {l.flags.map((f) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={f} src={`/flags/${f}.svg`} alt="" width={28} height={21} />
                  ))}
                </span>
                <span className="lang__names">
                  <strong>{l.native}</strong>
                  <small lang="en">
                    {l.english} · {l.regions}
                  </small>
                </span>
                {l.code === current ? <Check width={18} height={18} className="lang__check" /> : null}
              </button>
            </li>
          ))}
        </ul>
        <p className="lang__note" lang="en">
          Every page switches language at once. Arabic and Urdu use Google Translate.
        </p>
      </div>
      <div id="gt-el" hidden />
    </div>
  );
}
