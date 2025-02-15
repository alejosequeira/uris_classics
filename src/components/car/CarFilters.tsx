// import React, { useState, useEffect } from 'react';
// import { Range } from 'react-range';
// import { Car } from '@/types/car';

// // Importamos los componentes de Flowbite React
// import { Button, Label, Select, Checkbox } from 'flowbite-react';

// interface CarFiltersProps {
//   onFilterChange: (filters: { [key: string]: string | number | boolean }) => void;
//   onSortChange: (sortOption: string) => void;
//   onClearFilters: () => void;
//   makes: string[];
//   carsPerPage: number;
//   showOnlyFavorites: boolean;
//   cars: Car[];
//   sortOption: string;
// }

// const CarFilters: React.FC<CarFiltersProps> = ({
//   onFilterChange,
//   onSortChange,
//   onClearFilters,
//   makes,
//   carsPerPage,
//   showOnlyFavorites,
//   cars,
//   sortOption
// }) => {
//   const currentYear = new Date().getFullYear();
//   const [yearRange, setYearRange] = useState([1900, currentYear]);
//   const [priceRange, setPriceRange] = useState([1000000]);
//   const [maxPrice, setMaxPrice] = useState(1000000);

//   useEffect(() => {
//     if (cars.length > 0) {
//       const years = cars.map(car => car.year);
//       const prices = cars.map(car => car.price);
//       setYearRange([Math.min(...years), Math.max(...years)]);
//       const newMaxPrice = Math.max(...prices, 1000);
//       setMaxPrice(newMaxPrice);
//       setPriceRange([newMaxPrice]);
//     }
//   }, [cars]);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
//     const { name, value, type } = e.target;
//     const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
//     onFilterChange({ [name]: newValue });
//   };

//   const handleYearRangeChange = (values: number[]) => {
//     setYearRange(values);
//     onFilterChange({ minYear: values[0], maxYear: values[1] });
//   };

//   const handlePriceChange = (values: number[]) => {
//     setPriceRange(values);
//     onFilterChange({ maxPrice: values[0] });
//   };

//   return (
//     <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-100 rounded-lg">

//       {/* Ejemplo con Label + Select de Flowbite */}
//       <div>
//         <Label htmlFor="make" value="Make" />
//         <Select
//           id="make"
//           name="make"
//           onChange={handleChange}
//           className="min-w-[120px]" // puedes agregar tus propias clases
//         >
//           <option value="">All Makes</option>
//           {makes.map(make => (
//             <option key={make} value={make}>{make}</option>
//           ))}
//         </Select>
//       </div>

//       {/* Range para año (usando react-range, estilo manual) */}
//       <div className="w-64">
//         <Range
//           step={1}
//           min={1900}
//           max={currentYear}
//           values={yearRange}
//           onChange={handleYearRangeChange}
//           renderTrack={({ props, children }) => (
//             <div
//               {...props}
//               style={{
//                 ...props.style,
//                 height: '6px',
//                 width: '100%',
//                 backgroundColor: '#ddd'
//               }}
//             >
//               {children}
//             </div>
//           )}
//           renderThumb={({ props }) => (
//             <div
//               {...props}
//               style={{
//                 ...props.style,
//                 height: '20px',
//                 width: '20px',
//                 backgroundColor: '#999'
//               }}
//             />
//           )}
//         />
//         <div className="flex justify-between mt-2">
//           <span>{yearRange[0]}</span>
//           <span>{yearRange[1]}</span>
//         </div>
//       </div>

//       {/* Range para precio */}
//       <div className="w-64">
//         <Range
//           step={1000}
//           min={0}
//           max={Math.max(maxPrice, 1000)}
//           values={priceRange}
//           onChange={handlePriceChange}
//           renderTrack={({ props, children }) => (
//             <div
//               {...props}
//               style={{
//                 ...props.style,
//                 height: '6px',
//                 width: '100%',
//                 backgroundColor: '#ddd'
//               }}
//             >
//               {children}
//             </div>
//           )}
//           renderThumb={({ props }) => (
//             <div
//               {...props}
//               style={{
//                 ...props.style,
//                 height: '20px',
//                 width: '20px',
//                 backgroundColor: '#999'
//               }}
//             />
//           )}
//         />
//         <div className="flex justify-between mt-2">
//           <span>$0</span>
//           <span>${priceRange[0].toLocaleString()}</span>
//         </div>
//       </div>

