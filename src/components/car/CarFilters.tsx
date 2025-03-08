"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  X,
  ChevronDown,
  Heart,
} from 'lucide-react';
import { Car } from '@/types/car';
import { useSearch } from '@/context/SearchContext';
import CarSearch from './CarSearch';
interface PriceRange {
  min: number;
  max: number | null;
  label: string;
}

interface CarFiltersProps {
  onFilterChange: (filters: { [key: string]: string | number | boolean }) => void;
  onSortChange: (sortOption: string) => void;
  onClearFilters: () => void;
  makes: string[];
  cars: Car[];
  sortOption: string;
  carsPerPage: number;
  showOnlyFavorites: boolean;
  isFiltersOpen: boolean;
  onToggleFilters: (isOpen: boolean) => void;
  onCarsPerPageChange: (value: number) => void;
  onToggleFavorites: (value: boolean) => void;
}

const CARS_PER_PAGE = 6;

// Constantes memoizadas fuera del componente
const PRICE_RANGES: PriceRange[] = [
  { min: 0, max: 50000, label: '$0 - $50,000' },
  { min: 50000, max: 75000, label: '$50,000 - $75,000' },
  { min: 75000, max: 100000, label: '$75,000 - $100,000' },
  { min: 100000, max: 125000, label: '$100,000 - $125,000' },
  { min: 125000, max: 150000, label: '$125,000 - $150,000' },
  { min: 150000, max: null, label: '$150,000 - over' }
];

// Array de años pre-calculado
const YEARS = Array.from({ length: 2025 - 1932 + 1 }, (_, i) => 2025 - i);

