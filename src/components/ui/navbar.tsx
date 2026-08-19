"use client";

import { Menu, MessageCircle, Phone, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getWhatsAppContactUrl, WHATSAPP_PHONE_NUMBER } from "@/lib/whatsapp";
import { SearchBar } from "./search-bar";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const CATEGORIES = [
    { title: "Hand Protection", href: "/products?category=hand", desc: "Gloves for all industries" },
    { title: "Body Protection", href: "/products?category=body", desc: "Aprons, bee suits, CBC uniforms" },
    { title: "Foot Protection", href: "/products?category=foot", desc: "Safety shoes & boots" },
    { title: "High-Visibility Gear", href: "/products?category=high-vis", desc: "Reflectors & straps" },
    { title: "Site Safety", href: "/products?category=site", desc: "Traffic cones & barriers" },
    { title: "First Response", href: "/products?category=first-response", desc: "First aid kits & extinguishers" },
    { title: "Respiratory", href: "/products?category=respiratory", desc: "NP 306, Vaultex masks" },
    { title: "Eye & Face", href: "/products?category=eye-face", desc: "Welding shields & goggles" },
];

interface NavbarProps {
    cartCount?: number;
    isAuthenticated?: boolean;
}

export function Navbar({ cartCount = 0, isAuthenticated = false }: NavbarProps) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href: string) => pathname === href;



    // Hide standard header on admin pages
    if (pathname?.startsWith("/admin")) return null

    return (
        <>
            {/* Call/WhatsApp order strip — scrolls away with the page, like Jumia's */}
            <div className="bg-orange-600 text-white text-center py-1.5 px-4 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5">
                <span className="relative flex h-4 w-4 shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-white/60 animate-ping" />
                    <motion.span
                        animate={{ rotate: [0, -18, 18, -12, 12, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                        className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20"
                    >
                        <Phone className="h-2.5 w-2.5 text-white" fill="currentColor" />
                    </motion.span>
                </span>
                Call or WhatsApp{" "}
                <a href={`tel:${WHATSAPP_PHONE_NUMBER}`} className="font-bold underline underline-offset-2">
                    {WHATSAPP_PHONE_NUMBER}
                </a>{" "}
                to order
            </div>

            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-white"
                    }`}
            >
            <div className="container px-4 md:px-6 py-3"> {/* Consistent container padding */}
                {/* Desktop Nav */}
                <nav className="hidden items-center justify-between lg:flex">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            {/* ✅ Logo */}
                            <Image
                                src="/images/marvel-logo.png"
                                alt="Marvel Safety Suppliers"
                                width={2081}
                                height={1081}
                                priority
                                className="h-8 w-auto" // Adjust height as needed
                            />

                        </Link>
                        <div className="flex items-center gap-5"> {/* Tighter gap */}
                            <Link
                                href="/"
                                className={`text-sm font-medium ${isActive("/") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"
                                    }`}
                            >
                                Home
                            </Link>
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-orange-600">
                                    Products
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:rotate-180"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute left-0 top-full mt-2 w-80 rounded-lg bg-white p-3 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="grid grid-cols-2 gap-1"> {/* Tighter category gap */}
                                        {CATEGORIES.map((cat) => (
                                            <Link
                                                key={cat.title}
                                                href={cat.href}
                                                className="block rounded p-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                                            >
                                                <div className="font-medium">{cat.title}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{cat.desc}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Link
                                href="/about"
                                className={`text-sm font-medium ${isActive("/about") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"
                                    }`}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className={`text-sm font-medium ${isActive("/contact") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"
                                    }`}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href={`tel:${WHATSAPP_PHONE_NUMBER}`}
                            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-orange-600"
                        >
                            <Phone className="h-4 w-4" />
                            {WHATSAPP_PHONE_NUMBER}
                        </a>
                        <a
                            href={getWhatsAppContactUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700"
                        >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp
                        </a>
                        <Link href="/quote">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-orange-600 text-orange-600 hover:bg-orange-50 px-3 py-1.5" /* Tighter button */
                            >
                                Request Quote
                            </Button>
                        </Link>
                        <Link href="/cart" className="relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-600 hover:text-orange-600 w-9 h-9" /* Consistent size */
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                        {isAuthenticated ? (
                            <Link href="/admin">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-600 hover:text-orange-600 w-9 h-9"
                                >
                                    <User className="h-5 w-5" />
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-600 hover:text-orange-600 px-3 py-1.5"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Mobile Nav */}
                <div className="flex items-center justify-between lg:hidden">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/images/marvel-logo.png"
                            alt="Marvel Safety Suppliers"
                            width={2081}
                            height={1081}
                            priority
                            className="h-8 w-auto"
                        />
                    </Link>

                    <div className="flex items-center gap-1">
                        <a
                            href={`tel:${WHATSAPP_PHONE_NUMBER}`}
                            aria-label="Call Marvel Safety"
                            className="flex items-center justify-center w-9 h-9 text-gray-600 hover:text-orange-600"
                        >
                            <Phone className="h-5 w-5" />
                        </a>
                        <a
                            href={getWhatsAppContactUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp Marvel Safety"
                            className="flex items-center justify-center w-9 h-9 text-green-600 hover:text-green-700"
                        >
                            <MessageCircle className="h-5 w-5" />
                        </a>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-600 w-9 h-9">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80 overflow-y-auto pt-6 pb-6 px-6"> {/* Balanced sheet padding */}
                            <SheetHeader className="mb-6">
                                <SheetTitle>
                                    <Link href="/" className="flex items-center gap-2">
                                        <Image
                                            src="/images/marvel-logo.png"
                                            alt="Marvel Safety Suppliers"
                                            width={2081}
                                            height={1081}
                                            className="h-8 w-auto"
                                        />
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-5"> {/* Consistent vertical rhythm */}
                                <div className="grid grid-cols-2 gap-2">
                                    <a
                                        href={`tel:${WHATSAPP_PHONE_NUMBER}`}
                                        className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-orange-600 text-orange-600 font-medium text-sm"
                                    >
                                        <Phone className="h-4 w-4" />
                                        Call Us
                                    </a>
                                    <a
                                        href={getWhatsAppContactUrl()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium text-sm"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        WhatsApp
                                    </a>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <Link href="/" className="py-2 font-medium text-gray-700">Home</Link>
                                    <Link href="/about" className="py-2 font-medium text-gray-700">About</Link>
                                    <Link href="/contact" className="py-2 font-medium text-gray-700">Contact</Link>
                                </div>

                                <Accordion type="single" collapsible>
                                    <AccordionItem value="products" className="border-b-0">
                                        <AccordionTrigger className="py-2 font-semibold text-gray-800 hover:no-underline">
                                            Products
                                        </AccordionTrigger>
                                        <AccordionContent className="mt-2 flex flex-col gap-1">
                                            {CATEGORIES.map((cat) => (
                                                <Link
                                                    key={cat.title}
                                                    href={cat.href}
                                                    className="py-2 text-sm font-medium text-gray-700 hover:text-orange-600"
                                                >
                                                    {cat.title}
                                                </Link>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                <div className="pt-3"> {/* Reduced top padding */}
                                    <Link href="/quote">
                                        <Button className="w-full bg-orange-600 hover:bg-orange-700 h-10 text-sm px-4">
                                            Request Quote
                                        </Button>
                                    </Link>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <Link href="/cart" className="flex items-center gap-2">
                                        <ShoppingCart className="h-5 w-5 text-gray-600" />
                                        <span className="font-medium text-sm">Cart {cartCount > 0 ? `(${cartCount})` : ""}</span>
                                    </Link>
                                    {isAuthenticated ? (
                                        <Link href="/admin" className="flex items-center gap-2">
                                            <User className="h-5 w-5 text-gray-600" />
                                            <span className="font-medium text-sm">Admin</span>
                                        </Link>
                                    ) : (
                                        <Link href="/login" className="flex items-center gap-2">
                                            <User className="h-5 w-5 text-gray-600" />
                                            <span className="font-medium text-sm">Login</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    </div>
                </div>

                {/* Search bar — sticky with the header, every page */}
                <div className="pt-2 lg:pt-3">
                    <Suspense fallback={<div className="h-11 rounded-full bg-gray-100 animate-pulse" />}>
                        <SearchBar />
                    </Suspense>
                </div>
            </div>
            </header>
        </>
    );
}