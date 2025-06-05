
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface MediaAdjusterProps {
  mediaUrl: string;
  isVideo: boolean;
  avatarShape: string;
  onAdjustmentChange: (adjustment: { x: number; y: number; scale: number }) => void;
  initialAdjustment?: { x: number; y: number; scale: number };
}

const MediaAdjuster: React.FC<MediaAdjusterProps> = ({
  mediaUrl,
  isVideo,
  avatarShape,
  onAdjustmentChange,
  initialAdjustment = { x: 0, y: 0, scale: 1 }
}) => {
  const [adjustment, setAdjustment] = useState(initialAdjustment);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - adjustment.x, y: e.clientY - adjustment.y });
  };

  const handleZoom = (delta: number) => {
    const newScale = Math.max(0.5, Math.min(3, adjustment.scale + delta));
    const newAdjustment = { ...adjustment, scale: newScale };
    
    setAdjustment(newAdjustment);
    onAdjustmentChange(newAdjustment);
  };

  const handleReset = () => {
    const resetAdjustment = { x: 0, y: 0, scale: 1 };
    setAdjustment(resetAdjustment);
    onAdjustmentChange(resetAdjustment);
  };

  const getShapeClasses = () => {
    switch (avatarShape) {
      case 'square': return 'rounded-none';
      case 'rounded': return 'rounded-lg';
      case 'triangle': return 'clip-path-triangle';
      case 'hexagon': return 'clip-path-hexagon';
      case 'banner': return 'w-full h-16 rounded-none';
      default: return 'rounded-full';
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      const newAdjustment = { ...adjustment, x: newX, y: newY };
      
      setAdjustment(newAdjustment);
      onAdjustmentChange(newAdjustment);
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
  }, [isDragging, dragStart, adjustment, onAdjustmentChange]);

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Ajustar posição e zoom</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Redefinir
          </Button>
        </div>
        
        <div
          ref={containerRef}
          className={`relative w-32 h-32 mx-auto border-2 border-dashed border-gray-300 overflow-hidden cursor-move ${getShapeClasses()}`}
          onMouseDown={handleMouseDown}
        >
          {isVideo ? (
            <video
              src={mediaUrl}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `translate(${adjustment.x}px, ${adjustment.y}px) scale(${adjustment.scale})`,
                transformOrigin: 'center'
              }}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={mediaUrl}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `translate(${adjustment.x}px, ${adjustment.y}px) scale(${adjustment.scale})`,
                transformOrigin: 'center'
              }}
              draggable={false}
            />
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleZoom(-0.1)}
            disabled={adjustment.scale <= 0.5}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="text-sm font-medium min-w-[60px] text-center">
            {Math.round(adjustment.scale * 100)}%
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleZoom(0.1)}
            disabled={adjustment.scale >= 3}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MediaAdjuster;
