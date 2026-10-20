import type { Metadata } from "next";
import TradeShowLanding, { type TradeShow } from "@/components/TradeShowLanding";
import { SITE, abs } from "@/lib/site";

const S: TradeShow = {
  slug: "aahp", name: "2026 AAHP", dates: "Oct 22–23, 2026", startDate: "2026-10-22", endDate: "2026-10-23",
  venue: "Wyndham Riverfront Little Rock", city: "Little Rock", region: "AR",
  desc: "Meet Easy Rx Cycle at the 2026 AAHP in Little Rock. DEA-registered destruction for pharmacy and health-system waste — controlled substances, hazardous and non-hazardous pharmaceuticals, trace chemo and sharps — with a Certificate of Destruction every time. Scan for 10% off your first order.",
  pitch: "We're based right here in Little Rock — stop by the booth and let's talk about the pharmaceutical waste your pharmacy or health system generates.",
  h2: "DEA-registered destruction for pharmacy and health systems.",
  intro: "Easy Rx Cycle destroys the regulated waste your pharmacy generates — prepaid mail-back kits, a Certificate of Destruction on every order, and no long-term contract. One DEA-registered vendor for every stream.",
  covers: [
    "Controlled substances — expired and unusable Schedule I–V stock, non-retrievable destruction",
    "RCRA hazardous pharmaceutical waste — handled to EPA rules",
    "Non-hazardous pharmaceutical waste — expired and unused medications",
    "Trace chemotherapy waste — per USP 800",
    "Sharps — needles, syringes and pen needles",
    "Certificate of Destruction archived to your account",
  ],
  finalH2: "Can't make it to the booth?",
  finalP: "Get a quote for your pharmacy or health system — controlled substances, hazardous pharmaceuticals and more, with the paperwork done right.",
  finalHref: "/who-we-serve/hospitals", finalLabel: "Health-system disposal",
};
const PATH = `/trade-shows/${S.slug}`;
const TITLE = "Easy Rx Cycle at 2026 AAHP — Booth Special | Little Rock";
export const metadata: Metadata = {
  title: TITLE, description: S.desc, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: S.desc, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};
export default function Page() { return <TradeShowLanding s={S} />; }
