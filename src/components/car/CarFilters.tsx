import React from 'react';

interface CarFiltersProps {
    onFilterChange: (filters: { [key: string]: string | number }) => void;
    carsPerPage: number;
    showOnlyFavorites: boolean;
    onToggleFavorites: () => void;
}

const CarFilters: React.FC<CarFiltersProps> = ({ onFilterChange, carsPerPage, showOnlyFavorites, onToggleFavorites }) => {
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        onFilterChange({ [name]: value });
    };

    return (
        <div className="mb-6 flex flex-wrap gap-4 items-center" role="search" aria-label="Car filters">
            <select name="make" onChange={handleFilterChange} className="p-2 border rounded" aria-label="Filter by make">
                <option value="">All Makes</option>
                <option value="Ford">Ford</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Dodge">Dodge</option>
            </select>
            <input
                type="number"
                name="minYear"
                placeholder="Min Year"
                onChange={handleFilterChange}
                min="0"
                className="p-2 border rounded"
                aria-label="Minimum year"
            />
            <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                onChange={handleFilterChange}
                min="0"
                className="p-2 border rounded"
                aria-label="Maximum price"
            />
            <select 
                name="carsPerPage" 
                value={carsPerPage} 
                onChange={handleFilterChange}
                className="p-2 border rounded"
                aria-label="Cars per page"
            >
                <option value="6">6 per page</option>
                <option value="12">12 per page</option>
                <option value="24">24 per page</option>
            </select>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={showOnlyFavorites}
                    onChange={onToggleFavorites}
                    className="mr-2"
                    aria-label="Show only favorites"
                />
                Show only favorites
            </label>
        </div>
    );
};

export default CarFilters;