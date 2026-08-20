"use client";

import { Suspense } from "react";
import { ProductGrid } from "./product-grid";
import { ProductSidebar } from "./sidebar";
import { FiltersModal } from "./filters-modal";
import { ProductsHeader } from "./products-header";
import { useProducts } from "@/lib/hooks/useProducts";
import { LogoLoader } from "@/components/ui/logo-loader";

export default function ProductsPage() {
  const { loading, error } = useProducts();

  if (loading) return <LogoLoader className="py-24" />;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

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