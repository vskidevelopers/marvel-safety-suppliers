"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, HardHat, Eye, Footprints } from "lucide-react";
import { HeroSlider } from "@/sections/HomePageHeroSlider";
import { TrustBadges } from "@/sections/TrustBadges";
import { SafetyCategories } from "@/sections/SafetyCategories";
import { FeaturedProducts } from "@/sections/featuredProducts";
import { PartnersSection } from "@/sections/partners-section";

// ========== FULLSCREEN WELCOME SCREEN ==========
function WelcomeScreen() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, (i % 2 === 0 ? 100 : -100), 0],
                y: [0, (i < 3 ? -50 : 50), 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              className="absolute opacity-5"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                fontSize: '2rem',
              }}
            >
              {i % 4 === 0 ? <ShieldCheck /> : i % 4 === 1 ? <HardHat /> : i % 4 === 2 ? <Eye /> : <Footprints />}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.8
          }}
          className="relative z-10 text-center px-4 max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
            className="mb-6"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="mx-auto mb-4 w-fit"
            >
              <Image
                src="/images/marvel-logo.png"
                alt="Marvel Safety Suppliers"
                width={2081}
                height={1081}
                priority
                className="h-16 w-auto"
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
          >
            Marvel Safety
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-gray-700 font-medium mb-2"
          >
            Quality. Protection. Professionalism.
          </motion.p>

          {/* Full Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-gray-500 text-sm leading-relaxed mb-8 px-4"
          >
            Your trusted partner for quality PPE, safety footwear, workwear and customized uniforms.
          </motion.p>

          {/* Loading Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex justify-center space-x-2"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  backgroundColor: ["#F97316", "#EA580C", "#F97316"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-2.5 h-2.5 bg-orange-500 rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ========== MAIN HOME PAGE ==========
export default function HomePage() {
  // Start true on both server and client (avoids a hydration mismatch),
  // then immediately skip it client-side if this session has already seen
  // it — so returning visitors aren't blocked from contact info every time.
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("marvel-welcome-seen")) {
      setShowWelcome(false);
      return;
    }

    sessionStorage.setItem("marvel-welcome-seen", "1");
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return <WelcomeScreen />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Brand Slogan */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-4 sm:py-5 overflow-hidden">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center text-base sm:text-xl md:text-2xl font-bold tracking-wide text-white px-4 leading-snug"
        >
          <span className="font-extrabold">Marvel Safety Suppliers</span>
          <span className="text-orange-100 mx-1.5">—</span>
          Your trusted partner for quality PPE, safety footwear, workwear and customized uniforms.
        </motion.p>
      </div>

      {/* Hero Section */}
      <header className="py-2">
        <HeroSlider />
      </header>

      {/* Main Content */}
      <SafetyCategories />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Corporate & Bulk Orders CTA */}
      <div className="py-12 md:py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Shopping for One, or Outfitting a Whole Team?
            </h2>
            <p className="text-orange-100 text-base md:text-lg mb-8">
              We serve individual buyers and corporate clients alike — bulk PPE, custom-branded
              workwear, volume pricing, and nationwide delivery for businesses of any size.
            </p>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <Link
                href="/corporate"
                className="inline-block px-8 py-3 bg-white text-orange-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                Corporate/Bulk Orders
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Partners */}
      <PartnersSection />
    </div>
  );
}