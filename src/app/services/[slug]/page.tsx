import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LongPage, longPageMetadata } from "@/components/LongPage";
import { services } from "@/data/pages";
import { allServicePages as servicePages } from "@/data/all-pages";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** WordPress has its own page at services/wordpress-development/page.tsx. */
const OWN_PAGE = new Set(["wordpress-development"]);

export function generateStaticParams() {
  return services.filter((s) => !OWN_PAGE.has(s.slug) && servicePages[s.slug]).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pg = servicePages[slug];
  return pg ? longPageMetadata(pg, `/services/${slug}/`) : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  const pg = servicePages[slug];
  if (!s || !pg) notFound();
  return <LongPage path={`/services/${s.slug}/`} name={s.name} color={s.color} tools={s.tools} related={s.related} pg={pg} />;
}
