import type { ServicePage } from "./service-pages";
import type { Tool } from "./site";

/** A long-form page that lives at the site root, e.g. /auto-repair-seo/. */
export type Landing = ServicePage & {
  slug: string;
  /** Short name used in breadcrumbs, the eyebrow and the FAQ heading */
  name: string;
  color: string;
  tools: Tool[];
  /** Project slugs, used for the proof stat in the hero */
  related: string[];
  /** schema.org areaServed nodes; defaults to the five main countries */
  areaServed?: object[];
  /** Main call to action opens WhatsApp instead of the quote dialog */
  whatsappCta?: boolean;
  /** Extra JSON-LD nodes, such as LocalBusiness */
  extraSchema?: object[];
  /** Group for the services index and internal links */
  group: "industry" | "location";
};
