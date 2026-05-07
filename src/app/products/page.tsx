"use client";

import { Suspense, useState } from "react";
import { ProductGrid } from "./product-grid";
import { ProductSidebar } from "./sidebar";
import { FiltersModal } from "./filters-modal";
import { ProductsHeader } from "./products-header";
import { useProducts } from "@/lib/hooks/useProducts";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.sku?.toLowerCase().includes(search.toLowerCase())
  );



  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 aspect-square rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;


  console.log("Filtered Profucts  >> ", filteredProducts);
  console.log("fetched Products >> ", products);



  return (
    // ✅ Wrap ENTIRE page content in Suspense
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <div className="container mx-auto px-4 py-6">
        <ProductsHeader />

        <div className="lg:hidden mb-6">
          <FiltersModal />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block lg:w-1/4">
            <ProductSidebar />
          </div>

          <div className="w-full lg:w-3/4">
            {/* ✅ No props passed - ProductGrid uses useSearchParams() directly */}
            <ProductGrid />
          </div>
        </div>
      </div>
    </Suspense>
  );
}