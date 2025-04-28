import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakestoreapi.com"], // ✅ Allow images from fakestoreapi.com
  },
};

export default nextConfig;
