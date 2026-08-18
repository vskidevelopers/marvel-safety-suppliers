import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "nairobisafetywear.co.ke" },
      { protocol: "https", hostname: "res.cloudinary.com" }, // ← Cloudinary
      { protocol: "https", hostname: "marvelsafety.co.ke" }, // ← Your own domain (if hosting images)
      { protocol: "https", hostname: "images.unsplash.com" }, // ← Optional: for placeholder images
    ],
    // Optional: set default quality
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
