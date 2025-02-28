"use client";
import React, { useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselCar } from '@/api/carData';
import { useRandomCars } from '@/utils/useRandomCars';

// Componente memoizado para los botones indicadores
const CarouselIndicator = memo(({ 
  isActive, 
  onClick 
}: { 
  index: number; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-2 h-2 rounded-full transition-all duration-300 ${
      isActive ? 'bg-red-500 w-4' : 'bg-white/50 hover:bg-white/80'
    }`}
  />
));
CarouselIndicator.displayName = 'CarouselIndicator';

// Componente memoizado para los botones de navegación
const NavigationButton = memo(({ 
  direction, 
  onClick 
}: { 
  direction: 'left' | 'right'; 
  onClick: () => void;
}) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      className={`absolute ${direction === 'left' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 
        p-2.5 rounded-full bg-black/20 backdrop-blur-sm z-30 
        hover:bg-black/30 transition-all duration-300`}
      onClick={onClick}
    >
      <Icon className="w-6 h-6 text-white/90" />
    </button>
  );
});
NavigationButton.displayName = 'NavigationButton';
{/* Contenedor principal 

// Botón de refresco memoizado
const RefreshButton = memo(({ onClick }: { onClick: () => void }) => (
  <motion.button
    className="absolute right-2 top-[calc(50%+2.5rem)] -translate-y-1/2 p-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm z-30 transition-all duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <RefreshCw className="w-5 h-5 text-white/90" />
  </motion.button>
));
RefreshButton.displayName = 'RefreshButton';

  // Memoizar el handler de refresh
  const handleRefresh = useCallback(() => {
    console.log("Refresh button clicked");
    refreshCars();
    // Resetear el índice al refrescar
    setCurrentIndex(0);
  }, [refreshCars]);
*/}
// Componente memoizado para el contenido del slide
const SlideContent = memo(({ 
  car 
}: { 
  car: CarouselCar;
}) => (
  <>
    <Image
      src={car.imageUrl}
      alt={car.title}
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent">
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-white font-bold text-2xl text-center">
          {car.title}
        </h3>
      </motion.div>
    </div>
  </>
));
SlideContent.displayName = 'SlideContent';

const MobileCarousel = () => {
  // Usar directamente el hook para obtener los coches y la función de refresco
  const { randomCars } = useRandomCars();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handlers memoizados
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % randomCars.length);
  }, [randomCars.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + randomCars.length) % randomCars.length);
  }, [randomCars.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);



  // Animaciones memoizadas
  const neonAnimation = useMemo(() => ({
    animate: {
      boxShadow: [
        "0 0 20px rgba(239, 68, 68, 0.2), inset 0 0 15px rgba(239, 68, 68, 0.2)",
        "0 0 30px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.3)",
        "0 0 20px rgba(239, 68, 68, 0.2), inset 0 0 15px rgba(239, 68, 68, 0.2)",
      ]
    },
    transition: { repeat: Infinity, duration: 2 }
  }), []);

  const slideAnimations = useMemo(() => ({
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3 }
  }), []);

  // Si aún no hay coches, mostrar algo mientras cargan
  if (randomCars.length === 0) {
    return <div className="w-full max-w-[90%] mx-auto -mt-4 aspect-[16/10] bg-gray-900/50 rounded-lg animate-pulse" />;
  }

  return (
    <div className="relative w-full max-w-[90%] mx-auto -mt-4">
      {/* Indicadores */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        {randomCars.map((_, index) => (
          <CarouselIndicator
            key={index}
            index={index}
            isActive={index === currentIndex}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Contenedor principal */}
      <div className="relative aspect-[16/10] w-full mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative h-full rounded-lg overflow-hidden"
            {...slideAnimations}
          >
            {/* Marco neón */}
            <motion.div
              className="absolute inset-0 rounded-lg z-20"
              {...neonAnimation}
            />
            <SlideContent car={randomCars[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        {/* Botones de navegación */}
        <NavigationButton direction="left" onClick={prevSlide} />
        <NavigationButton direction="right" onClick={nextSlide} />
        
        {/* Botón de refresco - ahora posicionado debajo del botón de navegación derecho 
        <RefreshButton onClick={handleRefresh} />*/}
      </div>
    </div>
  );
};

export default memo(MobileCarousel);