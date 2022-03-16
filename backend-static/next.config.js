/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/listing',
  webpack: function (config, { dev }) {
    if (dev) {
      config.watchOptions = {
        aggregateTimeout: 200,
        poll: 1000,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
