/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['storage.ko-fi.com'],
  },
    async headers() {
        return [
          {
            source: "/:path*",
            headers: [
              { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
              { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
            ],
          },
        ];
      },
};

module.exports = nextConfig;