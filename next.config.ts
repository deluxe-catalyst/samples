import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/blackpage',
        destination: '/blackpage/index.html',
      },
    ];
  },
};

export default nextConfig;
