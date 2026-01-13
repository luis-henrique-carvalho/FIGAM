/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.prismic.io",
            },
        ],
        formats: ["image/webp"],
        minimumCacheTTL: 2678400,
        deviceSizes: [640, 1080, 1920],
        imageSizes: [128, 256, 384],
    },
}

module.exports = nextConfig
