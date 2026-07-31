import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — Cloudflare Pages serves the generated /out directory.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
