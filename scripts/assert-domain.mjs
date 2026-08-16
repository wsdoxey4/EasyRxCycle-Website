// Post-build safety check. On a PRODUCTION build (NEXT_PUBLIC_INDEXABLE=true) it fails the build if
// the staging domain leaked into the output or the production URL is missing — so we can never ship
// with canonicals/sitemap/OG pointing at the pages.dev staging domain. Staging builds are skipped.
import fs from "node:fs";

const indexable = (process.env.NEXT_PUBLIC_INDEXABLE || "").trim() === "true";
if (!indexable) {
  console.log("[assert-domain] staging build (NEXT_PUBLIC_INDEXABLE != true) — skipping domain check");
  process.exit(0);
}

const url = (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/$/, "");
const STAGING = "easyrxcycle-website.pages.dev";
const errs = [];

if (!/^https:\/\//.test(url)) errs.push(`NEXT_PUBLIC_SITE_URL is not a production https URL (got "${url}")`);

let html = "";
try { html = fs.readFileSync("out/index.html", "utf8"); }
catch { errs.push("out/index.html not found — did the build produce static output?"); }

if (html) {
  if (html.includes(STAGING)) errs.push(`staging domain "${STAGING}" leaked into out/index.html on a production build`);
  if (url && !html.includes(url)) errs.push(`production URL "${url}" not found in out/index.html (canonical/OG may be wrong)`);
}

// also spot-check the sitemap
try {
  const sm = fs.readFileSync("out/sitemap.xml", "utf8");
  if (sm.includes(STAGING)) errs.push(`staging domain leaked into out/sitemap.xml`);
} catch { /* sitemap optional */ }

if (errs.length) {
  console.error("[assert-domain] FAILED production domain check:\n" + errs.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log(`[assert-domain] OK — production domain ${url} verified, no staging leaks`);