//       {/* Select para orden */}
//       <div>
//         <Label htmlFor="sortOption" value="Sort" />
//         <Select
//           id="sortOption"
//           name="sortOption"
//           value={sortOption}
//           onChange={(e) => onSortChange(e.target.value)}
//           className="min-w-[150px]"
//         >
//           <option value="default">Default</option>
//           <option value="priceHighToLow">Price: High to Low</option>
//           <option value="priceLowToHigh">Price: Low to High</option>
//         </Select>
//       </div>

//       {/* Select para carsPerPage */}
//       <div>
//         <Label htmlFor="carsPerPage" value="Cars per page" />
//         <Select
//           id="carsPerPage"
//           name="carsPerPage"
//           value={carsPerPage}
//           onChange={handleChange}
//           className="min-w-[120px]"
//         >
//           <option value={6}>6 per page</option>
//           <option value={12}>12 per page</option>
//           <option value={24}>24 per page</option>
//         </Select>
//       </div>

//       {/* Checkbox para mostrar favoritos */}
//       <div className="flex items-center gap-2">
//         <Checkbox
//           id="favorites"
//           name="showOnlyFavorites"
//           checked={showOnlyFavorites}
//           onChange={handleChange}
//         />
//         <Label htmlFor="favorites" className="cursor-pointer">
//           Show only favorites
//         </Label>
//       </div>

//       {/* Botón con Flowbite */}
//       <Button color="failure" onClick={onClearFilters}>
//         Clear Filters
//       </Button>

//     </div>
//   );
// };

// export default CarFilters;



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
  
}

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
  cars,
  sortOption,
  carsPerPage,
  showOnlyFavorites,
  isFiltersOpen,
  onToggleFilters,
   searchTerm = ''
}) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);
  const [searchValue, setSearchValue] = useState(searchTerm);
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

  // Limpiar el debounce al desmontar
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

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
      <div
        className={`grid grid-cols-5 gap-2 ${isFiltersOpen ? 'block' : 'hidden'
          }`}
      >
        {/* Year Dropdown */}
        <div className="relative group">
          <button className="w-full px-4 py-2.5 bg-brand text-white text-left rounded-t-lg">
            Year
          </button>
          <div className="absolute top-full left-0 w-full bg-card border border-border rounded-b-lg overflow-hidden hidden group-hover:block z-10 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
            {[...Array(2025 - 1932 + 1)].map((_, i) => (
              <button
                key={2025 - i}
                className="w-full px-4 py-2 text-foreground hover:bg-brand hover:text-white text-left transition-colors"
                onClick={() => onFilterChange({ year: 2025 - i })}
              >
                {2025 - i}
              </button>
            ))}
          </div>
        </div>

        {/* Make Dropdown */}
        <div className="relative group">
          <button className="w-full px-4 py-2.5 bg-card text-foreground text-left rounded-t-lg">
            Make
          </button>
          <div className="absolute top-full left-0 w-full bg-card border border-border rounded-b-lg overflow-hidden hidden group-hover:block z-10">
            {makes.map(make => (
              <button
                key={make}
                className="w-full px-4 py-2 text-foreground hover:bg-brand hover:text-white text-left transition-colors"
                onClick={() => onFilterChange({ make })}
              >
                {make}
              </button>
            ))}
          </div>
        </div>

        {/* Model Dropdown */}
        <div className="relative group">
          <button className="w-full px-4 py-2.5 bg-card text-foreground text-left rounded-t-lg">
            Model
          </button>
          <div className="absolute top-full left-0 w-full bg-card border border-border rounded-b-lg overflow-hidden hidden group-hover:block z-10">
            {/* Add model options based on selected make */}
          </div>
        </div>

        {/* Price Range Dropdown */}
        <div className="relative group">
          <button className="w-full px-4 py-2.5 bg-card text-foreground text-left rounded-t-lg">
            Price
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
          <button className="w-full px-4 py-2.5 bg-card text-foreground text-left rounded-t-lg">
            Sort By
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