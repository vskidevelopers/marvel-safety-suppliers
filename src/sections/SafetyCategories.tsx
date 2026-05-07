import { CategoryCard } from "@/components/ui/CategoryCard";


// Marvel Safety real categories with Cloudinary image URLs
const WEARABLE_CATEGORIES = [
    {
        name: "Head & Face Protection",
        description: "Hard hats, welding shields, bee veils",
        link: "/products?category=head-face",
        imageUrl: "https://res.cloudinary.com/dlmmsamck/image/upload/v1763933298/Face-Shield-for-Safety-Helmet1_kvmoxa.jpg",
    },
    {
        name: "Respiratory Protection",
        description: "KEBS-certified NP 305, NP 306, Vaultex masks",
        link: "/products?category=respiratory",
        imageUrl: "https://res.cloudinary.com/dlmmsamck/image/upload/v1763933399/2751eac7ad507221ae99b063df40b0c8.jpg_720x720q80.jpg__wyng7i.webp",
    },
    {
        name: "Hand Protection",
        description: "Cut-resistant, chemical & general-purpose gloves",
        link: "/products?category=hand",
        imageUrl: "https://res.cloudinary.com/dlmmsamck/image/upload/v1763933445/s-l1200_ir8wec.jpg",
    },
    {
        name: "Body Protection Wear",
        description: "Bee suits, aprons, CBC uniforms & coveralls",
        link: "/products?category=body",
        imageUrl: "https://res.cloudinary.com/dlmmsamck/image/upload/v1763933484/GettyImages-947254500-resized_n8zusk.jpg",
    },
    {
        name: "Safety Footwear",
        description: "Steel-toe boots & KEBS-certified safety shoes",
        link: "/products?category=foot",
        imageUrl: "https://res.cloudinary.com/dlmmsamck/image/upload/v1763933544/industrial-safety-shoes_qegozq.jpg",
    },
    {
        name: "Visibility Wear",
        description: "High-vis vests, reflective straps & armbands",
        link: "/products?category=high-vis",
        imageUrl: "https://res.cloudinary.com/dlmmsamck/image/upload/v1763933611/hi-vis-vest_maexpa.webp",
    },
];

export function SafetyCategories() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Enhanced Title */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Essential Safety Categories
                    </h2>
                    <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                        KEBS-certified PPE for every industry in Kenya — from Nairobi construction sites to rural apiaries.
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {WEARABLE_CATEGORIES.map((category, index) => (
                        <CategoryCard
                            key={index}
                            name={category.name}
                            description={category.description}
                            link={category.link}
                            imageUrl={category.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}