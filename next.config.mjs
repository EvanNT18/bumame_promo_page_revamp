/** @type {import('next').NextConfig} */
const nextConfig = {
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
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
