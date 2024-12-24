"use client"
// src/components/layout/HeroSection.tsx
import React, { useEffect, useState } from 'react';

import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

interface HeroSectionProps {
//   onSearch: (searchTerm: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({  }) => {
    const onSearch = (searchTerm: string) => {
        console.log(searchTerm);
    };
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Fondo y gradientes */}
      <div 
        className="absolute inset-0 bg-[url('/images/website/hero-bg.jpg')] bg-cover bg-center"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--emerald))]/95 via-[rgb(var(--emerald))]/80 to-[rgb(var(--navy))]/90" />

      {/* Marco exterior refinado */}
      <div className="absolute inset-8 border border-[rgb(var(--soft-gold))]/20" />
      
      {/* Contenido principal */}
      <div className="relative container mx-auto px-8 h-full flex flex-col justify-center items-center">
        {/* Título principal con efecto de sombra mejorado */}
        <div className="space-y-8 mb-16 text-center">
          <h1 className={`${playfair.className} text-7xl md:text-8xl font-bold 
                       text-[rgb(var(--ivory))] tracking-wider
                       drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]
                       animate-fadeSlideUp`}>
            TIMELESS ELEGANCE
          </h1>
          
          {/* Subtítulo con estilo más refinado */}
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto
                     text-[rgb(var(--soft-gold))] tracking-wide leading-relaxed
                     animate-fadeSlideUp animation-delay-200">
            Every Classic Tells a Story with Pleasant Moments Shared
          </p>
        </div>

        {/* Buscador mejorado con glow sutil */}
        <div className="w-full max-w-2xl relative animate-fadeSlideUp animation-delay-400">
          <div className="absolute inset-0 -m-1 bg-[rgb(var(--soft-gold))]/10 blur-lg rounded-full" />
          <input
            type="text"
            placeholder="Search for your dream classic car..."
            className="w-full px-8 py-4 rounded-full
                     bg-[rgb(var(--navy))]/10 backdrop-blur-sm
                     border border-[rgb(var(--soft-gold))]
                     text-[rgb(var(--ivory))] placeholder-[rgb(var(--ivory))]/70
                     focus:outline-none focus:ring-2 focus:ring-[rgb(var(--soft-gold))]
                     transition-all duration-300"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2
                         px-8 py-2 rounded-full
                         bg-[rgb(var(--soft-gold))]
                         text-[rgb(var(--emerald))] font-medium
                         hover:bg-[rgb(var(--ivory))] 
                         transition-all duration-300
                         hover:scale-105">
            Search
          </button>
        </div>

        {/* Elemento decorativo inferior mejorado */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-96
                     flex items-center justify-center space-x-8">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[rgb(var(--soft-gold))] to-transparent" />
          <div className="w-3 h-3 rotate-45 border border-[rgb(var(--soft-gold))]
                       animate-pulse" />
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[rgb(var(--soft-gold))] to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;