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
    // Was 60s, meaning almost every visitor triggered a fresh, slow re-optimization
    // of the same image. A week is safe here since Cloudinary URLs are versioned —
    // a genuinely new upload gets a new URL, so this doesn't risk serving stale images.
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;
