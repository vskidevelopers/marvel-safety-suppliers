"use client";

import { useState, useEffect } from "react";
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
            <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ShieldCheck className="h-10 w-10 text-white" />
            </div>
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
            className="text-gray-600 mb-8"
          >
            Certified Safety Gear for Kenya
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
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Automatically hide welcome screen after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return <WelcomeScreen />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="py-2">
        <HeroSlider />
      </header>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Main Content */}
      <main className="container py-12 w-full mx-auto px-4">
        <SafetyCategories />
      </main>

      {/* Featured Products */}
      <div className="text-center mt-12">
        <FeaturedProducts />
      </div>

      {/* Partners */}
      <PartnersSection />
    </div>
  );
}