"use client";

import { useEffect, useId, useRef, useState } from "react";
import { contact, hireSteps, isPlaceholder } from "@/data/site";
import { HIRE_EVENT } from "./HireButton";
import { prefetchFormToken, sendLead } from "@/lib/sendLead";
import { captchaOn, Turnstile } from "./Turnstile";
import { ArrowLeft, ArrowRight, Check, Close, Mail, WhatsApp } from "./Icons";

type Answers = {
  needs: string[];
  stage: string;
  currency: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  details: string;
  trap: string;
};

const EMPTY: Answers = {
  needs: [],
  stage: "",
  currency: hireSteps.currencies[0].code,
  budget: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  details: "",
  trap: "",
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOTAL = 5;

function Option({ label, selected, onClick, multi }: { label: string; selected: boolean; onClick: () => void; multi?: boolean }) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      className={`chip${selected ? " is-selected" : ""}`}
      onClick={onClick}
    >
      <span className="chip__box" aria-hidden="true">
        {selected ? <Check width={14} height={14} /> : null}
      </span>
      {label}
    </button>
  );
}

const QUESTIONS = [
  "What can I build for you?",
  "Where is the project today?",
  "What budget do you have in mind?",
  "When do you need it?",
  "How can I reach you?",
];

function compose(a: Answers) {
  const symbol = hireSteps.currencies.find((c) => c.code === a.currency)?.symbol ?? "";
  const budget = a.budget === "Not sure yet" ? a.budget : `${symbol}${a.budget} ${a.currency}`;
  const subject = `Project enquiry: ${a.needs.join(", ")}`;
  const body = [
    `Hi Umair,`,
    ``,
    a.details.trim(),
    ``,
    `— Project summary —`,
    `Looking for: ${a.needs.join(", ")}`,
    `Stage: ${a.stage}`,
    `Budget: ${budget}`,
    `Timeline: ${a.timeline}`,
    ``,
    `Name: ${a.name.trim()}`,
    `Email: ${a.email.trim()}`,
  ].join("\n");
  return { subject, body };
}

/**
 * Five-question "Hire me" dialog built on the native <dialog> element (focus
 * trapping and Escape come for free). The last step sends the answers straight
 * to hello@umairsadiq.com through /api/contact.php.
 */
