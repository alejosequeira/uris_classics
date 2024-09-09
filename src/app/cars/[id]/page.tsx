import { Metadata } from 'next';
import CarDetails from './CarDetails';
import mockCars from '@/api/carData';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const car = mockCars.find(c => c.id === params.id);

  if (!car) {
    return {
      title: 'Car Not Found',
    };
  }

  return {
    title: `${car.year} ${car.make} ${car.model} | Classic Cars Marketplace`,
    description: `View details and purchase the ${car.year} ${car.make} ${car.model}. Price: $${car.price.toLocaleString()}.`,
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <CarDetails id={params.id} />;
}