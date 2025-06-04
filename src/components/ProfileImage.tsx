
import React from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
  shape: 'circle' | 'square' | 'rounded' | 'triangle' | 'hexagon' | 'banner';
  size?: number;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ 
  src, 
  alt, 
  shape, 
  size = 96 
}) => {
  const getShapeClasses = () => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-none';
      case 'rounded':
        return 'rounded-lg';
      case 'triangle':
        return 'rounded-none triangle-clip';
      case 'hexagon':
        return 'rounded-none hexagon-clip';
      case 'banner':
        return 'rounded-lg w-full aspect-[3/1]';
      default:
        return 'rounded-full';
    }
  };

  const getShapeStyles = () => {
    const baseStyles: React.CSSProperties = {
      objectFit: 'cover'
    };

    switch (shape) {
      case 'triangle':
        return {
          ...baseStyles,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        };
      case 'hexagon':
        return {
          ...baseStyles,
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
        };
      case 'banner':
        return {
          ...baseStyles,
          width: '100%',
          height: 'auto'
        };
      default:
        return baseStyles;
    }
  };

  const getSizeClasses = () => {
    if (shape === 'banner') {
      return '';
    }
    return `w-${size/4} h-${size/4}`;
  };

  if (src.startsWith('data:video/')) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={`${getShapeClasses()} ${getSizeClasses()} mx-auto`}
        style={getShapeStyles()}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${getShapeClasses()} ${getSizeClasses()} mx-auto`}
      style={getShapeStyles()}
    />
  );
};

export default ProfileImage;
