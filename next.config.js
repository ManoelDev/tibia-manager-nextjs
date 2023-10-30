/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tibiawiki.com.br',
        port: '',
        pathname: '/**',
      },
    ]
  }
}

module.exports = nextConfig