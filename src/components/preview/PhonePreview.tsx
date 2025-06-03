
import React, { useRef } from 'react';
import { User } from "lucide-react";
import LinkCard from "@/components/LinkCard";
import ProfileImage from "@/components/ProfileImage";
import SocialLinks from "@/components/SocialLinks";
import VisualEffect from "@/components/effects/VisualEffect";
import { PageStyle, UserProfile, LinkType, AudioSettings } from "@/pages/Dashboard";

interface PhonePreviewProps {
  profile: UserProfile;
  links: LinkType[];
  pageStyle: PageStyle;
  audioSettings: AudioSettings;
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ 
  profile,
  links, 
  pageStyle,
  audioSettings
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const getBackgroundStyle = () => {
    const baseStyle: React.CSSProperties = {};

    if (profile.backgroundType === 'image' && profile.backgroundImage) {
      baseStyle.backgroundImage = `url(${profile.backgroundImage})`;
      baseStyle.backgroundSize = 'cover';
      baseStyle.backgroundPosition = 'center';
      baseStyle.backgroundRepeat = 'no-repeat';
    } else if (profile.backgroundType === 'video' && profile.backgroundVideo) {
      // Video background handled separately
    } else if (profile.backgroundType === 'gradient' && profile.backgroundGradientColor1 && profile.backgroundGradientColor2) {
      baseStyle.background = `linear-gradient(135deg, ${profile.backgroundGradientColor1}, ${profile.backgroundGradientColor2})`;
    } else {
      baseStyle.backgroundColor = profile.backgroundColor;
    }

    if (pageStyle.type === 'novabrandflix') {
      baseStyle.background = '#000000';
    }

    return baseStyle;
  };

  const renderBackground = () => {
    if (profile.backgroundType === 'video' && profile.backgroundVideo) {
      return (
        <video
          ref={videoRef}
          src={profile.backgroundVideo}
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
            opacity: profile.backgroundGradientOpacity || 1,
          }}
        />
      );
    }

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: profile.backgroundGradientOpacity || 1,
          ...getBackgroundStyle(),
        }}
      />
    );
  };

  // Convert social icons to social links format
  const socialLinks = Object.entries(profile.socialIcons || {})
    .filter(([_, url]) => url)
    .map(([platform, url]) => ({
      icon: platform.charAt(0).toUpperCase(),
      url: url as string
    }));

  return (
    <div className="flex justify-center p-4">
      <div className="relative w-full max-w-sm bg-gray-50 rounded-3xl shadow-lg overflow-hidden">
        {renderBackground()}

        {profile.visualEffect && profile.visualEffect !== 'none' && (
          <VisualEffect
            effect={profile.visualEffect}
            color={profile.visualEffectColor}
            opacity={profile.visualEffectOpacity}
            speed={profile.visualEffectSpeed}
            size={profile.visualEffectSize}
          />
        )}

        <div className="relative z-10 p-6 flex flex-col items-center">
          {profile.avatar ? (
            <ProfileImage 
              src={profile.avatar} 
              alt={profile.name || 'Profile'} 
              shape={profile.avatarShape === 'circle' ? 'circle' : 'square'} 
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500" />
            </div>
          )}

          {profile.name && (
            <h1 
              className="mt-4 text-2xl font-bold text-center"
              style={{ color: profile.nameColor }}
            >
              {profile.name}
            </h1>
          )}

          {profile.bio && (
            <p 
              className="mt-2 text-center"
              style={{ color: profile.bioColor }}
            >
              {profile.bio}
            </p>
          )}

          <SocialLinks socialLinks={socialLinks} />

          <div className="mt-6 w-full space-y-4">
            {links.filter(link => link.active).map(link => (
              <LinkCard
                key={link.id}
                title={link.title}
                url={link.url}
                pageStyle={pageStyle}
                linkColor={link.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
