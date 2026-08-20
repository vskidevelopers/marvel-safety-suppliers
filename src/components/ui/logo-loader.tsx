"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Branded loading indicator — the Marvel logo fading in and out — used anywhere
// the app is waiting on data, instead of a generic gray skeleton.
export function LogoLoader({ className = "py-16" }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
                <Image
                    src="/images/marvel-logo.png"
                    alt="Loading"
                    width={2081}
                    height={1081}
                    className="h-10 w-auto"
                />
            </motion.div>
        </div>
    );
}
