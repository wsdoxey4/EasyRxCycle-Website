// Post-build meta trimmer. Clips <meta name="description"> to <=160 chars (Google truncates ~155-160)
// and conservatively shortens over-long <title> tags — across every built HTML page, so we never edit
// 130+ source files by hand. Only the SERP description + title tags are touched; OG/JSON-LD text is
// left intact (those have longer limits and are set from the same source constants).
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const DESC_MAX = 160;
const TITLE_MAX = 62;

// Visible length: the built HTML escapes "&" as "&amp;" etc., which would otherwise count as 5 characters.
const vlen = (s) => s.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, "x").length;

function clipDesc(s) {
  if (vlen(s) <= DESC_MAX) return s;
  let cut = s.slice(0, DESC_MAX - 2);
  while (vlen(cut) < DESC_MAX - 2 && cut.length < s.length) cut = s.slice(0, cut.length + 1);
  cut = cut.replace(/&[a-z#0-9]*$/i, "");   // never leave a half entity
  const sp = cut.lastIndexOf(" ");
  if (sp > 120) cut = cut.slice(0, sp);
  return cut.replace(/[\s,;:.–—-]+$/, "").replace(/\s&amp;$/, "");
}

function clipTitle(s) {
  if (vlen(s) <= TITLE_MAX) return s;
  // Drop the trailing " — Easy Rx Cycle" brand segment so the keywords fit. Never word-clip the rest:
  // a mid-phrase cut ("…Rules & Your") reads as broken in search results, while an over-long title is
  // simply shown with Google's own ellipsis and still counts in full for relevance.
  for (const sep of [" | ", " — ", " – ", " - "]) {
    const i = s.lastIndexOf(sep);
    if (i > 0 && / ?Easy Rx Cycle$/.test(s.slice(i + sep.length))) return s.slice(0, i);
  }
  return s;
}

function walk(dir) {
  let n = 0, dTrim = 0, tTrim = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      const r = walk(p); n += r.n; dTrim += r.dTrim; tTrim += r.tTrim;
    } else if (e.name.endsWith(".html")) {
      let html = fs.readFileSync(p, "utf8");
      let changed = false;
      html = html.replace(/<meta name="description" content="([^"]*)"/, (m, d) => {
        const c = clipDesc(d);
        if (c !== d) { changed = true; dTrim++; }
        return `<meta name="description" content="${c}"`;
      });
      html = html.replace(/<title>([^<]*)<\/title>/, (m, t) => {
        const c = clipTitle(t);
        if (c !== t) { changed = true; tTrim++; }
        return `<title>${c}</title>`;
      });
      if (changed) { fs.writeFileSync(p, html); n++; }
    }
  }
  return { n, dTrim, tTrim };
}

if (!fs.existsSync(OUT)) { console.log("[clip-meta] no out/ — skipping"); process.exit(0); }
const r = walk(OUT);
console.log(`[clip-meta] trimmed ${r.dTrim} descriptions + ${r.tTrim} titles across ${r.n} pages`);
