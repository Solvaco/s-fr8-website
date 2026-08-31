import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/admin", destination: "https://s-fr8-crm.vercel.app/admin" },
      { source: "/admin/:path*", destination: "https://s-fr8-crm.vercel.app/admin/:path*" },
    ];
  },
};

export default nextConfig;
