import { useState, useEffect } from "react";
import { fetchAllOrders } from "../firebase";
import type { OrderData } from "@/app/types/order";

export interface OrderDisplay {
  id: string;
  customer: string;
  phone: string;
  date: string;
  total: number;
  status: string;
  payment: "cod" | "mpesa";
  items: number;
  location: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<OrderDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchAllOrders();

        if (result.success && result.data) {
          // Transform Firestore data to display format
          const formattedOrders = result.data.map((order: OrderData) => ({
            id: order.id || "unknown",
            customer: order.customer?.fullName || "Unknown Customer",
            phone: order.customer?.phone || "No Phone",
            date: order.createdAt?.seconds
              ? new Date(order.createdAt.seconds * 1000).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  },
                )
              : "N/A",
            total: order.totals?.grandTotal || 0,
            status: order.status || "pending",
            payment: order.payment?.method || "cod",
            items:
              order.items?.reduce(
                (sum, item) => sum + (item.quantity || 0),
                0,
              ) || 0,
            location:
              `${order.customer?.location || ""}, ${order.customer?.city || ""}`.trim(),
          }));

          setOrders(formattedOrders);
        } else {
          setError("Failed to load orders");
        }
      } catch (err) {
        setError("Network error");
        console.error("Unexpected fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return { orders, loading, error };
}
