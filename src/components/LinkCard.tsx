
import React from 'react';
import { PageStyle } from '@/pages/Dashboard';

interface LinkCardProps {
  title: string;
  url: string;
  pageStyle: PageStyle;
  linkColor?: string;
  mediaType?: 'none' | 'image' | 'video';
  mediaUrl?: string;
  label?: string;
  labelColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  overlayColor?: string;
  overlayOpacity?: number;
}

const LinkCard: React.FC<LinkCardProps> = ({
  title,
  url,
  pageStyle,
  linkColor = '#6A0DAD',
  mediaType = 'none',
  mediaUrl,
  label,
  labelColor = '#FF0000',
  textAlign = 'center',
  overlayColor = '#000000',
  overlayOpacity = 0.5
}) => {
  const getCardStyle = () => {
    const baseStyle: React.CSSProperties = {
      backgroundColor: linkColor,
      color: 'white',
      textAlign: textAlign as any,
      position: 'relative',
      overflow: 'hidden'
    };

    switch (pageStyle.type) {
      case 'novabrandflix':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #141414 0%, #333 100%)',
          borderRadius: '8px',
          aspectRatio: pageStyle.cardSettings?.aspectRatio === 'portrait' ? '2/3' : 
                      pageStyle.cardSettings?.aspectRatio === 'square' ? '1/1' : '16/9'
        };
      case 'magazine':
        return {
          ...baseStyle,
          borderRadius: '0',
          border: '2px solid #000',
          aspectRatio: '3/4'
        };
      case 'polaroid':
        return {
          ...baseStyle,
          backgroundColor: 'white',
          color: 'black',
          border: '10px solid white',
          borderBottomWidth: '40px',
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        };
      case 'arcade':
        return {
          ...baseStyle,
          background: 'linear-gradient(45deg, #FF0080, #00FFFF)',
          border: '3px solid #FFFF00',
          borderRadius: '12px',
          boxShadow: '0 0 20px rgba(255, 255, 0, 0.5)',
          fontFamily: 'monospace',
          textTransform: 'uppercase' as any
        };
      case 'recipe':
        return {
          ...baseStyle,
          backgroundColor: '#F5F5DC',
          color: '#8B4513',
          border: '2px dashed #8B4513',
          borderRadius: '8px',
          fontFamily: 'serif'
        };
      case 'reality':
        return {
          ...baseStyle,
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
          border: '3px solid #FFD93D',
          borderRadius: '15px',
          boxShadow: '0 0 15px rgba(255, 217, 61, 0.7)',
          fontWeight: 'bold',
          textTransform: 'uppercase' as any
        };
      case 'vhs':
        return {
          ...baseStyle,
          backgroundColor: '#1a1a1a',
          border: '2px solid #666',
          borderRadius: '4px',
          fontFamily: 'monospace',
          textShadow: '2px 2px 0px #ff0080'
        };
      case 'y2k':
        return {
          ...baseStyle,
          background: 'linear-gradient(45deg, #C0C0C0, #E6E6FA)',
          color: '#4B0082',
          border: '2px solid #00FFFF',
          borderRadius: '20px',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
        };
      default:
        return {
          ...baseStyle,
          borderRadius: '8px'
        };
    }
  };

  const renderMedia = () => {
    if (mediaType === 'video' && mediaUrl) {
      return (
        <video
          src={mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    } else if (mediaType === 'image' && mediaUrl) {
      return (
        <img
          src={mediaUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    }
    return null;
  };

  const renderOverlay = () => {
    if (pageStyle.cardSettings?.showOverlay && (mediaType === 'image' || mediaType === 'video')) {
      return (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent, ${overlayColor})`,
            opacity: overlayOpacity
          }}
        />
      );
    }
    return null;
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg transition-transform hover:scale-105"
      style={getCardStyle()}
    >
      {renderMedia()}
      {renderOverlay()}
      
      <div className="relative z-10">
        {label && pageStyle.type !== 'traditional' && (
          <span
            className="inline-block px-2 py-1 text-xs font-bold rounded mb-2"
            style={{ backgroundColor: labelColor, color: 'white' }}
          >
            {label}
          </span>
        )}
        
        <h3 className="font-semibold">{title}</h3>
        
        {pageStyle.type === 'reality' && (
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded ml-2">
            🔴 AO VIVO
          </span>
        )}
      </div>
    </a>
  );
};

export default LinkCard;
