"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-products";

// Select 4 featured products (in-stock, from key categories)
const getFeaturedProducts = () => {
    return MOCK_PRODUCTS
        .filter(p => p.inStock)
        .sort(() => 0.5 - Math.random()) // shuffle
        .slice(0, 4);
};

export function FeaturedProducts() {
    const [featured, setFeatured] = useState(MOCK_PRODUCTS.slice(0, 4));

    useEffect(() => {
        // Simulate "fetching from DB" with slight delay
        const timer = setTimeout(() => {
            setFeatured(getFeaturedProducts());
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-16 bg-gray-50 w-full">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Safety Gear</h2>
                        <p className="text-gray-600">Top-rated wearable PPE trusted by Kenyan professionals</p>
                    </div>
                    <Link href="/products" className="text-orange-600 font-bold hover:underline hidden md:block">
                        View All Products <ArrowRight className="inline h-4 w-4 ml-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="relative aspect-square bg-gray-100">
                                <img
                                    src={product.primaryImage}
                                    alt={product.name}
                                    className="object-cover w-full h-full"
                                />
                                {product.certifications.length > 0 && (
                                    <span className="absolute top-2 right-2 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-1 rounded">
                                        {product.certifications[0]}
                                    </span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 mb-1 text-sm line-clamp-2">{product.name}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-orange-600 font-bold text-lg">KES {product.price.toLocaleString()}</span>
                                    {product.oldPrice && (
                                        <span className="text-gray-500 text-sm line-through">KES {product.oldPrice.toLocaleString()}</span>
                                    )}
                                </div>
                                <Link
                                    href={`/products`}
                                    className="mt-4 w-full block text-center border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-medium py-2 rounded transition-colors text-sm"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/products" className="text-orange-600 font-bold hover:underline">
                        View All Products <ArrowRight className="inline h-4 w-4 ml-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}