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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sora.chatgpt.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
