/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    
    dataRoutes: [
      {
        source: /^\/_next\/data\/development\/{routes}\/daily\.json$/,
        destination: '/daily',
      }
    ]
  }
}

module.exports = nextConfig;
