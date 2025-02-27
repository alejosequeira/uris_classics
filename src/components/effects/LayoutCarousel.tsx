"use client"
import { useRandomCars } from '@/utils/useRandomCars';
import BackgroundCarousel from './BackgroundCarousel';
import MobileCarousel from './MobileCarousel';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LayoutCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { randomCars } = useRandomCars();
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Agregar debounce al detector de redimensión
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    
    const checkMobile = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 200);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const loadingTimer = setTimeout(() => setIsLoading(false), 500);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(debounceTimer);
      clearTimeout(loadingTimer);
    };
  }, []);


  const desktopCarData = useMemo(() => 
    randomCars.map((car, index) => ({
      ...car,
      priority: index < 2,
      alt: `${car.title} view ${index + 1}`
    })),
    [randomCars]
  );

  // Estabilizar la función de setHoveredIndex
  const handleSetHoveredIndex = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  if (isLoading) {
    return <div className="w-full h-64 bg-black/10 animate-pulse" />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        key={isMobile ? 'mobile' : 'desktop'}
      >
        {isMobile ? (
          <MobileCarousel />
        ) : (
          <BackgroundCarousel 
            cars={desktopCarData}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={handleSetHoveredIndex}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(LayoutCarousel);