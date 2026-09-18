import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
