'use client';

import { useState, useEffect } from 'react';
import { Car } from '@/types/car';
import CarCard from '@/components/car/CarCard';

interface SimilarCarsProps {
  similarCars: Car[];
}

const SimilarCars: React.FC<SimilarCarsProps> = ({ similarCars: initialSimilarCars }) => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    // Leer favoritos del localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCars') || '[]');
    
    // Actualizar el estado inicial con los favoritos guardados
    const updatedCars = initialSimilarCars.map(car => ({
      ...car,
      isFavorite: storedFavorites.includes(car.id)
    }));
    
    setCars(updatedCars);
  }, [initialSimilarCars]);

  const handleToggleFavorite = (carId: string) => {
    setCars(prevCars => {
      const newCars = prevCars.map(car => 
        car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car
      );
      
      // Actualizar localStorage
      const allFavoriteCars = JSON.parse(localStorage.getItem('favoriteCars') || '[]');
      const carToUpdate = prevCars.find(car => car.id === carId);
      const updatedFavorites = carToUpdate?.isFavorite
        ? allFavoriteCars.filter((id: string) => id !== carId)
        : [...allFavoriteCars, carId];
      
      localStorage.setItem('favoriteCars', JSON.stringify(updatedFavorites));
      return newCars;
    });
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Similar Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(similarCar => (
          <CarCard 
            key={similarCar.id} 
            car={similarCar} 
            onToggleFavorite={handleToggleFavorite} 
            view="grid"
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarCars;