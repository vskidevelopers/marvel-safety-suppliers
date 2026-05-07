

import { ProductDetail } from "../product-detail";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    // ✅ UNWRAP params first
    const { id } = await params;

    console.log("🔍 Product ID from URL:", id);
    console.log("📁 Full params object:", { id });

    if (!id) {
        console.error("❌ No product ID provided");
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">Invalid Product ID</h1>
            </div>
        );
    }

    return <ProductDetail productId={id} />;
}