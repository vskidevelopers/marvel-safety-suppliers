import { ProductImage } from "@/components/ui/product-image";

export function ProductCard({
    product
}: {
    product: { name: string; price: number; image: string }
}) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gray-50 relative p-2">
                <ProductImage
                    src={product.image}
                    alt={product.name}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain"
                />
                <div className="absolute top-2 left-2 bg-white/90 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    In Stock
                </div>
            </div>
            <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-10">
                    {product.name}
                </h3>
                <p className="text-orange-600 font-bold text-lg mt-1">KES {product.price.toLocaleString()}</p>
            </div>
        </div>
    );
}