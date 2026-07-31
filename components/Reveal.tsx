"use client";

import { useEffect } from "react";

/**
 * Progressive scroll-reveal. Adds `.reveal` to key blocks, then flips them to
 * `.in` as they enter the viewport. No-JS / no-IO fallback shows everything.
 */
export default function Reveal() {
  useEffect(() => {
    const sel =
      ".shead,.lane,.svc,.step,.why,.quote,.finalcta,.hero .hcard";
    document.querySelectorAll(sel).forEach((el) => el.classList.add("reveal"));

    const all = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      all.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    all.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
