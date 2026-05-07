import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  // Get all your pages
  const pages = [
    { url: "https://marvelsafety.co.ke", lastModified: new Date() },
    { url: "https://marvelsafety.co.ke/products", lastModified: new Date() },
    { url: "https://marvelsafety.co.ke/contact", lastModified: new Date() },
    // Add other static pages
  ];

  // Add dynamic product pages
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productPages = productsSnapshot.docs.map((doc) => ({
      url: `https://marvelsafety.co.ke/products/${doc.id}`,
      lastModified: new Date(),
    }));
    pages.push(...productPages);
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
  )
  .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
