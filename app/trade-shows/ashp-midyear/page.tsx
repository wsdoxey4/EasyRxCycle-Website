import type { Metadata } from "next";
import TradeShowLanding, { type TradeShow } from "@/components/TradeShowLanding";
import { SITE, abs } from "@/lib/site";

const S: TradeShow = {
  slug: "ashp-midyear", name: "2026 ASHP Midyear Clinical Meeting & Exhibition", dates: "Dec 6–9, 2026", startDate: "2026-12-06", endDate: "2026-12-09",
  venue: "Orange County Convention Center", city: "Orlando", region: "FL",
  desc: "Meet Easy Rx Cycle at the 2026 ASHP Midyear Clinical Meeting & Exhibition in Orlando. DEA-registered destruction for health-system pharmacy — controlled substances, RCRA hazardous pharmaceuticals, trace chemo and multi-site programs — with a Certificate of Destruction every time. Scan for 10% off your first order.",
  pitch: "Stop by the booth and let's talk about pharmaceutical waste across your health system — from one pharmacy to every site.",
  h2: "One DEA-registered vendor for every pharmacy and every site.",
  intro: "Easy Rx Cycle destroys health-system pharmaceutical waste with prepaid mail-back kits, a Certificate of Destruction on every order, and no long-term contract — one program you can roll out across every location.",
  covers: [
    "Controlled substances — non-retrievable destruction, Schedule I–V",
    "RCRA hazardous pharmaceutical waste — handled to EPA rules",
    "Trace chemotherapy waste — per USP 800",
    "Non-hazardous pharmaceutical waste — expired and unused medications",
    "Multi-site programs — set kits and frequency for every location",
    "Certificates of Destruction archived to your account",
  ],
  finalH2: "Can't make it to the booth?",
  finalP: "Build a disposal program for your health system — every stream, every site, on your schedule.",
  finalHref: "/build-your-program", finalLabel: "Build your program",
};
const PATH = `/trade-shows/${S.slug}`;
const TITLE = "Easy Rx Cycle at ASHP Midyear 2026 — Booth Special | Orlando";
export const metadata: Metadata = {
  title: TITLE, description: S.desc, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: S.desc, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};
export default function Page() { return <TradeShowLanding s={S} />; }
