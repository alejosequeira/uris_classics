"use client";
import React, { useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import {ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselCar } from '@/api/carData';



const MobileCarousel = ({ cars }: { cars: CarouselCar[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % cars.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
    };
  
    return (
      <div className="relative w-full max-w-[90%] mx-auto -mt-32 ">
        {/* Indicadores en la parte superior */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
          {cars.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-red-500 w-4' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
  
        {/* Contenedor principal con margen para ver el hero */}
        <div className="relative aspect-[16/10] w-full mx-auto">
          {/* Imagen principal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative h-full rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Marco con efecto neón */}
              <motion.div
                className="absolute inset-0 rounded-lg z-20"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(239, 68, 68, 0.2), inset 0 0 15px rgba(239, 68, 68, 0.2)",
                    "0 0 30px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.3)",
                    "0 0 20px rgba(239, 68, 68, 0.2), inset 0 0 15px rgba(239, 68, 68, 0.2)",
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
  
              <Image
                src={cars[currentIndex].imageUrl}
                alt={cars[currentIndex].title}
                fill
                className="object-cover"
                priority
              />
  
              {/* Gradiente y título */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent">
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-white font-bold text-2xl text-center">
                    {cars[currentIndex].title}
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
  
          {/* Botones de navegación con efecto glassmorphism */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/20 backdrop-blur-sm z-30 
                       hover:bg-black/30 transition-all duration-300"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6 text-white/90" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/20 backdrop-blur-sm z-30
                       hover:bg-black/30 transition-all duration-300"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6 text-white/90" />
          </button>
        </div>
      </div>
    );
  };

  export default MobileCarousel;