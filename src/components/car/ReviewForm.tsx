import React, { useState } from 'react';


interface ReviewFormProps {
    onSubmit: (review: { rating: number;name: string, comment: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        onSubmit({ rating,name, comment });
        setRating(0);
        setName('');
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
            <div className="mb-4">
                <label className="block mb-2">Your Rating</label>
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Your Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="comment" className="block mb-2">Your Comment</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={4}
                    required
                ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;