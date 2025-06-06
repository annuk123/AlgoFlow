/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", 'ui-avatars.com'],
     
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
