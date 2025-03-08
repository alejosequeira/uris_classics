'use client';

import { useState, useEffect, useCallback } from 'react';
import CarCard from '@/components/car/CarCard';
import CarFilters from '@/components/car/CarFilters';
import Pagination from '@/components/ui/Pagination';
import { Car, PaginatedResponse } from '@/types/car';
import mockCars from '@/api/carData';
import ViewToggle from '@/components/ui/ViewToggle';
import Spinner from '@/components/ui/Spinner';
import { useSearch } from '@/context/SearchContext';
import HeroSection from '@/components/layout/HeroSection';

const CARS_PER_PAGE = 6;

interface Filters {
  make: string;
  minYear: number;
  maxYear: number;
  minPrice: number;
  maxPrice: number;
}

export default function CarsPage() {
  const { searchTerm } = useSearch();
  const [cars, setCars] = useState<Car[]>([]);
  const [sortOption, setSortOption] = useState('default');
  const [filteredCars, setFilteredCars] = useState<PaginatedResponse<Car>>({
    data: [],
    total: 0,
    page: 1,
    perPage: CARS_PER_PAGE,
  });
  const [filters, setFilters] = useState<Filters>({
    make: '',
    minYear: 1930,
    maxYear: 2024,
    minPrice: 0,
    maxPrice: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(CARS_PER_PAGE);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const makes = Array.from(new Set(mockCars.map(car => car.make)));

  // Inicializar coches y favoritos
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCars') || '[]');
    const carsWithFavorites = mockCars.map(car => ({
      ...car,
      isFavorite: storedFavorites.includes(car.id)
    }));
    setCars(carsWithFavorites);
    
  }, []);

  const filterAndSortCars = useCallback(async (
    searchTerm: string,
    currentFilters: typeof filters,
    page: number,
    currentSortOption: string,
    perPage: number = carsPerPage
  ) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const filtered = cars.filter((car) => {
      const matchesSearch = searchTerm
        ? car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year.toString().includes(searchTerm)
        : true;

      const matchesMake = !currentFilters.make || car.make === currentFilters.make;
      const matchesMinYear = !currentFilters.minYear || car.year >= currentFilters.minYear;
      const matchesMaxYear = !currentFilters.maxYear || car.year <= currentFilters.maxYear;
      const matchesPrice = (
        !currentFilters.minPrice || car.price >= currentFilters.minPrice
      ) && (
          !currentFilters.maxPrice || car.price <= currentFilters.maxPrice
        );
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
    }

    // Paginar resultados
    const startIndex = (page - 1) * perPage;
    const paginatedCars = filtered.slice(startIndex, startIndex + perPage);

    setFilteredCars({
      data: paginatedCars,
      total: filtered.length,
      page,
      perPage,
    });

    setIsLoading(false);
  }, [cars, showOnlyFavorites, carsPerPage]);


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
          return [key, typeof value === 'string' ? Number(value) || 0 : value];
        })
      )
    };
    setFilters(updatedFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption);
    filterAndSortCars(searchTerm, filters, currentPage, newSortOption);
  };

  const handleClearFilters = () => {
    setFilters({
      make: '',
      minYear: 1969,
      maxYear: 2024,
      minPrice: 0,
      maxPrice: 0
    });
    setSortOption('default');
    setShowOnlyFavorites(false);
    setCarsPerPage(CARS_PER_PAGE);
    setCurrentPage(1);
    // Asegurarse de que esto dispare el filterAndSortCars
    filterAndSortCars('', {
      make: '',
      minYear: 1969,
      maxYear: 2024,
      minPrice: 0,
      maxPrice: 0
    }, 1, 'default', CARS_PER_PAGE);
  };
  const handleToggleFavorite = (carId: string) => {
    const updatedCars = cars.map(car =>
      car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car
    );
    setCars(updatedCars);

    const favoriteCars = updatedCars.filter(car => car.isFavorite).map(car => car.id);
    localStorage.setItem('favoriteCars', JSON.stringify(favoriteCars));

    filterAndSortCars(searchTerm, filters, currentPage, sortOption);
  };


  // Efecto para manejar búsquedas y filtros
  useEffect(() => {

    filterAndSortCars(searchTerm || '', filters, currentPage, sortOption, carsPerPage);

  }, [filterAndSortCars, searchTerm, filters, currentPage, sortOption, carsPerPage]);

  return (
    <>
      <HeroSection />
    <div className=" container mx-auto px-4 py-8">
    

      <div className="shadow-xl rounded-lg p-6 mb-8">
        
        <CarFilters
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}

          makes={makes}
          carsPerPage={carsPerPage}
          showOnlyFavorites={showOnlyFavorites}
          cars={cars}
          sortOption={sortOption}
          isFiltersOpen={isFiltersOpen}
          onToggleFilters={setIsFiltersOpen}
          onCarsPerPageChange={setCarsPerPage}
          onToggleFavorites={setShowOnlyFavorites}
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-lg text-muted-foreground">
          Mostrando {filteredCars.data.length} de {filteredCars.total} autos
        </p>
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      {isLoading ? (
        <Spinner />
      ) : filteredCars.total > 0 ? (
        <>
          <div
            className={
              view === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {filteredCars.data.map(car => (
              <CarCard
                key={car.id}
                car={car}
                onToggleFavorite={handleToggleFavorite}
                view={view}
              />
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
        <div className="text-center py-12">
          <p className="text-2xl text-foreground mb-2">No se encontraron autos</p>
          <p className="text-muted-foreground">
            Intenta ajustar tu búsqueda o criterios de filtro
          </p>
        </div>
      )}
    </div>
    </>
  );
}