import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.watchOptions = {
      ignored: ["**/node_modules", "**/.git", "**/C:/Users/**"],
    };
    return config;
  },
  images: {
    remotePatterns: [new URL("https://i.ibb.co/**")],
  },
};

export default nextConfig;
