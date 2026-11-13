"use client";

import { useEffect, useRef } from "react";
import { security } from "@/data/site";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<void> | null = null;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        loading = null;
        reject(new Error("turnstile"));
      };
      document.head.appendChild(s);
    });
  }
  return loading;
}

/** True when the Cloudflare Turnstile captcha is switched on (site key set in site.ts). */
export const captchaOn = Boolean(security.turnstileSiteKey);

/**
 * Cloudflare Turnstile captcha. Loads only when a form is shown, and for most people
 * passes on its own without a puzzle. Renders nothing until a site key is set.
 */
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    if (!captchaOn || !box.current) return;
    let id = "";
    let alive = true;
    loadTurnstile()
      .then(() => {
        if (!alive || !box.current || !window.turnstile) return;
        id = window.turnstile.render(box.current, {
          sitekey: security.turnstileSiteKey,
          theme: document.documentElement.dataset.theme === "light" ? "light" : "dark",
          size: "flexible",
          callback: (t: string) => cb.current(t),
          "expired-callback": () => cb.current(""),
          "error-callback": () => cb.current(""),
        });
      })
      .catch(() => {});
    return () => {
      alive = false;
      if (id) window.turnstile?.remove(id);
    };
  }, []);

  if (!captchaOn) return null;
  return <div ref={box} className="captcha" />;
}
