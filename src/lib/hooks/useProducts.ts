import { useState, useEffect } from "react";
import {
  fetchAllProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductsByCategory,
  fetchProductsByAttribute,
} from "@/lib/firebase";

// Reuse your Product interface
import type { Product } from "@/app/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    const result = await fetchAllProducts();
    if (result.success) {
      setProducts(result.data || []);
    } else {
      setError(result.error || "Failed to load products");
    }
    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: loadProducts,

    createProduct,
    updateProduct,
    deleteProduct,
    fetchProductById,
    fetchProductsByCategory,
    fetchProductsByAttribute,
  };
}
