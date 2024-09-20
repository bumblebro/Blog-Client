// next.config.mjs

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      { unoptimized: true },
      {
        protocol: "https",
        hostname: "**", // Double asterisk allows any subdomain
        port: "",
        pathname: "/**", // Allows all paths
      },
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
