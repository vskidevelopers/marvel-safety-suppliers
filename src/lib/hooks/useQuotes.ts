import { useState, useEffect } from "react";
import { fetchAllQuotes } from "../firebase";
import type { QuoteData } from "@/app/types/quotes";

export function useQuotes() {
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuotes = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchAllQuotes();

        if (result.success && result?.data) {
          setQuotes(result?.data);
        } else {
          setError("Failed to load quotes");
        }
      } catch (err) {
        setError("Network error");
        console.error("Unexpected fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuotes();
  }, []);

  return { quotes, loading, error };
}
