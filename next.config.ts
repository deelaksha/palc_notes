import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', port: '', pathname: '/**' },
    ],
  },
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: [] as any,
  },
  webpack(config, { isServer }) {
    config.ignoreWarnings = [
      (warn) => warn.message.includes('ENOENT: no such file or directory'),
    ];
    return config;
  },
};

export default nextConfig;
