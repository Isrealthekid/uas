import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/products", destination: "/#fleet", permanent: true },
      { source: "/drones", destination: "/#fleet", permanent: true },
      { source: "/portfolio", destination: "/projects", permanent: true },
      { source: "/press", destination: "/news", permanent: true },
      ...["argini", "arsenio", "xander", "bfly", "damisa"].map((slug) => ({
        source: `/drones/${slug}`,
        destination: `/fleet/${slug}`,
        permanent: true,
      })),
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
