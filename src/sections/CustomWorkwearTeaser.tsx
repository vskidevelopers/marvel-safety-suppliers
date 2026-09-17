"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Factory } from "lucide-react";

const STEPS = ["Design", "Fabric", "Tailoring", "Branding", "Delivery"];

const PRODUCTION_PHOTOS = [
    {
        src: "/images/production-floor-1.jpg",
        alt: "Marvel Safety tailoring team cutting and stitching workwear on the production floor",
        caption: "Cutting & Tailoring",
    },
    {
        src: "/images/production-floor-2.jpg",
        alt: "Marvel Safety production staff finishing branded workwear orders",
        caption: "Finishing & Packing",
    },
];

export function CustomWorkwearTeaser() {
    return (
        <section className="relative py-10 md:py-14 bg-white overflow-hidden">
            {/* Decorative background accents, matching the Corporate page treatment */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-16 -left-16 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-gray-900"
                >
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 p-2 sm:p-3">
                        {PRODUCTION_PHOTOS.map((photo, index) => (
                            <motion.div
                                key={photo.src}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="group relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden"
                            >
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 500px"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* brand-tinted scrim so both photos read as one styled set */}
                                <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-black/10 to-orange-900/10" />
                                <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium tracking-wide">
                                    {photo.caption}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-red-950 text-white text-center p-6 sm:p-10 -mt-1">
                        <div className="inline-flex items-center gap-1.5 bg-white/10 text-orange-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-3">
                            <Factory className="h-3.5 w-3.5" />
                            OUR WORKSHOP
                        </div>

                        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold">
                            Custom Workwear Made For Your Business
                        </h2>
                        <p className="mt-2 text-orange-400 font-bold text-sm sm:text-base">
                            YOUR BRAND. YOUR COLOURS. YOUR WORKFORCE.
                        </p>
                        <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
                            Custom overalls, corporate uniforms, branded workwear, school uniforms and
                            aprons — with embroidery, printing and bulk production, tailored to your
                            organization&apos;s requirements.
                        </p>

                        {/* Numbered step tracker */}
                        <div className="flex items-start justify-center mt-7 max-w-lg mx-auto">
                            {STEPS.map((step, index) => (
                                <div key={step} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center shadow-md shadow-orange-900/40">
                                            {index + 1}
                                        </div>
                                        <span className="text-[10px] sm:text-xs font-medium text-gray-300 whitespace-nowrap">
                                            {step}
                                        </span>
                                    </div>
                                    {index < STEPS.length - 1 && (
                                        <div className="h-0.5 flex-1 bg-gradient-to-r from-orange-500/60 to-white/10 mx-1.5 sm:mx-2 -translate-y-3" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/corporate"
                            className="inline-block mt-8 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-lg shadow-orange-950/40 transition-colors"
                        >
                            Explore Custom Workwear
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
