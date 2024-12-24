import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types/car';
import StarRating from '@/components/ui/StarRating';
import FavoriteButton from '@/components/car/FavoriteButton';

interface CarCardProps {
  car: Car;
  onToggleFavorite: (carId: string) => void;
  view: 'grid' | 'list';
}

const CarCard: React.FC<CarCardProps> = ({ car, onToggleFavorite, view }) => {
  if (view === 'grid') {
    return (
      <div className="group relative overflow-hidden rounded-lg 
                    bg-[rgb(var(--bg-primary-light))] dark:bg-[rgb(var(--bg-primary-dark))]
                    border border-[rgb(var(--border-light))] dark:border-[rgb(var(--border-dark))]
                    shadow-lg hover:shadow-xl
                    transform transition-all duration-500 hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={car.imageUrl}
            alt={`${car.year} ${car.make} ${car.model}`}
            width={800}    // añadir width y height específicos
            height={600}   // en lugar de layout="fill"
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--navy))/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 right-2">
            <FavoriteButton
              isFavorite={car.isFavorite}
              onClick={() => onToggleFavorite(car.id)}
              ariaLabel={`${car.isFavorite ? 'Remove from' : 'Add to'} favorites`}
            />
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold 
                         text-[rgb(var(--text-primary-light))] dark:text-[rgb(var(--text-primary-dark))]">
                {car.year} {car.make} {car.model}
              </h3>
              <div className="flex items-center mt-1">
                <StarRating rating={car.averageRating} />
                <span className="ml-2 text-sm text-[rgb(var(--text-secondary-light))] dark:text-[rgb(var(--text-secondary-dark))]">
                  ({car.reviews.length} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-2xl font-bold text-[rgb(var(--accent-light))] dark:text-[rgb(var(--accent-dark))]">
              ${car.price.toLocaleString()}
            </p>
          </div>

          <Link
            href={`/cars/${car.id}`}
            className="mt-4 block w-full text-center px-6 py-3 rounded-lg
                     bg-[rgb(var(--accent-light))] dark:bg-[rgb(var(--accent-dark))]
                     text-[rgb(var(--bg-primary-light))] dark:text-[rgb(var(--bg-primary-dark))]
                     hover:opacity-90 transform hover:-translate-y-0.5
                     transition-all duration-300
                     border border-[rgb(var(--border-light))] dark:border-[rgb(var(--border-dark))]"
          >
            View Details
          </Link>
        </div>

        {/* Art Deco corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  }

  // List view
  return (
    <div className="group relative overflow-hidden rounded-lg mb-6
                  bg-[rgb(var(--bg-primary-light))] dark:bg-[rgb(var(--bg-primary-dark))]
                  border border-[rgb(var(--border-light))] dark:border-[rgb(var(--border-dark))]
                  shadow-lg hover:shadow-xl
                  flex transition-all duration-500 hover:-translate-y-1">
      <div className="relative w-80 h-64">
        <Image
          src={car.imageUrl}
          alt={`${car.year} ${car.make} ${car.model}`}
          layout="fill"
          objectFit="cover"
          className="transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2">
          <FavoriteButton
            isFavorite={car.isFavorite}
            onClick={() => onToggleFavorite(car.id)}
            ariaLabel={`${car.isFavorite ? 'Remove from' : 'Add to'} favorites`}
          />
        </div>
      </div>

      <div className="flex-grow p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold mb-2
                         text-[rgb(var(--text-primary-light))] dark:text-[rgb(var(--text-primary-dark))]">
                {car.year} {car.make} {car.model}
              </h3>
              <div className="flex items-center">
                <StarRating rating={car.averageRating} />
                <span className="ml-2 text-sm text-[rgb(var(--text-secondary-light))] dark:text-[rgb(var(--text-secondary-dark))]">
                  ({car.reviews.length} reviews)
                </span>
              </div>
            </div>
            <p className="text-3xl font-bold text-[rgb(var(--accent-light))] dark:text-[rgb(var(--accent-dark))]">
              ${car.price.toLocaleString()}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-[rgb(var(--text-secondary-light))] dark:text-[rgb(var(--text-secondary-dark))]">
              <p>Engine: {car.engine}</p>
              <p>Transmission: {car.transmission}</p>
            </div>
            <div className="text-[rgb(var(--text-secondary-light))] dark:text-[rgb(var(--text-secondary-dark))]">
              <p>Mileage: {car.mileage.toLocaleString()} miles</p>
              <p>Location: {car.location}</p>
            </div>
          </div>
        </div>

        <Link
          href={`/cars/${car.id}`}
          className="mt-4 inline-block px-8 py-3 rounded-lg
                   bg-[rgb(var(--accent-light))] dark:bg-[rgb(var(--accent-dark))]
                   text-[rgb(var(--bg-primary-light))] dark:text-[rgb(var(--bg-primary-dark))]
                   hover:opacity-90 transform hover:-translate-y-0.5
                   transition-all duration-300
                   border border-[rgb(var(--border-light))] dark:border-[rgb(var(--border-dark))]"
        >
          View Details
        </Link>
      </div>

      {/* Art Deco corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default CarCard;