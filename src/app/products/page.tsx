"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

        <Link
          href="/corporate"
          className="group flex items-center justify-between gap-3 mb-6 px-4 py-3 rounded-lg bg-orange-50 border border-orange-200 hover:border-orange-400 transition-colors"
        >
          <span className="text-sm font-medium text-gray-800">
            <span className="relative inline-flex h-2 w-2 mr-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-600" />
            </span>
            Buying for your company? We also serve corporate/bulk orders.
          </span>
          <span className="flex items-center gap-1 text-orange-600 font-bold text-sm shrink-0">
            Corporate/Bulk Orders
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

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