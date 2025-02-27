import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Settings,
  Gauge,
  Paintbrush,
  ShieldCheck,
  History,
  MessageCircle,
  CarFront,
  Calendar,
  MapPin,
  Check
} from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import Reviews from '@/components/car/Reviews';
import mockCars from '@/api/carData';
import { getSimilarCars } from '@/utils/carUtils';
import SimilarCars from '@/components/car/SimilarCars';
import ImageGallery from '@/components/car/ImageGallery';
import TestDriveButton from '@/components/ui/TestDriveButton';

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
    <div className="min-h-screen dark:bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/cars"
          className="inline-flex items-center gap-2 text-white dark:text-gray-900 hover:text-brand transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          Back to Cars
        </Link>

        {/* Main Content */}
        <div className="bg-backgroundtertiary dark:bg-white rounded-xl overflow-hidden shadow-2xl">
          <div className="relative">
            {/* Price Badge */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-brand text-white dark:text-gray-900 px-6 py-3 rounded-full font-bold text-2xl shadow-lg backdrop-blur-sm">
                ${car.price.toLocaleString()}
              </div>
            </div>

            {/* Gallery Section */}
            <div className="relative">
              <ImageGallery
                images={car.images}
                mainImage={car.imageUrl}
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {/* Year Badge */}
                <div className="flex items-center gap-2 bg-black/50 dark:bg-white/50 backdrop-blur-sm text-white dark:text-gray-900 px-4 py-2 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span className="font-semibold">{car.year}</span>
                </div>
                {/* Location Badge */}
                <div className="flex items-center gap-2 bg-black/50 dark:bg-white/50 backdrop-blur-sm text-white dark:text-gray-900 px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold">{car.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white dark:text-gray-900 mb-4">
                {car.make} {car.model}
              </h1>
              <div className="flex items-center gap-4">
                <StarRating rating={car.averageRating} />
                <span className="text-gray-400 dark:text-gray-600">
                  ({car.reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 text-gray-300 dark:text-gray-700">
                <Settings className="w-6 h-6 text-brand" />
                <div>
                  <p className="text-sm">Engine</p>
                  <p className="font-semibold">{car.specifications.engine}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300 dark:text-gray-700">
                <Gauge className="w-6 h-6 text-brand" />
                <div>
                  <p className="text-sm">Mileage</p>
                  <p className="font-semibold">{car.specifications.mileage.toLocaleString()} mi</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300 dark:text-gray-700">
                <Paintbrush className="w-6 h-6 text-brand" />
                <div>
                  <p className="text-sm">Color</p>
                  <p className="font-semibold">{car.specifications.exteriorColor}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">About this {car.make}</h2>
              <p className="text-gray-300 dark:text-gray-700 leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Specifications and Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Specifications Card */}
              <div className="bg-backgroundsecond dark:bg-gray-100 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white dark:text-gray-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand" />
                  Specifications
                </h2>
                <ul className="space-y-3">
                  {Object.entries(car.specifications).map(([key, value], index) => (
                    <li key={index} className="flex items-center justify-between py-2 border-b border-gray-700 dark:border-gray-300 last:border-0">
                      <span className="text-gray-300 dark:text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-semibold text-white dark:text-gray-900">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features Card */}
              <div className="bg-backgroundsecond dark:bg-gray-100 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white dark:text-gray-900 mb-4 flex items-center gap-2">
                  <CarFront className="w-5 h-5 text-brand" />
                  Features
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300 dark:text-gray-700">
                      <Check className="w-4 h-4 text-brand" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vehicle History Section */}
            {car.history && (
              <div className="mb-8 bg-backgroundsecond dark:bg-gray-100 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white dark:text-gray-900 mb-4 flex items-center gap-2">
                  <History className="w-5 h-5 text-brand" />
                  Vehicle History
                </h2>
                <p className="text-gray-300 dark:text-gray-700 leading-relaxed">
                  {car.history}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="flex-1 bg-brand hover:bg-brand/90 text-white dark:text-gray-900 font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:translate-y-[-2px] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Seller
              </Link>
              <TestDriveButton />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-backgroundtertiary dark:bg-white rounded-xl p-8">
          <Reviews reviews={car.reviews} />
        </div>

        {/* Similar Cars Section */}
        <div className="mt-12 bg-backgroundtertiary dark:bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-6">Similar Cars</h2>
          <SimilarCars similarCars={similarCars} />
        </div>
      </div>
    </div>
  );
}