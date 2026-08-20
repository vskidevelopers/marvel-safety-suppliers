"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/lib/hooks/useProducts";

export function FeaturedProducts() {
    const { products, loading } = useProducts();
    const featured = products.filter((p) => p.inStock).slice(0, 4);

    if (loading) {
        return (
            <section className="py-6 md:py-10 bg-gray-50 w-full">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-4">
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900">Popular Safety Gear</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-100 aspect-square rounded-lg animate-pulse" />
                        ))}
                    </div>
                </div>
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
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="relative aspect-square bg-gray-50 p-2">
                                <Image
                                    src={product.primaryImage}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-contain"
                                />
                                {product.certifications.length > 0 && (
                                    <span className="absolute top-2 right-2 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-1 rounded">
                                        {product.certifications[0]}
                                    </span>
                                )}
                            </div>
                            <div className="p-3">
                                <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-10">{product.name}</h3>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-orange-600 font-bold text-lg">KES {product.price.toLocaleString()}</span>
                                    {product.oldPrice && (
                                        <span className="text-gray-500 text-xs line-through">KES {product.oldPrice.toLocaleString()}</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}