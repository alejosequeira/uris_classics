import React from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  ariaLabel: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onClick, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full ${
        isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
      } hover:bg-red-600 hover:text-white transition-colors`}
      aria-label={ariaLabel}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill={isFavorite ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;