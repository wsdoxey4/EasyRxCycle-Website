"use client";
// Dated site-wide strip for DEA Take Back Day (Sat Oct 24, 2026). Renders nothing on the server (static export)
// and only shows in the browser before the cutoff, so it switches itself off without a redeploy.
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/track";

const HIDE_AFTER = new Date("2026-10-25T00:00:00-05:00");   // off the day after Take Back Day (was Nov 1)

export default function TakeBackBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(Date.now() < HIDE_AFTER.getTime() && !location.pathname.startsWith("/take-back-day")); }, []);
  if (!show) return null;
  return (
    <a className="tbd-bar" href="/take-back-day/" onClick={() => trackEvent("promo_click", { promo: "take_back_day_2026" })}>
      <strong>DEA Take Back Day is Sat, Oct 24.</strong> It&rsquo;s for households &mdash; facilities need compliant destruction every day. <span>See your options &rarr;</span>
    </a>
  );
}
