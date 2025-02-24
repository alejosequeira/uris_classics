'use client';

import { useState, useEffect } from 'react';
import { Car } from '@/types/car';
import CarCard from '@/components/car/CarCard';
import { 
  Package, 
  ChevronLeft, 
  ChevronRight,
  Gauge,
  DollarSign,
  Calendar
} from 'lucide-react';

interface SimilarCarsProps {
  similarCars: Car[];
}

const SimilarCars: React.FC<SimilarCarsProps> = ({ similarCars: initialSimilarCars }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterBy, setFilterBy] = useState<'price' | 'year' | 'mileage'>('price');
  const cardsToShow = 3;

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCars') || '[]');
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
      
      const allFavoriteCars = JSON.parse(localStorage.getItem('favoriteCars') || '[]');
      const carToUpdate = prevCars.find(car => car.id === carId);
      const updatedFavorites = carToUpdate?.isFavorite
        ? allFavoriteCars.filter((id: string) => id !== carId)
        : [...allFavoriteCars, carId];
      
      localStorage.setItem('favoriteCars', JSON.stringify(updatedFavorites));
      return newCars;
    });
  };

  const sortedCars = [...cars].sort((a, b) => {
    switch (filterBy) {
      case 'price':
        return b.price - a.price;
      case 'year':
        return b.year - a.year;
      case 'mileage':
        return a.specifications.mileage - b.specifications.mileage;
      default:
        return 0;
    }
  });

  const visibleCars = sortedCars.slice(currentIndex, currentIndex + cardsToShow);
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex + cardsToShow < sortedCars.length;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(prev => Math.min(sortedCars.length - cardsToShow, prev + 1));
    }
  };

  const FilterButton = ({ value, icon: Icon, label }: { value: typeof filterBy, icon: any, label: string }) => (
    <button
      onClick={() => setFilterBy(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        filterBy === value
          ? 'bg-brand text-white dark:text-gray-900'
          : 'bg-backgroundsecond dark:bg-gray-200 text-white dark:text-gray-900 hover:bg-background dark:hover:bg-gray-300'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="relative">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-brand" />
          <h2 className="text-2xl font-bold text-white dark:text-gray-900">
            Similar Cars
          </h2>
          <span className="text-gray-400 dark:text-gray-600">
            ({sortedCars.length})
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <FilterButton value="price" icon={DollarSign} label="Price" />
          <FilterButton value="year" icon={Calendar} label="Year" />
          <FilterButton value="mileage" icon={Gauge} label="Mileage" />
        </div>
      </div>

      {/* Cars Grid with Navigation */}
      <div className="relative group">
        {/* Navigation Buttons */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-backgroundsecond dark:bg-white/50 text-white dark:text-gray-900 p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-brand"
            aria-label="Previous cars"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-backgroundsecond dark:bg-white/50 text-white dark:text-gray-900 p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-brand"
            aria-label="Next cars"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Cards Container */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300"
          role="region"
          aria-label="Similar cars gallery"
        >
          {visibleCars.map(similarCar => (
            <div 
              key={similarCar.id}
              className="transform transition-all duration-300 hover:scale-[1.02]"
            >
              <CarCard 
                car={similarCar} 
                onToggleFavorite={handleToggleFavorite} 
                view="grid"
              />
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        {sortedCars.length > cardsToShow && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(sortedCars.length / cardsToShow) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * cardsToShow)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  Math.floor(currentIndex / cardsToShow) === idx
                    ? 'bg-brand w-6'
                    : 'bg-gray-600 dark:bg-gray-400'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {visibleCars.length === 0 && (
          <div className="text-center py-12 bg-backgroundsecond dark:bg-gray-100 rounded-xl">
            <Package className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-300 dark:text-gray-700">No similar cars found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarCars;