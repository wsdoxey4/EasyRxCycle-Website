import type { Metadata } from "next";
import TradeShowLanding, { type TradeShow } from "@/components/TradeShowLanding";
import { SITE, abs } from "@/lib/site";

const S: TradeShow = {
  slug: "iveccs-2027", name: "IVECCS 2027", dates: "Sep 9–12, 2027", startDate: "2027-09-09", endDate: "2027-09-12",
  venue: "Gaylord Texan Resort & Convention Center", city: "Grapevine", region: "TX",
  desc: "Meet Easy Rx Cycle at IVECCS 2027 in Grapevine, Texas. DEA-registered destruction for veterinary hospitals — controlled substances, sharps, pharmaceutical waste and red-bag waste — with a Certificate of Destruction every time. Scan for 10% off your first order.",
  pitch: "Stop by the booth and let's talk about the controlled substances, sharps and pharmaceutical waste your hospital generates.",
  h2: "DEA-registered destruction for veterinary hospitals.",
  intro: "Easy Rx Cycle destroys the regulated waste a veterinary hospital generates — prepaid mail-back kits, a Certificate of Destruction on every order, and no long-term contract. One DEA-registered vendor for every stream.",
  covers: [
    "Controlled substances — expired and unusable Schedule I–V stock, DEA Form 41 included",
    "Sharps — needles, syringes and catheters",
    "Pharmaceutical waste — expired and unused medications",
    "Biohazard / red-bag waste — contaminated supplies",
    "Multi-site programs — kits and schedules for every hospital",
    "Certificate of Destruction archived to your account",
  ],
  finalH2: "Can't make it to the booth?",
  finalP: "Get a quote for your hospital or practice group — controlled substances, sharps and more, with the paperwork done right.",
  finalHref: "/who-we-serve/veterinary/", finalLabel: "Veterinary disposal",
};
const PATH = `/trade-shows/${S.slug}`;
const TITLE = "Easy Rx Cycle at IVECCS 2027 — Booth Special | Grapevine, TX";
export const metadata: Metadata = {
  title: TITLE, description: S.desc, alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: S.desc, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};
export default function Page() { return <TradeShowLanding s={S} />; }
