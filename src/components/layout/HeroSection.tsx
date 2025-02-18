"use client";
import React, { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import CarSearch from "@/components/car/CarSearch";
import { useSearch } from "@/context/SearchContext";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import RusticText from "@/components/effects/RusticText";
import ParticlesEffect from "@/components/effects/ParticlesEffect";
import LayoutCarousel from "@/components/effects/LayoutCarousel";

const playfair = Playfair_Display({ subsets: ["latin"] });

const HeroSection: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    const { theme, resolvedTheme, setTheme } = useTheme();
    const { handleSearch } = useSearch();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!resolvedTheme) {
            setTheme("dark"); // Establecer el Dark Mode como predeterminado
        }
    }, [resolvedTheme, setTheme]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) {
        // Renderiza un estado neutral mientras el tema se carga
        return <div className="h-[90vh] md:h-[80vh] bg-[var(--background)]" />;
    }

    const isDarkMode = theme === "dark" || resolvedTheme === "dark";

    return (
        <div className="relative h-screen overflow-hidden">
            {isDarkMode ? (
                /* Dark Mode Hero */
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center h-screen" // Ajustamos a altura completa
                        style={{
                            backgroundImage: "url('/images/optimizadoback/culo-mustang.jpg')",
                            transform: `translateY(${scrollY * 0.5}px)`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--emerald))]/95 via-[rgb(var(--emerald))]/80 to-[rgb(var(--navy))]/90" />
                    <div className="absolute inset-4 md:inset-8 border border-[rgb(var(--soft-gold))]/20" />

                    <div className="relative container mx-auto px-4 md:px-8 min-h-screen flex flex-col justify-center items-center pt-20"> {/* Ajustamos altura y espaciado */}



                        <div className="relative w-full h-full">
                            <div className="relative text-center space-y-6 md:space-y-10 px-4">
                                <h1
                                    className={`
        ${playfair.className} 
        text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl 
        font-bold tracking-wider 
        drop-shadow-[0_4px_8px_rgba(255,255,255,0.3)] 
        animate-fadeSlideUp
    `}
                                >
                                    TIMELESS ELEGANCE
                                </h1>

                                <p
                                    className={`
        ${playfair.className} 
        text-lg sm:text-xl md:text-2xl 
        font-light text-white tracking-wide leading-relaxed 
        drop-shadow-[0_2px_6px_rgba(255,255,255,0.2)] 
        animate-fadeSlideUp animation-delay-200
    `}
                                >
                                    We are dedicated to parking your dream car in your garage!
                                </p>
                            </div>
                        </div>




                        <div className="w-full max-w-3xl mt-8 animate-fadeSlideUp animation-delay-400"> {/* Aumentamos ancho máximo */}
                            <CarSearch onSearch={handleSearch} variant="hero" isTransparent={true} />
                        </div>
                    </div>
                </>
            ) : (
                /* Light Mode Hero */
                <>
                <div className="absolute inset-0 bg-cover bg-center h-screen">
                    {/* Capa 1: Textura de aceite con parallax */}
                    <div
                        className="absolute inset-0 bg-cover bg-end animate-[fireBreath_4s_ease-in-out_infinite]"
                        style={{
                            backgroundImage: "url('/images/textures/fire2-background.jpg')",
                            '--scroll-y': `${scrollY * 0.1}px`,
                        } as React.CSSProperties}
                    />

                    {/* Capas de gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/50 to-black/80" />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at center, hsl(var(--brand-light)) 0%, transparent 70%)`,
                            mixBlendMode: "overlay",
                        }}
                    />
                </div>

                {/* Contenedor principal */}
                <div className="relative container mx-auto px-4 md:px-8 min-h-screen flex flex-col justify-center items-center">
                    <ParticlesEffect />

                    <div className="relative w-full h-full">
                        <div className="relative text-center space-y-6 md:space-y-10 px-4">
                            {/* Título principal */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                <RusticText
                                    text="INNOVATION MEETS STYLE"
                                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--brand)] tracking-wide drop-shadow-lg"
                                />
                            </motion.div>

                            {/* Subtítulo */}
                            <motion.p
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-lg sm:text-xl md:text-2xl text-[var(--brand-light)] tracking-wide"
                            >
                                Experience a perfect blend of future-forward designs and timeless classics.
                            </motion.p>
                        </div>
                    </div>

                    {/* Buscador */}
                    <div className="w-full max-w-3xl mt-8 animate-fadeSlideUp animation-delay-400">
                        <CarSearch onSearch={() => { }} variant="hero" isTransparent={true} />
                    </div>

                    {/* Carrusel */}
                    <div className="relative w-screen px-0 z-20 mt-20">
                        <LayoutCarousel />
                    </div>
                </div>

                {/* Línea decorativa */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80 z-30"></div>
            </>
            )}
        </div>
    );
};

export default HeroSection;
