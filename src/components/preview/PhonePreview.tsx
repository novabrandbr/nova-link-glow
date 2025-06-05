
import React, { useRef, useEffect } from 'react';
import { UserProfile, LinkType, AudioSettings, PageStyle } from '@/pages/Dashboard';
import VisualEffect from '@/components/effects/VisualEffect';
import { getSocialIcon } from '@/lib/social-utils';

type PhonePreviewProps = {
  profile: UserProfile;
  links: LinkType[];
  audioSettings: AudioSettings;
  pageStyle: PageStyle;
};

const PhonePreview: React.FC<PhonePreviewProps> = ({ 
  profile, 
  links, 
  audioSettings, 
  pageStyle 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioSettings.volume;
      audioRef.current.muted = !audioSettings.autoplay;
      
      if (audioSettings.autoplay && audioSettings.url) {
        audioRef.current.play().catch(console.log);
      }
    }
  }, [audioSettings]);

  const getBackgroundStyle = () => {
    let style: React.CSSProperties = {};
    
    switch (profile.backgroundType) {
      case 'solid':
        style.backgroundColor = profile.backgroundColor;
        break;
      case 'gradient':
        if (profile.backgroundGradientColor1 && profile.backgroundGradientColor2) {
          const opacity = profile.backgroundGradientOpacity || 1;
          style.background = `linear-gradient(135deg, ${profile.backgroundGradientColor1}, ${profile.backgroundGradientColor2})`;
          style.opacity = opacity;
        } else {
          style.background = profile.backgroundGradient;
        }
        break;
      case 'image':
        if (profile.backgroundImage) {
          style.backgroundImage = `url(${profile.backgroundImage})`;
          style.backgroundSize = 'cover';
          style.backgroundPosition = 'center';
          style.backgroundRepeat = 'no-repeat';
        }
        break;
      case 'video':
        break;
    }
    
    return style;
  };

  const renderAvatar = () => {
    const isVideo = profile.avatar?.startsWith('data:video/') || 
                   profile.avatar?.includes('.mp4') || 
                   profile.avatar?.includes('.webm') || 
                   profile.avatar?.includes('.mov');
    
    let shapeClasses = "object-cover";
    let containerClasses = "";
    
    switch (profile.avatarShape) {
      case 'circle':
        shapeClasses += " rounded-full";
        containerClasses = "w-20 h-20";
        break;
      case 'square':
        shapeClasses += " rounded-none";
        containerClasses = "w-20 h-20";
        break;
      case 'rounded':
        shapeClasses += " rounded-lg";
        containerClasses = "w-20 h-20";
        break;
      case 'triangle':
        shapeClasses += " clip-path-triangle";
        containerClasses = "w-20 h-20";
        break;
      case 'hexagon':
        shapeClasses += " clip-path-hexagon";
        containerClasses = "w-20 h-20";
        break;
      case 'banner':
        shapeClasses += " rounded-lg";
        containerClasses = "w-full h-16";
        break;
      default:
        shapeClasses += " rounded-full";
        containerClasses = "w-20 h-20";
    }

    if (isVideo && profile.avatar) {
      return (
        <div className={containerClasses}>
          <video 
            className={`w-full h-full ${shapeClasses}`}
            src={profile.avatar}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      );
    }

    if (profile.avatar) {
      return (
        <div className={containerClasses}>
          <img 
            src={profile.avatar} 
            alt="Avatar" 
            className={`w-full h-full ${shapeClasses}`}
          />
        </div>
      );
    }

    return (
      <div className={`${containerClasses} bg-gray-300 flex items-center justify-center text-gray-600 ${shapeClasses}`}>
        {profile.name.substring(0, 2).toUpperCase()}
      </div>
    );
  };

  const renderSocialIcons = () => {
    const socialEntries = Object.entries(profile.socialIcons).filter(([_, value]) => value);
    
    if (socialEntries.length === 0) return null;

    return (
      <div className="flex justify-center space-x-3 mt-4">
        {socialEntries.map(([platform, value]) => {
          const IconComponent = getSocialIcon(platform);
          if (!IconComponent) return null;
          
          return (
            <div 
              key={platform}
              className="w-6 h-6 flex items-center justify-center"
              style={{ color: profile.socialIconsColor || '#6A0DAD' }}
            >
              <IconComponent size={20} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      {/* iPhone mockup frame */}
      <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl">
        <div className="relative bg-black rounded-[2.5rem] overflow-hidden">
          {/* Screen */}
          <div className="relative w-full h-[640px] bg-white rounded-[2.5rem] overflow-hidden">
            {/* Background video */}
            {profile.backgroundType === 'video' && profile.backgroundVideo && (
              <div className="absolute inset-0">
                {profile.backgroundVideo.includes('youtube.com') || profile.backgroundVideo.includes('youtu.be') ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <span className="text-white text-xs">YouTube Video</span>
                  </div>
                ) : (
                  <video 
                    className="w-full h-full object-cover"
                    src={profile.backgroundVideo}
                    autoPlay
                    muted={profile.backgroundVideoMuted}
                    loop
                    playsInline
                    style={{ opacity: (profile.backgroundVideoVolume || 0.5) }}
                  />
                )}
              </div>
            )}
            
            {/* Background layer */}
            <div 
              className="absolute inset-0"
              style={getBackgroundStyle()}
            />
            
            {/* Overlay */}
            {profile.overlay && (
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: profile.overlayColor,
                  opacity: profile.overlayOpacity
                }}
              />
            )}
            
            {/* Visual effects */}
            {profile.visualEffect !== 'none' && (
              <VisualEffect profile={profile} />
            )}
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Profile section */}
              {profile.showProfileInfo && (
                <div className={`pt-16 px-6 text-${profile.profileInfoPosition}`}>
                  <div className="flex flex-col items-center space-y-3">
                    {renderAvatar()}
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <h1 
                          className="text-xl font-bold"
                          style={{ 
                            color: profile.nameColor,
                            fontFamily: profile.font 
                          }}
                        >
                          {profile.name}
                        </h1>
                        {profile.isVerified && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {profile.bio && (
                        <p 
                          className="text-sm mt-1"
                          style={{ 
                            color: profile.bioColor,
                            fontFamily: profile.font 
                          }}
                        >
                          {profile.bio}
                        </p>
                      )}
                    </div>
                    
                    {renderSocialIcons()}
                  </div>
                </div>
              )}
              
              {/* Links section */}
              <div className="flex-1 px-6 py-6 space-y-3">
                {links.filter(link => link.active).map((link) => (
                  <div
                    key={link.id}
                    className="relative w-full p-4 rounded-lg text-center transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: link.color,
                      color: link.titleColor || '#FFFFFF',
                      textAlign: link.textAlign || 'center'
                    }}
                  >
                    {link.mediaType === 'image' && link.mediaUrl && (
                      <div className="absolute inset-0 rounded-lg overflow-hidden">
                        <img 
                          src={link.mediaUrl} 
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        {link.overlayColor && (
                          <div 
                            className="absolute inset-0"
                            style={{
                              backgroundColor: link.overlayColor,
                              opacity: link.overlayOpacity || 0.5
                            }}
                          />
                        )}
                      </div>
                    )}
                    
                    {link.mediaType === 'video' && link.mediaUrl && (
                      <div className="absolute inset-0 rounded-lg overflow-hidden">
                        <video 
                          src={link.mediaUrl}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                        {link.overlayColor && (
                          <div 
                            className="absolute inset-0"
                            style={{
                              backgroundColor: link.overlayColor,
                              opacity: link.overlayOpacity || 0.5
                            }}
                          />
                        )}
                      </div>
                    )}
                    
                    <div className="relative z-10">
                      {link.label && (
                        <div 
                          className={`absolute text-xs px-2 py-1 rounded ${
                            link.labelPosition?.includes('top') ? '-top-2' : 
                            link.labelPosition?.includes('bottom') ? '-bottom-2' : 'top-1'
                          } ${
                            link.labelPosition?.includes('left') ? 'left-0' : 
                            link.labelPosition?.includes('right') ? 'right-0' : 
                            'left-1/2 transform -translate-x-1/2'
                          }`}
                          style={{ 
                            backgroundColor: link.labelColor || '#FF0000',
                            color: '#FFFFFF'
                          }}
                        >
                          {link.customLabel || link.label}
                        </div>
                      )}
                      
                      <span className="font-medium">{link.title}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer */}
              <div className="text-center pb-6">
                <span 
                  className="text-xs"
                  style={{ color: profile.usernameColor || '#888888' }}
                >
                  novabrand.site/{profile.username}
                </span>
              </div>
            </div>
            
            {/* Audio player */}
            {audioSettings.url && audioSettings.showPlayer && (
              <div className="absolute bottom-20 left-4 right-4">
                <div className="bg-black bg-opacity-50 rounded-lg p-2">
                  <audio 
                    ref={audioRef}
                    src={audioSettings.url}
                    controls
                    loop={audioSettings.loop}
                    className="w-full h-8"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
