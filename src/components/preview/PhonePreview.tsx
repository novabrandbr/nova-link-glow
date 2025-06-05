
import React from 'react';
import { UserProfile, LinkType, AudioSettings, PageStyle } from '@/pages/Dashboard';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Music, 
  Linkedin, 
  Github, 
  MessageSquare, 
  X,
  Send,
  Mail
} from 'lucide-react';
import VisualEffect from '@/components/effects/VisualEffect';

type PhonePreviewProps = {
  profile: UserProfile;
  links: LinkType[];
  audioSettings: AudioSettings;
  pageStyle: PageStyle;
};

const PhonePreview: React.FC<PhonePreviewProps> = ({ profile, links, audioSettings, pageStyle }) => {
  const getSocialIcon = (platform: string, username: string) => {
    const iconProps = { 
      size: 20, 
      style: { color: profile.socialIconsColor || '#6A0DAD' }
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
        return <div style={{ color: profile.socialIconsColor || '#6A0DAD', fontSize: '16px', fontWeight: 'bold' }}>TT</div>;
      case 'linkedin':
        return <Linkedin {...iconProps} />;
      case 'spotify':
        return <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: profile.socialIconsColor || '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: 'black', borderRadius: '50%' }}></div>
        </div>;
      case 'whatsapp':
        return <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: profile.socialIconsColor || '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>W</div>;
      case 'telegram':
        return <Send {...iconProps} />;
      case 'email':
        return <Mail {...iconProps} />;
      default:
        return null;
    }
  };

  const getBackgroundStyle = () => {
    let backgroundStyle: React.CSSProperties = {};
    
    switch (profile.backgroundType) {
      case 'solid':
        backgroundStyle.backgroundColor = profile.backgroundColor;
        break;
      case 'gradient':
        const color1 = profile.backgroundGradientColor1 || '#667eea';
        const color2 = profile.backgroundGradientColor2 || '#764ba2';
        const opacity = profile.backgroundGradientOpacity || 1;
        backgroundStyle.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
        backgroundStyle.opacity = opacity;
        break;
      case 'image':
        if (profile.backgroundImage) {
          backgroundStyle.backgroundImage = `url(${profile.backgroundImage})`;
          backgroundStyle.backgroundSize = 'cover';
          backgroundStyle.backgroundPosition = 'center';
          backgroundStyle.backgroundRepeat = 'no-repeat';
        }
        break;
      case 'video':
        break;
    }
    
    return backgroundStyle;
  };

  const renderAvatar = () => {
    const baseClasses = "object-cover";
    let sizeClasses = "w-20 h-20";
    let shapeClasses = "";
    
    switch (profile.avatarShape) {
      case 'square':
        shapeClasses = "rounded-none";
        break;
      case 'rounded':
        shapeClasses = "rounded-lg";
        break;
      case 'triangle':
        shapeClasses = "clip-path-triangle";
        break;
      case 'hexagon':
        shapeClasses = "clip-path-hexagon";
        break;
      case 'banner':
        sizeClasses = "w-full h-16";
        shapeClasses = "rounded-none";
        break;
      default:
        shapeClasses = "rounded-full";
    }

    const adjustment = profile.avatarAdjustment || { x: 0, y: 0, scale: 1 };
    const transformStyle = {
      transform: `translate(${adjustment.x}px, ${adjustment.y}px) scale(${adjustment.scale})`,
      transformOrigin: 'center center'
    };

    const isVideo = profile.avatar?.startsWith('data:video/') || 
                   (profile.avatar && (profile.avatar.includes('.mp4') || profile.avatar.includes('.webm') || profile.avatar.includes('.mov')));

    if (isVideo && profile.avatar) {
      return (
        <div className={`${sizeClasses} ${shapeClasses} overflow-hidden relative`}>
          <video 
            className={`w-full h-full ${baseClasses}`}
            src={profile.avatar}
            autoPlay
            muted
            loop
            playsInline
            style={{ ...transformStyle, objectFit: 'cover' }}
          />
        </div>
      );
    }

    if (profile.avatar) {
      return (
        <div className={`${sizeClasses} ${shapeClasses} overflow-hidden relative`}>
          <img 
            src={profile.avatar} 
            alt="Profile" 
            className={`w-full h-full ${baseClasses}`}
            style={transformStyle}
          />
        </div>
      );
    }

    return (
      <div className={`${sizeClasses} ${shapeClasses} bg-gray-300 flex items-center justify-center text-gray-600 text-lg font-semibold`}>
        {profile.name.substring(0, 2).toUpperCase()}
      </div>
    );
  };

  const renderSocialIcons = () => {
    const socialPlatforms = Object.entries(profile.socialIcons || {}).filter(([_, value]) => value);
    
    if (socialPlatforms.length === 0) return null;

    return (
      <div className="flex justify-center space-x-4 mt-4">
        {socialPlatforms.map(([platform, username]) => (
          <div key={platform} className="cursor-pointer hover:opacity-80">
            {getSocialIcon(platform, username)}
          </div>
        ))}
      </div>
    );
  };

  const getPageStyleClasses = () => {
    switch (pageStyle.type) {
      case "novabrandflix":
        return "bg-black text-white";
      case "magazine":
        return "bg-white text-black";
      case "polaroid":
        return "bg-gray-100 text-gray-800";
      case "traditional":
        return "bg-white text-gray-800";
      case "arcade":
        return "bg-black text-green-500";
      case "recipe":
        return "bg-yellow-50 text-gray-900";
      case "reality":
        return "bg-blue-100 text-blue-900";
      case "vhs":
        return "bg-purple-900 text-purple-100";
      case "y2k":
        return "bg-pink-100 text-pink-900";
      case "marketing":
        return "bg-orange-100 text-orange-900";
      case "political":
        return "bg-red-100 text-red-900";
      case "brazilian":
        return "bg-green-500 text-yellow-50";
      case "american":
        return "bg-red-500 text-white";
      case "stepbystep":
        return "bg-blue-50 text-blue-900";
      case "connected":
        return "bg-teal-50 text-teal-900";
      case "timeline":
        return "bg-indigo-50 text-indigo-900";
      case "orbit":
        return "bg-yellow-500 text-gray-900";
      case "notebook":
        return "bg-yellow-200 text-gray-900";
      case "meme":
        return "bg-lime-100 text-lime-900";
      case "windows98":
        return "bg-blue-200 text-blue-900";
      case "bakery":
        return "bg-amber-100 text-amber-900";
      case "linkverse":
        return "bg-fuchsia-50 text-fuchsia-900";
      case "lula":
        return "bg-red-700 text-white";
      case "bolsonaro":
        return "bg-green-700 text-yellow-500";
      case "trump":
        return "bg-red-900 text-white";
      case "putin":
        return "bg-white text-red-900";
      case "ballot":
        return "bg-blue-900 text-white";
      case "tropical":
        return "bg-yellow-300 text-green-900";
      case "usa":
        return "bg-blue-500 text-white";
      case "soviet":
        return "bg-red-900 text-yellow-500";
      case "france":
        return "bg-blue-100 text-red-700";
      case "portugal":
        return "bg-green-900 text-red-500";
      case "spain":
        return "bg-red-900 text-yellow-500";
      case "china":
        return "bg-red-900 text-yellow-500";
      case "aesthetic":
        return "bg-purple-100 text-purple-900";
      case "dental":
        return "bg-blue-100 text-blue-900";
      case "health":
        return "bg-green-100 text-green-900";
      case "skincare":
        return "bg-pink-100 text-pink-900";
      case "fashion":
        return "bg-indigo-100 text-indigo-900";
      case "vintage":
        return "bg-yellow-900 text-yellow-100";
      case "mall":
        return "bg-orange-100 text-orange-900";
      case "streetwear":
        return "bg-gray-900 text-gray-100";
      case "menu":
        return "bg-red-900 text-white";
      case "foodtruck":
        return "bg-yellow-500 text-gray-900";
      case "gourmet":
        return "bg-white text-gray-900";
      case "cassette":
        return "bg-black text-yellow-500";
      case "anime":
        return "bg-pink-300 text-red-900";
      case "realityshow":
        return "bg-blue-300 text-red-900";
      case "netflixHorizontal":
        return "bg-black text-red-500";
      case "y2kstyle":
        return "bg-pink-200 text-purple-900";
      case "recipeSuccess":
        return "bg-green-200 text-green-900";
      case "arcadeRetro":
        return "bg-black text-yellow-500";
      default:
        return "bg-white text-black";
    }
  };

  return (
    <div className="w-full max-w-[375px] h-[812px] bg-black rounded-[3rem] p-2 shadow-2xl mx-auto">
      <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
        {/* Background layer */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={getBackgroundStyle()}
        >
          {profile.backgroundType === 'video' && profile.backgroundVideo && (
            profile.backgroundVideo.includes('youtube.com') || profile.backgroundVideo.includes('youtu.be') ? (
              <iframe
                src={profile.backgroundVideo.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                className="w-full h-full object-cover"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <video
                src={profile.backgroundVideo}
                className="w-full h-full object-cover"
                autoPlay
                muted={profile.backgroundVideoMuted}
                loop
                playsInline
                style={{ 
                  objectFit: 'cover',
                  opacity: profile.backgroundVideoVolume || 0.5
                }}
              />
            )
          )}
        </div>

        {/* Overlay layer */}
        {profile.overlay && (
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundColor: profile.overlayColor,
              opacity: profile.overlayOpacity
            }}
          />
        )}

        {/* Visual effects layer */}
        {profile.visualEffect !== 'none' && (
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <VisualEffect profile={profile} />
          </div>
        )}

        {/* Content layer */}
        <div className="relative z-10 w-full h-full overflow-y-auto">
          <div className="p-6">
            {profile.showProfileInfo && (
              <div className={`text-${profile.profileInfoPosition} mb-6`}>
                <div className="flex justify-center mb-4">
                  {renderAvatar()}
                </div>
                
                <h1 
                  className="text-xl font-bold mb-2"
                  style={{ 
                    color: profile.nameColor,
                    fontFamily: profile.font 
                  }}
                >
                  {profile.name}
                  {profile.isVerified && (
                    <span className="ml-2 text-blue-500">✓</span>
                  )}
                </h1>
                
                {profile.bio && (
                  <p 
                    className="text-sm mb-2"
                    style={{ 
                      color: profile.bioColor,
                      fontFamily: profile.font 
                    }}
                  >
                    {profile.bio}
                  </p>
                )}
                
                <p 
                  className="text-xs mb-4"
                  style={{ 
                    color: profile.usernameColor,
                    fontFamily: profile.font 
                  }}
                >
                  novabrand.site/{profile.username}
                </p>

                {renderSocialIcons()}
              </div>
            )}

            {/* Links */}
            <div className="space-y-3">
              {links.filter(link => link.active).map((link) => (
                <div
                  key={link.id}
                  className="w-full p-4 rounded-lg border border-gray-200 text-center cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ 
                    backgroundColor: link.color,
                    color: link.titleColor || '#FFFFFF',
                    fontFamily: profile.font
                  }}
                >
                  {link.title}
                </div>
              ))}
            </div>

            {/* Audio player */}
            {audioSettings.showPlayer && audioSettings.url && (
              <div className="mt-6">
                <audio
                  controls
                  autoPlay={audioSettings.autoplay}
                  loop={audioSettings.loop}
                  className="w-full"
                  style={{ opacity: audioSettings.volume }}
                >
                  <source src={audioSettings.url} type="audio/mpeg" />
                </audio>
              </div>
            )}

            {/* Footer */}
            {!profile.isPremium && (
              <div className="mt-8 text-center">
                <p 
                  className="text-xs"
                  style={{ 
                    color: profile.footerColor || '#666666',
                    fontFamily: profile.font 
                  }}
                >
                  Made with ❤️ by NovaBrand
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
