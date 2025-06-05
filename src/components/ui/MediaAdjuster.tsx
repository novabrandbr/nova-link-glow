
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RotateCcw, Plus, Minus } from 'lucide-react';

type MediaAdjusterProps = {
  src: string;
  isVideo?: boolean;
  onAdjustmentChange: (adjustment: { x: number; y: number; scale: number }) => void;
  className?: string;
};

const MediaAdjuster: React.FC<MediaAdjusterProps> = ({ 
  src, 
  isVideo = false, 
  onAdjustmentChange, 
  className = "" 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onAdjustmentChange({ x: position.x, y: position.y, scale });
  }, [position, scale, onAdjustmentChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;
    
    setPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleScaleChange = (newScale: number[]) => {
    setScale(newScale[0]);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleReset = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Media Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isVideo ? (
          <video
            src={src}
            className="absolute select-none pointer-events-none"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={src}
            alt="Adjustable media"
            className="absolute select-none pointer-events-none"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            draggable={false}
          />
        )}
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <div className="flex-1">
            <Slider
              value={[scale]}
              onValueChange={handleScaleChange}
              min={0.5}
              max={3}
              step={0.1}
              className="w-full"
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={scale >= 3}
          >
            <Plus className="h-4 w-4" />
          </Button>
          
          <span className="text-sm text-gray-600 min-w-[3rem]">
            {Math.round(scale * 100)}%
          </span>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Redefinir
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Arraste a mídia para ajustar a posição e use o controle de zoom
      </p>
    </div>
  );
};

export default MediaAdjuster;
