// IndexNow ping after each deploy: tells Bing (and the other IndexNow engines) which pages are new or changed,
// by diffing the freshly built sitemap against the one that was live before this deploy.
// Usage: node scripts/indexnow.mjs out/sitemap.xml /tmp/live-sitemap.xml   (second file optional; missing = submit nothing)
// Never fails the deploy: every error is logged and the script exits 0.
import { readFileSync, existsSync } from "node:fs";

const KEY = "17ca2b73a1b0127c317fe004e6426fee"; // public/<KEY>.txt
const HOST = "easyrxcycle.com";

const parse = (xml) => {
  const m = new Map();
  for (const u of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(u[1])?.[1];
    if (loc) m.set(loc.trim(), /<lastmod>([^<]+)<\/lastmod>/.exec(u[1])?.[1] || "");
  }
  return m;
};

try {
  const [newPath, oldPath] = process.argv.slice(2);
  const next = parse(readFileSync(newPath, "utf8"));
  const prev = oldPath && existsSync(oldPath) ? parse(readFileSync(oldPath, "utf8")) : null;
  if (!prev || prev.size < 50) { console.log("indexnow: no usable live sitemap to compare; skipping"); process.exit(0); }
  const urls = [...next].filter(([loc, mod]) => loc.startsWith(`https://${HOST}/`) && prev.get(loc) !== mod).map(([loc]) => loc).slice(0, 10000);
  if (!urls.length) { console.log("indexnow: no new or changed pages"); process.exit(0); }
  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
  });
  console.log(`indexnow: submitted ${urls.length} URL(s) -> HTTP ${r.status}`);
  urls.slice(0, 20).forEach((u) => console.log("  " + u));
} catch (e) {
  console.log("indexnow: skipped (" + e.message + ")");
}
