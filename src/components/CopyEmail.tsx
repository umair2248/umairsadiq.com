"use client";

import { useState } from "react";
import { Check, Copy } from "./Icons";

/** Shows the email address and copies it on click; falls back to a mailto link. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <span className="copy-email">
      <a href={`mailto:${email}`} className="copy-email__link">
        {email}
      </a>
      <button
        type="button"
        className="copy-email__btn"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
          } catch {
            window.location.href = `mailto:${email}`;
          }
        }}
      >
        {copied ? <Check width={16} height={16} /> : <Copy width={16} height={16} />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </span>
  );
}
