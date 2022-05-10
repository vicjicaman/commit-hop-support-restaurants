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
  },
  async headers() {
    return [
      {
        source: '/flags',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public,max-age=31536000,immutable',
          },
        ]
      }]
  }
};

module.exports = nextConfig;
