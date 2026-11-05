import type { Metadata } from "next";
import CheckoutV2 from "@/components/CheckoutV2";

export const metadata: Metadata = {
  title: "Secure Checkout — Easy Rx Cycle",
  description: "Complete your order securely.",
  robots: { index: false, follow: false },   // preview of the phone-first checkout — never index
};

// Slim page: logo + phone only (no site menu, signup form or footer to wander off through).
export default function Page() {
  return (
    <>
      <header className="co2-top">
        <a href="/" aria-label="Easy Rx Cycle home"><img src="/images/logo-full.png" alt="Easy Rx Cycle" width={160} height={27} style={{ height: "auto", width: 150 }} /></a>
        <a className="co2-top-call" href="tel:5019042929">Questions? 501-904-2929</a>
      </header>
      <main id="main">
        <section className="sec co2-sec">
          <div className="wrap" style={{ maxWidth: "1040px" }}>
            <h1 className="ph1 co2-h1">Secure checkout</h1>
            <CheckoutV2 />
          </div>
        </section>
      </main>
      <footer className="co2-foot">
        <a href="/shop/">Back to the shop</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/shipping-policy/">Shipping</a> · <a href="/returns/">Returns</a>
      </footer>
    </>
  );
}
