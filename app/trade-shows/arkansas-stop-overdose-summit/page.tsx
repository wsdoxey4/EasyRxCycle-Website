import type { Metadata } from "next";
import TradeShowLanding, { type TradeShow } from "@/components/TradeShowLanding";
import { SITE, abs } from "@/lib/site";

const S: TradeShow = {
  slug: "arkansas-stop-overdose-summit", name: "2026 Arkansas Stop Overdose Summit", dates: "Nov 17, 2026", startDate: "2026-11-17", endDate: "2026-11-17",
  venue: "Fort Smith Convention Center", city: "Fort Smith", region: "AR",
  desc: "Meet Easy Rx Cycle at the 2026 Arkansas Stop Overdose Summit in Fort Smith. Safe, documented medication and controlled-substance disposal — mail-back kits, on-site deactivation and a Certificate of Destruction every time. Scan for 10% off your first order.",
  pitch: "Unused medications left in cabinets are a risk. Stop by the booth to see how clinics, pharmacies and community programs get them destroyed safely and on the record.",
  h2: "Get unused medications out of circulation — safely and on the record.",
  intro: "Easy Rx Cycle is an Arkansas-based, DEA-registered destruction company. We give clinics, pharmacies and community programs a simple way to destroy unused and expired medications, with a Certificate of Destruction for every shipment.",
  covers: [
    "Medication disposal kits — mail medications back for documented destruction",
    "On-site deactivation kits — render medications non-retrievable, no shipping needed",
    "Controlled substances — non-retrievable destruction for DEA registrants",
    "Activated charcoal take-back — return used disposal containers for destruction",
    "Sharps — needles and syringes in approved containers",
    "Certificate of Destruction on every order",
  ],
  finalH2: "Can't make it to the booth?",
  finalP: "Set up medication disposal for your clinic, pharmacy or program — kits shipped prepaid, destruction documented.",
  finalHref: "/shop/medication-mail-back-kit/", finalLabel: "Medication disposal kits",
};
const PATH = `/trade-shows/${S.slug}`;
const TITLE = "Easy Rx Cycle at the 2026 Arkansas Stop Overdose Summit | Fort Smith";
export const metadata: Metadata = {
  title: TITLE, description: S.desc, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: S.desc, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};
export default function Page() { return <TradeShowLanding s={S} />; }
