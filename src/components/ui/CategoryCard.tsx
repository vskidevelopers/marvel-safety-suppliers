"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface CategoryCardProps {
    name: string;
    imageUrl: string;
    link: string;
    description?: string;
}

export function CategoryCard({ name, imageUrl, link, description }: CategoryCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-xl aspect-[4/3] shadow-md hover:shadow-xl transition-shadow"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

            <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            <div className="absolute bottom-0 left-0 z-20 p-5 w-full">
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-bold text-white"
                >
                    {name}
                </motion.h3>
                {description && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-gray-200 mt-1 line-clamp-2"
                    >
                        {description}
                    </motion.p>
                )}
            </div>

            {/* Invisible link overlay */}
            <Link
                href={link}
                className="absolute inset-0 z-30"
                aria-label={`Browse ${name}`}
            />
        </motion.div>
    );
}