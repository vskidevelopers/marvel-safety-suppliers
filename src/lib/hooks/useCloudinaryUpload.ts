"use client";

import { useState } from "react";

interface UploadResult {
  url: string;
  public_id: string;
  format: string;
}

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<UploadResult | null> => {
    if (!file) {
      setError("No file selected");
      return null;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("Form data from useupload cloud hook >> ", formData);

      const response = await fetch("/api/upload-product-image", {
        method: "POST",
        body: formData,
      });

      console.log("Upload response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();
      return result as UploadResult;
    } catch (err: any) {
      setError(err.message || "Upload failed");
      console.error("Upload error:", err);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading, error };
}
