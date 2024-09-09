'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Car, Review } from '@/types/car';
import ContactSellerModal from '@/components/car/ContactSellerModal';
import StarRating from '@/components/ui/StarRating';
import Reviews from '@/components/car/Reviews';
import ReviewForm from '@/components/car/ReviewForm';
import mockCars from '@/api/carData';


export default function CarDetails({ id }: { id: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [car, setCar] = useState<Car | undefined>(mockCars.find(c => c.id === id));

    if (!car) {
        return <div>Car not found</div>;
    }

    const handleAddReview = (newReview: { rating: number; name: string, comment: string }) => {
        const review: Review = {
            id: Date.now().toString(), // This is a simple way to generate a unique id
            userId: 'user' + Math.floor(Math.random() * 1000), // In a real app, this would be the logged-in user's ID
            //   username: 'User' + Math.floor(Math.random() * 1000), // In a real app, this would be the logged-in user's username
            username: newReview.name,
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
        };

        const updatedCar = {
            ...car,
            reviews: [...car.reviews, review],
            averageRating: (car.averageRating * car.reviews.length + review.rating) / (car.reviews.length + 1)
        };

        setCar(updatedCar);
        // In a real application, you would send this new review to your backend here
    };

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
                    <div className="space-y-2 mb-6">
                        <p><strong>Make:</strong> {car.make}</p>
                        <p><strong>Model:</strong> {car.model}</p>
                        <p><strong>Year:</strong> {car.year}</p>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Contact Seller
                    </button>
                </div>
            </div>
            <Reviews reviews={car.reviews} />
            <ReviewForm onSubmit={handleAddReview} />
            <ContactSellerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                carName={`${car.year} ${car.make} ${car.model}`}
            />
        </div>
    );
}