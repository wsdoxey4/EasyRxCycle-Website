import type { Metadata } from "next";
import ComparePage from "@/components/ComparePage";
import { competitorBySlug, competitorSlugs } from "@/lib/competitors";
import { SITE, abs } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return competitorSlugs().map((competitor) => ({ competitor }));
}

export async function generateMetadata({ params }: { params: Promise<{ competitor: string }> }): Promise<Metadata> {
  const { competitor } = await params;
  const c = competitorBySlug(competitor);
  if (!c) return {};
  const path = `/compare/${c.slug}`;
  return {
    title: c.metaTitle, description: c.metaDesc, alternates: { canonical: path },
    openGraph: { type: "website", title: `${c.metaTitle} — ${SITE.name}`, description: c.metaDesc, url: abs(path), images: [{ url: SITE.ogImage }] },
  };
}

export default async function Page({ params }: { params: Promise<{ competitor: string }> }) {
  const { competitor } = await params;
  const c = competitorBySlug(competitor);
  if (!c) notFound();
  return <ComparePage c={c} />;
}

export const dynamicParams = false;
