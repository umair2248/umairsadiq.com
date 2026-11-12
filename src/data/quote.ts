/** Quote form text (English defaults). Plain data, safe to import from server and client code. */
/** An option: what Umair receives in the email (English) and what the visitor sees. */
export type Choice = { value: string; label?: string };

export type QuoteText = {
  sub: string;
  name: string;
  email: string;
  type: string;
  budget: string;
  phone: string;
  site: string;
  details: string;
  detailsPlaceholder: string;
  send: string;
  sending: string;
  whatsapp: string;
  note: string;
  /** "{first}" is replaced with the visitor's first name (with `sep` before it), or removed. */
  thanks: string;
  sep: string;
  thanksText: string;
  whatsappDone: string;
  again: string;
  budgets: Choice[];
};

export const quoteEn: QuoteText = {
  sub: "Fixed price in USD, a timeline and what’s included. Free, no obligation.",
  name: "Your name *",
  email: "Email *",
  type: "What do you need?",
  budget: "Budget (USD)",
  phone: "WhatsApp / phone (optional)",
  site: "Current website (optional)",
  details: "Project details *",
  detailsPlaceholder: "Pages, features, deadline, anything I should know.",
  send: "Send request",
  sending: "Sending…",
  whatsapp: "WhatsApp instead",
  note: "I reply within 24 hours. Your details only go to me, never to third parties.",
  thanks: "Thanks{first}! Your request is in.",
  sep: ", ",
  thanksText: "It’s in my inbox now. I’ll reply to your email within 24 hours with a fixed quote and next steps.",
  whatsappDone: "WhatsApp me",
  again: "Send another",
  budgets: [
    { value: "Under $500" },
    { value: "$500 – $1,500" },
    { value: "$1,500 – $5,000" },
    { value: "$5,000+" },
    { value: "Not sure yet" },
  ],
};

/** Budget ranges the visitor can pick, per currency. These are the visitor's budget, not my prices. */
export const budgetsBy: Record<string, Choice[]> = {
  USD: quoteEn.budgets,
  PKR: [
    { value: "Under PKR 50,000", label: "Under Rs 50,000" },
    { value: "PKR 50,000 – 150,000", label: "Rs 50,000 – 150,000" },
    { value: "PKR 150,000 – 500,000", label: "Rs 150,000 – 500,000" },
    { value: "PKR 500,000+", label: "Rs 500,000+" },
    { value: "Not sure yet" },
  ],
  AED: [
    { value: "Under AED 2,000" },
    { value: "AED 2,000 – 5,000" },
    { value: "AED 5,000 – 20,000" },
    { value: "AED 20,000+" },
    { value: "Not sure yet" },
  ],
  GBP: [
    { value: "Under £400" },
    { value: "£400 – £1,200" },
    { value: "£1,200 – £4,000" },
    { value: "£4,000+" },
    { value: "Not sure yet" },
  ],
  AUD: [
    { value: "Under A$750" },
    { value: "A$750 – A$2,500" },
    { value: "A$2,500 – A$7,500" },
    { value: "A$7,500+" },
    { value: "Not sure yet" },
  ],
};

export const wordpressTypes: Choice[] = [
  { value: "New WordPress website" },
  { value: "Redesign of an existing site" },
  { value: "WooCommerce store" },
  { value: "Custom plugin or feature" },
  { value: "Fix or speed up my site" },
  { value: "Ongoing support" },
  { value: "Something else" },
];

