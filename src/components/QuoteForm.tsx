"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { contact } from "@/data/site";
import { sendLead } from "@/lib/sendLead";
import { ArrowRight, Check, WhatsApp } from "./Icons";

import { quoteEn, wordpressTypes, type Choice, type QuoteText } from "@/data/quote";

export type { Choice, QuoteText };

/** Quote request form. Sends straight to Umair's inbox through /api/contact.php. */
export function QuoteForm({
  title = "Get a quote in 24 hours",
  source = "quote-hero",
  types = wordpressTypes,
  t = quoteEn,
}: {
  title?: string;
  source?: "quote-hero" | "quote-footer";
  types?: Choice[];
  t?: QuoteText;
}) {
  const id = useId();
  const started = useRef(0);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const notSure = t.budgets[t.budgets.length - 1].value;

  const onFocus = () => {
    if (!started.current) started.current = Date.now();
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity() || state === "sending") return;
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    setState("sending");
    setError("");
    const res = await sendLead({
      source,
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      message: get("details"),
      fields: {
        Project: get("type"),
        "Budget (USD)": get("budget"),
        "Current website": get("site"),
        Language: { ar: "Arabic", ur: "Urdu" }[form.closest("[lang]")?.getAttribute("lang") ?? ""] ?? "English",
      },
      website_url: get("website_url"),
      elapsed: started.current ? Date.now() - started.current : 0,
    });
    if (res.ok) {
      setFirstName(get("name").split(" ")[0]);
      setState("sent");
      form.reset();
    } else {
      setState("idle");
      setError(res.error);
    }
  };

  if (state === "sent") {
    return (
      <div className="quote quote--done" role="status">
        <span className="quote__done-icon">
          <Check width={26} height={26} />
        </span>
        <p className="quote__title">{t.thanks.replace("{first}", firstName ? `${t.sep}${firstName}` : "")}</p>
        <p className="quote__sub">{t.thanksText}</p>
        <div className="quote__actions">
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            <WhatsApp width={17} height={17} /> {t.whatsappDone}
          </a>
          <button type="button" className="btn btn--ghost" onClick={() => setState("idle")}>
            {t.again}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="quote" onSubmit={submit} onFocusCapture={onFocus} aria-labelledby={`${id}-title`}>
      <p id={`${id}-title`} className="quote__title">
        {title}
      </p>
      <p className="quote__sub">{t.sub}</p>

      <div className="quote__grid">
        <label className="quote__field">
          <span>{t.name}</span>
          <input name="name" autoComplete="name" required minLength={2} maxLength={80} />
        </label>
        <label className="quote__field">
          <span>{t.email}</span>
          <input name="email" type="email" autoComplete="email" required maxLength={120} dir="ltr" />
        </label>
        <label className="quote__field">
          <span>{t.type}</span>
          <select name="type" defaultValue={types[0].value}>
            {types.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label ?? o.value}
              </option>
            ))}
          </select>
        </label>
        <label className="quote__field">
          <span>{t.budget}</span>
          <select name="budget" defaultValue={notSure}>
            {t.budgets.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label ?? o.value}
              </option>
            ))}
          </select>
        </label>
        <label className="quote__field">
          <span>{t.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+1 555 123 4567" dir="ltr" />
        </label>
        <label className="quote__field">
          <span>{t.site}</span>
          <input name="site" type="text" inputMode="url" placeholder="example.com" maxLength={200} dir="ltr" />
        </label>
        <label className="quote__field quote__field--full">
          <span>{t.details}</span>
          <textarea name="details" rows={3} required minLength={10} maxLength={4000} placeholder={t.detailsPlaceholder} />
        </label>
        {/* Spam trap: hidden from people, bots fill it in. */}
        <label className="quote__trap" aria-hidden="true">
          Website URL
          <input name="website_url" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="quote__error" role="alert">
        {error}
      </p>

      <div className="quote__actions">
        <button type="submit" className="btn btn--accent" disabled={state === "sending"}>
          {state === "sending" ? (
            t.sending
          ) : (
            <>
              {t.send} <ArrowRight width={16} height={16} className="flip-rtl" />
            </>
          )}
        </button>
        <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
          <WhatsApp width={17} height={17} /> {t.whatsapp}
        </a>
      </div>
      <p className="quote__note">{t.note}</p>
    </form>
  );
}
