// lib/hooks/use-partner-logos.ts
import { useState, useEffect } from "react";

export interface PartnerLogo {
  public_id: string;
  secure_url: string;
  format: string;
}

export function usePartnerLogos(folder = "marvel-safety/partners") {
  const [logos, setLogos] = useState<PartnerLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/cloudinary-partners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder }),
        });

        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        console.log("data response from fetching from the cloud >> ", data);

        setLogos(data.partners || []);
      } catch (err) {
        setError("Could not load partner logos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, [folder]);

  return { logos, loading, error };
}
