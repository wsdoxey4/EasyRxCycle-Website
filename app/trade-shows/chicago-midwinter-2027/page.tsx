import type { Metadata } from "next";
import TradeShowLanding, { type TradeShow } from "@/components/TradeShowLanding";
import { SITE, abs } from "@/lib/site";

const S: TradeShow = {
  slug: "chicago-midwinter-2027", name: "2027 Chicago Dental Society Midwinter Meeting", dates: "Feb 25–27, 2027", startDate: "2027-02-25", endDate: "2027-02-27",
  venue: "McCormick Place West", city: "Chicago", region: "IL",
  desc: "Meet Easy Rx Cycle at the 2027 Chicago Dental Society Midwinter Meeting. DEA-registered destruction for dental practices — sharps, pharmaceutical waste, red-bag waste and controlled substances — with a Certificate of Destruction every time. Scan for 10% off your first order.",
  pitch: "Stop by the booth and let's talk about the sharps and pharmaceutical waste your practice generates.",
  h2: "DEA-registered destruction for dental practices.",
  intro: "Easy Rx Cycle destroys the regulated waste a dental practice generates — prepaid mail-back kits, a Certificate of Destruction on every order, and no long-term contract. One vendor for every stream, at one location or across a group.",
  covers: [
    "Sharps — needles, syringes and anesthetic carpules",
    "Pharmaceutical waste — expired and unused medications",
    "Biohazard / red-bag waste — gauze, gloves and contaminated PPE",
    "Controlled substances — sedation and pain medications, non-retrievable destruction",
    "Dental groups — kits and schedules for every location",
    "Certificate of Destruction archived to your account",
  ],
  finalH2: "Can't make it to the booth?",
  finalP: "Get a quote for your practice or dental group — sharps, pharmaceuticals and more, with the paperwork done right.",
  finalHref: "/who-we-serve/dental/", finalLabel: "Dental disposal",
};
const PATH = `/trade-shows/${S.slug}`;
const TITLE = "Easy Rx Cycle at Chicago Midwinter 2027 — Booth Special | Chicago";
export const metadata: Metadata = {
  title: TITLE, description: S.desc, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: S.desc, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};
export default function Page() { return <TradeShowLanding s={S} />; }
