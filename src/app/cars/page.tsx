'use client';

import { useState, useEffect } from 'react';
import CarCard from '@/components/car/CarCard';
import CarSearch from '@/components/car/CarSearch';
import CarFilters from '@/components/car/CarFilters';
import Pagination from '@/components/ui/Pagination';
import { Car, PaginatedResponse } from '@/types/car';
import mockCars from '@/api/carData';
import ViewToggle from '@/components/ui/ViewToggle';
import Spinner from '@/components/ui/Spinner';

const CARS_PER_PAGE = 6;

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [sortOption, setSortOption] = useState('default');
  const [filteredCars, setFilteredCars] = useState<PaginatedResponse<Car>>({
    data: [],
    total: 0,
    page: 1,
    perPage: CARS_PER_PAGE,
  });
  const [filters, setFilters] = useState({ make: '', minYear: 1969, maxYear: 2024, maxPrice: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(CARS_PER_PAGE);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = Math.ceil(filteredCars.total / carsPerPage);
  const makes = Array.from(new Set(mockCars.map(car => car.make)));

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCars') || '[]');
    const carsWithFavorites = mockCars.map(car => ({
      ...car,
      isFavorite: storedFavorites.includes(car.id)
    }));
    setCars(carsWithFavorites);
  }, []);

  useEffect(() => {
    filterAndSortCars(searchTerm, filters, currentPage, sortOption);
  }, [currentPage, carsPerPage, showOnlyFavorites, cars, searchTerm, filters, sortOption]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption);
    filterAndSortCars(searchTerm, filters, currentPage, newSortOption);
  };

  const handleFilterChange = (newFilter: { [key: string]: string | number | boolean }) => {
    const updatedFilters = {
      ...filters,
      ...Object.fromEntries(
        Object.entries(newFilter).map(([key, value]) => {
          if (key === 'make') return [key, value];
          if (key === 'showOnlyFavorites') {
            setShowOnlyFavorites(value as boolean);
            return [key, value];
          }
          if (key === 'carsPerPage') {
            setCarsPerPage(Number(value));
            return [key, Number(value)];
          }
          return [key, value === '' ? 0 : Number(value)];
        })
      )
    };
    setFilters(updatedFilters);
    setCurrentPage(1);
  };

  const filterAndSortCars = async (searchTerm: string, currentFilters: typeof filters, page: number, currentSortOption: string, perPage: number = carsPerPage) => {
    setIsLoading(true);
    // Simulamos una carga asíncrona
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = cars.filter((car) => {
      const matchesSearch =
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year.toString().includes(searchTerm);

      const matchesMake = !currentFilters.make || car.make === currentFilters.make;
      const matchesMinYear = !currentFilters.minYear || car.year >= currentFilters.minYear;
      const matchesMaxYear = !currentFilters.maxYear || car.year <= currentFilters.maxYear;
      const matchesPrice = !currentFilters.maxPrice || car.price <= currentFilters.maxPrice;
      const matchesFavorite = !showOnlyFavorites || car.isFavorite;

      return matchesSearch && matchesMake && matchesMinYear && matchesMaxYear && matchesPrice && matchesFavorite;
    });


    // Aplicar ordenamiento
    switch (currentSortOption) {
      case 'priceHighToLow':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'priceLowToHigh':
        filtered.sort((a, b) => a.price - b.price);
        break;
      default:
        // Mantener el orden original o aplicar un orden por defecto
        break;
    }

    const startIndex = (page - 1) * perPage;
    const paginatedCars = filtered.slice(startIndex, startIndex + perPage);

    setFilteredCars({
      data: paginatedCars,
      total: filtered.length,
      page: page,
      perPage: perPage,
    });
    setIsLoading(false);
  };

  const handleToggleFavorite = (carId: string) => {
    const updatedCars = cars.map(car =>
      car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car
    );
    setCars(updatedCars);

    // Actualizar localStorage
    const favoriteCars = updatedCars.filter(car => car.isFavorite).map(car => car.id);
    localStorage.setItem('favoriteCars', JSON.stringify(favoriteCars));

    filterAndSortCars(searchTerm, filters, currentPage, sortOption);
  };

  const handleClearFilters = () => {
    setFilters({
      make: '',
      minYear: 1900,
      maxYear: new Date().getFullYear(),
      maxPrice: 0
    });
    setSortOption('default');
    setShowOnlyFavorites(false);
    setCarsPerPage(CARS_PER_PAGE);
    setCurrentPage(1);
    setSearchTerm('');
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Exclusive Collection</h1>
      <CarSearch onSearch={handleSearch} />
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <CarFilters
          onFilterChange={handleFilterChange}
          
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}          
          makes={makes}
          carsPerPage={carsPerPage}
          showOnlyFavorites={showOnlyFavorites}
          cars={cars}
          sortOption={sortOption}
        />
       
      </div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg text-gray-600">
          Showing {filteredCars.data.length} of {filteredCars.total} cars
        </p>
        <ViewToggle view={view} onViewChange={setView} />
      </div>
      {isLoading ? (
        <Spinner />
      ) : filteredCars.data.length > 0 ? (
        <>
          <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
            {filteredCars.data.map(car => (
              <CarCard key={car.id} car={car} onToggleFavorite={handleToggleFavorite} view={view} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredCars.total / carsPerPage)}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <p className="text-center text-xl mt-10 text-gray-600">No cars found matching your criteria.</p>
      )}
    </div>
  );
}