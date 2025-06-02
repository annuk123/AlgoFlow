/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },

  experimental: {
    
    // dataRoutes: [
    //   {
    //     source: /^\/_next\/data\/development\/{routes}\/daily\.json$/,
    //     destination: '/daily',
    //   }
    // ]


  }
}

module.exports = nextConfig;
