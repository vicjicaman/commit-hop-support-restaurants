/** @type {import('next').NextConfig} */
const nextConfig = {
  // Will be available on both server and client
  //publicRuntimeConfig: {
  //  NEXT_PUBLIC_SCOPE: "www",
  //},
  //env: {
  //  NEXT_PUBLIC_SCOPE: "www"
  //},
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
