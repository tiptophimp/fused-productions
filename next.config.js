/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  serverExternalPackages: ['@prisma/client', 'bcryptjs', 'stripe', 'nodemailer'],
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './src/lib/modern-polyfill.js',
      'next/dist/build/polyfills/polyfill-module': './src/lib/modern-polyfill.js',
    },
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '../build/polyfills/polyfill-module': false,
      'next/dist/build/polyfills/polyfill-module': false,
    };
    return config;
  },
};

module.exports = nextConfig;
