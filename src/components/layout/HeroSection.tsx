"use client"
import React, { useEffect, useState } from 'react';
import { Playfair_Display } from 'next/font/google';
import CarSearch from '@/components/car/CarSearch';
import { useSearch } from '@/context/SearchContext';

const playfair = Playfair_Display({ subsets: ['latin'] });

const HeroSection: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { handleSearch } = useSearch();

    return (
        <div className="relative h-[90vh] md:h-[80vh] overflow-hidden">
            {/* Fondo y gradientes */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/images/website/hero-bg.jpg')`,
                    transform: `translateY(${scrollY * 0.5}px)`
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--emerald))]/95 via-[rgb(var(--emerald))]/80 to-[rgb(var(--navy))]/90" />

            {/* Marco exterior */}
            <div className="absolute inset-4 md:inset-8 border border-[rgb(var(--soft-gold))]/20" />

            {/* Contenido principal */}
            <div className="relative container mx-auto px-4 md:px-8 h-full flex flex-col justify-center items-center">
                <div className="space-y-4 md:space-y-8 mb-8 md:mb-16 text-center">
                    <h1 className={`${playfair.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold 
                       text-[rgb(var(--ivory))] tracking-wider
                       drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]
                       animate-fadeSlideUp`}>
                        TIMELESS ELEGANCE
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl font-light 
                       max-w-[90%] md:max-w-3xl mx-auto
                       text-[rgb(var(--soft-gold))] tracking-wide leading-relaxed
                       animate-fadeSlideUp animation-delay-200">
                        Every Classic Tells a Story with Pleasant Moments Shared
                    </p>
                </div>

                {/* Buscador usando CarSearch */}
                <div className="w-full max-w-2xl animate-fadeSlideUp animation-delay-400">
                    <CarSearch 
                        onSearch={handleSearch} 
                        variant="hero" 
                        isTransparent={true}
                    />
                </div>

                {/* Elemento decorativo inferior */}
                <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 
                             w-[80%] md:w-96
                             flex items-center justify-center space-x-4 md:space-x-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgb(var(--soft-gold))] to-transparent" />
                    <div className="w-2 md:w-3 h-2 md:h-3 rotate-45 border border-[rgb(var(--soft-gold))]
                                animate-pulse" />
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgb(var(--soft-gold))] to-transparent" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;