/**
 * Sends a form to /api/contact.php (public/api/contact.php on Hostinger), which
 * emails it to hello@umairsadiq.com. Returns a friendly error message on failure.
 */
export type Lead = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: "hire-modal" | "quote-hero" | "quote-footer";
  fields: Record<string, string>;
  /** Honeypot: must stay empty. */
  website_url?: string;
  /** Milliseconds the visitor spent on the form (spam check). */
  elapsed: number;
  /** Cloudflare Turnstile response, when the captcha is switched on. */
  turnstile?: string;
};

let tokenPromise: Promise<string> | null = null;

/** Gets a signed form token from the server. Call it when a form opens, so it is old enough by submit time. */
export function prefetchFormToken() {
  if (!tokenPromise) {
    tokenPromise = fetch("/api/form-token.php", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { token?: string }) => d.token ?? "")
      .catch(() => "");
  }
  return tokenPromise;
}

export async function sendLead(lead: Lead): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const token = await prefetchFormToken();
    tokenPromise = null; // a fresh token for the next message
    const res = await fetch("/api/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, token, page: window.location.href.split("#")[0] }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (res.ok && data?.ok) {
      try {
        (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: "generate_lead", form: lead.source });
      } catch {}
      return { ok: true };
    }
    return { ok: false, error: data?.error || "Sorry, something went wrong. Please try again or message me on WhatsApp." };
  } catch {
    return { ok: false, error: "No connection. Please check your internet and try again, or message me on WhatsApp." };
  }
}
