import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/welcome", destination: "/welcome-v6.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
