"use client"
import React, { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { 
  X, 
  ChevronLeft, 
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  Share2,
  Plus,
  Minus
} from 'lucide-react';

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  onNext: () => void;
  onPrevious: () => void;
  totalImages: number;
  currentIndex: number;
}

const MAX_ZOOM = 3;
const MIN_ZOOM = 1;
const ZOOM_STEP = 0.2;

const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  onClose,
  currentImage,
  onNext,
  onPrevious,
  totalImages,
  currentIndex,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouseIdle, setMouseIdle] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  let mouseTimer: NodeJS.Timeout;

  const handleZoom = useCallback((delta: number, clientX?: number, clientY?: number) => {
    setZoomLevel(prev => {
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev + delta));
      
      // Si se proporcionan coordenadas del mouse, ajusta la posición para hacer zoom hacia ese punto
      if (clientX !== undefined && clientY !== undefined && imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        
        const newX = (mouseX * (newZoom - prev)) / newZoom;
        const newY = (mouseY * (newZoom - prev)) / newZoom;
        
        setPosition(prev => ({
          x: prev.x - newX,
          y: prev.y - newY
        }));
      }
      
      return newZoom;
    });
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.01;
    handleZoom(delta, e.clientX, e.clientY);
  }, [handleZoom]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      startPosRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  }, [position, zoomLevel]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const deltaX = e.clientX - startPosRef.current.x;
      const deltaY = e.clientY - startPosRef.current.y;
      
      // Calcula los límites de arrastre basados en el nivel de zoom
      const maxDeltaX = (imageRef.current?.offsetWidth || 0) * (zoomLevel - 1) / 2;
      const maxDeltaY = (imageRef.current?.offsetHeight || 0) * (zoomLevel - 1) / 2;
      
      setPosition({
        x: Math.max(-maxDeltaX, Math.min(maxDeltaX, deltaX)),
        y: Math.max(-maxDeltaY, Math.min(maxDeltaY, deltaY))
      });
    }
  }, [isDragging, zoomLevel]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, []);
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'f':
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose, onNext, onPrevious]);
  

  useEffect(() => {
    // Reset zoom cuando cambia la imagen
    resetZoom();
  }, [currentImage, resetZoom]);

  useEffect(() => {
    if (!isOpen) return;
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen, handleWheel, handleMouseMove, handleMouseUp]);


  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  const ZoomControls = () => (
    <div className="absolute bottom-20 right-4 flex flex-col gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
      <button
        onClick={() => handleZoom(ZOOM_STEP)}
        disabled={zoomLevel >= MAX_ZOOM}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 disabled:opacity-50"
        aria-label="Zoom in"
      >
        <Plus className="w-5 h-5" />
      </button>
      <div className="text-white/80 text-center text-sm font-mono">
        {Math.round(zoomLevel * 100)}%
      </div>
      <button
        onClick={() => handleZoom(-ZOOM_STEP)}
        disabled={zoomLevel <= MIN_ZOOM}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 disabled:opacity-50"
        aria-label="Zoom out"
      >
        <Minus className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 backdrop-blur-lg"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar */}
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent z-50">
        {/* Left Side */}
        <div className="flex items-center gap-2 text-white/80">
          <button
            onClick={() => handleZoom(zoomLevel === 1 ? ZOOM_STEP : -ZOOM_STEP)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={zoomLevel === 1 ? 'Zoom in' : 'Zoom out'}
          >
            {zoomLevel === 1 ? 
              <ZoomIn className="w-6 h-6" /> : 
              <ZoomOut className="w-6 h-6" />
            }
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? 
              <Minimize2 className="w-6 h-6" /> : 
              <Maximize2 className="w-6 h-6" />
            }
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {/* Implementar compartir */}}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80"
            aria-label="Share image"
          >
            <Share2 className="w-6 h-6" />
          </button>
          <button
            onClick={() => {/* Implementar descarga */}}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80"
            aria-label="Download image"
          >
            <Download className="w-6 h-6" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80"
            aria-label="Close viewer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center">
      <div 
          ref={imageRef}
          className={`relative w-full h-full transition-transform duration-200 ${
            isDragging ? 'cursor-grabbing' : zoomLevel > 1 ? 'cursor-grab' : 'cursor-zoom-in'
          }`}
          style={{
            transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center',
            willChange: 'transform'
          }}
          onMouseDown={handleMouseDown}
          onDoubleClick={() => resetZoom()}
        >
          <Image
            src={currentImage}
            alt="Car view"
            fill
            className="select-none object-contain"
            priority
            draggable={false}
          />
        </div>

        {/* Zoom Controls */}
        {showControls && <ZoomControls />}

        {/* Navigation Controls */}
        <div 
          className={`absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className={`pointer-events-auto p-3 rounded-full bg-black/50 backdrop-blur-sm text-white/80 hover:bg-brand hover:text-white transition-colors ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={onNext}
            disabled={currentIndex === totalImages - 1}
            className={`pointer-events-auto p-3 rounded-full bg-black/50 backdrop-blur-sm text-white/80 hover:bg-brand hover:text-white transition-colors ${
              currentIndex === totalImages - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Image Counter */}
          <div className="flex justify-center items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: totalImages }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'bg-brand w-6' 
                      : 'bg-white/30 hover:bg-white/50 cursor-pointer'
                  }`}
                  onClick={() => idx !== currentIndex && onNext()}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;