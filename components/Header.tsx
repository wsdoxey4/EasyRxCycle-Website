"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/track";

type Col = { title: string; links: { t: string; h: string }[] };
type Item = { label: string; href: string; cols?: number; mega?: Col[] };

const MENU: Item[] = [
  {
    label: "Solutions", href: "/our-solutions", cols: 3,
    mega: [
      { title: "Waste streams", links: [
        { t: "Sharps Disposal", h: "/our-solutions/sharps-disposal" },
        { t: "Biohazard / RMW", h: "/our-solutions/biohazard-waste-disposal" },
        { t: "Pharmaceutical Waste", h: "/our-solutions/pharmaceutical-waste-disposal" },
        { t: "Controlled Substance Destruction", h: "/our-solutions/controlled-substance-destruction" },
        { t: "RCRA Hazardous", h: "/our-solutions/rcra-hazardous-pharmaceutical-waste" },
        { t: "Trace Chemo", h: "/our-solutions/trace-chemotherapy-waste" },
      ]},
      { title: "Products & programs", links: [
        { t: "Build a mail-back program", h: "/build-your-program" },
        { t: "Medication Disposal Kits", h: "/our-solutions/medication-disposal-kit" },
        { t: "Reverse Distribution", h: "/our-solutions/reverse-distribution" },
        { t: "Mail-back kits (Shop)", h: "/shop" },
        { t: "Auto-ship (save 20%)", h: "/shop" },
        { t: "Scheduled pickup", h: "/get-a-quote" },
        { t: "Pricing", h: "/pricing" },
        { t: "Cost calculator", h: "/cost-calculator" },
        { t: "How it works", h: "/how-it-works" },
      ]},
      { title: "Compliance", links: [
        { t: "DEA Forms 41 / 222", h: "/resources/dea-form-41-222" },
        { t: "USP 800", h: "/resources/usp-800" },
        { t: "Certificate of Destruction", h: "/resources/certificate-of-destruction" },
        { t: "OSHA / Bloodborne Training", h: "/resources/bloodborne-training" },
      ]},
    ],
  },
  {
    // 2-level SEO-research slugs (/who-we-serve/{slug}). ✅ = built; others planned (batch 2).
    label: "Who We Serve", href: "/who-we-serve/", cols: 4,
    mega: [
      { title: "Healthcare & providers", links: [
        { t: "Physician offices", h: "/who-we-serve/physician-offices/" },      // ✅
        { t: "Dental practices", h: "/who-we-serve/dental/" },                   // ✅
        { t: "Surgery centers (ASC)", h: "/who-we-serve/asc/" },                 // ✅
        { t: "LTC & nursing homes", h: "/who-we-serve/nursing-homes/" },         // ✅
        { t: "Urgent care", h: "/who-we-serve/urgent-care/" },
        { t: "Hospice", h: "/who-we-serve/hospice/" },
      ]},
      { title: "Pharmacies", links: [
        { t: "Retail & independent", h: "/who-we-serve/retail-pharmacy/" },      // ✅
        { t: "340B pharmacies", h: "/who-we-serve/340b-pharmacy/" },             // ✅
        { t: "Chain pharmacies", h: "/who-we-serve/chain-pharmacy/" },
        { t: "Specialty pharmacies", h: "/who-we-serve/specialty-pharmacy/" },
        { t: "Mail-order", h: "/who-we-serve/mail-order-pharmacy/" },
        { t: "503B outsourcing", h: "/who-we-serve/503b-pharmacy/" },
      ]},
      { title: "Vet & emergency", links: [
        { t: "Veterinary & equine", h: "/who-we-serve/veterinary/" },            // ✅
        { t: "EMS & fire", h: "/who-we-serve/ems-fire/" },                       // ✅
        { t: "Oncology / infusion", h: "/who-we-serve/oncology-infusion/" },
        { t: "Home health", h: "/who-we-serve/home-health/" },
      ]},
      { title: "Manufacturers & labs", links: [
        { t: "Pharma manufacturers", h: "/who-we-serve/pharma-manufacturers/" },
        { t: "Research labs", h: "/who-we-serve/research-labs/" },
        { t: "Dialysis centers", h: "/who-we-serve/dialysis/" },
        { t: "Diagnostic / clinical labs", h: "/who-we-serve/clinical-labs/" },
        { t: "See all industries →", h: "/who-we-serve/" },
      ]},
    ],
  },
  {
    label: "Resources", href: "/resources", cols: 3,
    mega: [
      { title: "Free tools", links: [
        { t: "Waste Determination Tool", h: "/waste-determination" },
        { t: "P/U-list drug lookup", h: "/drug-hazardous-lookup" },
        { t: "Generator status (VSQG/SQG/LQG)", h: "/generator-status" },
        { t: "Cost calculator", h: "/cost-calculator" },
        { t: "All free tools & printables →", h: "/free-resources" },
      ]},
      { title: "Guides & compliance", links: [
        { t: "The guide library (60+)", h: "/resources/guides" },
        { t: "Glossary of terms", h: "/glossary" },
        { t: "DEA Form 41 / 222", h: "/resources/dea-form-41-222" },
        { t: "USP 800", h: "/resources/usp-800" },
        { t: "Certificate of Destruction", h: "/resources/certificate-of-destruction" },
        { t: "OSHA / Bloodborne training", h: "/resources/bloodborne-training" },
        { t: "Regulations by state", h: "/medical-waste-regulations-by-state" },
        { t: "Read the blog →", h: "/blog/" },
      ]},
      { title: "Free downloads", links: [
        { t: "Color-code chart (PDF)", h: "/downloads/medical-waste-color-code-chart.pdf" },
        { t: "Segregation matrix (PDF)", h: "/downloads/waste-segregation-matrix.pdf" },
        { t: "RCRA P/U-list (PDF)", h: "/downloads/rcra-p-u-list-pharmaceuticals.pdf" },
        { t: "DEA Form 41 checklist (PDF)", h: "/downloads/dea-form-41-prep-checklist.pdf" },
        { t: "State dataset (CSV)", h: "/downloads/us-medical-waste-regulations-by-state.csv" },
      ]},
    ],
  },
  {
    label: "Partners", href: "/partners", cols: 1,
    mega: [
      { title: "Channels", links: [
        { t: "All partner programs", h: "/partners" },
        { t: "GPOs", h: "/partners/gpos" },
        { t: "Distributors & wholesalers", h: "/partners/distributors-wholesalers" },
        { t: "3PLs & fulfillment", h: "/partners/3pls-fulfillment" },
        { t: "Brokers", h: "/partners/brokers" },
        { t: "Partner toolkit", h: "/partners/toolkit" },
        { t: "Become a partner", h: "/contact" },
      ]},
    ],
  },
  {
    label: "Company", href: "/about-us", cols: 2,
    mega: [
      { title: "About Easy Rx Cycle", links: [
        { t: "Why us", h: "/why-us" },
        { t: "Case studies", h: "/case-studies" },
        { t: "About us", h: "/about-us" },
        { t: "Our team", h: "/our-team" },
        { t: "Capabilities & credentials", h: "/capabilities" },
      ]},
      { title: "How we work & support", links: [
        { t: "How it works", h: "/how-it-works" },
        { t: "FAQ", h: "/faq" },
        { t: "Contact us", h: "/contact" },
      ]},
    ],
  },
  { label: "Locations", href: "/locations/" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>("Solutions");
  const close = () => setOpen(false);
  return (
    <>
      <div className="util">
        <div className="wrap">
          <div className="creds">
            <span><i className="dot" />DEA-Registered</span>
            <span><i className="dot" />EPA-Compliant</span>
            <span><i className="dot" />HIPAA &amp; DOT</span>
            <span><i className="dot" />Nationwide mail-back</span>
          </div>
          <div className="right">
            <a href="/contact">Contact</a>
            <a href="/partners">Partners</a>
            <a href="tel:5019042929" onClick={() => trackEvent("click_to_call")}><strong>501-904-2929</strong></a>
          </div>
        </div>
      </div>

      <header className="site">
        <div className="wrap">
          <a href="/" aria-label="Easy Rx Cycle home">
            <img className="logo" src="/images/logo-full.png" alt="Easy Rx Cycle" width={4796} height={819} />
          </a>
          <nav className="main">
            {MENU.map((it) => (
              <div className="navitem" key={it.label}>
                <a href={it.href}>{it.label}{it.mega && <span className="caret" aria-hidden="true">▾</span>}</a>
                {it.mega && (
                  <div className="mega" style={{ ["--cols" as string]: String(it.cols || 3) }}>
                    {it.mega.map((col) => (
                      <div className="col" key={col.title}>
                        <h5>{col.title}</h5>
                        {col.links.map((l) => <a key={l.t} href={l.h}>{l.t}</a>)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="hactions">
            <a className="shoplink" href="/shop">Shop</a>
            <a className="btn btn-primary" href="/get-a-quote">Get a quote <span className="ar">→</span></a>
            <button type="button" className={`menu-btn${open ? " is-open" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>

        {open && (
          <nav className="mobile-nav" id="mobile-nav">
            {MENU.map((it) =>
              it.mega ? (
                <div className="mn-group" key={it.label}>
                  <button
                    type="button"
                    className={`mn-top${sub === it.label ? " is-open" : ""}`}
                    aria-expanded={sub === it.label}
                    onClick={() => setSub((v) => (v === it.label ? null : it.label))}
                  >
                    {it.label}
                    <span className="mn-caret" aria-hidden="true">▾</span>
                  </button>
                  {sub === it.label && (
                    <div className="mn-panel">
                      {it.mega.map((col) => (
                        <div className="mn-col" key={col.title}>
                          <h5>{col.title}</h5>
                          {col.links.map((l) => (
                            <a key={l.t} href={l.h} onClick={close}>{l.t}</a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a className="mn-top mn-link" key={it.label} href={it.href} onClick={close}>{it.label}</a>
              )
            )}
            <a className="mn-top mn-link" href="/build-your-program" onClick={close}>Build a program</a>
            <a className="mn-top mn-link" href="/shop" onClick={close}>Shop</a>
            <a className="btn btn-primary mn-cta" href="/get-a-quote" onClick={close}>Get a quote <span className="ar">→</span></a>
          </nav>
        )}
      </header>
    </>
  );
}
