"use client"
import React, { useState } from 'react';
import { Review } from '@/types/car';
import StarRating from '@/components/ui/StarRating';
import { 
  MessageSquare, 
  ThumbsUp, 
  Calendar,
  User,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  const [showAll, setShowAll] = useState(false);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.rating - a.rating;
  });

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 3);
  const averageRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
     {/* Sección de Encabezado */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  {/* Título y Contador */}
  <div className="flex items-center gap-3">
    <MessageSquare className="w-6 h-6 text-brand" />
    <h3 className="text-2xl font-bold text-white dark:text-gray-900">
      Reseñas
    </h3>
    <span className="text-gray-400 dark:text-gray-600">
      ({reviews.length})
    </span>
  </div>

  {reviews.length > 0 && (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      {/* Calificación */}
      <div className="flex items-center gap-2">
        <StarRating rating={averageRating} />
        <span className="text-white dark:text-gray-900 font-semibold">
          {averageRating.toFixed(1)}
        </span>
      </div>
      
      {/* Desplegable de Ordenar */}
      <div className="relative">
        <button 
          className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2 bg-brand dark:bg-gray-200 rounded-lg text-white dark:text-gray-900 hover:bg-brand/90 dark:hover:bg-gray-300 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Ordenar por: {sortBy}</span>
          </div>
        </button>
        <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-full sm:w-48 bg-background dark:bg-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          <button 
            onClick={() => setSortBy('date')}
            className="w-full text-left px-4 py-2 text-white dark:text-gray-900 hover:bg-brand dark:hover:bg-gray-300 rounded-t-lg"
          >
            Más Recientes
          </button>
          <button 
            onClick={() => setSortBy('rating')}
            className="w-full text-left px-4 py-2 text-white dark:text-gray-900 hover:bg-brand dark:hover:bg-gray-300 rounded-b-lg"
          >
            Mejor Calificadas
          </button>
        </div>
      </div>
    </div>
  )}
</div>

      {/* Lista de Reseñas */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-backgroundsecond dark:bg-gray-100 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 dark:bg-gray-300 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white dark:text-gray-900">
                      {review.username}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={review.rating} />
                      <span className="text-brand font-medium">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{review.date}</span>
                </div>
              </div>

              <p className="text-gray-300 dark:text-gray-700 leading-relaxed">
                {review.comment}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <button className="flex items-center gap-2 text-gray-400 dark:text-gray-600 hover:text-brand dark:hover:text-brand transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">Útil</span>
                </button>
              </div>
            </div>
          ))}

          {reviews.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-3 mt-4 flex items-center justify-center gap-2 text-brand hover:text-brand/80 transition-colors"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  Mostrar Menos
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  Ver Todas las Reseñas ({reviews.length})
                </>
              )}
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-backgroundsecond dark:bg-gray-100 rounded-xl">
          <MessageSquare className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-300 dark:text-gray-700">Aún no hay reseñas.</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;