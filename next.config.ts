import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/OSEYI.png",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
