import withBundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const isAnalyzerEnabled = process.env.ANALYZE === "true";

const analyzer = withBundleAnalyzer({
  enabled: isAnalyzerEnabled,
});

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudinaryLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nurui.vercel.app",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  compress: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  webpack(config) {
    config.module.rules.push({
      test: /\.tsx?$/,
      resourceQuery: /raw/, // *.tsx?raw
      use: "raw-loader",
    });
    return config;
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
// export default withMDX(nextConfig);
export default analyzer(withMDX(nextConfig));
