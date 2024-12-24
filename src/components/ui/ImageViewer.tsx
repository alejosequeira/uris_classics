"use client"
import React from 'react';
import Image from 'next/image';

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  onNext: () => void;
  onPrevious: () => void;
  totalImages: number;
  currentIndex: number;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  onClose,
  currentImage,
  onNext,
  onPrevious,
  totalImages,
  currentIndex,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm">
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white z-50 p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Imagen */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={currentImage}
            alt="Car view"
            layout="fill"
            objectFit="contain"
            className="select-none"
          />
        </div>

        {/* Controles de navegación */}
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
          disabled={currentIndex === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
          disabled={currentIndex === totalImages - 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicador de imagen actual */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
          {currentIndex + 1} / {totalImages}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;