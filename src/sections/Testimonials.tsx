"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// Real Google Business reviews — lightly copyedited for typos only, voice
// and meaning kept as-is. Update here as new reviews come in.
const TESTIMONIALS = [
    {
        name: "Mercykyle Muthoni",
        rating: 5,
        quote: "Marvel is a company that values both its employees and customers. Supplying essential safety wear, they don't just supply high-quality PPE — they also ensure customers get friendly, reliable, and top-tier service from order to delivery for all the safety wear you need. Marvel is who you can trust.",
    },
    {
        name: "Omollo Roney",
        rating: 5,
        quote: "They offer quality safety products, reliable service, and good customer service. I really appreciate their professionalism, fast response, and commitment to making sure customers get exactly what they need. I highly recommend Marvel Safety Suppliers to anyone looking for quality safety wear at a reasonable price.",
    },
    {
        name: "Constance Kanini",
        rating: 5,
        quote: "Excellent service! Marvel Safety Suppliers KE is the most reliable safety supplier in Nairobi. Quality products, fair prices, and they deliver on time. My workers love the comfort of the PPE — their attention to detail in branding and embroidery is perfect, and their commitment to our team's safety is genuine. They don't just supply safety, they ensure it.",
    },
    {
        name: "Muchiri Nyawes",
        rating: 5,
        quote: "One of the best companies in Kenya dealing with safety — quality items, affordable pricing, and great customer service. I like it here and will highly recommend it to my colleagues.",
    },
];

// A little variety across avatar colors so the row doesn't look monotone —
// cycles through the same brand palette used elsewhere on the site.
const AVATAR_COLORS = ["bg-orange-600", "bg-red-600", "bg-gray-900", "bg-orange-500"];

function Avatar({ name, index }: { name: string; index: number }) {
    const initial = name.trim().charAt(0).toUpperCase();
    return (
        <div
            className={`h-11 w-11 sm:h-12 sm:w-12 rounded-full ${AVATAR_COLORS[index % AVATAR_COLORS.length]} text-white flex items-center justify-center font-bold text-lg shrink-0`}
            aria-hidden
        >
            {initial}
        </div>
    );
}

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${i < rating ? "fill-orange-500 text-orange-500" : "fill-gray-200 text-gray-200"}`}
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    const [current, setCurrent] = useState(0);
    const paused = useRef(false);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!paused.current) {
                setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
            }
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    const prev = () => setCurrent((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    const t = TESTIMONIALS[current];

    return (
        <section className="py-10 md:py-14 bg-gradient-to-b from-orange-50/60 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">
                        What Our Clients Say
                    </h2>
                </div>

                <div
                    className="max-w-2xl mx-auto relative"
                    onMouseEnter={() => (paused.current = true)}
                    onMouseLeave={() => (paused.current = false)}
                >
                    {/* Desktop-only nav arrows flanking the card */}
                    <button
                        onClick={prev}
                        aria-label="Previous testimonial"
                        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 h-9 w-9 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-500 hover:text-orange-600 hover:border-orange-300 transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next testimonial"
                        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 h-9 w-9 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-500 hover:text-orange-600 hover:border-orange-300 transition-colors"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    <div className="relative min-h-[260px] sm:min-h-[200px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -60 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="relative bg-white border border-orange-100 rounded-2xl shadow-md p-6 sm:p-8 overflow-hidden"
                            >
                                <Quote
                                    className="absolute -top-2 -right-2 h-24 w-24 text-orange-50 rotate-12"
                                    strokeWidth={1}
                                    aria-hidden
                                />

                                <div className="relative flex items-center gap-3 mb-4">
                                    <Avatar name={t.name} index={current} />
                                    <div className="text-left">
                                        <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                                        <Stars rating={t.rating} />
                                    </div>
                                </div>

                                <p className="relative text-sm sm:text-base text-gray-700 leading-relaxed italic">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    {TESTIMONIALS.map((item, index) => (
                        <button
                            key={item.name}
                            onClick={() => setCurrent(index)}
                            aria-label={`Show testimonial from ${item.name}`}
                            className={`h-2 rounded-full transition-all duration-300 ${index === current ? "bg-orange-500 w-6" : "bg-gray-300 hover:bg-gray-400 w-2"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
