import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import OrderConfirmed from "@/components/OrderConfirmed";
import { SITE, abs } from "@/lib/site";

const PATH = "/shop/success";
const TITLE = "Order Confirmed — Easy Rx Cycle";

export const metadata: Metadata = {
  title: TITLE,
  description: "Thank you for your order. Your mail-back kit is on its way.",
  alternates: { canonical: PATH },
  robots: { index: false, follow: false },
  openGraph: { type: "website", title: TITLE, description: "Your order is confirmed.", url: abs(PATH), images: [{ url: SITE.ogImage }] },
};

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="subhero">
          <div className="wrap" style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
            <div className="ok-check" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M5 12l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <span className="eyebrow" style={{ marginTop: "18px", display: "inline-block" }}>Order confirmed</span>
            <h1 className="ph1">Thank you — your kit is <span style={{ color: "var(--teal)" }}>on its way.</span></h1>
            <p className="lead" style={{ marginTop: "18px" }}>
              We&rsquo;ve emailed your receipt. Your prepaid mail-back kit will arrive shortly — fill it, seal it, and drop it in the
              mail with the enclosed return label. We&rsquo;ll destroy the contents and send your Certificate of Destruction.
            </p>
            <OrderConfirmed />
            <div className="cta" style={{ display: "flex", gap: "13px", marginTop: "30px", justifyContent: "center", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="/shop">Back to shop <span className="ar">→</span></a>
              <a className="btn btn-ghost" href="tel:5019042929">Questions? 501-904-2929</a>
            </div>
          </div>
        </section>

        <section className="sec how" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <div className="shead"><span className="eyebrow">What happens next</span><h2>From your door to documented destruction.</h2></div>
            <div className="flow">
              <div className="step"><div className="n">1</div><h4>Kit ships</h4><p>Your prepaid kit is on its way to the address you provided.</p></div>
              <div className="step"><div className="n">2</div><h4>Fill &amp; seal</h4><p>Use it until full, then seal the tamper-evident closure.</p></div>
              <div className="step"><div className="n">3</div><h4>Mail it back</h4><p>Drop it with any carrier using the enclosed prepaid label.</p></div>
              <div className="step"><div className="n">4</div><h4>Certificate</h4><p>We destroy it and send your Certificate of Destruction.</p></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
