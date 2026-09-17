"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "./product-card";
// import { MOCK_PRODUCTS } from "@/lib/mock-products";
import { useProducts } from "@/lib/hooks/useProducts";
import { LogoLoader } from "@/components/ui/logo-loader";

// ✅ Uses useSearchParams() directly - no props needed
export function ProductGrid() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
    const { products, loading, error } = useProducts();

    if (loading) {
        return <LogoLoader className="py-24" />;
    }

    const filtered = products.filter((p) => {
        const matchesCategory = !category || p.category === category;
        const matchesSearch =
            !search ||
            p.name.toLowerCase().includes(search) ||
            p.sku?.toLowerCase().includes(search);
        return matchesCategory && matchesSearch;
    });



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
                <p className="text-gray-500">
                    {search ? `No products match "${searchParams.get("search")}"` : "No products match your filter"}
                </p>
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
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}