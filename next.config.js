/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/product",
        destination: "/",
        permanent: true,
      },
    ]
  },
  images: {
    domains: [`cdn.eraspace.com`],
  },
}

module.exports = nextConfig
