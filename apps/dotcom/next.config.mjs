/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true, // https://stackoverflow.com/a/72842944
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/terms',
        destination: '/terms.html',
      },
      {
        source: '/privacy',
        destination: '/privacy.html',
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
