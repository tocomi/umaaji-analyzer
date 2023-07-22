/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({ test: /\.map$/, type: 'json' });

    return config;
  },
};

module.exports = nextConfig;
