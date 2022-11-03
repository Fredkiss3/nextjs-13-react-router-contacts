import analyze from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // enableUndici: true,
    // runtime: "experimental-edge",
  },
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

const withBundleAnalyzer = analyze({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
