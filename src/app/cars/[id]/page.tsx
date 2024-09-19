import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Car } from '@/types/car';
import StarRating from '@/components/ui/StarRating';
import Reviews from '@/components/car/Reviews';
import mockCars from '@/api/carData';
import { getSimilarCars } from '@/utils/carUtils';
import SimilarCars from '@/components/car/SimilarCars';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const car = mockCars.find(c => c.id === params.id);
  if (!car) return { title: 'Car Not Found' };
  return {
    title: `${car.year} ${car.make} ${car.model} | Classic Cars Marketplace`,
    description: `View details and purchase the ${car.year} ${car.make} ${car.model}. Price: $${car.price.toLocaleString()}.`,
  };
}

export default function CarDetails({ params }: { params: { id: string } }) {
  const car = mockCars.find(c => c.id === params.id);

  if (!car) notFound();

  const similarCars = getSimilarCars(car, mockCars);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/cars" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Cars</Link>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-96">
          <Image 
            src={car.imageUrl} 
            alt={`${car.year} ${car.make} ${car.model}`} 
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{car.year} {car.make} {car.model}</h1>
          <div className="flex items-center mb-4">
            <StarRating rating={car.averageRating} />
            <span className="ml-2 text-sm text-gray-600">({car.reviews.length} reviews)</span>
          </div>
          <p className="text-2xl font-semibold text-gray-700 mb-4">${car.price.toLocaleString()}</p>
          <p className="mb-4">{car.description}</p>
          <h2 className="text-xl font-semibold mb-2">Specifications</h2>
          <ul className="list-disc pl-5 mb-4">
            <li>Engine: {car.specifications.engine}</li>
            <li>Transmission: {car.specifications.transmission}</li>
            <li>Mileage: {car.specifications.mileage.toLocaleString()} miles</li>
            <li>Exterior Color: {car.specifications.exteriorColor}</li>
            <li>Interior Color: {car.specifications.interiorColor}</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc pl-5 mb-4">
            {car.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          {car.history && (
            <>
              <h2 className="text-xl font-semibold mb-2">Vehicle History</h2>
              <p className="mb-4">{car.history}</p>
            </>
          )}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Contact Seller
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">More Photos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {car.images.map((image, index) => (
            <div key={index} className="relative h-48">
              <Image 
                src={image} 
                alt={`${car.year} ${car.make} ${car.model} - Image ${index + 1}`} 
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <Reviews reviews={car.reviews} />
      <SimilarCars similarCars={similarCars} />
    </div>
  );
}