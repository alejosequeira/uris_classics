import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types/car';
import StarRating from '@/components/ui/StarRating';
import FavoriteButton from '@/components/car/FavoriteButton';

interface CarCardProps {
  car: Car;
  onToggleFavorite: (carId: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onToggleFavorite }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <Image 
          src={car.imageUrl} 
          alt={`${car.year} ${car.make} ${car.model}`} 
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-2 right-2">
          <FavoriteButton 
            isFavorite={car.isFavorite} 
            onClick={() => onToggleFavorite(car.id)} 
            ariaLabel={`${car.isFavorite ? 'Remove from' : 'Add to'} favorites`}
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{car.year} {car.make} {car.model}</h3>
        <p className="text-gray-700 text-lg font-semibold mb-2" aria-label="Price">${car.price.toLocaleString()}</p>
        <div className="flex items-center mb-2">
          <StarRating rating={car.averageRating} />
          <span className="ml-2 text-sm text-gray-600" aria-label={`${car.reviews.length} reviews`}>({car.reviews.length} reviews)</span>
        </div>
        <Link href={`/cars/${car.id}`} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 inline-block text-center">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;