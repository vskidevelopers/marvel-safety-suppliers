"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryCardProps {
    name: string;
    imageUrl: string;
    link: string;
    index?: number;
    total?: number;
}

export function CategoryCard({ name, imageUrl, link, index = 0 }: CategoryCardProps) {
    // Each icon breathes on its own phase (offset by index) so the row feels
    // alive rather than a single block pulsing in unison.
    const breathe = {
        duration: 2.6,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: index * 0.2,
    };

    return (
        <Link
            href={link}
            className="group flex flex-col items-center gap-2 text-center"
            aria-label={`Browse ${name}`}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "backOut" }}
            >
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.07, 1] }}
                    transition={breathe}
                    className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden bg-orange-50 ring-1 ring-orange-100 shadow-sm group-hover:ring-2 group-hover:ring-orange-400 group-hover:shadow-lg group-hover:scale-110 group-active:ring-2 group-active:ring-orange-400 group-active:scale-95 transition-all p-2"
                >
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-contain"
                        sizes="80px"
                    />
                    {/* Glow breathes in sync with the scale pulse */}
                    <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full ring-2 ring-orange-400 pointer-events-none"
                        initial={{ opacity: 0.15 }}
                        animate={{ opacity: [0.15, 0.7, 0.15] }}
                        transition={breathe}
                    />
                </motion.div>
            </motion.div>
            <span className="text-xs sm:text-sm font-medium text-gray-800 leading-tight line-clamp-2 group-hover:text-orange-600 group-active:text-orange-600 transition-colors">
                {name}
            </span>
        </Link>
    );
}
