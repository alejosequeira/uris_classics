"use client";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { RefreshCw } from 'lucide-react';
import { useRandomCars } from '@/utils/useRandomCars';
import { CarouselCar } from '@/api/carData';

interface CarouselProps {
  cars: CarouselCar[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

// Componente memoizado para cada coche
const CarItem = memo(({ 
  car, 
  index, 
  position, 
  isHovered, 
  onHover,
  onLeave 
}: { 
  car: CarouselCar; 
  index: number; 
  position: { x: number; y: number; rotateX: number; rotateY: number; }; 
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  // Valores de animación memoizados
  const hoverAnimations = useMemo(() => ({
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: {
      opacity: 1,
      scale: 1,
      y: -20,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 }
    }
  }), []);

  const boxShadowAnimation = useMemo(() => ({
    animate: {
      boxShadow: [
        "0 0 30px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.3)",
        "0 0 40px rgba(239, 68, 68, 0.4), inset 0 0 25px rgba(239, 68, 68, 0.4)",
        "0 0 30px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.3)"
      ]
    },
    transition: { repeat: Infinity, duration: 2 }
  }), []);

  return (
    <motion.div
      key={`${car.imageUrl}-${index}`}
      className="absolute cursor-pointer pointer-events-auto"
      style={position}
    >
      {/* Área de detección */}
      <div
        className="absolute w-96 h-96 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hover:scale-105 transition-transform"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-red-500/30"
          animate={{
            scale: isHovered ? 0 : 1,
            opacity: isHovered ? 0 : 0.6
          }}
        />
      </div>

      {/* Contenedor de imagen */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute w-[400px] h-[250px]"
            style={{
              left: '50%',
              bottom: '100%',
              x: '-50%',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
            initial={hoverAnimations.initial}
            animate={hoverAnimations.animate}
            exit={hoverAnimations.exit}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src={car.imageUrl}
                alt={car.alt || car.title}
                fill
                sizes="400px"
                quality={90}
                priority={car.priority}
                loading={car.priority ? "eager" : "lazy"}
                className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  <h3 className="text-white font-bold text-2xl text-center">
                    {car.title}
                  </h3>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-xl"
                {...boxShadowAnimation}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
CarItem.displayName = 'CarItem';

// Botón de refresco memoizado
const RefreshButton = memo(({ onClick }: { onClick: () => void }) => (
  <motion.button
    className="absolute top-8 right-8 p-3 rounded-full bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm pointer-events-auto z-50"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <RefreshCw className="w-6 h-6 text-red-500" />
  </motion.button>
));
RefreshButton.displayName = 'RefreshButton';

const BackgroundCarousel = ({ hoveredIndex, setHoveredIndex, cars }: CarouselProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { refreshCars } = useRandomCars();

  // Optimizar el manejo de movimiento del mouse con throttling
  useEffect(() => {
    let lastUpdateTime = 0;
    const throttleMs = 16; // ~60fps
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdateTime < throttleMs) return;
      
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
      lastUpdateTime = now;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handlers estabilizados
  const handleSetHoveredIndex = useCallback((index: number) => {
    setHoveredIndex(index);
  }, [setHoveredIndex]);
  
  const handleClearHoveredIndex = useCallback(() => {
    setHoveredIndex(null);
  }, [setHoveredIndex]);

  // Calcular posiciones una vez por render y memorizarlas
  const carPositions = useMemo(() => {
    return cars.map((_, index) => {
      const angle = (index / (cars.length - 1)) * Math.PI;
      const radius = 600;
      const baseX = Math.cos(angle) * radius;
      const baseY = Math.sin(angle) * 80;
      const offsetX = mousePosition.x * 50;
      const offsetY = mousePosition.y * 20;
      
      return {
        x: baseX + offsetX,
        y: baseY + offsetY,
        rotateX: mousePosition.y * -15,
        rotateY: mousePosition.x * 15,
      };
    });
  }, [cars.length, mousePosition.x, mousePosition.y]);

  // Memoizar el handler de refresh
  const handleRefresh = useCallback(() => {
    refreshCars();
  }, [refreshCars]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <RefreshButton onClick={handleRefresh} />

      <div className="absolute inset-0 flex items-center justify-center">
        {cars.map((car, index) => (
          <CarItem
            key={`${car.imageUrl}-${index}`}
            car={car}
            index={index}
            position={carPositions[index]}
            isHovered={hoveredIndex === index}
            onHover={() => handleSetHoveredIndex(index)}
            onLeave={handleClearHoveredIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(BackgroundCarousel);