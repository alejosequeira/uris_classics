import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';
import { Car } from '@/types/car';

interface CarFiltersProps {
  onFilterChange: (filters: { [key: string]: string | number | boolean }) => void;
  onSortChange: (sortOption: string) => void;
  makes: string[];
  carsPerPage: number;
  showOnlyFavorites: boolean;
  cars: Car[];
  sortOption: string;
}

const CarFilters: React.FC<CarFiltersProps> = ({
  onFilterChange,
  onSortChange,
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
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
      <select 
        name="make" 
        onChange={handleChange} 
        className="p-2 border rounded"
      >
        <option value="">All Makes</option>
        {makes.map(make => (
          <option key={make} value={make}>{make}</option>
        ))}
      </select>

      <div className="w-64">
        <Range
          step={1}
          min={1900}
          max={new Date().getFullYear()}
          values={yearRange}
          onChange={handleYearRangeChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                backgroundColor: '#ddd'
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '20px',
                width: '20px',
                backgroundColor: '#999'
              }}
            />
          )}
        />
        <div className="flex justify-between mt-2">
          <span>{yearRange[0]}</span>
          <span>{yearRange[1]}</span>
        </div>
      </div>

      <div className="w-64">
        <Range
          step={1000}
          min={0}
          max={Math.max(maxPrice, 1000)}
          values={priceRange}
          onChange={handlePriceChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                backgroundColor: '#ddd'
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '20px',
                width: '20px',
                backgroundColor: '#999'
              }}
            />
          )}
        />
        <div className="flex justify-between mt-2">
          <span>$0</span>
          <span>${priceRange[0].toLocaleString()}</span>
        </div>
      </div>

      <select 
        name="sortOption" 
        value={sortOption} 
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="default">Default</option>
        <option value="priceHighToLow">Price: High to Low</option>
        <option value="priceLowToHigh">Price: Low to High</option>
      </select>

      <select 
        name="carsPerPage" 
        value={carsPerPage} 
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value={6}>6 per page</option>
        <option value={12}>12 per page</option>
        <option value={24}>24 per page</option>
      </select>

      <label className="flex items-center">
        <input
          type="checkbox"
          name="showOnlyFavorites"
          checked={showOnlyFavorites}
          onChange={handleChange}
          className="mr-2"
        />
        Show only favorites
      </label>
    </div>
  );
};

export default CarFilters;