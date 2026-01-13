/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Desabilita otimização da Vercel - usa Prismic CDN diretamente
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.prismic.io",
            },
        ],
    },
}

module.exports = nextConfig