export function HireModal() {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(EMPTY);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const openedAt = useRef(0);
  const [captcha, setCaptcha] = useState("");

  useEffect(() => {
    const open = () => {
      openedAt.current = Date.now();
      prefetchFormToken();
      dialog.current?.showModal();
      document.documentElement.classList.add("modal-open");
    };
    window.addEventListener(HIRE_EVENT, open);
    return () => window.removeEventListener(HIRE_EVENT, open);
  }, []);

  const close = () => dialog.current?.close();
  const onClose = () => {
    document.documentElement.classList.remove("modal-open");
    if (done) {
      setDone(false);
      setStep(0);
      setA(EMPTY);
    }
  };

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setA((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const validate = (): string => {
    if (step === 0 && a.needs.length === 0) return "Pick at least one option.";
    if (step === 1 && !a.stage) return "Pick the option that fits best.";
    if (step === 2 && !a.budget) return "Pick a budget range, or “Not sure yet”.";
    if (step === 3 && !a.timeline) return "Pick a timeline.";
    if (step === 4) {
      if (a.name.trim().length < 2) return "Please enter your name.";
      if (!EMAIL_RE.test(a.email.trim())) return "Please enter a valid email address.";
      if (a.details.trim().length < 10) return "Tell me a little about the project (a sentence is fine).";
    }
    return "";
  };

  const next = async () => {
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    if (step < TOTAL - 1) {
      setStep(step + 1);
      return;
    }
    if (sending) return;
    if (captchaOn && !captcha) {
      setError("Please complete the security check above the button.");
      return;
    }
    setSending(true);
    const sym = hireSteps.currencies.find((c) => c.code === a.currency)?.symbol ?? "";
    const res = await sendLead({
      source: "hire-modal",
      name: a.name.trim(),
      email: a.email.trim(),
      phone: a.phone.trim(),
      message: a.details.trim(),
      fields: {
        "Looking for": a.needs.join(", "),
        Stage: a.stage,
        Budget: a.budget === "Not sure yet" ? a.budget : `${sym}${a.budget} ${a.currency}`,
        Timeline: a.timeline,
      },
      website_url: a.trap,
      elapsed: Date.now() - openedAt.current,
      turnstile: captcha,
    });
    setSending(false);
    if (res.ok) setDone(true);
    else setError(res.error);
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  };

  const { subject, body } = compose(a);
  const whatsapp = `${contact.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`;
  const hasWhatsApp = !isPlaceholder(contact.whatsapp);

  const symbol = hireSteps.currencies.find((c) => c.code === a.currency)?.symbol ?? "";

  return (
    <dialog ref={dialog} className="hire" aria-labelledby={`${id}-title`} onClose={onClose}>
      <div className="hire__panel">
        <header className="hire__head">
          <p className="eyebrow">Hire me</p>
          <button type="button" className="icon-btn" onClick={close} aria-label="Close">
            <Close />
          </button>
        </header>

        {done ? (
          <div className="hire__done" role="status">
            <span className="hire__done-icon">
              <Check width={28} height={28} />
            </span>
            <h2 id={`${id}-title`}>Message sent. Thank you{a.name ? `, ${a.name.trim().split(" ")[0]}` : ""}!</h2>
            <p>
              Your project details are in my inbox. I&rsquo;ll reply to <strong>{a.email}</strong> within 24 hours with a plan,
              a timeline and a fixed quote.
            </p>
            <div className="hire__done-actions">
              {hasWhatsApp ? (
                <a className="btn btn--accent" href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsApp width={18} height={18} /> Need it faster? WhatsApp me
                </a>
              ) : null}
              <button type="button" className="btn btn--ghost" onClick={close}>
                Close
              </button>
            </div>
            <p className="hire__fine">
              Forgot something? Email <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
        ) : (
          <>
            <div className="hire__progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${(step + 1) / TOTAL})` }} />
            </div>
            <p className="hire__count">
              {step + 1} <span>of {TOTAL}</span>
            </p>
            <h2 id={`${id}-title`} className="hire__question" key={step}>
              {QUESTIONS[step]}
            </h2>

            <div className="hire__body" key={`b${step}`}>
              {step === 0 ? (
                <div className="chips" role="group" aria-label={QUESTIONS[0]}>
                  {hireSteps.needs.map((n) => (
                    <Option
                      key={n}
                      multi
                      label={n}
                      selected={a.needs.includes(n)}
                      onClick={() => set("needs", a.needs.includes(n) ? a.needs.filter((x) => x !== n) : [...a.needs, n])}
                    />
                  ))}
                </div>
              ) : null}

              {step === 1 ? (
                <div className="chips" role="radiogroup" aria-label={QUESTIONS[1]}>
                  {hireSteps.stage.map((s) => (
                    <Option key={s} label={s} selected={a.stage === s} onClick={() => set("stage", s)} />
                  ))}
                </div>
              ) : null}

              {step === 2 ? (
                <>
                  <div className="currency" role="radiogroup" aria-label="Currency">
                    {hireSteps.currencies.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        role="radio"
                        aria-checked={a.currency === c.code}
                        className={a.currency === c.code ? "is-selected" : undefined}
                        onClick={() => set("currency", c.code)}
                      >
                        {c.symbol} {c.code}
                      </button>
                    ))}
                  </div>
                  <div className="chips" role="radiogroup" aria-label={QUESTIONS[2]}>
                    {hireSteps.budgets.map((b) => (
                      <Option
                        key={b}
                        label={b === "Not sure yet" ? b : `${symbol}${b}`}
                        selected={a.budget === b}
                        onClick={() => set("budget", b)}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {step === 3 ? (
                <div className="chips" role="radiogroup" aria-label={QUESTIONS[3]}>
                  {hireSteps.timelines.map((t) => (
                    <Option key={t} label={t} selected={a.timeline === t} onClick={() => set("timeline", t)} />
                  ))}
                </div>
              ) : null}

              {step === 4 ? (
                <div className="hire__fields">
                  <div className="field">
                    <label htmlFor={`${id}-name`}>Your name</label>
                    <input id={`${id}-name`} autoComplete="name" value={a.name} onChange={(e) => set("name", e.target.value)} />
                  </div>
                  <div className="field">
                    <label htmlFor={`${id}-email`}>Email</label>
                    <input
                      id={`${id}-email`}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={a.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </div>
                  <div className="field field--full">
                    <label htmlFor={`${id}-phone`}>WhatsApp / phone (optional)</label>
                    <input
                      id={`${id}-phone`}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 555 123 4567"
                      value={a.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </div>
                  <div className="quote__trap" aria-hidden="true">
                    <label htmlFor={`${id}-trap`}>Website URL</label>
                    <input id={`${id}-trap`} tabIndex={-1} autoComplete="off" value={a.trap} onChange={(e) => set("trap", e.target.value)} />
                  </div>
                  <div className="field field--full">
                    <label htmlFor={`${id}-details`}>About the project</label>
                    <textarea
                      id={`${id}-details`}
                      rows={4}
                      placeholder="What's the business, and what should the site or app do?"
                      value={a.details}
                      onChange={(e) => set("details", e.target.value)}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {step === TOTAL - 1 && !done ? <Turnstile onToken={setCaptcha} /> : null}
            <p className="hire__error" role="alert">
              {error}
            </p>

            <footer className="hire__foot">
              {step > 0 ? (
                <button type="button" className="btn btn--ghost" onClick={back}>
                  <ArrowLeft width={18} height={18} /> Back
                </button>
              ) : (
                <a className="hire__alt" href={`mailto:${contact.email}`}>
                  Rather just email? {contact.email}
                </a>
              )}
              <button type="button" className="btn btn--accent" onClick={next} disabled={sending}>
                {step === TOTAL - 1 ? (
                  sending ? (
                    "Sending…"
                  ) : (
                    <>
                      <Mail width={18} height={18} /> Send message
                    </>
                  )
                ) : (
                  <>
                    Next <ArrowRight width={18} height={18} />
                  </>
                )}
              </button>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}
