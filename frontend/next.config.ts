import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "postnest-rk76.onrender.com" },
    ],
  }, 
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/img/:path*",
          destination: "http://localhost:3000/img/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
