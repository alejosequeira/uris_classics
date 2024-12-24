"use client"
import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';
import { Car } from '@/types/car';
import CarSearch from '@/components/car/CarSearch';

interface CarFiltersProps {
  onFilterChange: (filters: { [key: string]: string | number | boolean }) => void;
  onSortChange: (sortOption: string) => void;
  onClearFilters: () => void;
  
  makes: string[];
  carsPerPage: number;
  showOnlyFavorites: boolean;
  cars: Car[];
  sortOption: string;
}

const CarFilters: React.FC<CarFiltersProps> = ({
  onFilterChange,
  onSortChange,
  onClearFilters,
  
  makes,
  carsPerPage,
  showOnlyFavorites,
  cars,
  sortOption
}) => {
  const currentYear = new Date().getFullYear();
  const [yearRange, setYearRange] = useState([1900, currentYear]);
  const [priceRange, setPriceRange] = useState([1000000]);
  const [maxPrice, setMaxPrice] = useState(1000000);

  useEffect(() => {
    if (cars.length > 0) {
      const years = cars.map(car => car.year);
      const prices = cars.map(car => car.price);
      setYearRange([Math.min(...years), Math.max(...years)]);
      const newMaxPrice = Math.max(...prices, 1000);
      setMaxPrice(newMaxPrice);
      setPriceRange([newMaxPrice]);
    }
  }, [cars]);

  const handleSearch = (searchTerm: string) => {
    // Usamos onFilterChange pasando el término de búsqueda
    onFilterChange({ searchTerm: searchTerm });
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    onFilterChange({ [name]: newValue });
  };

  const handleYearRangeChange = (values: number[]) => {
    setYearRange(values);
    onFilterChange({ minYear: values[0], maxYear: values[1] });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    onFilterChange({ maxPrice: values[0] });
  };

  return (
    <div className="relative mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <CarSearch onSearch={handleSearch} variant="default" />
      </div>

      {/* Filters Section */}
      <div className="p-6 rounded-lg border-2 
                    bg-[rgb(var(--bg-primary-light))] dark:bg-[rgb(var(--bg-primary-dark))]
                    border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Make Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[rgb(var(--text-secondary-light))] dark:text-[rgb(var(--text-secondary-dark))]">
              Make
            </label>
            <select
              name="make"
              onChange={handleChange}
              className="w-full p-3 rounded-lg
                       bg-[rgb(var(--bg-secondary-light))] dark:bg-[rgb(var(--bg-secondary-dark))]
                       text-[rgb(var(--text-primary-light))] dark:text-[rgb(var(--text-primary-dark))]
                       border border-[rgb(var(--border-light))] dark:border-[rgb(var(--border-dark))]
                       focus:ring-2 focus:ring-[rgb(var(--accent-light))] dark:focus:ring-[rgb(var(--accent-dark))]"
            >
              <option value="">All Makes</option>
              {makes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>

          {/* Year Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[rgb(var(--text-secondary-light))] dark:text-[rgb(var(--text-secondary-dark))]">
              Year Range
            </label>
            <Range
              step={1}
              min={1900}
              max={currentYear}
              values={yearRange}
              onChange={handleYearRangeChange}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-2 w-full bg-[rgb(var(--border-light))] dark:bg-[rgb(var(--border-dark))] rounded-full"
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-5 w-5 rounded-full bg-[rgb(var(--accent-light))] dark:bg-[rgb(var(--accent-dark))] 
                           shadow-lg ring-2 ring-[rgb(var(--bg-primary-light))] dark:ring-[rgb(var(--bg-primary-dark))]"
                />
              )}
            />
            <div className="flex justify-between mt-2 text-sm text-[rgb(var(--text-secondary-light))] dark:text-[rgb(var(--text-secondary-dark))]">
              <span>{yearRange[0]}</span>
              <span>{yearRange[1]}</span>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[rgb(var(--text-secondary-light))] dark:text-[rgb(var(--text-secondary-dark))]">
              Max Price
            </label>
            <Range
              step={1000}
              min={0}
              max={maxPrice}
              values={priceRange}
              onChange={handlePriceChange}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-2 w-full bg-[rgb(var(--border-light))] dark:bg-[rgb(var(--border-dark))] rounded-full"
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-5 w-5 rounded-full bg-[rgb(var(--accent-light))] dark:bg-[rgb(var(--accent-dark))] 
                           shadow-lg ring-2 ring-[rgb(var(--bg-primary-light))] dark:ring-[rgb(var(--bg-primary-dark))]"
                />
              )}
            />
            <div className="flex justify-between mt-2 text-sm text-[rgb(var(--text-secondary-light))] dark:text-[rgb(var(--text-secondary-dark))]">
              <span>$0</span>
              <span>${priceRange[0].toLocaleString()}</span>
            </div>
          </div>

          {/* Sort and Display Options */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[rgb(var(--text-secondary-light))] dark:text-[rgb(var(--text-secondary-dark))]">
                Sort By
              </label>
              <select
                name="sortOption"
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full p-3 rounded-lg
                         bg-[rgb(var(--bg-secondary-light))] dark:bg-[rgb(var(--bg-secondary-dark))]
                         text-[rgb(var(--text-primary-light))] dark:text-[rgb(var(--text-primary-dark))]
                         border border-[rgb(var(--border-light))] dark:border-[rgb(var(--border-dark))]"
              >
                <option value="default">Default</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="priceLowToHigh">Price: Low to High</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="favorites"
                name="showOnlyFavorites"
                checked={showOnlyFavorites}
                onChange={handleChange}
                className="w-4 h-4 rounded border-[rgb(var(--border-light))] dark:border-[rgb(var(--border-dark))]
                         text-[rgb(var(--accent-light))] dark:text-[rgb(var(--accent-dark))]"
              />
              <label
                htmlFor="favorites"
                className="text-sm text-[rgb(var(--text-secondary-light))] dark:text-[rgb(var(--text-secondary-dark))]"
              >
                Show only favorites
              </label>
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClearFilters}
            className="px-6 py-2 rounded-lg
                     bg-[rgb(var(--mahogany))]
                     text-[rgb(var(--ivory))]
                     hover:opacity-90 transition-all duration-300"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Art Deco Decorations */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] rounded-br-lg" />
    </div>
  );
};

export default CarFilters;