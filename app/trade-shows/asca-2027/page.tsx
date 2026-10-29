import type { Metadata } from "next";
import TradeShowLanding, { type TradeShow } from "@/components/TradeShowLanding";
import { SITE, abs } from "@/lib/site";

const S: TradeShow = {
  slug: "asca-2027", name: "ASCA 2027 Conference & Expo", dates: "Mar 31–Apr 3, 2027", startDate: "2027-03-31", endDate: "2027-04-03",
  venue: "Orlando World Center Marriott", city: "Orlando", region: "FL",
  desc: "Meet Easy Rx Cycle at ASCA 2027 in Orlando. DEA-registered destruction for surgery centers — controlled substances, sharps, red-bag waste and pharmaceutical waste — with a Certificate of Destruction every time. Scan for 10% off your first order.",
  pitch: "Stop by the booth and let's talk about the expired controlled substances, sharps and red-bag waste your surgery center generates.",
  h2: "DEA-registered destruction for surgery centers.",
  intro: "Easy Rx Cycle destroys the regulated waste a surgery center generates — prepaid mail-back kits, a Certificate of Destruction on every order, and no long-term contract. Keep your current hauler for daily waste and use us for the streams that need DEA paperwork.",
  covers: [
    "Controlled substances — expired and unusable stock, DEA Form 41 included",
    "Sharps — needles, syringes and blades",
    "Biohazard / red-bag waste — contaminated PPE, gauze and supplies",
    "Pharmaceutical waste — expired and unused medications",
    "Multi-site programs — kits and schedules for every center",
    "Certificate of Destruction archived to your account",
  ],
  finalH2: "Can't make it to the booth?",
  finalP: "Get a quote for your surgery center — controlled substances, sharps and more, with the paperwork done right.",
  finalHref: "/who-we-serve/asc/", finalLabel: "Surgery center disposal",
};
const PATH = `/trade-shows/${S.slug}`;
const TITLE = "Easy Rx Cycle at ASCA 2027 — Booth Special | Orlando";
export const metadata: Metadata = {
  title: TITLE, description: S.desc, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: S.desc, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};
export default function Page() { return <TradeShowLanding s={S} />; }
