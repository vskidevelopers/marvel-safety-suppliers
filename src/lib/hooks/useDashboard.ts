import { useState, useEffect } from "react";
import {
  fetchTotalOrdersCount,
  fetchTotalProductsCount,
  fetchTotalQuotesCount,
  fetchLowStockItemsCount,
} from "@/lib/firebase";

export interface DashboardStats {
  totalOrders: number;
  totalProducts: number;
  totalQuotes: number;
  lowStockItems: number;
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardStats = async () => {
      console.log("📈 [Dashboard Hook] Loading dashboard statistics...");
      setLoading(true);
      setError(null);

      try {
        // Fetch all stats in parallel for better performance
        const [ordersResult, productsResult, quotesResult, lowStockResult] =
          await Promise.all([
            fetchTotalOrdersCount(),
            fetchTotalProductsCount(),
            fetchTotalQuotesCount(),
            fetchLowStockItemsCount(),
          ]);

        // Check if all requests succeeded
        if (
          ordersResult.success &&
          productsResult.success &&
          quotesResult.success &&
          lowStockResult.success
        ) {
          const dashboardStats: DashboardStats = {
            totalOrders: ordersResult?.data ?? 0,
            totalProducts: productsResult?.data ?? 0,
            totalQuotes: quotesResult?.data ?? 0,
            lowStockItems: lowStockResult?.data ?? 0,
          };

          setStats(dashboardStats);
          console.log(
            "✅ [Dashboard Hook] Dashboard stats loaded successfully:",
            dashboardStats,
          );
        } else {
          // Handle individual errors
          const errors = [
            ordersResult.error,
            productsResult.error,
            quotesResult.error,
            lowStockResult.error,
          ].filter(Boolean);

          const errorMessage = `Failed to load dashboard stats: ${errors.join(", ")}`;
          console.error(
            "❌ [Dashboard Hook] Partial failure loading stats:",
            errorMessage,
          );
          setError(errorMessage);
        }
      } catch (err: any) {
        const errorMessage =
          err.message || "Unexpected error loading dashboard stats";
        console.error("❌ [Dashboard Hook] Unexpected error:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardStats();
  }, []);

  return { stats, loading, error };
}
