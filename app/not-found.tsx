import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found (404) — Easy Rx Cycle",
  description: "That page couldn't be found. Jump back to compliant medical and pharmaceutical waste destruction — solutions, industries, guides, or a quote.",
  robots: { index: false, follow: true },
};

const links: { t: string; d: string; h: string }[] = [
  { t: "Our solutions", d: "Every regulated waste stream we destroy.", h: "/our-solutions" },
  { t: "Who we serve", d: "Disposal built for your type of facility.", h: "/who-we-serve/" },
  { t: "The guide library", d: "60+ free compliance guides.", h: "/resources/guides" },
  { t: "Shop kits", d: "Prepaid mail-back kits, no contract.", h: "/shop" },
  { t: "Get a quote", d: "Tell us what you generate.", h: "/get-a-quote" },
  { t: "Contact us", d: "Talk to a specialist: 501-904-2929.", h: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <span className="eyebrow">Error 404</span>
            <h1 className="ph1" style={{ marginTop: "10px" }}>
              This page took <span style={{ color: "var(--teal)" }}>a different route.</span>
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "60ch" }}>
              The page you&rsquo;re looking for moved or never existed. No problem — here&rsquo;s the fastest way back to
              what you need.
            </p>
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "26px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/">Back to home <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/get-a-quote">Get a quote</a>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(32px,4vw,52px)", paddingBottom: "clamp(48px,7vw,88px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">Popular destinations</span><h2>Where would you like to go?</h2></div>
            <div className="grid8" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: "30px" }}>
              {links.map((l) => (
                <a className="svc" href={l.h} key={l.t}>
                  <h4>{l.t}</h4>
                  <p>{l.d}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
