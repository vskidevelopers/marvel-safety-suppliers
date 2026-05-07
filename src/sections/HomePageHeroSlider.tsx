"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Real Marvel Safety slides
const slides = [
    {
        id: 1,
        title: "Certified Safety Gear for Nairobi & Nationwide",
        subtitle:
            "KEBS-compliant PPE including hard hats, gloves, and high-vis vests — delivered across Kenya for construction, mining, and industrial sites.",
        cta: "Shop Safety Catalog",
        link: "/products",
        color: "from-orange-500/20 to-red-500/20",
        imageUrl: "https://res.cloudinary.com/dlmmsamck/image/upload/v1763916324/photo-1589939705384-5185137a7f0f_rkbzbx.avif"
    },
    {
        id: 2,
        title: "Beekeeper Safety Solutions",
        subtitle:
            "Full bee suits, veiled helmets, and gloves designed for Kenyan apiaries. Ventilated, sting-proof, and KEBS-certified for maximum protection.",
        cta: "View Bee Suits",
        link: "/products?category=body&subcategory=bee-suit",
        color: "from-amber-500/20 to-yellow-500/20",
        imageUrl: "https://res.cloudinary.com/dlmmsamck/image/upload/v1763920511/bee-equipment_egjlf3.jpg"

    },
    {
        id: 3,
        title: "Respiratory Protection You Can Trust",
        subtitle:
            "NP 305, NP 306, and Vaultex masks — all KEBS-certified for healthcare, construction, and industrial use across Kenya.",
        cta: "Browse Masks",
        link: "/products?category=respiratory",
        color: "from-blue-500/20 to-cyan-500/20",
        imageUrl: "https://res.cloudinary.com/dlmmsamck/image/upload/v1763920729/istockphoto-1364769270-612x612_aoqsa5.jpg"
    },
    {
        id: 4,
        title: "Site Safety & Traffic Management",
        subtitle:
            "High-visibility cones, reflective straps, and road safety kits for Nairobi construction zones, highways, and emergency response teams.",
        cta: "See Site Safety",
        link: "/products?category=site",
        color: "from-green-500/20 to-emerald-500/20",
        imageUrl: "https://res.cloudinary.com/dlmmsamck/image/upload/v1763920193/safety-work-personal-protective-equipment-workplace-security-generative-ai_94628-8907_xin170.avif"
    },
];

export function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <section className="relative h-[600px] w-full overflow-hidden bg-gray-900 text-white">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />

            {/* Slides with Animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Solid color background (fallback if images fail) */}
                    {/* <div className={`absolute inset-0 bg-gradient-to-br ${slides[current].color}`} /> */}

                    {/* Optional: Add real images later via Cloudinary */}
                    <Image
                        src={slides[current].imageUrl}
                        alt={slides[current].title}
                        fill
                        className="object-cover"
                        priority={current === 0} // Only prioritize first slide
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="container mx-auto px-4 h-full flex items-center relative z-20">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-block bg-orange-600/90 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-sm border border-orange-500/30"
                    >
                        KEBS Certified • Nairobi Based
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                    >
                        {slides[current].title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl"
                    >
                        {slides[current].subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href={slides[current].link}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-center transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20"
                        >
                            {slides[current].cta} <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/quote"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-md font-bold text-center transition-colors backdrop-blur-sm hover:border-white/50"
                        >
                            Request Bulk Quote
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Navigation Arrows (Desktop only) */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-colors hidden md:block"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-7 w-7" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-colors hidden md:block"
                aria-label="Next slide"
            >
                <ChevronRight className="h-7 w-7" />
            </button>

            {/* Dots (All screens) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current
                            ? "bg-orange-500 w-10 rounded-full"
                            : "bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
