/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true,
        serverComponentsExternalPackages:['mongoose']
    },
    env: {
        BASE_URL_FRONTEND: process.env.BASE_URL_FRONTEND,
        BASE_URL: process.env.BASE_URL,
      }
}

module.exports = nextConfig

