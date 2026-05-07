"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cart-context";
import { toast } from "sonner";
import { CartItem } from "../types/cart";
import { useProducts } from "@/lib/hooks/useProducts";

// ✅ Simplified product interface (only essential fields)
interface Product {
    id: string;
    name: string;
    description: string;
    slug: string;
    price: number;
    oldPrice?: number;
    inStock: boolean;
    stockCount?: number;
    category: string;
    certifications: string[];
    primaryImage: string;
    additionalImages: string[];
    specs: {
        material?: string;
        color?: string;
        size?: string;
        weight?: string;
    };
    sku: string;
}

interface ProductDetailProps {
    productId: string;
}

export function ProductDetail({ productId }: ProductDetailProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const { fetchProductById } = useProducts();
    const { addItem } = useCart();
    const router = useRouter();

    // ✅ Fetch product data
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const result = await fetchProductById(productId);
                if (result.success && result.data) {
                    const productData = result.data as Product;
                    setProduct(productData);
                    setSelectedImage(productData.primaryImage);
                }
            } catch (error) {
                console.error("Failed to load product:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    // ✅ Loading skeleton
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="aspect-square bg-gray-200 rounded-lg"></div>
                            <div className="grid grid-cols-4 gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-24 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ✅ Error state
    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h1>
                <button
                    onClick={() => router.back()}
                    className="text-orange-600 hover:underline"
                >
                    ← Go Back
                </button>
            </div>
        );
    }

    // ✅ Category mapping
    const getCategoryName = (categoryId: string) => {
        const categories: Record<string, string> = {
            "head-face": "Head & Face Protection",
            "respiratory": "Respiratory Protection",
            "foot": "Foot Protection",
            "hand": "Hand Protection",
            "high-vis": "High-Visibility Gear",
            "body": "Body Protection",
            "eye-face": "Eye & Face Protection",
            "site": "Site Safety",
        };
        return categories[categoryId] || categoryId;
    };


    // ✅ Add to cart handler
    const handleAddToCart = () => {
        if (!product.inStock) {
            toast.error("This product is currently out of stock");
            return;
        }

        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            sku: product.sku,
            price: product.price,
            quantity: 1,
            image: product.primaryImage,
            category: product.category,
            certifications: product.certifications,
            specs: product.specs,
            inStock: product.inStock,
            stockCount: product.stockCount || 0,
            subtotal: product.price,
        };

        addItem(cartItem);
        toast.success("Added to cart!", {
            description: `${product.name} has been added to your cart`,
        });
        router.push("/cart");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumbs */}
                <div className="text-sm text-gray-500 mb-4">
                    <Link href="/products" className="hover:text-orange-600">
                        Products
                    </Link>{" "}
                    /{" "}
                    <span className="text-gray-900">
                        {getCategoryName(product.category)}
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Image Gallery */}
                    <div>
                        <div className="bg-gray-50 rounded-lg aspect-square flex items-center justify-center mb-4">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="max-h-full max-w-full object-contain p-4"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/placeholder-product.jpg";
                                }}
                            />
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="grid grid-cols-4 gap-2">
                            {[product.primaryImage, ...(product.additionalImages || [])].map(
                                (img, i) => (
                                    <div
                                        key={i}
                                        className={`bg-gray-100 aspect-square rounded cursor-pointer border-2 ${selectedImage === img
                                            ? "border-orange-500"
                                            : "border-transparent"
                                            }`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img
                                            src={img}
                                            alt={`View ${i + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    "/placeholder-thumb.jpg";
                                            }}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="text-sm text-orange-600 font-medium mb-1">
                            {getCategoryName(product.category)}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl font-bold text-orange-600">
                                KES {product.price.toLocaleString()}
                            </span>
                            {product.oldPrice && (
                                <span className="text-gray-500 text-lg line-through">
                                    KES {product.oldPrice.toLocaleString()}
                                </span>
                            )}
                        </div>

                        {product.inStock ? (
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-green-600 font-medium">
                                    In Stock{" "}
                                    {product.stockCount && `(${product.stockCount} available)`}
                                </span>
                            </div>
                        ) : (
                            <div className="text-red-600 font-medium mb-6">Out of Stock</div>
                        )}

                        <p className="text-gray-700 mb-6 text-lg">
                            {product.description}
                        </p>

                        {/* Certifications */}
                        {product.certifications.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-bold text-gray-900 mb-2">Certifications</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.certifications.map((cert) => (
                                        <span
                                            key={cert}
                                            className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full font-medium"
                                        >
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Technical Specs */}
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-900 mb-3">
                                Technical Specifications
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                {product.specs.material && (
                                    <div>
                                        <span className="text-gray-500">Material:</span>
                                        <div>{product.specs.material}</div>
                                    </div>
                                )}
                                {product.specs.color && (
                                    <div>
                                        <span className="text-gray-500">Color:</span>
                                        <div>{product.specs.color}</div>
                                    </div>
                                )}
                                {product.specs.weight && (
                                    <div>
                                        <span className="text-gray-500">Weight:</span>
                                        <div>{product.specs.weight}</div>
                                    </div>
                                )}
                                {product.specs.size && (
                                    <div>
                                        <span className="text-gray-500">Size:</span>
                                        <div>{product.specs.size}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className={`flex-1 py-4 rounded-lg font-bold text-lg transition-colors ${product.inStock
                                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </button>
                            <Link href="/quote">
                                <button className="flex-1 border-2 border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 py-4 rounded-lg font-bold transition-colors">
                                    Request Quote
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="border-t pt-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button className="pb-4 px-1 border-b-2 border-orange-600 text-orange-600 font-medium">
                                Description
                            </button>
                        </nav>
                    </div>
                    <div className="py-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Product Overview
                        </h3>
                        <p className="text-gray-700">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}