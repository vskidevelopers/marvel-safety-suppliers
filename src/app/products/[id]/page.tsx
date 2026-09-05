

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductById } from "@/lib/firebase";
import type { Product } from "@/app/types/product";
import { ProductDetail } from "../product-detail";

async function getProduct(id: string): Promise<Product | null> {
    const result = await fetchProductById(id);
    if (!result.success || !result.data) return null;

    // Firestore returns createdAt/updatedAt as Timestamp instances, which
    // can't cross the server-to-client boundary when passed as props to
    // ProductDetail (a Client Component) — only plain data can. Neither
    // field is used there, so drop them rather than convert them.
    const { createdAt, updatedAt, ...product } = result.data as Product & {
        createdAt?: unknown;
        updatedAt?: unknown;
    };
    return product as Product;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return { title: "Product Not Found | Marvel Safety Suppliers" };
    }

    const title = product.metaTitle || `${product.name} | Marvel Safety Suppliers`;
    const description =
        product.metaDescription ||
        product.shortDescription ||
        product.description ||
        `Buy ${product.name} from Marvel Safety Suppliers — KEBS-certified PPE with nationwide delivery across Kenya.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://marvelsafetysuppliers.co.ke/products/${id}`,
            siteName: "Marvel Safety Suppliers",
            images: product.primaryImage ? [product.primaryImage] : undefined,
            locale: "en_KE",
            type: "website",
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    // ✅ UNWRAP params first
    const { id } = await params;

    if (!id) {
        console.error("❌ No product ID provided");
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">Invalid Product ID</h1>
            </div>
        );
    }

    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.shortDescription || product.description,
        image: product.primaryImage,
        sku: product.sku,
        offers: {
            "@type": "Offer",
            priceCurrency: "KES",
            price: product.price,
            availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            url: `https://marvelsafetysuppliers.co.ke/products/${id}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <ProductDetail productId={id} initialProduct={product} />
        </>
    );
}