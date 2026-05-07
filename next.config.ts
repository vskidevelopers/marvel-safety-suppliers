import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Allow images from your domains
    domains: [
      "nairobisafetywear.co.ke",
      "res.cloudinary.com", // ← Cloudinary
      "marvelsafety.co.ke", // ← Your own domain (if hosting images)
      "images.unsplash.com", // ← Optional: for placeholder images
    ],
    // Optional: set default quality
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
