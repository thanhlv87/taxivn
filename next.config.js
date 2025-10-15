// Enable static export for GitHub Pages
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/taxivn/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/taxivn' : '',
}

module.exports = nextConfig