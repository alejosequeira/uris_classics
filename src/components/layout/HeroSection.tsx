"use client";
import React, { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import RusticText from "@/components/effects/RusticText";
import LayoutCarousel from "@/components/effects/LayoutCarousel";

const playfair = Playfair_Display({ subsets: ["latin"] });

// Constantes para animaciones
const FADE_UP_ANIMATION = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeOut" }
};

// Componentes separados para mejor organización
const DarkModeHero = () => (
  <>
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/optimizadoback/culo-mustang.jpg')"
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--emerald))]/95 via-[rgb(var(--emerald))]/80 to-[rgb(var(--navy))]/90" />
    <div className="absolute inset-4 md:inset-8 border border-[rgb(var(--soft-gold))]/20" />
    
    <div className="relative container mx-auto px-4 md:px-8 h-screen flex flex-col justify-center items-center">
      <div className="relative text-center space-y-6 md:space-y-10 px-4">
        <h1 className={`
          ${playfair.className} 
          text-white font-bold tracking-wider 
          [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]
          animate-fadeSlideUp
        `}
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          TIMELESS ELEGANCE
        </h1>

        <p className={`
          ${playfair.className} 
          font-light text-white tracking-wide leading-relaxed 
          [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]
          animate-fadeSlideUp animation-delay-200
        `}
        style={{ fontSize: "clamp(1.125rem, 3vw, 1.875rem)" }}
        >
          We are dedicated to parking your dream car in your garage!
        </p>
      </div>
    </div>
  </>
);

const LightModeHero = () => (
  <>
    <div className="absolute inset-0 bg-cover bg-center">
      <div
        className="absolute inset-0 bg-cover bg-end animate-[fireBreath_4s_ease-in-out_infinite]"
        style={{
          backgroundImage: "url('/images/textures/fire2-background.jpg')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/50 to-black/80" />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, hsl(var(--brand-light)) 0%, transparent 70%)`,
          mixBlendMode: "overlay"
        }}
      />
    </div>

    <div className="relative container mx-auto px-4 md:px-8 h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="relative text-center space-y-12 md:space-y-10 px-4">
          <motion.div {...FADE_UP_ANIMATION}>
            <RusticText
              text="INNOVATION MEETS STYLE"
              className="font-bold text-[var(--brand)] tracking-wide drop-shadow-lg"
             
            />
          </motion.div>

          <motion.p
            {...FADE_UP_ANIMATION}
            transition={{ ...FADE_UP_ANIMATION.transition, delay: 0.5 }}
            className="text-brand-dark tracking-wide"
            style={{ fontSize: "clamp(1.025rem, 3vw, 1.875rem)" }}
          >
            Experience a perfect blend of future-forward designs and timeless classics.
          </motion.p>
        </div>
      </div>

      <div className="relative -mx-4 md:-mx-8 z-20 mb-24">
        <LayoutCarousel />
      </div>
    </div>

    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80 z-30" />
  </>
);

const HeroSection: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!resolvedTheme) {
      setTheme("dark");
    }
  }, [resolvedTheme, setTheme]);

  if (!mounted) {
    return <div className="h-[90vh] md:h-[80vh] bg-[var(--background)]" />;
  }

  const isDarkMode = theme === "dark" || resolvedTheme === "dark";

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {isDarkMode ? <DarkModeHero /> : <LightModeHero />}
    </div>
  );
};

export default HeroSection;