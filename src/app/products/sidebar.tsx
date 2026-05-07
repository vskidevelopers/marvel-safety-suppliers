"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

interface ProductSidebarProps {
    isMobile?: boolean;
    onClose?: () => void;
}

export function ProductSidebar({ isMobile, onClose }: ProductSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");

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
                        className={`w-full text-left px-3 py-1.5 rounded text-sm ${!currentCategory
                                ? "bg-orange-100 text-orange-600 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        All Products
                    </button>

                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className={`w-full text-left px-3 py-1.5 rounded text-sm ${currentCategory === cat.id
                                    ? "bg-orange-100 text-orange-600 font-medium"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}