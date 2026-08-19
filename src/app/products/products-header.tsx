"use client";

import { useSearchParams } from "next/navigation";

export function ProductsHeader() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    return (
        <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
                {search ? `Results for "${search}"` : "Safety Equipment Catalog"}
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
                KEBS-certified PPE for construction, healthcare, and industry across Kenya
            </p>
        </div>
    );
}