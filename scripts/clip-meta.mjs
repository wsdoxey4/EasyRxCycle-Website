// Post-build meta trimmer. Clips <meta name="description"> to <=160 chars (Google truncates ~155-160)
// and conservatively shortens over-long <title> tags — across every built HTML page, so we never edit
// 130+ source files by hand. Only the SERP description + title tags are touched; OG/JSON-LD text is
// left intact (those have longer limits and are set from the same source constants).
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const DESC_MAX = 160;
const TITLE_MAX = 62;

function clipDesc(s) {
  if (s.length <= DESC_MAX) return s;
  let cut = s.slice(0, DESC_MAX - 2);
  const sp = cut.lastIndexOf(" ");
  if (sp > 120) cut = cut.slice(0, sp);
  return cut.replace(/[\s,;:.–—-]+$/, "");
}

function clipTitle(s) {
  if (s.length <= TITLE_MAX) return s;
  // 1) Prefer dropping a trailing brand/category segment — but only if it keeps a substantial title.
  for (const sep of [" | ", " — ", " – ", " - "]) {
    const i = s.lastIndexOf(sep);
    if (i > 0) {
      const short = s.slice(0, i);
      if (short.length >= 42 && short.length <= TITLE_MAX) return short;
    }
  }
  // 2) Otherwise word-clip at <=60 so we keep as much keyword real estate as possible.
  let cut = s.slice(0, TITLE_MAX - 2);
  const sp = cut.lastIndexOf(" ");
  if (sp > 40) cut = cut.slice(0, sp);
  return cut.replace(/[\s|—–-]+$/, "");
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
