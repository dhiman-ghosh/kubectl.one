/**
 * @type {import('next').NextConfig}
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*' // Proxy to Backend
      }
    ]
  }
};

module.exports = withBundleAnalyzer({
  ...nextConfig
})