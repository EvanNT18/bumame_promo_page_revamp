/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            // !REMOVE THE HTTP ONE ON PROD
            {
                protocol: "http",
                hostname: "*",
            },
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://bumame-promo-cms-service-994213873341.asia-southeast2.run.app',
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
