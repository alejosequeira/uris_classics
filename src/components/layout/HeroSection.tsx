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
        <div className="relative h-full overflow-hidden">
            {isDarkMode ? (
                /* Dark Mode Hero */
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center h-screen" // Ajustamos a altura completa
                        style={{
                            backgroundImage: "url('/images/optimizadoback/hero-bg.jpg')",
                            transform: `translateY(${scrollY * 0.5}px)`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--emerald))]/95 via-[rgb(var(--emerald))]/80 to-[rgb(var(--navy))]/90" />
                    <div className="absolute inset-4 md:inset-8 border border-[rgb(var(--soft-gold))]/20" />

                    <div className="relative container mx-auto px-4 md:px-8 min-h-screen flex flex-col justify-center items-center pt-20"> {/* Ajustamos altura y espaciado */}
                        <div className="space-y-8 md:space-y-12 mb-12 md:mb-20 text-center"> {/* Aumentamos espaciado */}
                            <h1
                                className={`${playfair.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[rgb(var(--ivory))] tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] animate-fadeSlideUp`}
                            >
                                TIMELESS ELEGANCE
                            </h1>
                            <p className="text-xl sm:text-2xl md:text-3xl font-light max-w-[90%] md:max-w-4xl mx-auto text-[rgb(var(--soft-gold))] tracking-wide leading-relaxed animate-fadeSlideUp animation-delay-200">
                                Every Classic Tells a Story with Pleasant Moments Shared
                            </p>
                        </div>
                        <div className="w-full max-w-3xl mt-8 animate-fadeSlideUp animation-delay-400"> {/* Aumentamos ancho máximo */}
                            <CarSearch onSearch={handleSearch} variant="hero" isTransparent={true} />
                        </div>
                    </div>
                </>
            ) : (
                /* Light Mode Hero */
                <div className="relative h-full overflow-visible bg-black flex flex-col">
                    {/* Capa 1: Textura de aceite con parallax */}
                    <div
                        className="absolute top-48 left-0 right-0 bottom-0 bg-cover bg-end opacity-20"
                        style={{
                            backgroundImage: "url('/images/textures/oil-splatter.png')",
                            transform: `translateY(${scrollY * 0.1}px)`,
                        }}
                    />

                    {/* Capa 2: Gradiente rojo radial */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at center, hsl(var(--brand-light)) 0%, transparent 70%)`,
                            mixBlendMode: "overlay",
                        }}
                    />

                    {/* Capa 3: Efecto de brillo en los bordes */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at center, transparent 30%, hsl(var(--brand-dark)) 100%)`,
                            mixBlendMode: "multiply",
                        }}
                    />

                    {/* Contenedor principal */}
                    <div className="relative z-10 container mx-auto px-8 flex flex-col items-center text-center pt-40 sm:pt-44 md:pt-48 lg:pt-52">
                        <ParticlesEffect />

                        {/* Título principal */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full mb-8 sm:mb-12"
                        >
                            <RusticText
                                text="INNOVATION MEETS STYLE"
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[var(--brand)] tracking-wide drop-shadow-lg"
                            />
                        </motion.div>

                        {/* Subtítulo */}
                        <motion.p
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="mt-8 mb-12 text-base sm:text-lg md:text-xl text-[var(--brand-light)] tracking-wide mx-auto w-full px-4"
                        >
                            Experience a perfect blend of future-forward designs and timeless classics.
                        </motion.p>

                        {/* Buscador */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="mt-8 mb-16 w-full max-w-[95%] sm:max-w-2xl"
                        >
                            <CarSearch onSearch={() => { }} variant="hero" isTransparent={true} />
                        </motion.div>

                        {/* Carrusel */}
                        <div className="relative w-screen px-0 z-20 mt-40 mb-20">
                            <LayoutCarousel />
                        </div>
                    </div>

                    {/* Línea decorativa */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80 z-30"></div>
                </div>
            )}
        </div>
    );
};

export default HeroSection;
