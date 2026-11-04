"use client";

import { useEffect, useState } from "react";

// The portal's unsub function does the suppression. Email links land here (the function redirects GETs to this page)
// so link scanners that open every URL never unsubscribe anyone: only the button's POST does.
const FN = "https://vaqcgzjgcdbqzhtxclyx.supabase.co/functions/v1/unsub";

export default function UnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  useEffect(() => {
    setEmail((new URLSearchParams(window.location.search).get("e") || "").trim());
  }, []);

  async function unsubscribe() {
    setState("busy");
    try {
      const r = await fetch(`${FN}?e=${encodeURIComponent(email)}`, { method: "POST" });
      setState(r.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="lead">You&rsquo;re unsubscribed. You won&rsquo;t receive any more marketing emails from Easy Rx Cycle. Order confirmations and replies to your own requests will still reach you.</p>;
  }
  if (!email.includes("@")) {
    return <p className="lead">We couldn&rsquo;t read your email address from that link. Email <a href="mailto:info@easyrxcycle.com">info@easyrxcycle.com</a> and we&rsquo;ll remove you.</p>;
  }
  return (
    <div>
      <p className="lead"><strong>{email}</strong> will stop receiving our marketing emails.</p>
      <button className="btn btn-primary" style={{ marginTop: "18px" }} onClick={unsubscribe} disabled={state === "busy"}>
        {state === "busy" ? "Unsubscribing…" : "Unsubscribe"}
      </button>
      {state === "error" && <p style={{ marginTop: "14px" }}>Something went wrong. Email <a href="mailto:info@easyrxcycle.com">info@easyrxcycle.com</a> and we&rsquo;ll remove you.</p>}
    </div>
  );
}
