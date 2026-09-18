"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchFeaturedProducts, fetchProductById } from "@/lib/firebase";
import { ProductImage } from "@/components/ui/product-image";
import { LogoLoader } from "@/components/ui/logo-loader";
import WhatsAppProductButton from "@/components/ui/whatsapp-product-button";
import type { Product } from "@/app/types/product";

const TOTAL_FEATURED = 8;

// Manually pinned to always appear first in this section — requested
// directly rather than built as a general "featured" toggle, since it's a
// one-off promotion rather than an ongoing merchandising need yet.
const PINNED_PRODUCT_IDS = ["dcRT86MOrEpCYLbP1LJG"];

export function FeaturedProducts() {
    const [featured, setFeatured] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const pinnedResults = await Promise.all(
                PINNED_PRODUCT_IDS.map((id) => fetchProductById(id))
            );
            const pinned = pinnedResults
                .filter((r) => r.success && r.data)
                .map((r) => r.data as Product);

            const remainingSlots = Math.max(TOTAL_FEATURED - pinned.length, 0);
            const result = await fetchFeaturedProducts(remainingSlots + pinned.length);
            if (cancelled) return;

            const rest = result.success
                ? (result.data as Product[]).filter(
                      (p) => !pinned.some((pinnedProduct) => pinnedProduct.id === p.id)
                  )
                : [];

            setFeatured([...pinned, ...rest].slice(0, TOTAL_FEATURED));
            setLoading(false);
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return (
            <section className="py-10 md:py-16 bg-gray-50 w-full">
                <LogoLoader />
            </section>
        );
    }

    if (featured.length === 0) return null;

    return (
        <section className="py-6 md:py-10 bg-gray-50 w-full">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-lg md:text-2xl font-bold text-gray-900">Popular Safety Gear</h2>
                    <Link href="/products" className="text-orange-600 font-bold text-sm hover:underline">
                        View All <ArrowRight className="inline h-4 w-4 ml-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {featured.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                        >
                            <Link href={`/products/${product.id}`}>
                                <div className="relative aspect-square bg-gray-50 p-2">
                                    <ProductImage
                                        src={product.primaryImage}
                                        alt={product.name}
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-contain"
                                    />
                                    {product.certifications.length > 0 && (
                                        <span className="absolute top-2 right-2 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-1 rounded">
                                            {product.certifications[0]}
                                        </span>
                                    )}
                                </div>
                                <div className="p-3 pb-2">
                                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-10">{product.name}</h3>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="text-orange-600 font-bold text-lg">KES {product.price.toLocaleString()}</span>
                                        {product.oldPrice && (
                                            <span className="text-gray-500 text-xs line-through">KES {product.oldPrice.toLocaleString()}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            <div className="px-3 pb-3 mt-auto">
                                <WhatsAppProductButton
                                    productName={product.name}
                                    size="sm"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
