"use client";

import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
    name: string;
    imageUrl: string;
    link: string;
}

export function CategoryCard({ name, imageUrl, link }: CategoryCardProps) {
    return (
        <Link
            href={link}
            className="group flex flex-col items-center gap-2 text-center"
            aria-label={`Browse ${name}`}
        >
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden bg-orange-50 ring-1 ring-orange-100 group-hover:ring-orange-400 transition-all p-2">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-contain"
                    sizes="80px"
                />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800 leading-tight line-clamp-2">
                {name}
            </span>
        </Link>
    );
}
