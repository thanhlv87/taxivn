// Temporarily disable static export to support API routes
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled for API routes compatibility
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/taxi-vietnam/' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/taxi-vietnam' : '',
}

module.exports = nextConfig