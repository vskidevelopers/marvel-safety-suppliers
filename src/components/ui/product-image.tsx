"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductImage({
    src,
    alt,
    sizes,
    className,
}: {
    src: string;
    alt: string;
    sizes: string;
    className?: string;
}) {
    const [broken, setBroken] = useState(false);

    return (
        <Image
            src={broken || !src ? "/placeholder-product.svg" : src}
            alt={alt}
            fill
            sizes={sizes}
            className={className}
            onError={() => setBroken(true)}
        />
    );
}
