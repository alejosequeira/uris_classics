import Image from 'next/image';
import { RefreshCw, ChevronRight } from 'lucide-react';
import { useRandomCars } from '@/utils/useRandomCars';
import { CarouselCar } from '@/api/carData';
import BackgroundCarousel from './BackgroundCarousel';
import MobileCarousel from './MobileCarousel';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LayoutCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { randomCars } = useRandomCars();
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setTimeout(() => setIsLoading(false), 500);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
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
      >
        {isMobile ? (
          <MobileCarousel 
            cars={randomCars.map((car, index) => ({
              ...car,
              priority: index === 0,
              alt: `${car.title} view ${index + 1}`
            }))} 
          />
        ) : (
          <BackgroundCarousel 
            cars={randomCars.map((car, index) => ({
              ...car,
              priority: index < 2,
              alt: `${car.title} view ${index + 1}`
            }))}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LayoutCarousel;