import React from 'react';
import { Review } from '@/types/car';
import StarRating from '@/components/ui/StarRating';

interface ReviewsProps {
    reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id} className="bg-gray-100 p-4 rounded-lg mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{review.username}</span>
                            <StarRating rating={review.rating} />
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <span className="text-sm text-gray-500 mt-2 block">{review.date}</span>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default Reviews;