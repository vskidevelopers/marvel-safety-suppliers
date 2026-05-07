import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { Shield } from "lucide-react";



export default function CategoriesPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                        <Shield className="h-4 w-4" />
                        KEBS Certified Safety Gear
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Safety Category</h1>
                    <p className="text-xl max-w-2xl mx-auto opacity-90">
                        Browse Marvel Safety’s professional PPE by protection type. All products are KEBS-certified and ready for delivery across Kenya.
                    </p>
                </div>
            </section>

            {/* Category Grid */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-gray-900">Professional Safety Categories</h2>
                        <p className="text-gray-600 mt-2">
                            Click any category to view our full catalog of certified products
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CATEGORIES.map((category) => (
                            <Link
                                key={category.id}
                                href={category.link}
                                className="group block"
                            >
                                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                                    <div className="relative h-48">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        <div className="absolute bottom-4 left-4">
                                            <div className="flex items-center gap-2">
                                                <category.icon className="h-5 w-5 text-orange-400" />
                                                <h3 className="text-white font-bold text-lg">{category.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}