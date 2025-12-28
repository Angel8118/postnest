import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/img/:path*",
        destination: "http://localhost:3000/img/:path*",
      },
    ];
  },
};

export default nextConfig;
