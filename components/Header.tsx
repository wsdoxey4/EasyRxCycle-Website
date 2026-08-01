"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/track";

type Col = { title: string; links: { t: string; h: string }[] };
type Item = { label: string; href: string; cols?: number; mega?: Col[] };

const MENU: Item[] = [
  {
    label: "Solutions", href: "/#solutions", cols: 3,
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
        { t: "Medication Disposal Kits", h: "/our-solutions/medication-disposal-kit" },
        { t: "Reverse Distribution", h: "/our-solutions/reverse-distribution" },
        { t: "Mail-back kits (Shop)", h: "/#quote" },
        { t: "Scheduled pickup", h: "/#quote" },
        { t: "Auto-ship (save 20%)", h: "/#quote" },
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
    label: "Who We Serve", href: "/#industries", cols: 4,
    mega: [
      { title: "Healthcare & providers", links: [
        { t: "Physician offices", h: "/who-we-serve/healthcare-facilities-care-providers/physician-offices-and-clinics" },
        { t: "Dental clinics", h: "/who-we-serve/healthcare-facilities-care-providers/dental-clinics" },
        { t: "Surgery centers", h: "/who-we-serve/healthcare-facilities-care-providers/surgery-centers" },
        { t: "Urgent care", h: "/who-we-serve/healthcare-facilities-care-providers/urgent-care-centers" },
        { t: "Long-term care", h: "/who-we-serve/healthcare-facilities-care-providers/long-term-care-facilities" },
        { t: "Hospice", h: "/who-we-serve/healthcare-facilities-care-providers/hospice-care" },
      ]},
      { title: "Pharmacies", links: [
        { t: "Retail & drug stores", h: "/who-we-serve/pharmacies/retail-pharmacies-and-drug-stores" },
        { t: "Chain pharmacies", h: "/who-we-serve/pharmacies/chain-pharmacies" },
        { t: "340B pharmacies", h: "/who-we-serve/pharmacies/340b-pharmacies" },
        { t: "Specialty pharmacies", h: "/who-we-serve/pharmacies/speciality-pharmacies" },
        { t: "Compounding", h: "/who-we-serve/pharmacies/compounding-pharmacies" },
        { t: "Mail-order", h: "/who-we-serve/pharmacies/mail-order-pharmacies" },
      ]},
      { title: "Vet & emergency", links: [
        { t: "Veterinary clinics", h: "/who-we-serve/veterinary-services/veterinarian-clinics" },
        { t: "Equine facilities", h: "/who-we-serve/veterinary-services/equine-facilities" },
        { t: "EMS / ambulance", h: "/who-we-serve/emergency-services/ambulance-services" },
        { t: "Fire departments", h: "/who-we-serve/emergency-services/fire-departments" },
      ]},
      { title: "Manufacturers & labs", links: [
        { t: "Pharma manufacturers", h: "/who-we-serve/manufacturers-distributors/pharmaceutical-manufacturers" },
        { t: "3PLs", h: "/who-we-serve/manufacturers-distributors/third-party-logistics" },
        { t: "GPOs", h: "/who-we-serve/manufacturers-distributors/group-purchasing-organizations" },
        { t: "Research labs", h: "/who-we-serve/universities-and-research-labs/research-labs" },
        { t: "See all 50+ industries →", h: "/who-we-serve" },
      ]},
    ],
  },
  {
    label: "Resources", href: "/resources", cols: 2,
    mega: [
      { title: "Guides", links: [
        { t: "Compliance guides", h: "/resources#compliance" },
        { t: "How-to guides", h: "/resources#howto" },
        { t: "Blog", h: "/blog" },
        { t: "FAQ", h: "/resources#faq" },
      ]},
      { title: "Downloads", links: [
        { t: "W-9", h: "/resources#downloads" },
        { t: "Capability statement", h: "/capabilities" },
        { t: "Sample Certificate of Destruction", h: "/resources#downloads" },
      ]},
    ],
  },
  {
    label: "Partners", href: "/#partners", cols: 1,
    mega: [
      { title: "Channels", links: [
        { t: "GPOs", h: "/#partners" },
        { t: "Distributors & wholesalers", h: "/#partners" },
        { t: "Brokers", h: "/#partners" },
        { t: "3PLs", h: "/#partners" },
        { t: "Become a partner", h: "/#partners" },
        { t: "Partner login", h: "#" },
      ]},
    ],
  },
  { label: "Capabilities", href: "/capabilities" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
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
            <a href="#">Track a shipment</a>
            <a href="#">Partner login</a>
            <a href="tel:5019042929" onClick={() => trackEvent("click_to_call")}><strong>501-904-2929</strong></a>
          </div>
        </div>
      </div>

      <header className="site">
        <div className="wrap">
          <a href="/" aria-label="Easy Rx Cycle home">
            <img className="logo" src="/images/logo-full.png" alt="Easy Rx Cycle" />
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
            <a className="shoplink" href="/#quote">Shop</a>
            <a className="btn btn-primary" href="/#quote">Get a quote <span className="ar">→</span></a>
            <button type="button" className={`menu-btn${open ? " is-open" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>

        {open && (
          <nav className="mobile-nav">
            {MENU.map((it) => <a key={it.label} href={it.href} onClick={() => setOpen(false)}>{it.label}</a>)}
            <a className="mn-shop" href="/#quote" onClick={() => setOpen(false)}>Shop</a>
            <a className="btn btn-primary mn-cta" href="/#quote" onClick={() => setOpen(false)}>Get a quote <span className="ar">→</span></a>
          </nav>
        )}
      </header>
    </>
  );
}
