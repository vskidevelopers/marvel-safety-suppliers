"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteProductModal } from "./delete-product-modal";
import { toast } from "sonner";
import { useProducts } from "@/lib/hooks/useProducts";
import type { Product } from "@/app/types/product";

// Status config
const STATUS_CONFIG = {
    active: { label: "Active", color: "bg-green-100 text-green-800" },
    low_stock: { label: "Low Stock", color: "bg-orange-100 text-orange-800" },
    out_of_stock: { label: "Out of Stock", color: "bg-gray-200 text-gray-600" },
};

export default function AdminProductsPage() {
    const {
        products,
        loading,
        error,
        deleteProduct,
        refetch
    } = useProducts();

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        product: Product | null;
    }>({
        open: false,
        product: null,
    });

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.sku.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
            categoryFilter === "all" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    // Get unique categories
    const categories = ["all", ...new Set(products.map(p => p.category))];

    const getStatusBadge = (status: string) => {
        const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.active;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const getStockStatus = (stock: number) => {
        if (stock === 0) return "bg-red-100 text-red-800";
        if (stock < 10) return "bg-orange-100 text-orange-800";
        return "bg-green-100 text-green-800";
    };

    const handleDelete = async (productId: string) => {
        try {
            const result = await deleteProduct(productId);
            if (result.success) {
                toast.success("Product deleted successfully");
                refetch(); // Refresh the product list
                setDeleteModal({ open: false, product: null });
            } else {
                throw new Error(result.error || "Failed to delete product");
            }
        } catch (error: any) {
            console.error("❌ [Admin] Delete error:", error);
            toast.error("Failed to delete product", {
                description: error.message || "Please try again",
            });
        }
    };

    // Handle errors
    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage your Marvel Safety product catalog
                        </p>
                    </div>
                    <Link href="/admin/products/new">
                        <Button className="bg-orange-600 hover:bg-orange-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <div className="text-red-500 mb-4">❌</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
                    <p className="text-gray-500">{error}</p>
                    <Button
                        onClick={() => refetch()}
                        className="mt-4 bg-orange-600 hover:bg-orange-700"
                    >
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your Marvel Safety product catalog
                    </p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search by name or SKU..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={categoryFilter}
                            onChange={(e) => {
                                setCategoryFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === "all" ? "All Categories" : category}
                                </option>
                            ))}
                        </select>

                        <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-1.5" />
                            Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="divide-y divide-gray-200">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="px-6 py-4 flex items-center gap-4">
                                <Skeleton className="h-10 w-10 rounded" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                        ))}
                    </div>
                ) : currentProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">📦</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                        <p className="text-gray-500 text-sm">
                            Try adjusting your search or filters
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-500 font-medium">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Product</th>
                                        <th className="px-6 py-3 text-left">Category</th>
                                        <th className="px-6 py-3 text-left">Price</th>
                                        <th className="px-6 py-3 text-left">Stock</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {currentProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-10 h-10 bg-gray-100 rounded overflow-hidden shrink-0">
                                                        <img
                                                            src={product.primaryImage}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                                                        <div className="text-xs text-gray-500">{product.sku}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">KES {product.price.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatus(product.stockCount)}`}>
                                                    {product.stockCount}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                                                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40">
                                                        <Link href={`/admin/products/${product.id}/edit`} passHref>
                                                            <DropdownMenuItem className="cursor-pointer">
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                        </Link>
                                                        <DropdownMenuItem
                                                            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                                                            onClick={() => setDeleteModal({ open: true, product })}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="text-sm text-gray-500">
                                    Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="border-gray-300"
                                    >
                                        Previous
                                    </Button>
                                    <div className="flex items-center gap-1">
                                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                            const pageNum = i + 1;
                                            return (
                                                <Button
                                                    key={pageNum}
                                                    variant={currentPage === pageNum ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={currentPage === pageNum ? "bg-orange-600 hover:bg-orange-700" : "border-gray-300"}
                                                >
                                                    {pageNum}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="border-gray-300"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Delete Product Modal */}
            <DeleteProductModal
                open={deleteModal.open}
                onOpenChange={(open) => setDeleteModal({ open, product: deleteModal.product })}
                onConfirm={() => deleteModal.product ? handleDelete(deleteModal.product.id) : Promise.resolve()}
                productName={deleteModal.product?.name || ""}
                productImage={deleteModal.product?.primaryImage}
            />
        </div>
    );
}