
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

type MediaAdjusterProps = {
  mediaUrl: string;
  isVideo: boolean;
  onAdjustmentChange: (adjustment: { x: number; y: number; scale: number }) => void;
  avatarShape: 'circle' | 'square' | 'rounded' | 'triangle' | 'hexagon' | 'banner';
};

const MediaAdjuster: React.FC<MediaAdjusterProps> = ({
  mediaUrl,
  isVideo,
  onAdjustmentChange,
  avatarShape
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onAdjustmentChange({ x: position.x, y: position.y, scale });
  }, [position, scale, onAdjustmentChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
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
    
    // Limitar movimento dentro dos bounds
    const maxMove = 100;
    const limitedX = Math.max(-maxMove, Math.min(maxMove, newX));
    const limitedY = Math.max(-maxMove, Math.min(maxMove, newY));
    
    setPosition({ x: limitedX, y: limitedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
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
    
    const maxMove = 100;
    const limitedX = Math.max(-maxMove, Math.min(maxMove, newX));
    const limitedY = Math.max(-maxMove, Math.min(maxMove, newY));
    
    setPosition({ x: limitedX, y: limitedY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(3, prev + 0.1));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(0.5, prev - 0.1));
  };

  const getShapeClasses = () => {
    switch (avatarShape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-none';
      case 'rounded':
        return 'rounded-lg';
      case 'triangle':
        return 'clip-path-triangle';
      case 'hexagon':
        return 'clip-path-hexagon';
      case 'banner':
        return 'rounded-lg';
      default:
        return 'rounded-full';
    }
  };

  const getContainerSize = () => {
    switch (avatarShape) {
      case 'banner':
        return 'w-full h-32';
      default:
        return 'w-32 h-32';
    }
  };

  // Adicionar listeners globais para mouse
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      const maxMove = 100;
      const limitedX = Math.max(-maxMove, Math.min(maxMove, newX));
      const limitedY = Math.max(-maxMove, Math.min(maxMove, newY));
      
      setPosition({ x: limitedX, y: limitedY });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="space-y-4">
      {/* Preview Container */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-center">
          <div 
            ref={containerRef}
            className={`${getContainerSize()} ${getShapeClasses()} overflow-hidden border-2 border-dashed border-gray-300 relative cursor-move select-none bg-white`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isVideo ? (
              <video
                src={mediaUrl}
                className="w-full h-full object-cover pointer-events-none"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: 'center'
                }}
                autoPlay
                muted
                loop
                playsInline
                draggable={false}
              />
            ) : (
              <img
                src={mediaUrl}
                alt="Ajuste de posição"
                className="w-full h-full object-cover pointer-events-none"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: 'center'
                }}
                draggable={false}
              />
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Arraste para ajustar a posição • Use o slider para zoom
        </p>
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
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <div className="flex-1">
            <Slider
              value={[scale]}
              onValueChange={(value) => setScale(value[0])}
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
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <span className="text-sm text-gray-600 min-w-[3rem]">
            {Math.round(scale * 100)}%
          </span>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Redefinir posição e zoom
        </Button>
      </div>
    </div>
  );
};

export default MediaAdjuster;
