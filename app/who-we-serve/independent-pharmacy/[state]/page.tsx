import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryStatePage from "@/components/IndustryStatePage";
import { stateBySlug, stateSlugs } from "@/lib/geo";
import { INDUSTRY_BY_SLUG, INDUSTRY_LIVE, stateStats } from "@/lib/industryGeo";
import { SITE, abs } from "@/lib/site";

const IND = INDUSTRY_BY_SLUG["independent-pharmacy"];

export const dynamicParams = false;
export function generateStaticParams() {
  return stateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const s = stateBySlug(state);
  if (!s) return {};
  const path = `/who-we-serve/${IND.slug}/${s.slug}`;
  const n = stateStats(IND, s.slug).n.toLocaleString("en-US");
  const title = `${IND.label} Waste Disposal in ${s.name} | Easy Rx Cycle`;
  const description = `Mail-back disposal for ${n} ${IND.name.toLowerCase()} in ${s.name}: ${IND.streams.map((x) => x.name.toLowerCase()).slice(0, 3).join(", ")} and more. Prepaid kits, Certificate of Destruction, no contract.`;
  return {
    title, description, alternates: { canonical: path },
    robots: (SITE.indexable && INDUSTRY_LIVE.has(IND.slug)) ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { type: "website", title, description, url: abs(path), images: [{ url: SITE.ogImage }] },
  };
}

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = stateBySlug(state);
  if (!s) notFound();
  return <IndustryStatePage ind={IND} s={s} />;
}
