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
      {
        protocol: 'https',
        hostname: 'www.progamo.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'progamo.com.br',
        port: '',
        pathname: '/**',
      },
    ]
  },
  experimental: {
		serverActions: {
			allowedForwardedHosts: ['localhost', 'progamo.com.br'],
			allowedOrigins: ['http://localhost', 'progamo.com.br', 'http://progamo.com.br', 'https://www.progamo.com.br']
		},
	}
}

module.exports = nextConfig
