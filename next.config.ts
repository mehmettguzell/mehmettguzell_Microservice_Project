import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/product/:path*',
        destination: process.env.PRODUCT_SERVICE_URL + '/:path*',
      },
      {
        source: '/api/inventory/:path*',
        destination: process.env.INVENTORY_SERVICE_URL + '/:path*',
      },
      {
        source: '/api/order/:path*',
        destination: process.env.ORDER_SERVICE_URL + '/:path*',
      },
    ];
  }
};

export default nextConfig;
