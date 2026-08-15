import type { Metadata } from "next";
import StateSolutionPage from "@/components/StateSolutionPage";
import { stateBySlug, stateSlugs } from "@/lib/geo";
import { STREAMS } from "@/lib/streams";
import { SITE, abs } from "@/lib/site";
import { notFound } from "next/navigation";

const STREAM = STREAMS["rcra-hazardous-pharmaceutical-waste"];

export function generateStaticParams() {
  return stateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const s = stateBySlug(state);
  if (!s) return {};
  const path = `/our-solutions/${STREAM.slug}/${s.slug}`;
  const title = STREAM.metaTitle(s);
  const description = STREAM.metaDesc(s);
  return {
    title, description, alternates: { canonical: path },
    openGraph: { type: "website", title: `${title} — ${SITE.name}`, description, url: abs(path), images: [{ url: SITE.ogImage }] },
  };
}

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = stateBySlug(state);
  if (!s) notFound();
  return <StateSolutionPage stream={STREAM} s={s} />;
}

export const dynamicParams = false;
