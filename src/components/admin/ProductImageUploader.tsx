"use client";

import { useId, useState } from "react";
import { Upload, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCloudinaryUpload } from "@/lib/hooks/useCloudinaryUpload";

const MAX_FILE_SIZE_MB = 5;

interface ProductImageUploaderProps {
    images: string[];
    onChange: (images: string[]) => void;
}

/**
 * The first image in `images` is saved as the product's primaryImage — the
 * rest become additionalImages, in the order shown here. Reordering matters
 * because of that, so every thumbnail gets move-left/move-right controls
 * instead of relying on upload order alone.
 */
export function ProductImageUploader({ images, onChange }: ProductImageUploaderProps) {
    const inputId = useId();
    const { uploadImage } = useCloudinaryUpload();
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        // Reset immediately so selecting the same file again (e.g. after
        // deleting it) still fires this handler — inputs only fire "change"
        // when the selection differs from their current value otherwise.
        e.target.value = "";
        if (files.length === 0) return;

        const oversized = files.filter((f) => f.size > MAX_FILE_SIZE_MB * 1024 * 1024);
        const toUpload = files.filter((f) => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024);
        oversized.forEach((f) =>
            toast.error(`"${f.name}" is over ${MAX_FILE_SIZE_MB}MB and was skipped`)
        );
        if (toUpload.length === 0) return;

        setIsUploading(true);
        const results = await Promise.all(
            toUpload.map(async (file) => ({ file, result: await uploadImage(file) }))
        );
        setIsUploading(false);

        const uploaded = results.filter((r) => r.result).map((r) => r.result!.url);
        const failed = results.filter((r) => !r.result).map((r) => r.file.name);

        if (uploaded.length > 0) {
            onChange([...images, ...uploaded]);
            toast.success(`Uploaded ${uploaded.length} image${uploaded.length > 1 ? "s" : ""}`);
        }
        if (failed.length > 0) {
            toast.error(`Failed to upload: ${failed.join(", ")}`);
        }
    };

    const removeImage = (index: number) => {
        onChange(images.filter((_, i) => i !== index));
    };

    const moveImage = (index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= images.length) return;
        const next = [...images];
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
    };

    return (
        <div>
            <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => document.getElementById(inputId)?.click()}
            >
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Click to upload images</p>
                <p className="text-xs text-gray-500">JPG, PNG, or WEBP (max {MAX_FILE_SIZE_MB}MB)</p>
                <input
                    id={inputId}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {isUploading && (
                <p className="text-gray-600 text-sm mt-3 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Uploading images...
                </p>
            )}

            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                    {images.map((url, index) => (
                        <div
                            key={url + index}
                            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                        >
                            <img src={url} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />

                            {index === 0 && (
                                <span className="absolute top-1.5 left-1.5 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                    Primary
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                aria-label="Remove image"
                            >
                                <X className="h-3 w-3" />
                            </button>

                            <div className="absolute bottom-1.5 left-1.5 right-1.5 flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => moveImage(index, -1)}
                                    disabled={index === 0}
                                    className="bg-black/60 text-white rounded p-1 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/80"
                                    aria-label="Move image left"
                                >
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveImage(index, 1)}
                                    disabled={index === images.length - 1}
                                    className="bg-black/60 text-white rounded p-1 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/80"
                                    aria-label="Move image right"
                                >
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
