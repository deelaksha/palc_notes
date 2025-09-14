
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', port: '', pathname: '/**' },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        '**/*.prompt': {
          loader: 'raw-loader',
        },
      },
    },
  },
  webpack(config, { isServer }) {
    config.ignoreWarnings = [
      (warn) => warn.message.includes('ENOENT: no such file or directory'),
    ];

    config.module.rules.push({
      test: /\.prompt$/,
      use: 'raw-loader',
    });

    return config;
  },
};

export default nextConfig;
