"use client";
// Opt-in "email me this cart". Captures an email BEFORE checkout so the abandoned-cart sequence can bring the
// shopper back with their cart rebuilt (see functions/api/save-cart.js). Collapsed to a single link until used.
import { useState } from "react";
import { trackEvent } from "@/lib/track";

type Line = { sku: string; qty: number };

export default function SaveCart({ lines, label = "Not ready to order? Email me this cart", source = "cart" }: { lines: Line[]; label?: string; source?: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "busy") return;
    setState("busy"); setMsg("");
    try {
      const r = await fetch("/api/save-cart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, cart: lines, company_website: hp }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) { setState("err"); setMsg(d.error || "Could not save. Please try again."); return; }
      setState("done");
      trackEvent("save_cart", { source, items: lines.length });
    } catch { setState("err"); setMsg("Could not save. Please try again."); }
  }

  if (state === "done") return <p className="sc-done">Saved. We&rsquo;ll email you a link back to it shortly.</p>;
  if (!open) return <button type="button" className="sc-link" onClick={() => setOpen(true)}>{label}</button>;
  return (
    <form className="sc-form" onSubmit={submit}>
      <label className="sc-lab" htmlFor={`sc-${source}`}>Your email</label>
      <div className="sc-row">
        <input id={`sc-${source}`} type="email" required autoComplete="email" placeholder="you@practice.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="btn btn-ghost" disabled={state === "busy"}>{state === "busy" ? "Saving…" : "Email it"}</button>
      </div>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sc-hp" value={hp} onChange={(e) => setHp(e.target.value)} />
      {msg && <p className="sc-err">{msg}</p>}
      <p className="sc-fine">We&rsquo;ll only use it to send this cart and a couple of reminders. Unsubscribe anytime.</p>
    </form>
  );
}
