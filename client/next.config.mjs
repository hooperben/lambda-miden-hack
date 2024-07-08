/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config, options) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

export default nextConfig;
