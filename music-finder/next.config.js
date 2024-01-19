/** @type {import('next').NextConfig} */
const nextConfig = {}

// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'i.scdn.co',
        },
      ],
    },
  };
  