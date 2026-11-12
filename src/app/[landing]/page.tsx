import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LongPage, longPageMetadata } from "@/components/LongPage";
import { landingPages } from "@/data/all-pages";

type Props = { params: Promise<{ landing: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return landingPages.map((p) => ({ landing: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { landing } = await params;
  const pg = landingPages.find((p) => p.slug === landing);
  return pg ? longPageMetadata(pg, `/${pg.slug}/`) : {};
}

export default async function LandingPage({ params }: Props) {
  const { landing } = await params;
  const pg = landingPages.find((p) => p.slug === landing);
  if (!pg) notFound();
  return (
    <LongPage
      path={`/${pg.slug}/`}
      name={pg.name}
      color={pg.color}
      tools={pg.tools}
      related={pg.related}
      pg={pg}
      areaServed={pg.areaServed}
      extraSchema={pg.extraSchema}
      whatsappCta={pg.whatsappCta}
    />
  );
}
