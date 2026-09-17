import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  // Get all your pages
  const pages = [
    { url: "https://marvelsafetysuppliers.co.ke", lastModified: new Date() },
    { url: "https://marvelsafetysuppliers.co.ke/products", lastModified: new Date() },
    { url: "https://marvelsafetysuppliers.co.ke/contact", lastModified: new Date() },
    { url: "https://marvelsafetysuppliers.co.ke/about", lastModified: new Date() },
    { url: "https://marvelsafetysuppliers.co.ke/categories", lastModified: new Date() },
    { url: "https://marvelsafetysuppliers.co.ke/corporate", lastModified: new Date() },
    // SEO landing pages targeting high-intent search terms
    { url: "https://marvelsafetysuppliers.co.ke/ppe-supplier-kenya", lastModified: new Date() },
    { url: "https://marvelsafetysuppliers.co.ke/safety-boots-kenya", lastModified: new Date() },
    { url: "https://marvelsafetysuppliers.co.ke/workwear-kenya", lastModified: new Date() },
    { url: "https://marvelsafetysuppliers.co.ke/corporate-ppe-kenya", lastModified: new Date() },
    { url: "https://marvelsafetysuppliers.co.ke/custom-uniforms-kenya", lastModified: new Date() },
  ];

  // Add dynamic product pages
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productPages = productsSnapshot.docs.map((doc) => ({
      url: `https://marvelsafetysuppliers.co.ke/products/${doc.id}`,
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
