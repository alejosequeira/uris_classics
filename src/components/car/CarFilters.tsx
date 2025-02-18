"use client"
import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Car } from '@/types/car';
import { debounce } from 'lodash';
interface PriceRange {
  min: number;
  max: number | null;
  label: string;
}

interface CarFiltersProps {
  onFilterChange: (filters: { [key: string]: string | number | boolean }) => void;
  onSortChange: (sortOption: string) => void;
  onClearFilters: () => void;
  onSearch: (term: string) => void;
  makes: string[];
  cars: Car[];
  sortOption: string;
  carsPerPage: number;
  showOnlyFavorites: boolean;
  isFiltersOpen: boolean;
  onToggleFilters: (isOpen: boolean) => void;
  searchTerm?: string;
  onCarsPerPageChange: (value: number) => void;
  onToggleFavorites: (value: boolean) => void;
}
const CARS_PER_PAGE = 6;

const PRICE_RANGES: PriceRange[] = [
  { min: 0, max: 50000, label: '$0 - $50,000' },
  { min: 50000, max: 75000, label: '$50,000 - $75,000' },
  { min: 75000, max: 100000, label: '$75,000 - $100,000' },
  { min: 100000, max: 125000, label: '$100,000 - $125,000' },
  { min: 125000, max: 150000, label: '$125,000 - $150,000' },
  { min: 150000, max: null, label: '$150,000 - over' }
];

