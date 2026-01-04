import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "http", hostname: "localhost" },
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
