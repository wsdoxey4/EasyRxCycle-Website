import type { Metadata } from "next";
import TradeShowLanding, { type TradeShow } from "@/components/TradeShowLanding";
import { SITE, abs } from "@/lib/site";

const S: TradeShow = {
  slug: "apha-2027", name: "APhA2027 Annual Meeting & Exposition", dates: "Mar 19–22, 2027", startDate: "2027-03-19", endDate: "2027-03-22",
  venue: "APhA2027 Exposition", city: "Charlotte", region: "NC",
  desc: "Meet Easy Rx Cycle at APhA2027 in Charlotte. DEA-registered destruction for pharmacies — controlled substances, hazardous and non-hazardous pharmaceuticals, medication take-back and sharps — with a Certificate of Destruction every time. Scan for 10% off your first order.",
  pitch: "Stop by the booth and let's talk about the expired stock, returns and controlled substances your pharmacy needs destroyed.",
  h2: "DEA-registered destruction for every pharmacy.",
  intro: "Easy Rx Cycle destroys the regulated waste your pharmacy generates — prepaid mail-back kits, a Certificate of Destruction on every order, and no long-term contract. One DEA-registered vendor for every stream.",
  covers: [
    "Controlled substances — expired and unusable Schedule I–V stock, DEA Form 41 included",
    "RCRA hazardous pharmaceutical waste — handled to EPA rules",
    "Non-hazardous pharmaceutical waste — expired and unused medications",
    "Medication take-back kits — mail-back and on-site options for patients",
    "Sharps — needles, syringes and pen needles",
    "Certificate of Destruction archived to your account",
  ],
  finalH2: "Can't make it to the booth?",
  finalP: "Get a quote for your pharmacy — controlled substances, hazardous pharmaceuticals and more, with the paperwork done right.",
  finalHref: "/who-we-serve/independent-pharmacy", finalLabel: "Pharmacy disposal",
};
const PATH = `/trade-shows/${S.slug}`;
const TITLE = "Easy Rx Cycle at APhA2027 — Booth Special | Charlotte";
export const metadata: Metadata = {
  title: TITLE, description: S.desc, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: S.desc, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};
export default function Page() { return <TradeShowLanding s={S} />; }