const CarFilters: React.FC<CarFiltersProps> = ({
  onFilterChange,
  onSortChange,
  onClearFilters,
  makes,
  sortOption,
  carsPerPage,
  showOnlyFavorites,
  isFiltersOpen,
  onToggleFilters,
  onCarsPerPageChange,
  onToggleFavorites
}) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { handleSearch } = useSearch();

  // Memo para los valores por página
  const carsPerPageOptions = useMemo(() => [6, 12, 24, 48], []);

  // useEffect para sincronizar el reset
  useEffect(() => {
    if (sortOption === 'default' && !showOnlyFavorites && carsPerPage === CARS_PER_PAGE) {
      setSelectedPriceRange(null);
      setSelectedYear(null);
      setSelectedMake(null);
      setOpenDropdown(null);
    }
  }, [sortOption, showOnlyFavorites, carsPerPage]);

  // Handler memoizado para los dropdowns
  const handleDropdownToggle = useCallback((dropdownName: string) => {
    setOpenDropdown(currentDropdown =>
      currentDropdown === dropdownName ? null : dropdownName
    );
  }, []);

  // Handlers memoizados para las acciones
  const handlePriceRangeChange = useCallback((range: PriceRange) => {
    setSelectedPriceRange(range);
    setOpenDropdown(null);
    onFilterChange({
      minPrice: range.min,
      maxPrice: range.max ?? Number.MAX_SAFE_INTEGER
    });
  }, [onFilterChange]);

  const handleYearSelect = useCallback((year: number) => {
    setSelectedYear(year);
    setOpenDropdown(null);
    onFilterChange({
      minYear: year,
      maxYear: year
    });
  }, [onFilterChange]);

  const handleMakeSelect = useCallback((make: string) => {
    setSelectedMake(make);
    setOpenDropdown(null);
    onFilterChange({ make });
  }, [onFilterChange]);

  // Handler local para clear filters
  const handleLocalClear = useCallback(() => {
    setSelectedPriceRange(null);
    setSelectedYear(null);
    setSelectedMake(null);
    setOpenDropdown(null);
    onClearFilters();
  }, [onClearFilters]);

  // Handlers para X buttons
  const handleClearYear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedYear(null);
    onFilterChange({ minYear: 1969, maxYear: 2024 });
  }, [onFilterChange]);

  const handleClearMake = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMake(null);
    onFilterChange({ make: '' });
  }, [onFilterChange]);

  const handleClearPrice = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPriceRange(null);
    onFilterChange({ minPrice: 0, maxPrice: 0 });
  }, [onFilterChange]);

  const handleClearSort = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSortChange('default');
    setOpenDropdown(null);
  }, [onSortChange]);

  const handleClearCarsPerPage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onCarsPerPageChange(CARS_PER_PAGE);
    setOpenDropdown(null);
  }, [onCarsPerPageChange]);

  const handleClearFavorites = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorites(false);
  }, [onToggleFavorites]);

  // Memo para handlers de sort
  const sortHandlers = useMemo(() => ({
    default: () => {
      onSortChange('default');
      setOpenDropdown(null);
    },
    highToLow: () => {
      onSortChange('priceHighToLow');
      setOpenDropdown(null);
    },
    lowToHigh: () => {
      onSortChange('priceLowToHigh');
      setOpenDropdown(null);
    }
  }), [onSortChange]);


  return (
    <div className="w-full space-y-4 ">
      {/* Barra superior: Búsqueda + Botones */}
      <div className="flex flex-col sm:flex-row gap-4 ">
        <div className="flex-1">
          <CarSearch
            onSearch={handleSearch}
            variant="default"
            className="w-full"
          />
        </div>

        <div className="flex gap-2 sm:gap-4">
          <button
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-brand hover:bg-brand-dark text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            onClick={() => onToggleFilters(!isFiltersOpen)}
          >
            <SlidersHorizontal className={`h-5 w-5 transition-transform duration-300 ${isFiltersOpen ? 'rotate-180' : ''}`} />
            <span className="hidden sm:inline">{isFiltersOpen ? 'CERRAR' : 'FILTROS'}</span>
          </button>

          <button
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 border border-border  hover:bg-foreground text-card rounded-lg flex items-center justify-center gap-2 transition-colors bg-backgroundtertiary"
            onClick={handleLocalClear}
          >
            <RotateCcw className="h-5 w-5 transition-transform duration-300 hover:rotate-180" />
            <span className="hidden sm:inline">REINICIAR</span>
          </button>
        </div>
      </div>

      {/* Contenedor de Filtros */}
      {isFiltersOpen && (
        <div className="rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Desplegable de Año */}
            <div className="relative ">
          <button
            onClick={() => handleDropdownToggle('year')}
            className={`w-full px-4 py-3 text-left text-white rounded-lg border border-gray-700/50 dark:border-gray-300/50 transition-all duration-200 hover:border-brand focus:outline-none focus:ring-2 focus:ring-brand/50 ${
              selectedYear ? 'bg-brand text-white dark:text-gray-900 border-transparent' : 'bg-backgroundtertiary dark:bg-gray-200/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{selectedYear ? `Año: ${selectedYear}` : 'Año'}</span>
              {selectedYear ? (
                <button
                  onClick={handleClearYear}
                  className="p-1.5 hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'year' ? 'rotate-180' : ''}`} />
              )}
            </div>
          </button>
          {openDropdown === 'year' && (
            <div className="absolute top-full left-0 w-full mt-2 bg-backgroundtertiary dark:bg-white border border-gray-700/50 dark:border-gray-300/50 rounded-lg shadow-xl z-50">
              <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                {YEARS.map(year => (
                  <button
                    key={year}
                    className={`w-full px-4 py-2.5 text-left text-white transition-colors ${
                      selectedYear === year 
                        ? 'bg-brand text-white dark:text-gray-900' 
                        : 'text-gray-300 dark:text-gray-700 hover:bg-brand/10'
                    }`}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

            {/* Desplegable de Marca */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('make')}
                className={`w-full px-4 py-3 text-left text-white rounded-lg border border-gray-700/50 dark:border-gray-300/50 transition-all duration-200 hover:border-brand focus:outline-none focus:ring-2 focus:ring-brand/50 ${selectedMake ? 'bg-brand text-white dark:text-gray-900 border-transparent' : 'bg-backgroundtertiary dark:bg-gray-200/50'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>{selectedMake || 'Marca'}</span>
                  {selectedMake ? (
                    <button
                      onClick={handleClearMake}
                      className="p-1.5 hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'make' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </button>
              {openDropdown === 'make' && (
                <div className="absolute top-full left-0 w-full mt-2 bg-backgroundtertiary dark:bg-white border border-gray-700/50 dark:border-gray-300/50 rounded-lg shadow-xl z-50">
                  <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                    {makes.map(make => (
                      <button
                        key={make}
                        className={`w-full px-4 py-2.5 text-left text-white transition-colors ${selectedMake === make
                            ? 'bg-brand text-white dark:text-gray-900'
                            : 'text-gray-300 dark:text-gray-700 hover:bg-brand/10'
                          }`}
                        onClick={() => handleMakeSelect(make)}
                      >
                        {make}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desplegable de Rango de Precio */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('price')}
                className={`w-full px-4 py-3 text-left text-white rounded-lg border border-gray-700/50 dark:border-gray-300/50 transition-all duration-200 hover:border-brand focus:outline-none focus:ring-2 focus:ring-brand/50 ${selectedPriceRange ? 'bg-brand text-white dark:text-gray-900 border-transparent' : 'bg-backgroundtertiary dark:bg-gray-200/50'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>{selectedPriceRange ? selectedPriceRange.label : 'Precio'}</span>
                  {selectedPriceRange ? (
                    <button
                      onClick={handleClearPrice}
                      className="p-1.5 hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </button>
              {openDropdown === 'price' && (
                <div className="absolute top-full left-0 w-full mt-2 bg-backgroundtertiary dark:bg-white border border-gray-700/50 dark:border-gray-300/50 rounded-lg shadow-xl z-50">
                  {PRICE_RANGES.map(range => (
                    <button
                      key={range.label}
                      className={`w-full px-4 py-2.5 text-left text-white transition-colors ${selectedPriceRange === range
                        ? 'bg-brand text-white dark:text-gray-900'
                        : 'text-gray-300 dark:text-gray-700 hover:bg-brand/10'
                        }`}
                      onClick={() => handlePriceRangeChange(range)}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desplegable de Ordenar Por */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('sort')}
                className={`w-full px-4 py-3 text-left text-white rounded-lg border border-gray-700/50 dark:border-gray-300/50 transition-all duration-200 hover:border-brand focus:outline-none focus:ring-2 focus:ring-brand/50 ${sortOption !== 'default' ? 'bg-brand text-white dark:text-gray-900 border-transparent' : 'bg-backgroundtertiary dark:bg-gray-200/50'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>
                    {sortOption === 'default' ? 'Ordenar Por' :
                      sortOption === 'priceHighToLow' ? 'Precio: Mayor a Menor' :
                        'Precio: Menor a Mayor'}
                  </span>
                  {sortOption !== 'default' ? (
                    <button
                      onClick={handleClearSort}
                      className="p-1.5 hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'sort' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </button>
              {openDropdown === 'sort' && (
                <div className="absolute top-full left-0 w-full mt-2 bg-backgroundtertiary dark:bg-white border border-gray-700/50 dark:border-gray-300/50 rounded-lg shadow-xl z-50">
                  <button
                    className={`w-full px-4 py-2.5 text-left text-white transition-colors ${sortOption === 'default'
                      ? 'bg-brand text-white dark:text-gray-900'
                      : 'text-gray-300 dark:text-gray-700 hover:bg-brand/10'
                      }`}
                    onClick={sortHandlers.default}
                  >
                    Predeterminado
                  </button>
                  <button
                    className={`w-full px-4 py-2.5 text-left text-white transition-colors ${sortOption === 'priceHighToLow'
                      ? 'bg-brand text-white dark:text-gray-900'
                      : 'text-gray-300 dark:text-gray-700 hover:bg-brand/10'
                      }`}
                    onClick={sortHandlers.highToLow}
                  >
                    Precio: Mayor a Menor
                  </button>
                  <button
                    className={`w-full px-4 py-2.5 text-left text-white transition-colors ${sortOption === 'priceLowToHigh'
                      ? 'bg-brand text-white dark:text-gray-900'
                      : 'text-gray-300 dark:text-gray-700 hover:bg-brand/10'
                      }`}
                    onClick={sortHandlers.lowToHigh}
                  >
                    Precio: Menor a Mayor
                  </button>
                </div>
              )}
            </div>

            {/* Desplegable de Autos Por Página */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('carsPerPage')}
                className={`w-full px-4 py-3 text-left text-white rounded-lg border border-gray-700/50 dark:border-gray-300/50 transition-all duration-200 hover:border-brand focus:outline-none focus:ring-2 focus:ring-brand/50 ${carsPerPage !== CARS_PER_PAGE ? 'bg-brand text-white dark:text-gray-900 border-transparent' : 'bg-backgroundtertiary dark:bg-gray-200/50'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>{`${carsPerPage} por página`}</span>
                  {carsPerPage !== CARS_PER_PAGE ? (
                    <button
                      onClick={handleClearCarsPerPage}
                      className="p-1.5 hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'carsPerPage' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </button>
              {openDropdown === 'carsPerPage' && (
                <div className="absolute top-full left-0 w-full mt-2 bg-backgroundtertiary dark:bg-white border border-gray-700/50 dark:border-gray-300/50 rounded-lg shadow-xl z-50">
                  {carsPerPageOptions.map(option => (
                    <button
                      key={option}
                      className={`w-full px-4 py-2.5 text-left text-white transition-colors ${carsPerPage === option
                        ? 'bg-brand text-white dark:text-gray-900'
                        : 'text-gray-300 dark:text-gray-700 hover:bg-brand/10'
                        }`}
                      onClick={() => {
                        onCarsPerPageChange(option);
                        setOpenDropdown(null);
                      }}
                    >
                      {option} autos
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mostrar Solo Favoritos */}
            <button
              onClick={() => onToggleFavorites(!showOnlyFavorites)}
              className={`w-full px-4 py-3 text-left text-white rounded-lg border border-gray-700/50 dark:border-gray-300/50 transition-all duration-200 hover:border-brand focus:outline-none focus:ring-2 focus:ring-brand/50 ${showOnlyFavorites ? 'bg-brand text-white dark:text-gray-900 border-transparent' : 'bg-backgroundtertiary dark:bg-gray-200/50'
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
                  <span>{showOnlyFavorites ? 'Mostrar Favoritos' : 'Mostrar Favoritos'}</span>
                </div>
                {showOnlyFavorites && (
                  <button
                    onClick={handleClearFavorites}
                    className="p-1.5 hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(CarFilters);