import React from 'react';
import { UserProfile } from '@/pages/Dashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VisualEffect } from '@/components/effects/VisualEffect';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin, 
  X,
  Mail
} from 'lucide-react';

type PhonePreviewProps = {
  profile: UserProfile;
};

const PhonePreview: React.FC<PhonePreviewProps> = ({ profile }) => {
  // Function to get social icon component by platform
  const getSocialIcon = (platform: string, handle: string) => {
    const iconProps = { 
      size: 20, 
      color: profile.socialIconsColor || "#6A0DAD",
      className: "transition-colors hover:scale-110"
    };
    
    switch (platform) {
      case 'instagram':
        return <Instagram {...iconProps} />;
      case 'facebook':
        return <Facebook {...iconProps} />;
      case 'twitter':
        return <X {...iconProps} />;
      case 'youtube':
        return <Youtube {...iconProps} />;
      case 'tiktok':
        return (
          <div 
            className="w-5 h-5 rounded bg-black flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110"
            style={{ color: profile.socialIconsColor || "#6A0DAD" }}
          >
            TT
          </div>
        );
      case 'linkedin':
        return <Linkedin {...iconProps} />;
      case 'spotify':
        return (
          <div 
            className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center transition-transform hover:scale-110"
            style={{ backgroundColor: profile.socialIconsColor || "#1DB954" }}
          >
            <div className="h-2 w-2 bg-black rounded-full"></div>
          </div>
        );
      case 'whatsapp':
        return (
          <div 
            className="w-5 h-5 rounded bg-green-500 flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110"
            style={{ backgroundColor: profile.socialIconsColor || "#25D366" }}
          >
            W
          </div>
        );
      case 'telegram':
        return (
          <div 
            className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110"
            style={{ backgroundColor: profile.socialIconsColor || "#0088CC" }}
          >
            T
          </div>
        );
      case 'threads':
        return (
          <div 
            className="w-5 h-5 rounded bg-black flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110"
            style={{ color: profile.socialIconsColor || "#000000" }}
          >
            @
          </div>
        );
      case 'email':
        return <Mail {...iconProps} />;
      default:
        return null;
    }
  };

  const getPageStyle = () => {
    // Change from 'netflix' to 'novabrandflix' to match valid style types
    if (profile.pageStyle === 'novabrandflix') {
      return 'bg-gradient-to-br from-red-900 via-black to-red-800 text-white';
    }
    
    switch (profile.pageStyle) {
      case 'traditional':
        return 'bg-gradient-to-b from-gray-50 to-gray-100';
      case 'magazine':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white';
      case 'polaroid':
        return 'bg-gradient-to-b from-yellow-100 to-orange-200';
      case 'arcade':
        return 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white';
      case 'recipe':
        return 'bg-gradient-to-b from-orange-100 to-yellow-200';
      case 'reality':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'y2k':
        return 'bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 text-white';
      case 'marketing':
        return 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white';
      case 'political':
        return 'bg-gradient-to-b from-red-700 to-blue-700 text-white';
      case 'brazilian':
        return 'bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500';
      case 'american':
        return 'bg-gradient-to-r from-red-600 via-white to-blue-600';
      case 'stepbystep':
        return 'bg-gradient-to-b from-gray-200 to-gray-400';
      case 'vhs':
        return 'bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 text-white';
      case 'menu':
        return 'bg-gradient-to-b from-amber-100 to-orange-200';
      case 'orbit':
        return 'bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white';
      default:
        return 'bg-white';
    }
  };

  const renderBackground = () => {
    if (profile.backgroundType === 'video' && profile.backgroundVideo) {
      if (profile.backgroundVideo.includes('youtube.com') || profile.backgroundVideo.includes('youtu.be')) {
        const getYouTubeEmbedUrl = (url: string) => {
          const videoId = url.includes('watch?v=') 
            ? url.split('watch?v=')[1]?.split('&')[0]
            : url.split('youtu.be/')[1]?.split('?')[0];
          return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0` : '';
        };
        
        return (
          <iframe
            src={getYouTubeEmbedUrl(profile.backgroundVideo)}
            className="absolute inset-0 w-full h-full object-cover"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        );
      } else {
        return (
          <video
            src={profile.backgroundVideo}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted={profile.backgroundVideoMuted}
            loop
            playsInline
            style={{ volume: profile.backgroundVideoVolume || 0 }}
          />
        );
      }
    }
    
    if (profile.backgroundType === 'image' && profile.backgroundImage) {
      return (
        <img
          src={profile.backgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    }
    
    if (profile.backgroundType === 'gradient') {
      const gradientStyle = {
        background: `linear-gradient(135deg, ${profile.backgroundGradientColor1 || '#667eea'}, ${profile.backgroundGradientColor2 || '#764ba2'})`,
        opacity: profile.backgroundGradientOpacity || 1
      };
      
      return <div className="absolute inset-0" style={gradientStyle} />;
    }
    
    if (profile.backgroundType === 'solid') {
      return (
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: profile.backgroundColor }}
        />
      );
    }
    
    return null;
  };

  const renderAvatar = () => {
    const getAvatarClasses = () => {
      const baseClasses = profile.avatarShape === 'banner' ? "h-16 w-full" : "h-24 w-24 mx-auto";
      
      switch (profile.avatarShape) {
        case 'square':
          return `${baseClasses} rounded-none`;
        case 'rounded':
          return `${baseClasses} rounded-lg`;
        case 'triangle':
          return `${baseClasses} clip-path-triangle`;
        case 'hexagon':
          return `${baseClasses} clip-path-hexagon`;
        case 'banner':
          return `${baseClasses} rounded-lg`;
        default:
          return `${baseClasses} rounded-full`;
      }
    };

    return (
      <Avatar className={getAvatarClasses()}>
        <AvatarImage src={profile.avatar} />
        <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    );
  };

  const renderSocialIcons = () => {
    const socialPlatforms = ['instagram', 'facebook', 'twitter', 'youtube', 'tiktok', 'linkedin', 'spotify', 'whatsapp', 'telegram', 'threads', 'email'];
    
    return (
      <div className="flex justify-center space-x-4 mt-4">
        {socialPlatforms.map(platform => {
          const handle = profile.socialIcons[platform as keyof typeof profile.socialIcons];
          if (!handle) return null;
          
          return (
            <a
              key={platform}
              href={getSocialMediaUrl(platform, handle)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              {getSocialIcon(platform, handle)}
            </a>
          );
        })}
      </div>
    );
  };

  const getSocialMediaUrl = (platform: string, handle: string) => {
    switch (platform) {
      case 'instagram':
        return `https://instagram.com/${handle.replace('@', '')}`;
      case 'facebook':
        return `https://facebook.com/${handle.replace('@', '')}`;
      case 'twitter':
        return `https://x.com/${handle.replace('@', '')}`;
      case 'youtube':
        return `https://youtube.com/${handle.replace('@', '')}`;
      case 'tiktok':
        return `https://tiktok.com/@${handle.replace('@', '')}`;
      case 'linkedin':
        return `https://linkedin.com/in/${handle.replace('@', '')}`;
      case 'spotify':
        return `https://open.spotify.com/user/${handle.replace('@', '')}`;
      case 'whatsapp':
        return `https://wa.me/${handle}`;
      case 'telegram':
        return `https://t.me/${handle.replace('@', '')}`;
      case 'threads':
        return `https://threads.net/@${handle.replace('@', '')}`;
      case 'email':
        return `mailto:${handle}`;
      default:
        return '#';
    }
  };

  const getTextAlignment = () => {
    switch (profile.profileInfoPosition) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      default:
        return 'text-center';
    }
  };

  const getFontFamily = () => {
    switch (profile.font) {
      case 'montserrat':
        return 'font-sans';
      case 'bebas-neue':
        return 'font-mono';
      case 'helvetica-neue':
        return 'font-sans';
      case 'poppins':
        return 'font-sans';
      case 'burbank':
        return 'font-bold';
      case 'pixelated':
        return 'font-mono';
      case 'handwritten':
        return 'font-serif';
      default:
        return 'font-sans';
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background */}
      {renderBackground()}
      
      {/* Extended background color */}
      {profile.backgroundType === 'image' && profile.backgroundExtendedColor && (
        <div 
          className="absolute inset-0 -z-10"
          style={{ backgroundColor: profile.backgroundExtendedColor }}
        />
      )}
      
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
      
      {/* Visual Effects */}
      {profile.visualEffect !== 'none' && (
        <VisualEffect
          effect={profile.visualEffect}
          color={profile.visualEffectColor}
          opacity={profile.visualEffectOpacity}
          speed={profile.visualEffectSpeed}
          size={profile.visualEffectSize}
          customUrl={profile.visualEffectCustomUrl}
        />
      )}
      
      {/* Content */}
      <div className={`relative z-10 p-6 h-full flex flex-col justify-center ${getPageStyle()} ${getFontFamily()}`}>
        {profile.showProfileInfo && (
          <div className={`space-y-4 ${getTextAlignment()}`}>
            {/* Avatar */}
            {renderAvatar()}
            
            {/* Name */}
            <div className="space-y-1">
              <h1 
                className="text-2xl font-bold flex items-center justify-center gap-2"
                style={{ color: profile.nameColor }}
              >
                {profile.name}
                {profile.isVerified && (
                  <span className="text-blue-500">✓</span>
                )}
              </h1>
              
              {/* Bio */}
              {profile.bio && (
                <p 
                  className="text-sm"
                  style={{ color: profile.bioColor }}
                >
                  {profile.bio}
                </p>
              )}
              
              {/* Username */}
              <p 
                className="text-sm"
                style={{ color: profile.usernameColor }}
              >
                novabrand.site/{profile.username}
              </p>
            </div>
            
            {/* Social Icons */}
            {renderSocialIcons()}
          </div>
        )}
        
        {/* Premium Badge */}
        {!profile.isPremium && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            Powered by NovaBrand
          </div>
        )}
      </div>
    </div>
  );
};

export default PhonePreview;
