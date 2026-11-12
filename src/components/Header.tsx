"use client";

import { useEffect, useRef, useState } from "react";
import { contact, navLinks, profile } from "@/data/site";
import { HireButton } from "./HireButton";
import { LangSwitch } from "./LangSwitch";
import { ArrowUpRight, Download, GitHub, LinkedIn, Mail, Phone, WhatsApp } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";
import { WorkingHours } from "./WorkingHours";

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 400 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${hidden && !open ? " is-hidden" : ""}`}>
      <div className="site-header__inner">
        <a href="/" className="wordmark" onClick={close}>
          <span className="wordmark__mark" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="wordmark__text">{profile.name}</span>
        </a>

        <div className="site-header__meta" aria-label="Working hours">
          <WorkingHours />
        </div>

        <div className="site-header__actions">
          <HireButton className="btn btn--accent btn--sm site-header__hire">Hire me</HireButton>
          <LangSwitch />
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className={`menu-toggle${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="menu-overlay"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-toggle__label">{open ? "Close" : "Menu"}</span>
            <span className="menu-toggle__lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="menu-overlay" className={`menu-overlay${open ? " is-open" : ""}`} inert={!open}>
        <div className="menu-overlay__bg" aria-hidden="true" />
        <div className="menu-overlay__inner">
          <nav aria-label="Main" className="menu-overlay__nav">
            <p className="eyebrow">Navigate</p>
            <ol>
              {navLinks.map((link, i) => (
                <li key={link.href} style={{ "--i": i } as React.CSSProperties}>
                  <a href={link.href} onClick={close}>
                    <span className="menu-overlay__index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="menu-overlay__label">{link.label}</span>
                    <ArrowUpRight className="menu-overlay__arrow" width={22} height={22} />
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <aside className="menu-overlay__side" aria-label="Contact">
            <p className="menu-overlay__status">
              <span className="status-dot" aria-hidden="true" /> {profile.availability}
            </p>
            <p className="eyebrow">Say hello</p>
            <a href={`mailto:${contact.email}`} className="menu-overlay__mail">
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="menu-overlay__phone">
              <Phone width={18} height={18} /> {contact.phoneDisplay}
            </a>
            <div className="menu-overlay__buttons">
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--accent btn--sm" onClick={close}>
                <WhatsApp width={18} height={18} /> WhatsApp
              </a>
              <a href={contact.cv} download className="btn btn--ghost btn--sm">
                <Download width={18} height={18} /> CV
              </a>
            </div>
            <ul role="list" className="menu-overlay__socials">
              <li>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedIn width={20} height={20} />
                </a>
              </li>
              <li>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GitHub width={20} height={20} />
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} aria-label="Email">
                  <Mail width={20} height={20} />
                </a>
              </li>
            </ul>
            <p className="menu-overlay__time">
              <WorkingHours />
            </p>
          </aside>
        </div>
      </div>
    </header>
  );
}
