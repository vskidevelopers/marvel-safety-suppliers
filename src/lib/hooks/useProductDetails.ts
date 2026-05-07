"use client";
import { useState, useEffect } from "react";
import { fetchProductById } from "@/lib/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  [key: string]: any; // Allow additional fields from Firestore
}

export function useProductDetails(productId: string | null | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if no productId is provided
    if (!productId) {
      setProduct(null);
      setLoading(false);
      return;
    }

    const loadProductDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchProductById(productId);
        if (result.success && result.data) {
          setProduct(result.data as Product);
        } else {
          setError(result?.error || "Product not found");
          setProduct(null);
          console.error("Fetch product detail error:", result.error);
        }
      } catch (err) {
        setError("Network error");
        setProduct(null);
        console.error("Unexpected fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetail();
  }, [productId, fetchProductById]);

  return { product, loading, error };
}
