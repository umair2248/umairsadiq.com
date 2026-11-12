"use client";

import type { ReactNode } from "react";

export const HIRE_EVENT = "hire:open";

/** Any button on the page can open the "Hire me" dialog without shared state. */
export function HireButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      data-cursor="hover"
      onClick={() => window.dispatchEvent(new CustomEvent(HIRE_EVENT))}
    >
      {children}
    </button>
  );
}
