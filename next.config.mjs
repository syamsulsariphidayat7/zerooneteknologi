/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Gambar dilayani next/image dalam AVIF/WebP (fallback ke format asli)
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Aset statis template (gambar di public/assets) — cache panjang di browser/CDN
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
