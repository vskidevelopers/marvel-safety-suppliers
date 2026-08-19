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
        <section className="py-8 md:py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-5">
                    Shop by Category
                </h2>

                {/* Category Grid — compact circular icons, mobile-first */}
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 gap-x-3 gap-y-6">
                    {WEARABLE_CATEGORIES.map((category, index) => (
                        <CategoryCard
                            key={index}
                            name={category.name}
                            link={category.link}
                            imageUrl={category.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}