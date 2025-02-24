"use client"
import React, { memo } from 'react';
import { Heart } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
}

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  averageRating: number;
  reviews: Review[];
  engine?: string;
  transmission?: string;
  mileage?: number;
  location?: string;
}

interface CarCardProps {
  car: Car;
  onToggleFavorite: (carId: string) => void;
  view?: 'grid' | 'list';
}

const CarCard: React.FC<CarCardProps> = ({ car, onToggleFavorite, view = 'grid' }) => {
  const GridView = () => (
    <div className="group relative overflow-hidden rounded-lg bg-background dark:bg-white hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <img
          src={car.imageUrl || "/api/placeholder/800/600"}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Brand Accent Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(car.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm hover:bg-brand transition-colors duration-200 group/btn z-10"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              car.isFavorite 
                ? 'fill-brand text-brand' 
                : 'text-white dark:text-gray-900 group-hover/btn:text-white'
            }`}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <span className="px-2 py-1 rounded-md bg-white/20 dark:bg-black/20 backdrop-blur-sm text--gray-900  dark:text-gray-900 text-sm font-semibold">
            {car.year}
          </span>
          {car.mileage && (
            <span className="px-2 py-1 rounded-md bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-900  dark:text-gray-900 text-sm">
              {car.mileage.toLocaleString()} mi
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Title and Rating */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white dark:text-gray-900">
              {car.make} {car.model}
            </h3>
            <span className="text-2xl font-bold text-brand">
              ${car.price.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.round(car.averageRating) ? 'text-brand' : 'text-gray-500 dark:text-gray-400'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-300 dark:text-gray-600">
                ({car.reviews.length})
              </span>
            </div>
            {car.location && (
              <span className="text-sm text-gray-300 dark:text-gray-600 flex items-center">
                • {car.location}
              </span>
            )}
          </div>
        </div>

        {/* Car Details */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-300 dark:text-gray-600">
          {car.engine && <span>• {car.engine}</span>}
          {car.transmission && <span>• {car.transmission}</span>}
        </div>

        {/* Action Button */}
        <button 
          onClick={() => window.location.href = `/cars/${car.id}`}
          className="w-full py-2.5 px-4 bg-brand text-white dark:text-gray-900 rounded-md hover:bg-brand-dark transform hover:translate-y-[-1px] transition-all duration-200 font-semibold"
        >
          View Details
        </button>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-tl" />
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-tr" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-bl" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-br" />
    </div>
  );

  const ListView = () => (
    <div className="group relative overflow-hidden rounded-lg bg-background dark:bg-white hover:shadow-xl transition-all duration-300 ease-in-out mb-4">
      <div className="flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="relative w-full md:w-80 aspect-video md:aspect-auto">
          <img
            src={car.imageUrl || "/api/placeholder/800/600"}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(car.id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm hover:bg-brand transition-colors duration-200 group/btn z-10"
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-200 ${
                car.isFavorite 
                  ? 'fill-brand text-brand' 
                  : 'text-white dark:text-gray-900 group-hover/btn:text-white'
              }`}
            />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            <span className="px-2 py-1 rounded-md bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-gray-900 text-sm font-semibold">
              {car.year}
            </span>
            {car.mileage && (
              <span className="px-2 py-1 rounded-md bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-900 dark:text-gray-900 text-sm">
                {car.mileage.toLocaleString()} mi
              </span>
            )}
          </div>

          {/* Brand Accent Line */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </div>

        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">
                  {car.make} {car.model}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.round(car.averageRating) ? 'text-brand' : 'text-gray-500 dark:text-gray-400'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-300 dark:text-gray-600">
                    ({car.reviews.length})
                  </span>
                </div>
              </div>
              <span className="text-3xl font-bold text-brand">
                ${car.price.toLocaleString()}
              </span>
            </div>

            {/* Car Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-sm text-gray-300 dark:text-gray-600">
                <p>Engine: {car.engine}</p>
                <p>Transmission: {car.transmission}</p>
              </div>
              <div className="text-sm text-gray-300 dark:text-gray-600">
                <p>Mileage: {car.mileage?.toLocaleString()} miles</p>
                <p>Location: {car.location}</p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-auto">
              <button 
                onClick={() => window.location.href = `/cars/${car.id}`}
                className="w-full md:w-auto px-6 py-2.5 bg-brand text-white dark:text-gray-900 rounded-md hover:bg-brand-dark transform hover:translate-y-[-1px] transition-all duration-200 font-semibold"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-tl" />
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-tr" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-bl" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-br" />
    </div>
  );

  return view === 'grid' ? <GridView /> : <ListView />;
};

export default memo(CarCard);