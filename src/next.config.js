/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Traces the minimal set of files/deps actually needed at runtime into
  // .next/standalone, so the production image doesn't need the full
  // node_modules or source tree — see Dockerfile.
  output: 'standalone',
};

module.exports = nextConfig;
