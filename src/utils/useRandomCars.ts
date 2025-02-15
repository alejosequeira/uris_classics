// hooks/useRandomCars.ts
import { useState, useEffect } from 'react';
import { CarouselCar, getRandomCarouselCars } from '@/api/carData';

export const useRandomCars = () => {
  const [randomCars, setRandomCars] = useState<CarouselCar[]>([]);

  const getRandomCars = () => {
    setRandomCars(getRandomCarouselCars());
  };

  useEffect(() => {
    getRandomCars();
  }, []);

  return { randomCars, refreshCars: getRandomCars };
};