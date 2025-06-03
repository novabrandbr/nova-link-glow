import React, { useRef } from 'react';
import { User } from "lucide-react";
import LinkCard from "@/components/LinkCard";
import ProfileImage from "@/components/ProfileImage";
import SocialLinks from "@/components/SocialLinks";
import VisualEffect from "@/components/effects/VisualEffect";
import { PageStyle } from "@/pages/Dashboard";

interface PhonePreviewProps {
  user?: {
    name?: string;
    bio?: string;
    image?: string;
  };
  links: {
    id: string;
    title: string;
    url: string;
  }[];
  pageStyle?: PageStyle;
  backgroundType?: 'color' | 'image' | 'video' | 'gradient';
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundOpacity?: number;
  socialLinks?: {
    icon: string;
    url: string;
  }[];
  profileShape?: 'circle' | 'square';
  linkColor?: string;
  customGradient?: boolean;
  firstColor?: string;
  secondColor?: string;
  visualEffects?: {
    effect: string;
    color: string;
    opacity: number;
    speed: number;
    size: number;
  }[];
  extendedBackgroundColor?: string;
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ 
  user, 
  links, 
  pageStyle = { type: 'traditional' },
  backgroundType = 'color',
  backgroundColor = '#ffffff',
  backgroundImage,
  backgroundVideo,
  backgroundOpacity = 1,
  socialLinks = [],
  profileShape = 'circle',
  linkColor = '#6A0DAD',
  customGradient,
  firstColor = '#6A0DAD',
  secondColor = '#C9A0FF',
  visualEffects = [],
  extendedBackgroundColor = '#ffffff'
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  const getBackgroundStyle = () => {
    const baseStyle: React.CSSProperties = {};

    if (backgroundType === 'image' && backgroundImage) {
      baseStyle.backgroundImage = `url(${backgroundImage})`;
      baseStyle.backgroundSize = 'cover';
      baseStyle.backgroundPosition = 'center';
      baseStyle.backgroundRepeat = 'no-repeat';
    } else if (backgroundType === 'video' && backgroundVideo) {
      // Video background handled separately
    } else if (backgroundType === 'gradient' && customGradient && firstColor && secondColor) {
      baseStyle.background = `linear-gradient(135deg, ${firstColor}, ${secondColor})`;
    } else {
      baseStyle.backgroundColor = backgroundColor;
    }

    if (pageStyle.type === 'novabrandflix') {
      baseStyle.background = '#000000';
    }

    return baseStyle;
  };

  const renderBackground = () => {
    if (backgroundType === 'video' && backgroundVideo) {
      return (
        <video
          ref={backgroundRef}
          src={backgroundVideo}
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: backgroundOpacity,
          }}
        />
      );
    }

    return (
      <div
        ref={backgroundRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: backgroundOpacity,
          ...getBackgroundStyle(),
        }}
      />
    );
  };

  return (
    <div className="flex justify-center p-4">
      <div className="relative w-full max-w-sm bg-gray-50 rounded-3xl shadow-lg overflow-hidden">
        {renderBackground()}

        {visualEffects && visualEffects.map((effect, index) => (
          <VisualEffect
            key={index}
            effect={effect.effect}
            color={effect.color}
            opacity={effect.opacity}
            speed={effect.speed}
            size={effect.size}
          />
        ))}

        <div className="relative z-10 p-6 flex flex-col items-center">
          {user?.image ? (
            <ProfileImage src={user.image} alt={user?.name || 'Profile'} shape={profileShape} />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500" />
            </div>
          )}

          {user?.name && (
            <h1 className="mt-4 text-2xl font-bold text-center text-gray-900">{user.name}</h1>
          )}

          {user?.bio && (
            <p className="mt-2 text-center text-gray-600">{user.bio}</p>
          )}

          <SocialLinks socialLinks={socialLinks} />

          <div className="mt-6 w-full space-y-4">
            {links.map(link => (
              <LinkCard
                key={link.id}
                title={link.title}
                url={link.url}
                pageStyle={pageStyle}
                linkColor={linkColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
