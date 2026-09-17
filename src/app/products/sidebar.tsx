"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import { useProducts } from "@/lib/hooks/useProducts";

interface ProductSidebarProps {
    isMobile?: boolean;
    onClose?: () => void;
}

export function ProductSidebar({ isMobile, onClose }: ProductSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");
    const { products } = useProducts();

    const counts = useMemo(() => {
        const map: Record<string, number> = {};
        for (const product of products) {
            map[product.category] = (map[product.category] || 0) + 1;
        }
        return map;
    }, [products]);

    const handleCategoryClick = (categoryId: string | null) => {
        const params = new URLSearchParams();
        if (categoryId) {
            params.set("category", categoryId);
        }

        router.push(`${pathname}?${params.toString()}`);
        if (onClose) onClose();
    };

    return (
        <div className={isMobile ? "py-2" : "sticky top-24 space-y-6"}>
            <div>
                <h3 className="font-bold text-gray-900 mb-3 text-sm">
                    {isMobile ? "Filter by Category" : "Product Categories"}
                </h3>
                <div className="space-y-1">
                    <button
                        onClick={() => handleCategoryClick(null)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-sm ${!currentCategory
                                ? "bg-orange-100 text-orange-600 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <span>All Products</span>
                        <span className="text-xs text-gray-400">{products.length}</span>
                    </button>

                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-sm ${currentCategory === cat.id
                                    ? "bg-orange-100 text-orange-600 font-medium"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <span>{cat.name}</span>
                            <span className="text-xs text-gray-400">{counts[cat.id] || 0}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
