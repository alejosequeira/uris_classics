// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from 'next/image';
// import { RefreshCw } from 'lucide-react';
// import { useRandomCars } from '@/utils/useRandomCars';
// import { CarouselCar } from '@/api/carData';

// const BackgroundCarousel = () => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const { randomCars, refreshCars } = useRandomCars();
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({
//         x: (e.clientX - window.innerWidth / 2) / 50,
//         y: (e.clientY - window.innerHeight / 2) / 50
//       });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <div className="absolute inset-0 w-full h-full pointer-events-none">
//       {/* Botón de refresh */}
//       <motion.button
//         className="absolute top-8 right-8 p-3 rounded-full bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm pointer-events-auto z-50"
//         whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)" }}
//         whileTap={{ scale: 0.95 }}
//         onClick={refreshCars}
//       >
//         <RefreshCw className="w-6 h-6 text-red-500" />
//       </motion.button>

//       {/* Contenedor del carrusel */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <AnimatePresence>
//           {randomCars.map((car, index) => {
//             const angle = (index / (randomCars.length - 1)) * Math.PI;
//             const x = Math.cos(angle) * 600;
//             const y = Math.sin(angle) * 80;
//             const isHovered = hoveredIndex === index;

//             return (
//               <motion.div
//                 key={index}
//                 className="absolute pointer-events-auto"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{
//                   opacity: isHovered ? 1 : 0.8,
//                   scale: isHovered ? 1.1 : 1,
//                   x: x + mousePosition.x,
//                   y: y + mousePosition.y,
//                   zIndex: isHovered ? 20 : 10,
//                   filter: isHovered ? 'none' : 'brightness(0.7)',
//                 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 300,
//                   damping: 25
//                 }}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//               >
//                 {/* Contenedor de imagen */}
//                 <div className="relative w-64 h-48 rounded-lg overflow-hidden group">
//                   {/* Efecto de brillo */}
//                   <motion.div
//                     className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
//                     animate={{
//                       boxShadow: isHovered 
//                         ? [
//                             "0 0 20px rgba(239, 68, 68, 0.3), 0 0 40px rgba(239, 68, 68, 0.2)",
//                             "0 0 30px rgba(239, 68, 68, 0.4), 0 0 60px rgba(239, 68, 68, 0.3)",
//                             "0 0 20px rgba(239, 68, 68, 0.3), 0 0 40px rgba(239, 68, 68, 0.2)",
//                           ]
//                         : "none",
//                     }}
//                     transition={{ repeat: Infinity, duration: 2 }}
//                   />

//                   <Image
//                     src={car.imageUrl}
//                     alt={car.title}
//                     fill
//                     className="object-cover transition-transform duration-300 group-hover:scale-110"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     priority={index < 2}
//                   />

//                   {/* Overlay gradiente */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                   {/* Título */}
//                   <motion.div
//                     className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
//                     style={{
//                       background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
//                     }}
//                   >
//                     <h3 
//                       className="text-white font-bold text-xl text-center"
//                       style={{
//                         textShadow: '0 2px 4px rgba(0,0,0,0.5)',
//                         letterSpacing: '0.5px'
//                       }}
//                     >
//                       {car.title}
//                     </h3>
//                   </motion.div>
//                 </div>

//                 {/* Efecto de reflexión */}
//                 <div 
//                   className="w-64 h-12 mt-1 opacity-30"
//                   style={{
//                     background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)',
//                     transform: 'scaleY(-1)',
//                     filter: 'blur(4px)'
//                   }}
//                 />
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default BackgroundCarousel;






















"use client";
import { useState, useEffect } from "react";
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

const BackgroundCarousel = ({ cars, hoveredIndex, setHoveredIndex }: CarouselProps) => {
    
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { randomCars, refreshCars } = useRandomCars();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };

        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isMobile]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.button
                className="absolute top-8 right-8 p-3 rounded-full bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm pointer-events-auto z-50 md:block hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshCars}
            >
                <RefreshCw className="w-6 h-6 text-red-500" />
            </motion.button>

            <div className="absolute inset-0 flex items-center justify-center">
                {randomCars.map((car, index) => {
                    const angle = (index / (randomCars.length - 1)) * Math.PI;
                    const radius = isMobile ? 300 : 600;
                    const baseX = Math.cos(angle) * radius;
                    const baseY = Math.sin(angle) * (isMobile ? 40 : 80);
                    const offsetX = mousePosition.x * (isMobile ? 25 : 50);
                    const offsetY = mousePosition.y * (isMobile ? 10 : 20);
                    const isHovered = hoveredIndex === index;

                    return (
                        <motion.div
                            key={`${car.imageUrl}-${index}`}
                            className="absolute cursor-pointer pointer-events-auto"
                            style={{
                                x: baseX + (isMobile ? 0 : offsetX),
                                y: baseY + (isMobile ? 0 : offsetY),
                                rotateX: isMobile ? 0 : mousePosition.y * -15,
                                rotateY: isMobile ? 0 : mousePosition.x * 15,
                            }}
                        >
                            {/* Área de detección */}
                            <div
                                className="absolute w-48 md:w-96 h-48 md:h-96 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hover:scale-105 transition-transform"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
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
                                        className="absolute w-[280px] md:w-[400px] h-[175px] md:h-[250px]"
                                        style={{
                                            left: '50%',
                                            bottom: '100%',
                                            x: '-50%',
                                            zIndex: 9999,
                                            pointerEvents: 'none'
                                        }}
                                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: -20,
                                            transition: {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 30
                                            }
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.8,
                                            y: 50,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                                            <Image
                                                src={car.imageUrl}
                                                alt={car.alt || car.title}
                                                fill
                                                sizes="(max-width: 768px) 280px, 400px"
                                                quality={90}
                                                priority={car.priority}
                                                loading={car.priority ? "eager" : "lazy"}
                                                className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'
                                                    }`}
                                            />

                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <motion.div
                                                    className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
                                                    initial={{ y: 20 }}
                                                    animate={{ y: 0 }}
                                                >
                                                    <h3 className="text-white font-bold text-lg md:text-2xl text-center">
                                                        {car.title}
                                                    </h3>
                                                </motion.div>
                                            </motion.div>

                                            <motion.div
                                                className="absolute inset-0 rounded-xl"
                                                animate={{
                                                    boxShadow: [
                                                        "0 0 30px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.3)",
                                                        "0 0 40px rgba(239, 68, 68, 0.4), inset 0 0 25px rgba(239, 68, 68, 0.4)",
                                                        "0 0 30px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.3)"
                                                    ]
                                                }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default BackgroundCarousel;