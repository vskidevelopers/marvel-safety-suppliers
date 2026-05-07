"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "./product-card";
// import { MOCK_PRODUCTS } from "@/lib/mock-products";
import { useProducts } from "@/lib/hooks/useProducts";

// ✅ Uses useSearchParams() directly - no props needed
export function ProductGrid() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const { products, loading, error } = useProducts();


    // const filtered = category
    //     ? MOCK_PRODUCTS.filter(p => p.category === category)
    //     : MOCK_PRODUCTS;

    const filtered = category
        ? products.filter(p => p.category === category)
        : products;



    const filteredProducts = filtered.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        image: p.primaryImage,
    }));

    if (filteredProducts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No filteredProducts match your filter</p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-4 text-orange-600 hover:underline text-sm"
                >
                    ← Clear filters
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                    <ProductCard product={product} />
                </Link>
            ))}
        </div>
    );
}