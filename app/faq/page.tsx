import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE, abs } from "@/lib/site";

const PATH = "/faq";
const TITLE = "FAQ — Medical & Pharmaceutical Waste Disposal Questions";
const DESC =
  "Answers to common questions about medical and pharmaceutical waste disposal with Easy Rx Cycle — mail-back vs pickup, controlled substances, pricing, shipping, compliance, and the Certificate of Destruction.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const groups: { title: string; faqs: { q: string; a: string }[] }[] = [
  { title: "Getting started", faqs: [
    { q: "How do I start service?", a: "Order a mail-back kit online, or request a quote for pickup or higher volume. There's no contract — you buy or schedule only what you need, when you need it." },
    { q: "Do I need a contract?", a: "No. Easy Rx Cycle is no-contract and no-minimum. Buy a kit once, set up auto-ship, or schedule pickup — whatever fits, with no long-term commitment." },
    { q: "Do you serve my state?", a: "Yes — we provide mail-back nationwide to all 50 states, plus scheduled and on-request pickup. Every order includes a Certificate of Destruction." },
  ]},
  { title: "Mail-back, pickup & on-site", faqs: [
    { q: "What's the difference between mail-back and pickup?", a: "Mail-back kits are prepaid and self-serve — fill, seal, and drop in the mail, with no route fees. Pickup is scheduled service sized to higher-volume or multi-site facilities. On-site kits deactivate medications in-house with nothing to ship back." },
    { q: "Is return shipping included?", a: "Yes. Mail-back kits are prepaid both ways — the price includes shipping to you and the prepaid return label. Orders over $50 also ship free outbound." },
  ]},
  { title: "Controlled substances & compliance", faqs: [
    { q: "Can you destroy controlled substances?", a: "Yes. As a DEA-registered reverse distributor we destroy Schedule II–V controlled substances to the DEA non-retrievable standard, with chain-of-custody and a Certificate of Destruction." },
    { q: "Do you handle DEA Form 41 and reverse distribution?", a: "Yes — we handle the reverse-distribution and Form 41 paperwork for controlled substances surrendered for destruction, so your records are audit-ready." },
    { q: "What is a Certificate of Destruction?", a: "It's your proof that waste was compliantly destroyed — audit-ready documentation for DEA, EPA, OSHA, and state inspections, provided on every order." },
    { q: "What waste streams do you handle?", a: "Controlled substances, pharmaceutical waste, sharps, biohazard/regulated medical waste, trace chemotherapy (USP 800), RCRA-hazardous pharmaceutical waste, medication disposal kits, and pharmaceutical reverse distribution." },
  ]},
  { title: "Shop, pricing & auto-ship", faqs: [
    { q: "How is pricing handled?", a: "Kits are flat-rate and priced online — no hidden fees. Higher-volume or multi-site programs get a custom quote. PO, W-9, and tax-exempt purchasing are supported." },
    { q: "How does auto-ship work?", a: "Choose auto-ship on any kit to save 20% and have it delivered automatically — monthly, every 2 or 3 months, or every 6 months. Change the frequency or cancel anytime. No contract." },
    { q: "How is sales tax handled?", a: "Sales tax is calculated automatically at checkout based on your shipping address, in states where it applies." },
  ]},
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${abs(PATH)}#faq`,
  url: abs(PATH),
  mainEntity: groups.flatMap((g) => g.faqs).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "FAQ" }]} />
            <span className="eyebrow">Frequently asked</span>
            <h1 className="ph1">Your questions, <span style={{ color: "var(--teal)" }}>answered.</span></h1>
            <p className="lead" style={{ marginTop: "16px", maxWidth: "60ch" }}>
              Everything from mail-back vs. pickup to controlled substances, pricing, and proof of destruction. Don&rsquo;t see yours?{" "}
              <a href="/contact" style={{ color: "var(--teal)", fontWeight: 600 }}>Ask us directly</a>.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(32px,4vw,52px)" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            {groups.map((g) => (
              <div key={g.title} style={{ marginBottom: "clamp(30px,4vw,44px)" }}>
                <h2 style={{ fontSize: "clamp(20px,2.4vw,26px)", marginBottom: "16px" }}>{g.title}</h2>
                <div className="faq">
                  {g.faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Still have a question?</h2>
                <p>Talk to a specialist about your waste streams, kit sizes, or getting set up.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · {SITE.phoneDisplay}</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/contact">Contact us <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/get-a-quote">Get a quote</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
