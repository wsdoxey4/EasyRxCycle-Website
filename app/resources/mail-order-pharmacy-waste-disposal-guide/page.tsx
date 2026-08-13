import type { Metadata } from "next";
import LeadMagnetLanding from "@/components/LeadMagnetLanding";
import { MAGNET_BY_SLUG } from "@/lib/leadMagnets";
import { SITE, abs } from "@/lib/site";

const m = MAGNET_BY_SLUG["mail-order-pharmacy-waste-disposal-guide"];
const PATH = `/resources/${m.slug}`;

export const metadata: Metadata = {
  title: m.title,
  description: m.desc,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${m.title} — ${SITE.name}`, description: m.desc, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

export default function Page() {
  return <LeadMagnetLanding m={m} />;
}
