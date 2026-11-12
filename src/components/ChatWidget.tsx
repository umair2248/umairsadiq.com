"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { contact, profile } from "@/data/site";
import { answer } from "@/lib/assistant";
import { ArrowRight, Close, WhatsApp } from "./Icons";

type Msg = { role: "user" | "assistant"; content: string; chips?: string[] };

const STORE = "chat-v2";
const suggestions = [
  "What services do you offer?",
  "Show me your SEO results",
  "How much does a website cost?",
  "How can I hire Umair?",
];
const greeting: Msg = {
  role: "assistant",
  content: `Hi! 👋 I'm ${profile.firstName}'s assistant. Ask me about his services, projects, SEO results or how to work with him. English ya Roman Urdu, dono chalega.`,
};

/** Turns the bot's light markdown (links, **bold**, bullets) into safe React nodes. No raw HTML. */
function renderInline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|tel:[^\s)]+|\/[^\s)]*)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s)]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${i++}`;
    if (m[1] && m[2]) {
      const external = /^https?:/.test(m[2]) && !m[2].startsWith(profile.siteUrl);
      out.push(
        <a key={k} href={m[2]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {m[1]}
        </a>,
      );
    } else if (m[3]) {
      out.push(<strong key={k}>{m[3]}</strong>);
    } else if (m[4]) {
      out.push(
        <a key={k} href={m[4]} target="_blank" rel="noopener noreferrer">
          {m[4].replace(/^https?:\/\/(www\.)?/, "")}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Markdown({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <>
      {blocks.map((b, bi) => {
        const lines = b.split("\n").filter(Boolean);
        if (lines.length && lines.every((l) => /^\s*([-*•]|\d+\.)\s+/.test(l))) {
          return (
            <ul key={bi}>
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.replace(/^\s*([-*•]|\d+\.)\s+/, ""), `${bi}-${li}`)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <span key={li}>
                {li > 0 ? <br /> : null}
                {renderInline(l.replace(/^#+\s*/, ""), `${bi}-${li}`)}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);

  // Keep the conversation for this browser tab only.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORE) ?? "null");
      if (Array.isArray(saved) && saved.length) setMsgs(saved);
    } catch {}
    const openChat = () => setOpen(true);
    window.addEventListener("chat:open", openChat);
    return () => window.removeEventListener("chat:open", openChat);
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(msgs.slice(-30)));
    } catch {}
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);
  useEffect(() => {
    document.documentElement.classList.toggle("chat-open", open);
    if (open) window.setTimeout(() => field.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Answers come from src/lib/assistant.ts, in the browser: free, instant, nothing sent anywhere.
  const send = (text: string) => {
    const content = text.trim().slice(0, 1500);
    if (!content || busy) return;
    setMsgs((m) => [...m, { role: "user", content }]);
    setInput("");
    setError("");
    setBusy(true);
    const reply = answer(content);
    // A short "typing" pause so the reply feels natural.
    window.setTimeout(() => {
      setMsgs((m) => [...m, { role: "assistant", content: reply.text, chips: reply.chips }]);
      setBusy(false);
    }, 450 + Math.min(900, reply.text.length * 4));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const started = msgs.some((m) => m.role === "user");
  const last = msgs[msgs.length - 1];
  const chips = !started ? suggestions : last.role === "assistant" ? (last.chips ?? []) : [];

  return (
    <>
      <button
        type="button"
        className={`chat-launch${open ? " is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close the chat assistant" : "Chat with Umair's assistant"}
      >
        <span className="chat-launch__icon" aria-hidden="true">
          {open ? (
            <Close width={22} height={22} />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
              <path d="M12 8.5l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z" fill="currentColor" stroke="none" />
            </svg>
          )}
        </span>
        <span className="chat-launch__label">Chat</span>
      </button>

      <section
        id="chat-panel"
        className={`chat${open ? " is-open" : ""}`}
        aria-label="Chat assistant"
        role="dialog"
        aria-modal="false"
        inert={!open}
      >
        <header className="chat__head">
          <span className="chat__avatar" aria-hidden="true">
            {profile.initials}
            <i />
          </span>
          <span className="chat__who">
            <strong>{profile.firstName}&rsquo;s assistant</strong>
            <small>
              <i className="chat__live" aria-hidden="true" /> Instant answers, 24/7
            </small>
          </span>
          <button type="button" className="chat__close" onClick={() => setOpen(false)} aria-label="Close chat">
            <Close width={18} height={18} />
          </button>
        </header>

        <div ref={list} className="chat__list" aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={`chat__msg chat__msg--${m.role}`}>
              {m.role === "assistant" ? <Markdown text={m.content} /> : <p>{m.content}</p>}
            </div>
          ))}
          {busy ? (
            <div className="chat__msg chat__msg--assistant chat__typing" aria-label="Typing">
              <span />
              <span />
              <span />
            </div>
          ) : null}
          {error ? (
            <div className="chat__error" role="alert">
              {error}{" "}
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp Umair
              </a>
            </div>
          ) : null}
          {!busy && chips.length ? (
            <div className="chat__chips">
              {chips.map((s) => (
                <button key={s} type="button" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <form className="chat__form" onSubmit={onSubmit}>
          <label htmlFor="chat-input" className="sr-only">
            Your message
          </label>
          <textarea
            id="chat-input"
            ref={field}
            rows={1}
            value={input}
            maxLength={1500}
            placeholder="Ask about services, projects, prices…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
          />
          <button type="submit" className="chat__send" disabled={busy || !input.trim()} aria-label="Send">
            <ArrowRight width={18} height={18} />
          </button>
        </form>
        <p className="chat__foot">
          Automatic answers. For quotes,{" "}
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
            <WhatsApp width={12} height={12} /> message Umair
          </a>
          . <a href="/privacy-policy/">Privacy</a>
        </p>
      </section>
    </>
  );
}
