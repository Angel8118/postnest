import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const backendUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

let backendPattern: RemotePattern | null = null;
try {
  const parsed = new URL(backendUrl);
  backendPattern = {
    protocol: parsed.protocol.replace(":", "") as "http" | "https",
    hostname: parsed.hostname,
    port: parsed.port || undefined,
    pathname: parsed.pathname !== "/" ? parsed.pathname : undefined,
  };
} catch {
  backendPattern = null;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      ...(backendPattern ? [backendPattern] : []),
    ],
  },
  async rewrites() {
    const backendImgBase = backendUrl.replace(/\/$/, "");

    return {
      beforeFiles: [
        {
          source: "/img/:path*",
          destination: `${backendImgBase}/img/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
