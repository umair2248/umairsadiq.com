import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Build a plain static site into /out — upload it to Hostinger's public_html.
  output: "export",
  // Folders with index.html (e.g. /robots.txt stays a file) — works on Apache without rewrites.
  trailingSlash: true,
  images: {
    // Shared hosting has no Next.js image server; images are served as-is.
    unoptimized: true,
  },
  // node_modules is a junction to another drive on this machine (see README).
  // Keep junction paths as-is so webpack never builds cross-drive relative paths.
  webpack: (config, { dev }) => {
    config.resolve.symlinks = false;
    config.resolveLoader = { ...config.resolveLoader, symlinks: false };
    // Native file watching is unreliable through the junction and OneDrive.
    if (dev) config.watchOptions = { ...config.watchOptions, poll: 800, aggregateTimeout: 300 };
    return config;
  },
};

export default nextConfig;
