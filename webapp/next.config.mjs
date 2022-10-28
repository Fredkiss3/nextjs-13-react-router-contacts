import analyze from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    enableUndici: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withBundleAnalyzer = analyze({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
