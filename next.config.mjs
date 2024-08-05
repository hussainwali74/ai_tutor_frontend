/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
          },
          {
            protocol: 'https',
            hostname: 'placehold.co',
          },
        ],
      },
};

export default nextConfig;
