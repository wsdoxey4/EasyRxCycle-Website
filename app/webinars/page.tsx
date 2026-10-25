import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import WebinarForm from "@/components/WebinarForm";
import { NEXT_WEBINAR as W } from "@/lib/webinars";
import { SITE, abs } from "@/lib/site";

const PATH = "/webinars";
const TITLE = "Free Disposal Compliance Webinars";
const DESC = `Free live briefing: ${W.title}. ${W.when}. Expired, controlled, and hazardous drug disposal explained in plain English, with live Q&A.`;

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
        { "@type": "ListItem", position: 2, name: "Webinars", item: abs(PATH) },
      ],
    },
    {
      "@type": "Event",
      name: W.title,
      description: W.summary,
      startDate: `${W.date}T12:00:00-06:00`,
      endDate: `${W.date}T12:45:00-06:00`,
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: { "@type": "VirtualLocation", url: abs(PATH) },
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", url: abs(PATH) },
      organizer: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
  ],
};

const check = <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#33C089" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Webinars</span>
            </nav>
            <span className="eyebrow">Free live briefing · {W.when}</span>
            <h1 className="ph1">
              {W.title}
            </h1>
            <p className="lead" style={{ marginTop: "18px", maxWidth: "64ch" }}>{W.summary}</p>
            <div style={{ display: "flex", gap: "13px", marginTop: "28px", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="#register">Save my seat <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="/resources/guides">Browse free guides</a>
            </div>
          </div>
        </section>

        <section className="sec" id="register" style={{ paddingTop: "clamp(36px,5vw,60px)" }}>
          <div className="wrap quote-grid">
            <div className="quote-aside">
              <h2 style={{ fontSize: "22px" }}>What we&rsquo;ll cover</h2>
              <ul className="covers" style={{ gridTemplateColumns: "1fr", marginTop: "18px" }}>
                {W.agenda.map((t) => <li key={t}>{check}<span>{t}</span></li>)}
              </ul>
              <p className="form-note" style={{ marginTop: "18px" }}>
                <b>Who it&rsquo;s for:</b> {W.audience}.<br />
                Live online, {W.minutes} minutes, free. Can&rsquo;t attend live? Register and we&rsquo;ll send the recording.
                This briefing does not offer continuing-education credit.
              </p>
            </div>
            <div className="quote-card">
              <WebinarForm webinar={W} />
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead">
              <span className="eyebrow">Every quarter</span>
              <h2>A free briefing, four times a year.</h2>
              <p className="lead">
                Each session takes one disposal question practices ask us constantly and answers it in plain English. Registrants
                get the recording and a written summary afterward. Want us to cover a topic, or run a session for your
                association&rsquo;s members? <a href="/associations" style={{ color: "var(--teal)", fontWeight: 600 }}>Tell us here</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="finalcta">
              <div>
                <h2>Need an answer before January?</h2>
                <p>Our team answers disposal questions every day. Call or request a quote and we&rsquo;ll walk you through it.</p>
                <div style={{ marginTop: "14px", fontFamily: "Poppins", fontWeight: 600 }}>Talk to a specialist · 501-904-2929</div>
              </div>
              <div className="b">
                <a className="btn btn-onteal" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
                <a className="btn btn-outline-w" href="/shop">Shop kits</a>
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
