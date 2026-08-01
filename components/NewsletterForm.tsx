"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/track";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    const fd = new FormData(e.currentTarget);
    const data = {
      email: String(fd.get("email") || ""),
      company_website: String(fd.get("company_website") || ""),
      pageUri: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json().catch(() => ({ ok: false }));
      if (j.ok) { setStatus("ok"); trackEvent("newsletter_signup", { form: "newsletter" }); }
      else { setStatus("error"); setErr(j.error || "Something went wrong."); }
    } catch {
      setStatus("error");
      setErr("Network error — try again.");
    }
  }

  if (status === "ok") {
    return <p className="news-ok">✓ You&rsquo;re on the list. Check your inbox.</p>;
  }

  return (
    <form className="news-form" onSubmit={onSubmit}>
      <input
        name="email"
        type="email"
        required
        placeholder="Your work email"
        aria-label="Email address"
        autoComplete="email"
      />
      <input className="hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "…" : "Subscribe"}
      </button>
      {status === "error" && <span className="news-err">{err}</span>}
    </form>
  );
}
