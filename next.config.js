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
	},
  async headers() {
    return [
      {
        // matching all API routes
        // https://vercel.com/guides/how-to-enable-cors
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://dev.progamo.com.br" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
