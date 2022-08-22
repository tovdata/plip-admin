/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/server/:path*',
        destination: 'https://api.plip.kr/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
