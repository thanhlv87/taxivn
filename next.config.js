/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/taxi-vietnam/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/taxi-vietnam' : '',
}

module.exports = nextConfig