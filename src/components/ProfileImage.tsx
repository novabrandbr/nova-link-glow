
import React from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
  shape?: 'circle' | 'square';
}

const ProfileImage: React.FC<ProfileImageProps> = ({ 
  src, 
  alt, 
  shape = 'circle' 
}) => {
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';
  
  return (
    <img
      src={src}
      alt={alt}
      className={`w-24 h-24 object-cover ${shapeClass}`}
    />
  );
};

export default ProfileImage;
