"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import ImageViewer from '@/components/ui/ImageViewer';

interface ImageGalleryProps {
  images: string[];
  mainImage: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, mainImage }) => {
  const [showAll, setShowAll] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Usar todas las imágenes, incluyendo la principal
  const allImages = [mainImage, ...images];
  const initialImages = allImages.slice(0, 4);
  const remainingImages = allImages.slice(4);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se abra el visor
    setCurrentImageIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se abra el visor
    setCurrentImageIndex(prev => Math.min(prev + 1, allImages.length - 1));
  };
  return (
    <>
      <div className="space-y-2">
        {/* Imagen principal */}
        <div 
          className="relative w-full h-[60vh] rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => setIsViewerOpen(true)}
        >
          <Image
            src={allImages[currentImageIndex]}
            alt="Car view"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-105"
            priority
            
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Controles de navegación */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={handlePrevious}
                className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentImageIndex === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentImageIndex === allImages.length - 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Indicador de imagen y texto */}
            <div className="absolute bottom-0 inset-x-0 p-4 flex justify-between items-center">
              <span className="text-white text-sm font-medium">Click to expand</span>
              <span className="text-white text-sm bg-black/30 px-3 py-1 rounded-full">
                {currentImageIndex + 1} / {allImages.length}
              </span>
            </div>
          </div>
        </div>

        {/* Miniaturas iniciales */}
        <div className="grid grid-cols-4 gap-2">
          {initialImages.map((img, index) => (
            <div
              key={`${img}-${index}`}
              className="relative h-24 cursor-pointer rounded-lg overflow-hidden"
              onClick={() => {
                setCurrentImageIndex(index);
                setIsViewerOpen(true);
              }}
            >
              <Image
                src={img}
                alt={`Car view ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Ver más fotos */}
        {remainingImages.length > 0 && (
          <div>
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-2 px-4 bg-backgroundsecond hover:bg-background text-white rounded-lg transition-colors duration-300 text-sm font-medium"
            >
              {showAll ? 'Show Less' : `View ${remainingImages.length} More Photos`}
            </button>

            {showAll && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {remainingImages.map((img, index) => (
                  <div
                    key={`${img}-${index + 4}`}
                    className="relative h-24 cursor-pointer rounded-lg overflow-hidden"
                    onClick={() => {
                      setCurrentImageIndex(index + 4);
                      setIsViewerOpen(true);
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Car view ${index + 5}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visor de imágenes en pantalla completa */}
      <ImageViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        currentImage={allImages[currentImageIndex]}
        onNext={() => setCurrentImageIndex((prev) => Math.min(prev + 1, allImages.length - 1))}
        onPrevious={() => setCurrentImageIndex((prev) => Math.max(prev - 1, 0))}
        totalImages={allImages.length}
        currentIndex={currentImageIndex}
      />
    </>
  );
};

export default ImageGallery;