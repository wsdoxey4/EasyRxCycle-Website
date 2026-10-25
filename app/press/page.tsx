import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { SITE, abs } from "@/lib/site";

const PATH = "/press";
const TITLE = "Press & Media Kit";
const DESC =
  "Facts, company boilerplate, logos, and expert topics for journalists covering pharmaceutical and medical waste destruction. Media contact for Easy Rx Cycle.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { type: "website", title: `${TITLE} — ${SITE.name}`, description: DESC, url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Press", item: abs(PATH) },
      ],
    },
  ],
};

const facts: [string, string][] = [
  ["Founded", "2018"],
  ["Headquarters", "Little Rock, Arkansas"],
  ["Legal entity", "DBA of Arkansas Redistributors, LLC"],
  ["Facilities served", "1,000+"],
  ["Coverage", "All 50 states — prepaid mail-back and pickup"],
  ["Waste streams", "8 regulated streams, destruction only"],
  ["Registration", "DEA-registered for controlled substance destruction (Schedules I–V)"],
  ["Classification", "NAICS 562119"],
];

const BOILERPLATE =
  "Easy Rx Cycle is a DEA-registered destruction company that helps pharmacies, veterinary and dental practices, surgery centers, long-term care facilities, and other healthcare providers dispose of pharmaceutical and medical waste compliantly. Its prepaid mail-back kits and on-site pickup cover controlled substances, non-controlled and RCRA hazardous pharmaceuticals, sharps, biohazard, and trace chemotherapy waste, and every order closes with a Certificate of Destruction. Founded in 2018 and based in Little Rock, Arkansas, Easy Rx Cycle has served more than 1,000 facilities across all 50 states. Learn more at easyrxcycle.com.";

const topics: [string, string][] = [
  ["Controlled substance destruction", "How DEA registrants destroy expired and unwanted controlled drugs, and what DEA Form 41 documents."],
  ["Reverse distribution vs. destruction", "When unused drugs can earn credit back, and when they simply need to be destroyed."],
  ["Hazardous waste pharmaceuticals", "What EPA's rules for hazardous pharmaceuticals mean for pharmacies, clinics, and long-term care."],
  ["Drug take-back", "National Prescription Drug Take Back Day, medication disposal kits, and keeping drugs out of water and homes."],
  ["Sharps and home health", "Safe sharps disposal for clinics, home health agencies, and patients who inject at home."],
  ["Small-practice compliance", "Why independent practices struggle with waste rules, and simple ways to stay audit-ready."],
];

const logos = [
  { t: "Full-color logo", d: "For light backgrounds", h: "/images/logo-full.png", bg: "#ffffff" },
  { t: "White logo", d: "For dark or teal backgrounds", h: "/images/logo-white.png", bg: "#005770" },
  { t: "Icon", d: "Square, for social avatars", h: "/icon-512.png", bg: "#ffffff" },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Press</span>
            </nav>
            <span className="eyebrow">Press &amp; media</span>
            <h1 className="ph1">
              Covering drug and medical waste? <span style={{ color: "var(--teal)" }}>We&rsquo;re glad to help.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>
              Company facts, an approved description, logos, and the topics our team can speak to. For interviews, quotes,
              or a contributed article, email <a href="mailto:sales@easyrxcycle.com?subject=Media%20request" style={{ color: "var(--teal)", fontWeight: 600 }}>sales@easyrxcycle.com</a>{" "}
              with &ldquo;Media&rdquo; in the subject, or call {SITE.phoneDisplay}. We reply within one business day.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(40px,5vw,68px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Fast facts</span>
              <h2>Easy Rx Cycle at a glance.</h2>
            </div>
            <div className="credgrid">
              {facts.map(([k, v]) => (
                <div className="credcard" key={k}>
                  <h4>{k}</h4>
                  <p>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead">
              <span className="eyebrow">Boilerplate</span>
              <h2>About Easy Rx Cycle</h2>
              <p className="lead">Use this description as written in articles and event listings.</p>
            </div>
            <p className="lead" style={{ marginTop: "22px", fontSize: "16px", background: "var(--card, #fff)", border: "1px solid rgba(0,87,112,.15)", borderRadius: "12px", padding: "20px 22px" }}>
              {BOILERPLATE}
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Expert topics</span>
              <h2>What we can speak to.</h2>
              <p className="lead">Our team works in disposal compliance every day and is available for interviews and background.</p>
            </div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {topics.map(([t, d]) => (
                <div className="svc" key={t}>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow">Brand assets</span>
              <h2>Logos</h2>
              <p className="lead">Please don&rsquo;t recolor, stretch, or add effects. Brand colors: teal #005770 and emerald #33C089.</p>
            </div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {logos.map((l) => (
                <a className="svc" href={l.h} target="_blank" rel="noopener" key={l.t}>
                  <div style={{ background: l.bg, borderRadius: "10px", padding: "18px", display: "flex", alignItems: "center", justifyContent: "center", height: "110px", border: "1px solid rgba(0,87,112,.12)" }}>
                    <img src={l.h} alt={`${SITE.name} ${l.t.toLowerCase()}`} style={{ maxHeight: "74px", maxWidth: "100%", objectFit: "contain" }} />
                  </div>
                  <h4 style={{ marginTop: "12px" }}>{l.t}</h4>
                  <p>{l.d} · PNG</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Meet us in person.</h2>
                <p>We exhibit at pharmacy, dental, veterinary, and surgery-center shows through 2027. Stop by the booth or set up a time to talk.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Media contact · sales@easyrxcycle.com · {SITE.phoneDisplay}</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/trade-shows">See our trade shows <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/about-us">About us</a>
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
