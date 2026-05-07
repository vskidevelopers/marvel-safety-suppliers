"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Upload, Plus, X, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/categories";
import { updateProduct, fetchProductById } from "@/lib/firebase";
import type { Product } from "@/app/types/product";
import { toast } from "sonner";

const CERTIFICATION_OPTIONS = ["KEBS", "EN397", "EN166", "EN149", "ISO 45001", "ANSI Z87.1"];

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params?.id as string;

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        price: "",
        oldPrice: "",
        stockCount: "",
        inStock: true,
        category: CATEGORIES[0].id,
        subcategory: "",
        tags: "",
        certifications: ["KEBS"] as string[],
        specs: {
            material: "",
            size: "",
            color: "",
            weight: "",
            resistance: "",
        },
        sku: "",
        supplier: "",
    });

    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Load product data from Firebase
    useEffect(() => {
        const loadProduct = async () => {
            if (!productId) {
                toast.error("Invalid product ID");
                router.push("/admin/products");
                return;
            }

            try {
                setLoading(true);
                const result = await fetchProductById(productId);

                if (result.success && result.data) {
                    const product = result.data as Product;

                    // Format product data for form
                    setFormData({
                        name: product.name || "",
                        slug: product.slug || "",
                        description: product.description || "",
                        shortDescription: product.shortDescription || "",
                        price: product.price?.toString() || "",
                        oldPrice: product.oldPrice?.toString() || "",
                        stockCount: product.stockCount?.toString() || "0",
                        inStock: product.inStock || false,
                        category: product.category || CATEGORIES[0].id,
                        subcategory: product?.subcategory || "",
                        tags: Array.isArray(product.tags) ? product.tags.join(", ") : product.tags || "",
                        certifications: Array.isArray(product.certifications) ? product.certifications : ["KEBS"],
                        specs: {
                            material: product.specs?.material || "",
                            size: product.specs?.size || "",
                            color: product.specs?.color || "",
                            weight: product.specs?.weight?.toString() || "",
                            resistance: Array.isArray(product.specs?.resistance)
                                ? product.specs.resistance.join(", ")
                                : product.specs?.resistance || "",
                        },
                        sku: product.sku || "",
                        supplier: product?.supplier || "",
                    });

                    // Set images
                    const allImages = [product.primaryImage, ...(product.additionalImages || [])]
                        .filter(Boolean) as string[];
                    setExistingImages(allImages);
                } else {
                    toast.error("Product not found");
                    router.push("/admin/products");
                }
            } catch (error) {
                console.error("❌ [Edit Product] Load error:", error);
                toast.error("Failed to load product");
                router.push("/admin/products");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId, router]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        if (name.startsWith("specs.")) {
            const specKey = name.split(".")[1];
            setFormData({
                ...formData,
                specs: { ...formData.specs, [specKey]: value },
            });
        } else if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCertificationChange = (cert: string, isChecked: boolean) => {
        if (isChecked) {
            setFormData({ ...formData, certifications: [...formData.certifications, cert] });
        } else {
            setFormData({
                ...formData,
                certifications: formData.certifications.filter(c => c !== cert),
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        setNewImages(prev => [...prev, ...files]);

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...previews]);
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Product name is required";
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required";
        if (!formData.stockCount || parseInt(formData.stockCount) < 0) newErrors.stockCount = "Valid stock count required";
        if (!formData.sku.trim()) newErrors.sku = "SKU is required";
        if (formData.certifications.length === 0) newErrors.certifications = "At least one certification required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setSubmitting(true);

        try {
            // Prepare product data for Firebase
            const productData: Partial<Product> = {
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                shortDescription: formData.shortDescription,
                price: parseFloat(formData.price),
                oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
                stockCount: parseInt(formData.stockCount),
                inStock: formData.inStock,
                category: formData.category,
                subcategory: formData.subcategory,
                tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
                certifications: formData.certifications,
                specs: {
                    material: formData.specs.material,
                    size: formData.specs.size,
                    color: formData.specs.color,
                    weight: formData.specs.weight ? parseFloat(formData.specs.weight) : undefined,
                    resistance: formData.specs.resistance.split(",").map(r => r.trim()).filter(Boolean),
                },
                sku: formData.sku,
                supplier: formData.supplier,
                primaryImage: existingImages[0] || "/placeholder-image.jpg",
                additionalImages: existingImages.slice(1),
                status: parseInt(formData.stockCount) > 0
                    ? (parseInt(formData.stockCount) < 10 ? "low_stock" : "active")
                    : "out_of_stock",
            };

            const result = await updateProduct(productId, productData);

            if (result.success) {
                toast.success("Product updated successfully!");
                router.push("/admin/products");
            } else {
                throw new Error(result.error || "Failed to update product");
            }
        } catch (error: any) {
            console.error("❌ [Edit Product] Update error:", error);
            toast.error("Failed to update product", {
                description: error.message || "Please try again",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto py-12">
                <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                    <p className="mt-4 text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Update details for: <span className="font-medium">{formData.name}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/products">
                        <Button variant="outline" className="border-gray-300">
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        form="product-form"
                        disabled={submitting}
                        className="bg-orange-600 hover:bg-orange-700"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </div>

            <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* General Information */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="font-bold text-gray-900 mb-4">General Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition ${errors.name ? "border-red-500" : "border-gray-300"
                                        }`}
                                    placeholder="e.g. EN397 Yellow Hard Hat"
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Short Description
                                </label>
                                <input
                                    type="text"
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    placeholder="e.g. Industrial head protection"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    placeholder="Product details, material specifications, usage instructions..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Inventory */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="font-bold text-gray-900 mb-4">Pricing & Inventory</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price (KES) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition ${errors.price ? "border-red-500" : "border-gray-300"
                                        }`}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                                {errors.price && (
                                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.price}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Old Price (KES)
                                </label>
                                <input
                                    type="number"
                                    name="oldPrice"
                                    value={formData.oldPrice}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Stock Quantity <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="stockCount"
                                    value={formData.stockCount}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition ${errors.stockCount ? "border-red-500" : "border-gray-300"
                                        }`}
                                    placeholder="0"
                                    min="0"
                                />
                                {errors.stockCount && (
                                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.stockCount}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    SKU <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition ${errors.sku ? "border-red-500" : "border-gray-300"
                                        }`}
                                    placeholder="e.g. MS-HF-HH-01"
                                />
                                {errors.sku && (
                                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.sku}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label className="text-sm text-gray-700">In Stock</label>
                        </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="font-bold text-gray-900 mb-4">Technical Specifications</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Material
                                </label>
                                <input
                                    type="text"
                                    name="specs.material"
                                    value={formData.specs.material}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    placeholder="e.g. HDPE, Nylon"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    name="specs.size"
                                    value={formData.specs.size}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    placeholder="e.g. Universal, 42"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    name="specs.color"
                                    value={formData.specs.color}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    placeholder="e.g. Yellow, Blue"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Weight (grams)
                                </label>
                                <input
                                    type="number"
                                    name="specs.weight"
                                    value={formData.specs.weight}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Resistance Types (comma separated)
                                </label>
                                <input
                                    type="text"
                                    name="specs.resistance"
                                    value={formData.specs.resistance}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    placeholder="e.g. cut, chemical, impact"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Organization */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="font-bold text-gray-900 mb-4">Organization</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white transition"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subcategory
                                </label>
                                <input
                                    type="text"
                                    name="subcategory"
                                    value={formData.subcategory}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    placeholder="e.g. bee-suit, np306"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags (comma separated)
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    placeholder="e.g. anti-fog, UV protection"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Certifications <span className="text-red-500">*</span>
                                </label>
                                {errors.certifications && (
                                    <p className="text-red-600 text-xs mb-2 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> {errors.certifications}
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {CERTIFICATION_OPTIONS.map(cert => (
                                        <label key={cert} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.certifications.includes(cert)}
                                                onChange={(e) => handleCertificationChange(cert, e.target.checked)}
                                                className="h-4 w-4 text-orange-600 rounded border-gray-300"
                                            />
                                            <span className="text-sm">{cert}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="text-xs text-gray-500">
                                    KEBS certification is required for all PPE in Kenya
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Supplier Info */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="font-bold text-gray-900 mb-4">Supplier Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Supplier
                                </label>
                                <input
                                    type="text"
                                    name="supplier"
                                    value={formData.supplier}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    placeholder="e.g. 3M Kenya, Honeywell East Africa"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Images */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="font-bold text-gray-900 mb-4">Product Images</h2>
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => document.getElementById('image-upload')?.click()}
                        >
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-700">Add new images</p>
                            <p className="text-xs text-gray-500">JPG, PNG, or WEBP (max 5MB)</p>
                            <input
                                id="image-upload"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        {/* Existing Images */}
                        {existingImages.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Current images</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {existingImages.map((url, index) => (
                                        <div key={`existing-${index}`} className="relative aspect-square">
                                            <div className="w-full h-full bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                                                <img
                                                    src={url}
                                                    alt={`Existing ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 z-10"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New Images */}
                        {imagePreviews.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">New images</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={`new-${index}`} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                            <img
                                                src={preview}
                                                alt={`New ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(index)}
                                                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}