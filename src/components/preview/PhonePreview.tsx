
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin, 
  MessageCircle,
  Mail,
  X
} from 'lucide-react';
import VisualBackgroundEffect from '@/components/effects/VisualBackgroundEffect';
import { UserProfile, Link } from '@/pages/Dashboard';

interface PhonePreviewProps {
  profile: UserProfile;
  links: Link[];
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ profile, links }) => {
  const getBackgroundStyle = () => {
    const styles: React.CSSProperties = {};
    
    switch (profile.backgroundType) {
      case 'solid':
        styles.backgroundColor = profile.backgroundColor;
        break;
      case 'gradient':
        const color1 = profile.backgroundGradientColor1 || '#667eea';
        const color2 = profile.backgroundGradientColor2 || '#764ba2';
        const opacity = profile.backgroundGradientOpacity || 1;
        styles.background = `linear-gradient(135deg, ${color1}, ${color2})`;
        styles.opacity = opacity;
        break;
      case 'image':
        if (profile.backgroundImage) {
          styles.backgroundImage = `url(${profile.backgroundImage})`;
          styles.backgroundSize = 'cover';
          styles.backgroundPosition = 'center';
          styles.backgroundRepeat = 'no-repeat';
        }
        if (profile.backgroundExtendedColor) {
          styles.backgroundColor = profile.backgroundExtendedColor;
        }
        break;
      case 'video':
        // Video will be handled by a separate video element
        break;
    }
    
    return styles;
  };

  const getFontFamily = (font: string) => {
    const fontMap: Record<string, string> = {
      'montserrat': '"Montserrat", sans-serif',
      'bebas-neue': '"Bebas Neue", cursive',
      'helvetica-neue': '"Helvetica Neue", Arial, sans-serif',
      'poppins': '"Poppins", sans-serif',
      'burbank': '"Burbank Big Condensed", sans-serif',
      'pixelated': '"Press Start 2P", cursive',
      'handwritten': '"Kalam", cursive',
      'roboto': '"Roboto", sans-serif',
      'open-sans': '"Open Sans", sans-serif',
      'lato': '"Lato", sans-serif',
      'playfair': '"Playfair Display", serif',
      'merriweather': '"Merriweather", serif',
      'courier-new': '"Courier New", monospace',
      'georgia': '"Georgia", serif',
      'verdana': '"Verdana", sans-serif',
      'impact': '"Impact", sans-serif',
      'times-new-roman': '"Times New Roman", serif',
      'arial': '"Arial", sans-serif',
      'comic-sans': '"Comic Sans MS", cursive',
      'tahoma': '"Tahoma", sans-serif',
      'trebuchet': '"Trebuchet MS", sans-serif',
      'nunito': '"Nunito", sans-serif',
      'raleway': '"Raleway", sans-serif',
      'oswald': '"Oswald", sans-serif',
      'pacifico': '"Pacifico", cursive',
      'dancing-script': '"Dancing Script", cursive',
      'quicksand': '"Quicksand", sans-serif'
    };
    
    return fontMap[font] || '"Inter", sans-serif';
  };

  const renderAvatar = () => {
    const baseClasses = profile.avatarShape === 'banner' ? "h-20 w-full max-w-xs mx-auto" : "h-24 w-24 mx-auto";
    let shapeClasses = "";
    
    switch (profile.avatarShape) {
      case 'square':
        shapeClasses = "rounded-none";
        break;
      case 'rounded':
        shapeClasses = "rounded-lg";
        break;
      case 'triangle':
        shapeClasses = "rounded-none";
        break;
      case 'hexagon':
        shapeClasses = "rounded-none";
        break;
      case 'banner':
        shapeClasses = "rounded-lg";
        break;
      default:
        shapeClasses = "rounded-full";
    }

    return (
      <Avatar className={`${baseClasses} ${shapeClasses} border-2 border-white/20`}>
        {profile.avatar?.startsWith('data:video') ? (
          <video 
            src={profile.avatar} 
            className="w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
          />
        ) : (
          <AvatarImage src={profile.avatar} />
        )}
        <AvatarFallback className="text-lg font-semibold">
          {profile.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  };

  const renderSocialIcons = () => {
    const socialLinks = [
      { key: 'instagram', icon: Instagram, value: profile.socialIcons.instagram, color: 'text-pink-600' },
      { key: 'facebook', icon: Facebook, value: profile.socialIcons.facebook, color: 'text-blue-600' },
      { key: 'twitter', icon: X, value: profile.socialIcons.twitter, color: 'text-black' },
      { key: 'youtube', icon: Youtube, value: profile.socialIcons.youtube, color: 'text-red-600' },
      { key: 'tiktok', icon: null, value: profile.socialIcons.tiktok, color: 'text-black' },
      { key: 'linkedin', icon: Linkedin, value: profile.socialIcons.linkedin, color: 'text-blue-700' },
      { key: 'spotify', icon: null, value: profile.socialIcons.spotify, color: 'text-green-500' },
      { key: 'whatsapp', icon: null, value: profile.socialIcons.whatsapp, color: 'text-green-500' },
      { key: 'threads', icon: null, value: profile.socialIcons.threads, color: 'text-black' },
      { key: 'telegram', icon: MessageCircle, value: profile.socialIcons.telegram, color: 'text-blue-500' },
      { key: 'email', icon: Mail, value: profile.socialIcons.email, color: 'text-gray-600' }
    ];

    const activeSocials = socialLinks.filter(social => social.value);

    if (activeSocials.length === 0) return null;

    return (
      <div className="flex justify-center space-x-4 mt-4">
        {activeSocials.map(social => {
          const IconComponent = social.icon;
          
          const handleClick = () => {
            if (social.key === 'email') {
              window.open(`mailto:${social.value}`, '_blank');
            } else if (social.key === 'whatsapp') {
              window.open(`https://wa.me/${social.value.replace(/\D/g, '')}`, '_blank');
            } else if (social.key === 'telegram') {
              window.open(`https://t.me/${social.value}`, '_blank');
            } else {
              // Handle other social platforms
              let url = '';
              switch (social.key) {
                case 'instagram':
                  url = `https://instagram.com/${social.value}`;
                  break;
                case 'facebook':
                  url = `https://facebook.com/${social.value}`;
                  break;
                case 'twitter':
                  url = `https://x.com/${social.value}`;
                  break;
                case 'youtube':
                  url = `https://youtube.com/${social.value}`;
                  break;
                case 'tiktok':
                  url = `https://tiktok.com/@${social.value}`;
                  break;
                case 'linkedin':
                  url = `https://linkedin.com/in/${social.value}`;
                  break;
                case 'spotify':
                  url = `https://open.spotify.com/user/${social.value}`;
                  break;
                case 'threads':
                  url = `https://threads.net/@${social.value}`;
                  break;
              }
              if (url) window.open(url, '_blank');
            }
          };

          return (
            <button
              key={social.key}
              onClick={handleClick}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
              style={{ color: profile.socialIconsColor || '#6A0DAD' }}
            >
              {IconComponent ? (
                <IconComponent className="h-5 w-5" />
              ) : social.key === 'tiktok' ? (
                <div className="h-5 w-5 rounded bg-black flex items-center justify-center text-white text-xs font-bold">
                  TT
                </div>
              ) : social.key === 'spotify' ? (
                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                  <div className="h-2 w-2 bg-black rounded-full"></div>
                </div>
              ) : social.key === 'whatsapp' ? (
                <div className="h-5 w-5 rounded bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                  W
                </div>
              ) : social.key === 'threads' ? (
                <div className="h-5 w-5 rounded bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                  @
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    );
  };

  const profileTextAlign = profile.profileInfoPosition || 'center';
  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[profileTextAlign];

  const itemsAlignClass = {
    left: 'items-start',
    center: 'items-center',
    right: 'items-end'
  }[profileTextAlign];

  return (
    <div className="relative w-full max-w-sm mx-auto bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
      {/* Status bar */}
      <div className="bg-black text-white text-xs py-2 px-4 flex justify-between items-center">
        <span>9:41</span>
        <div className="flex space-x-1">
          <div className="w-4 h-2 bg-white rounded-sm"></div>
          <div className="w-1 h-2 bg-white rounded-sm"></div>
          <div className="w-6 h-2 bg-white rounded-sm"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative min-h-[600px] overflow-hidden">
        {/* Background Video */}
        {profile.backgroundType === 'video' && profile.backgroundVideo && (
          <>
            {profile.backgroundVideo.includes('youtube.com') || profile.backgroundVideo.includes('youtu.be') ? (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <span className="text-white text-sm">YouTube Video Background</span>
              </div>
            ) : (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted={profile.backgroundVideoMuted}
                loop
                playsInline
                src={profile.backgroundVideo}
                style={{ 
                  opacity: profile.backgroundVideoVolume || 0.5 
                }}
              />
            )}
          </>
        )}

        {/* Background Style */}
        <div 
          className="absolute inset-0"
          style={getBackgroundStyle()}
        />

        {/* Visual Effects */}
        <VisualBackgroundEffect
          type={profile.visualEffect}
          color={profile.visualEffectColor}
          opacity={profile.visualEffectOpacity}
          speed={profile.visualEffectSpeed}
          size={profile.visualEffectSize}
          customUrl={profile.visualEffectCustomUrl}
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

        {/* Content */}
        <div className="relative z-10 p-6 min-h-[600px] flex flex-col">
          {profile.showProfileInfo && (
            <div className={`mb-8 flex flex-col ${itemsAlignClass}`}>
              <div className="mb-4">
                {renderAvatar()}
              </div>
              
              <div className={`space-y-2 ${textAlignClass}`} style={{ fontFamily: getFontFamily(profile.font) }}>
                <div className="flex items-center justify-center space-x-2">
                  <h1 
                    className="text-2xl font-bold text-white drop-shadow-lg"
                    style={{ color: profile.nameColor || '#000000' }}
                  >
                    {profile.name}
                  </h1>
                  {profile.isVerified && (
                    <Badge className="bg-blue-500 text-white">
                      ✓
                    </Badge>
                  )}
                </div>
                
                {profile.bio && (
                  <p 
                    className="text-sm opacity-90 drop-shadow-sm"
                    style={{ color: profile.bioColor || '#666666' }}
                  >
                    {profile.bio}
                  </p>
                )}
                
                <p 
                  className="text-xs opacity-75 drop-shadow-sm"
                  style={{ color: profile.usernameColor || '#666666' }}
                >
                  novabrand.site/{profile.username}
                </p>
              </div>

              {renderSocialIcons()}
            </div>
          )}

          {/* Links */}
          <div className="space-y-3 flex-1">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-200 cursor-pointer border border-white/20"
                onClick={() => window.open(link.url, '_blank')}
              >
                <div className="flex items-center space-x-3">
                  {link.icon && (
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <span className="text-sm">{link.icon}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-white drop-shadow-sm">
                      {link.title}
                    </h3>
                    {link.description && (
                      <p className="text-xs text-white/70 drop-shadow-sm">
                        {link.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {!profile.isPremium && (
            <div className="mt-6 text-center">
              <p className="text-xs text-white/50 drop-shadow-sm">
                Powered by NovaBrand
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
