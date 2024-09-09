'use client';

import { useState, useEffect } from 'react';
import CarCard from '@/components/car/CarCard';
import CarSearch from '@/components/car/CarSearch';
import CarFilters from '@/components/car/CarFilters';
import Pagination from '@/components/ui/Pagination';
import { Car, PaginatedResponse } from '@/types/car';
import mockCars from '@/api/carData';

const CARS_PER_PAGE = 6;

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<PaginatedResponse<Car>>({
    data: [],
    total: 0,
    page: 1,
    perPage: CARS_PER_PAGE,
  });
  const [filters, setFilters] = useState({ make: '', minYear: 0, maxPrice: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(CARS_PER_PAGE);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    // Cargar favoritos desde localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCars') || '[]');
    const carsWithFavorites = mockCars.map(car => ({
      ...car,
      isFavorite: storedFavorites.includes(car.id)
    }));
    setCars(carsWithFavorites);
  }, []);

  useEffect(() => {
    filterCars('', filters, currentPage);
  }, [currentPage, carsPerPage, showOnlyFavorites, cars]);

  const handleSearch = (searchTerm: string) => {
    setCurrentPage(1);
    filterCars(searchTerm, filters, 1);
  };

  const handleFilterChange = (newFilter: { [key: string]: string | number }) => {
    const updatedFilters = { 
      ...filters, 
      ...Object.fromEntries(
        Object.entries(newFilter).map(([key, value]) => [key, value === '' ? '' : key === 'make' ? value : Number(value)])
      )
    };
    setFilters(updatedFilters);
    setCurrentPage(1);
    filterCars('', updatedFilters, 1);
  };

  const filterCars = (searchTerm: string, currentFilters: typeof filters, page: number, perPage: number = carsPerPage) => {
    let filtered = cars.filter((car) => {
      const matchesSearch =
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year.toString().includes(searchTerm);

      const matchesMake = !currentFilters.make || car.make === currentFilters.make;
      const matchesYear = !currentFilters.minYear || car.year >= currentFilters.minYear;
      const matchesPrice = !currentFilters.maxPrice || car.price <= currentFilters.maxPrice;
      const matchesFavorite = !showOnlyFavorites || car.isFavorite;

      return matchesSearch && matchesMake && matchesYear && matchesPrice && matchesFavorite;
    });

    const startIndex = (page - 1) * perPage;
    const paginatedCars = filtered.slice(startIndex, startIndex + perPage);

    setFilteredCars({
      data: paginatedCars,
      total: filtered.length,
      page: page,
      perPage: perPage,
    });
  };

  const handleToggleFavorite = (carId: string) => {
    const updatedCars = cars.map(car => 
      car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car
    );
    setCars(updatedCars);
    
    // Actualizar localStorage
    const favoriteCars = updatedCars.filter(car => car.isFavorite).map(car => car.id);
    localStorage.setItem('favoriteCars', JSON.stringify(favoriteCars));

    filterCars('', filters, currentPage);
  };

  const totalPages = Math.ceil(filteredCars.total / carsPerPage);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Our Cars</h1>
      <CarSearch onSearch={handleSearch} />
      <CarFilters 
        onFilterChange={handleFilterChange} 
        carsPerPage={carsPerPage} 
        showOnlyFavorites={showOnlyFavorites}
        onToggleFavorites={() => setShowOnlyFavorites(!showOnlyFavorites)}
      />
      {filteredCars.data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.data.map(car => (
              <CarCard key={car.id} car={car} onToggleFavorite={handleToggleFavorite} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p className="text-center text-xl mt-10">No cars found matching your criteria.</p>
      )}
    </div>
  )
}