const CarFilters: React.FC<CarFiltersProps> = ({
  onFilterChange,
  onSortChange,
  onClearFilters,
  onSearch,
  makes,
  sortOption,
  carsPerPage,
  showOnlyFavorites,
  isFiltersOpen,
  onToggleFilters,
  searchTerm = '',
  onCarsPerPageChange,
  onToggleFavorites
}) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);
  const [searchValue, setSearchValue] = useState(searchTerm);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const handlePriceRangeChange = (range: PriceRange) => {
    setSelectedPriceRange(range);
    onFilterChange({
      minPrice: range.min,
      maxPrice: range.max ?? Number.MAX_SAFE_INTEGER
    });
  };
  
  // Crear función debounced para la búsqueda
  const debouncedSearch = debounce((term: string) => {
    onSearch(term);
  }, 300);

  // Manejar cambios en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    onFilterChange({ year });
  };

  const handleMakeSelect = (make: string) => {
    setSelectedMake(make);
    onFilterChange({ make });
  };

  // Actualizar searchValue cuando cambia searchTerm
  useEffect(() => {
    setSearchValue(searchTerm);
  }, [searchTerm]);

  return (
    <div className="w-full space-y-4">
      {/* Top Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search by Year, Make or Model"
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:border-brand"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-card/50 rounded-full">
            <Search className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <button
          className="px-6 py-2.5 bg-brand hover:bg-brand-dark text-white rounded-lg flex items-center gap-2 transition-colors"
          onClick={() => onToggleFilters(!isFiltersOpen)}
        >
          <SlidersHorizontal className="h-5 w-5" />
          {isFiltersOpen ? 'CLOSE' : 'FILTERS'}
        </button>

        <button
          className="px-6 py-2.5 border border-border hover:bg-card text-foreground rounded-lg flex items-center gap-2 transition-colors"
          onClick={() => {
            onClearFilters();
            setSelectedPriceRange(null);
          }}
        >
          <RotateCcw className="h-5 w-5" />
          RESET
        </button>
      </div>

      {/* Filter Dropdowns */}
      <div className={`grid grid-cols-6 gap-2 ${isFiltersOpen ? 'block' : 'hidden'}`}>
        {/* Year Dropdown */}
        <div className="relative group">
          <button className={`w-full px-4 py-2.5 text-left rounded-t-lg transition-colors ${selectedYear ? 'bg-brand text-white' : 'bg-card text-foreground'
            }`}>
            {selectedYear ? `Year: ${selectedYear}` : 'Year'}
          </button>
          <div className="absolute top-full left-0 w-full bg-card border border-border rounded-b-lg overflow-hidden hidden group-hover:block z-10 max-h-[300px] overflow-y-auto">
            {[...Array(2025 - 1932 + 1)].map((_, i) => (
              <button
                key={2025 - i}
                className={`w-full px-4 py-2 text-left transition-colors ${selectedYear === (2025 - i)
                  ? 'bg-brand text-white'
                  : 'text-foreground hover:bg-brand hover:text-white'
                  }`}
                onClick={() => handleYearSelect(2025 - i)}
              >
                {2025 - i}
              </button>
            ))}
          </div>
        </div>

        {/* Make Dropdown */}
        <div className="relative group">
          <button className={`w-full px-4 py-2.5 text-left rounded-t-lg transition-colors ${selectedMake ? 'bg-brand text-white' : 'bg-card text-foreground'
            }`}>
            {selectedMake || 'Make'}
          </button>
          <div className="absolute top-full left-0 w-full bg-card border border-border rounded-b-lg overflow-hidden hidden group-hover:block z-10">
            {makes.map(make => (
              <button
                key={make}
                className={`w-full px-4 py-2 text-left transition-colors ${selectedMake === make
                  ? 'bg-brand text-white'
                  : 'text-foreground hover:bg-brand hover:text-white'
                  }`}
                onClick={() => handleMakeSelect(make)}
              >
                {make}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Per Page Dropdown */}
        <div className="relative group">
          <button className={`w-full px-4 py-2.5 text-left rounded-t-lg transition-colors ${carsPerPage !== CARS_PER_PAGE ? 'bg-brand text-white' : 'bg-card text-foreground'
            }`}>
            {`${carsPerPage} per page`}
          </button>
          <div className="absolute top-full left-0 w-full bg-card border border-border rounded-b-lg overflow-hidden hidden group-hover:block z-10">
            {[6, 12, 24, 48].map(option => (
              <button
                key={option}
                className={`w-full px-4 py-2 text-left transition-colors ${carsPerPage === option
                  ? 'bg-brand text-white'
                  : 'text-foreground hover:bg-brand hover:text-white'
                  }`}
                onClick={() => onCarsPerPageChange(option)}
              >
                {option} cars
              </button>
            ))}
          </div>
        </div>

        {/* Show Only Favorites Toggle */}
        <div className="relative">
          <button
            className={`w-full px-4 py-2.5 text-left rounded-lg transition-colors ${showOnlyFavorites
              ? 'bg-brand text-white'
              : 'bg-card text-foreground hover:bg-brand hover:text-white'
              }`}
            onClick={() => onToggleFavorites(!showOnlyFavorites)}
          >
            {showOnlyFavorites ? 'Show All' : 'Show Favorites'}
          </button>
        </div>

        {/* Price Range Dropdown */}
        <div className="relative group">
          <button className={`w-full px-4 py-2.5 text-left rounded-t-lg transition-colors ${selectedPriceRange ? 'bg-brand text-white' : 'bg-card text-foreground'
            }`}>
            {selectedPriceRange ? selectedPriceRange.label : 'Price'}
          </button>
          <div className="absolute top-full left-0 w-full bg-card border border-border rounded-b-lg overflow-hidden hidden group-hover:block z-10">
            {PRICE_RANGES.map(range => (
              <button
                key={range.label}
                className={`w-full px-4 py-2 text-left transition-colors ${selectedPriceRange === range
                  ? 'bg-brand text-white'
                  : 'text-foreground hover:bg-brand hover:text-white'
                  }`}
                onClick={() => handlePriceRangeChange(range)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="relative group">
          <button className={`w-full px-4 py-2.5 text-left rounded-t-lg transition-colors ${sortOption !== 'default' ? 'bg-brand text-white' : 'bg-card text-foreground'
            }`}>
            {sortOption === 'default' ? 'Sort By' :
              sortOption === 'priceHighToLow' ? 'Price: High to Low' :
                'Price: Low to High'}
          </button>
          <div className="absolute top-full left-0 w-full bg-card border border-border rounded-b-lg overflow-hidden hidden group-hover:block z-10">
            <button
              className={`w-full px-4 py-2 text-left transition-colors ${sortOption === 'default'
                ? 'bg-brand text-white'
                : 'text-foreground hover:bg-brand hover:text-white'
                }`}
              onClick={() => onSortChange('default')}
            >
              Default
            </button>
            <button
              className={`w-full px-4 py-2 text-left transition-colors ${sortOption === 'priceHighToLow'
                ? 'bg-brand text-white'
                : 'text-foreground hover:bg-brand hover:text-white'
                }`}
              onClick={() => onSortChange('priceHighToLow')}
            >
              Price: High to Low
            </button>
            <button
              className={`w-full px-4 py-2 text-left transition-colors ${sortOption === 'priceLowToHigh'
                ? 'bg-brand text-white'
                : 'text-foreground hover:bg-brand hover:text-white'
                }`}
              onClick={() => onSortChange('priceLowToHigh')}
            >
              Price: Low to High
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarFilters;