"use client";
import { useEffect, useRef, useState } from "react";
import { STRIPE_PK } from "@/lib/site";

const STORE_KEY = "erx_cart_v2";

function loadStripeJs(): Promise<any> {
  return new Promise((resolve, reject) => {
    const w = window as any;
    if (w.Stripe) return resolve(w.Stripe);
    const s = document.createElement("script");
    s.src = "https://js.stripe.com/v3/";
    s.async = true;
    s.onload = () => (w.Stripe ? resolve(w.Stripe) : reject(new Error("stripe unavailable")));
    s.onerror = () => reject(new Error("stripe.js failed to load"));
    document.head.appendChild(s);
  });
}

// On-domain embedded Stripe Checkout. Reads the cart from localStorage (written by CartProvider),
// creates an embedded session, and mounts it here — the customer never leaves easyrxcycle.com.
export default function EmbeddedCheckout() {
  const started = useRef(false);
  const [state, setState] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    (async () => {
      let cart: any[] = [];
      try { cart = JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); } catch {}
      if (!Array.isArray(cart) || !cart.length) { setState("empty"); return; }
      if (!STRIPE_PK) { setErr("Checkout isn’t configured yet. Please call 501-904-2929 to order."); setState("error"); return; }
      try {
        const r = await fetch("/api/checkout", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cart, embedded: true }),
        });
        const j = await r.json();
        if (!j.ok || !j.clientSecret) { setErr(j.error || "Could not start checkout. Please call 501-904-2929."); setState("error"); return; }
        const Stripe = await loadStripeJs();
        const stripe = Stripe(STRIPE_PK);
        const checkout = await stripe.initEmbeddedCheckout({ clientSecret: j.clientSecret });
        checkout.mount("#erx-embedded-checkout");
        setState("ready");
      } catch {
        setErr("Could not reach checkout. Please try again, or call 501-904-2929.");
        setState("error");
      }
    })();
  }, []);

  if (state === "empty") {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <h1 className="ph1" style={{ fontSize: "clamp(24px,3vw,32px)" }}>Your cart is empty</h1>
        <p className="lead" style={{ margin: "12px auto 22px", maxWidth: "44ch" }}>Add a mail-back kit to get started — prepaid, documented destruction, no contract.</p>
        <a className="btn btn-primary" href="/shop">Browse kits <span className="ar">→</span></a>
      </div>
    );
  }
  return (
    <>
      {state === "error" && (
        <div className="lm-err" style={{ padding: "16px 18px", marginBottom: 16 }}>
          {err} — <a href="/shop" style={{ color: "var(--teal)", fontWeight: 600 }}>back to shop</a>
        </div>
      )}
      {state === "loading" && <p className="lead" style={{ textAlign: "center", padding: "24px 0" }}>Loading secure checkout…</p>}
      <div id="erx-embedded-checkout" />
    </>
  );
}
