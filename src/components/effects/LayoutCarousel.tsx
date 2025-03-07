"use client"
import BackgroundCarousel from './BackgroundCarousel';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const LayoutCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Detector de redimensión con debounce
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    
    const checkMobile = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 200);
    };
    
    // Comprobación inicial
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Tiempo de carga simulado
    const loadingTimer: NodeJS.Timeout = setTimeout(() => setIsLoading(false), 500);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(debounceTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  // Función de manejo de hover estabilizada
  const handleSetHoveredIndex = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  // Estado de carga
  if (isLoading) {
    return <div className="w-full h-64 bg-black/10 animate-pulse" />;
  }

  // Si es móvil, no renderizamos el componente en absoluto
  if (isMobile) {
    return null;
  }

  // Solo renderizamos BackgroundCarousel si es desktop
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <BackgroundCarousel 
        hoveredIndex={hoveredIndex}
        setHoveredIndex={handleSetHoveredIndex}
      />
    </motion.div>
  );
};

export default React.memo(LayoutCarousel);