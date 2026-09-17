import Link from "next/link";
import { ProductImage } from "@/components/ui/product-image";
import WhatsAppProductButton from "@/components/ui/whatsapp-product-button";

export function ProductCard({
    product
}: {
    product: { id: string; name: string; price: number; image: string }
}) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <Link href={`/products/${product.id}`}>
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
                <div className="p-3 pb-2">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-10">
                        {product.name}
                    </h3>
                    <p className="text-orange-600 font-bold text-lg mt-1">KES {product.price.toLocaleString()}</p>
                </div>
            </Link>
            <div className="px-3 pb-3 mt-auto">
                <WhatsAppProductButton
                    productName={product.name}
                    size="sm"
                    className="w-full"
                />
            </div>
        </div>
    );
}
