/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SCOPE: process.env.SCOPE
  },
  reactStrictMode: true,
  //basePath: '/listing',
  webpack: function (config, { dev }) {
    if (dev) {
      config.watchOptions = {
        aggregateTimeout: 200,
        poll: 1000,
      };
    }

    return config;
  },
  experimental: {
    outputStandalone: true,
  }
};

module.exports = nextConfig;
