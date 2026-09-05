import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/cart", "/checkout", "/login"],
    },
    sitemap: "https://marvelsafetysuppliers.co.ke/sitemap.xml",
  };
}
