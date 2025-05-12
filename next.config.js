/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // cat next.config.js WARN cat next.config.js
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // cat next.config.js WARN cat next.config.js
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig