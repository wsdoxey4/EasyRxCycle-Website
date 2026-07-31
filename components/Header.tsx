"use client";

import { useState } from "react";

const NAV = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Who we serve", href: "/#industries" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Resources", href: "/resources" },
  { label: "Partners", href: "/#partners" },
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
            <a href="tel:5019042929"><strong>501-904-2929</strong></a>
          </div>
        </div>
      </div>

      <header className="site">
        <div className="wrap">
          <a href="/" aria-label="Easy Rx Cycle home">
            <img className="logo" src="/images/logo-full.png" alt="Easy Rx Cycle" />
          </a>
          <nav className="main">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <div className="hactions">
            <a className="shoplink" href="/#solutions">Shop</a>
            <a className="btn btn-primary" href="/get-a-quote">
              Get a quote <span className="ar">→</span>
            </a>
            <button
              type="button"
              className={`menu-btn${open ? " is-open" : ""}`}
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {open && (
          <nav className="mobile-nav">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
            ))}
            <a className="mn-shop" href="/#solutions" onClick={() => setOpen(false)}>Shop</a>
            <a className="btn btn-primary mn-cta" href="/#solutions" onClick={() => setOpen(false)}>
              Get a quote <span className="ar">→</span>
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
