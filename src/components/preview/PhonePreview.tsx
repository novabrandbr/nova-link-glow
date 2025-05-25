import React, { useEffect, useRef } from "react";
import { LinkType, UserProfile, AudioSettings, PageStyle } from "@/pages/Dashboard";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Music, 
  Github, 
  Linkedin,
  MessageCircle,
  Twitch,
  Users
} from "lucide-react";
import VisualEffect from "@/components/effects/VisualEffect";

interface PhonePreviewProps {
  profile: UserProfile;
  links: LinkType[];
  audioSettings: AudioSettings;
  pageStyle: PageStyle;
}

const getContrastColor = (hexColor: string): string => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const getLabelPositionClass = (position?: string) => {
  switch (position) {
    case 'top-left': return 'top-2 left-2';
    case 'top-center': return 'top-2 left-1/2 -translate-x-1/2';
    case 'top-right': return 'top-2 right-2';
    case 'center-left': return 'top-1/2 left-2 -translate-y-1/2';
    case 'center-center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    case 'center-right': return 'top-1/2 right-2 -translate-y-1/2';
    case 'bottom-left': return 'bottom-2 left-2';
    case 'bottom-center': return 'bottom-2 left-1/2 -translate-x-1/2';
    case 'bottom-right': return 'bottom-2 right-2';
    default: return 'top-2 left-1/2 -translate-x-1/2';
  }
};

const PhonePreview = ({ profile, links, audioSettings, pageStyle }: PhonePreviewProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (audioSettings.url && audioRef.current) {
      audioRef.current.volume = audioSettings.volume;
      audioRef.current.muted = false;

      if (audioSettings.autoplay) {
        audioRef.current.play().catch(error => {
          console.error("Autoplay failed:", error);
        });
      }
    }
  }, [audioSettings.url, audioSettings.volume, audioSettings.autoplay]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = audioSettings.loop;
    }
  }, [audioSettings.loop]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = profile.backgroundVideoMuted !== false;
      videoRef.current.volume = (profile.backgroundVideoVolume || 0.5);
    }
  }, [profile.backgroundVideoMuted, profile.backgroundVideoVolume]);

  const getTextAlignClass = (textAlign?: string) => {
    switch (textAlign) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
      default:
        return 'text-center';
    }
  };

  const getTitleColorStyle = (link: LinkType) => {
    return {
      color: link.titleColor || profile.nameColor || "#000000"
    };
  };

  const renderTraditionalLinks = () => {
    return links
      .filter(link => link.active)
      .map((link) => (
        <a
          key={link.id}
          href={link.url}
          className="block mb-4 p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          style={{ backgroundColor: link.color || pageStyle.buttonColor || "#6A0DAD" }}
        >
          {link.mediaType === 'image' && link.mediaUrl && (
            <div className="absolute inset-0">
              <img 
                src={link.mediaUrl} 
                alt={link.title}
                className="w-full h-full object-cover"
              />
              {(link.overlayColor || link.overlayOpacity) && (
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundColor: link.overlayColor || '#000000',
                    opacity: link.overlayOpacity || 0.5
                  }}
                />
              )}
            </div>
          )}
          
          {link.mediaType === 'video' && link.mediaUrl && (
            <div className="absolute inset-0">
              <video 
                src={link.mediaUrl}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
              />
              {(link.overlayColor || link.overlayOpacity) && (
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundColor: link.overlayColor || '#000000',
                    opacity: link.overlayOpacity || 0.5
                  }}
                />
              )}
            </div>
          )}

          {link.label && (
            <div className={`absolute ${getLabelPositionClass(link.labelPosition)} z-10`}>
              <span 
                className="px-2 py-1 text-xs rounded-full font-semibold"
                style={{ 
                  backgroundColor: link.labelColor || "#FF0000",
                  color: getContrastColor(link.labelColor || "#FF0000")
                }}
              >
                {link.label}
              </span>
            </div>
          )}
          
          <div className="relative z-10">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 
                  className={`font-bold ${getTextAlignClass(link.textAlign)}`}
                  style={getTitleColorStyle(link)}
                >
                  {link.title}
                </h3>
              </div>
            </div>
          </div>
        </a>
      ));
  };

  const renderMagazineLinks = () => {
    return links
      .filter(link => link.active)
      .map((link) => (
        <a
          key={link.id}
          href={link.url}
          className="block mb-6 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative"
        >
          {link.mediaType === 'image' && link.mediaUrl && (
            <div className="h-32 relative">
              <img 
                src={link.mediaUrl} 
                alt={link.title}
                className="w-full h-full object-cover"
              />
              {(link.overlayColor || link.overlayOpacity) && (
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundColor: link.overlayColor || '#000000',
                    opacity: link.overlayOpacity || 0.5
                  }}
                />
              )}
            </div>
          )}
          
          {link.label && (
            <div className={`absolute ${getLabelPositionClass(link.labelPosition)} z-10`}>
              <span 
                className="px-2 py-1 text-xs rounded-full font-semibold"
                style={{ 
                  backgroundColor: link.labelColor || "#FF0000",
                  color: getContrastColor(link.labelColor || "#FF0000")
                }}
              >
                {link.label}
              </span>
            </div>
          )}
          
          <div className="h-4 bg-gradient-to-r from-green-500 via-yellow-400 to-blue-700"></div>
          <div className="p-3">
            <div 
              className={`font-bold text-gray-800 ${getTextAlignClass(link.textAlign)}`}
              style={getTitleColorStyle(link)}
            >
              {link.title}
            </div>
          </div>
        </a>
      ));
  };

  const renderNetflixLinks = () => {
    return (
      <div className="grid grid-cols-2 gap-3">
        {links
          .filter(link => link.active)
          .map((link) => (
            <a
              key={link.id}
              href={link.url}
              className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform relative"
            >
              {link.mediaType === 'image' && link.mediaUrl ? (
                <div className="aspect-video relative">
                  <img 
                    src={link.mediaUrl} 
                    alt={link.title}
                    className="w-full h-full object-cover"
                  />
                  {(link.overlayColor || link.overlayOpacity) && (
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundColor: link.overlayColor || '#000000',
                        opacity: link.overlayOpacity || 0.5
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gray-800 flex items-center justify-center">
                  <span className="text-white text-2xl">▶</span>
                </div>
              )}
              
              {link.label && (
                <div className={`absolute ${getLabelPositionClass(link.labelPosition)} z-10`}>
                  <span 
                    className="px-2 py-1 text-xs rounded-full font-semibold"
                    style={{ 
                      backgroundColor: link.labelColor || "#FF0000",
                      color: getContrastColor(link.labelColor || "#FF0000")
                    }}
                  >
                    {link.label}
                  </span>
                </div>
              )}
              
              <div className="p-3 flex-1">
                <div 
                  className={`font-bold text-white ${getTextAlignClass(link.textAlign)}`}
                  style={getTitleColorStyle(link)}
                >
                  {link.title}
                </div>
                <div className="mt-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Saiba mais</span>
                </div>
              </div>
            </a>
          ))}
      </div>
    );
  };

  const renderPolaroidLinks = () => {
    return links
      .filter(link => link.active)
      .map((link) => (
        <a
          key={link.id}
          href={link.url}
          className="block mb-6 bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow transform hover:rotate-1 relative"
          style={{ backgroundColor: "#f8f8f8" }}
        >
          {link.mediaType === 'image' && link.mediaUrl && (
            <div className="aspect-square mb-3 bg-gray-200 rounded relative">
              <img 
                src={link.mediaUrl} 
                alt={link.title}
                className="w-full h-full object-cover rounded"
              />
              {(link.overlayColor || link.overlayOpacity) && (
                <div 
                  className="absolute inset-0 rounded"
                  style={{
                    backgroundColor: link.overlayColor || '#000000',
                    opacity: link.overlayOpacity || 0.5
                  }}
                />
              )}
            </div>
          )}
          
          {link.label && (
            <div className={`absolute ${getLabelPositionClass(link.labelPosition)} z-10`}>
              <span 
                className="px-2 py-1 text-xs rounded-full font-semibold"
                style={{ 
                  backgroundColor: link.labelColor || "#FF0000",
                  color: getContrastColor(link.labelColor || "#FF0000")
                }}
              >
                {link.label}
              </span>
            </div>
          )}
          
          <div className="flex items-center p-3">
            <div className="flex-1">
              <div 
                className={`font-bold text-gray-800 ${getTextAlignClass(link.textAlign)}`}
                style={getTitleColorStyle(link)}
              >
                {link.title}
              </div>
            </div>
            <div className="ml-2 w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">→</span>
            </div>
          </div>
        </a>
      ));
  };

  const renderArcadeLinks = () => {
    return links
      .filter(link => link.active)
      .map((link) => (
        <a
          key={link.id}
          href={link.url}
          className="block mb-4 relative transform hover:scale-105 transition-transform"
        >
          {link.mediaType === 'image' && link.mediaUrl && (
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <img 
                src={link.mediaUrl} 
                alt={link.title}
                className="w-full h-full object-cover"
              />
              {(link.overlayColor || link.overlayOpacity) && (
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundColor: link.overlayColor || '#000000',
                    opacity: link.overlayOpacity || 0.5
                  }}
                />
              )}
            </div>
          )}
          
          {link.label && (
            <div className={`absolute ${getLabelPositionClass(link.labelPosition)} z-10`}>
              <span 
                className="px-2 py-1 text-xs rounded-full font-semibold"
                style={{ 
                  backgroundColor: link.labelColor || "#FF0000",
                  color: getContrastColor(link.labelColor || "#FF0000")
                }}
              >
                {link.label}
              </span>
            </div>
          )}
          
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-2 border-4 border-yellow-300 shadow-lg">
            <div className="bg-black rounded p-2 border-2 border-cyan-400">
              <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                <h4 
                  className={`font-bold ${getTextAlignClass(link.textAlign)}`}
                  style={getTitleColorStyle(link)}
                >
                  {link.title}
                </h4>
              </div>
            </div>
          </div>
        </a>
      ));
  };

  const renderProfileInfo = () => {
    return (
      <div className={`text-center p-6 ${profile.profileInfoPosition === 'left' ? 'text-left' : profile.profileInfoPosition === 'right' ? 'text-right' : 'text-center'}`}>
        {profile.avatar && (
          <div className={`relative mx-auto w-24 h-24 mb-4 ${profile.avatarShape === 'circle' ? 'rounded-full overflow-hidden' : profile.avatarShape === 'square' ? 'rounded-none' : profile.avatarShape === 'rounded' ? 'rounded-xl' : 'clip-path-triangle'}`}>
            <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            {profile.isVerified && (
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        )}
        <h2 className="text-2xl font-bold mb-2" style={{ color: profile.nameColor }}>{profile.name}</h2>
        <h3 className="text-lg text-gray-500 mb-4" style={{ color: profile.usernameColor }}>@{profile.username}</h3>
        <p className="text-gray-700" style={{ color: profile.bioColor }}>{profile.bio}</p>
      </div>
    );
  };

  const renderSocialIcons = () => {
    const icons = [];
    if (profile.socialIcons?.instagram) icons.push({ name: 'instagram', url: profile.socialIcons.instagram, icon: Instagram });
    if (profile.socialIcons?.facebook) icons.push({ name: 'facebook', url: profile.socialIcons.facebook, icon: Facebook });
    if (profile.socialIcons?.twitter) icons.push({ name: 'twitter', url: profile.socialIcons.twitter, icon: Twitter });
    if (profile.socialIcons?.youtube) icons.push({ name: 'youtube', url: profile.socialIcons.youtube, icon: Youtube });
    if (profile.socialIcons?.tiktok) icons.push({ name: 'tiktok', url: profile.socialIcons.tiktok,  icon: Users });
    if (profile.socialIcons?.linkedin) icons.push({ name: 'linkedin', url: profile.socialIcons.linkedin, icon: Linkedin });
    if (profile.socialIcons?.github) icons.push({ name: 'github', url: profile.socialIcons.github, icon: Github });
     if (profile.socialIcons?.twitch) icons.push({ name: 'twitch', url: profile.socialIcons.twitch, icon: Twitch });
    if (profile.socialIcons?.whatsapp) icons.push({ name: 'whatsapp', url: profile.socialIcons.whatsapp, icon: MessageCircle });

    return (
      <div className="flex justify-center space-x-4 p-4">
        {icons.map(item => (
          <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
            <item.icon className="w-6 h-6" style={{ color: profile.socialIconsColor }} />
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="phone-mockup">
        <div className="camera"></div>
        <div className="speaker"></div>
        <div className="screen">
          <div
            className="min-h-screen flex flex-col"
            style={{
              backgroundColor: profile.backgroundColor,
              backgroundImage: profile.backgroundType === 'gradient' ? profile.backgroundGradient : profile.backgroundType === 'image' ? `url(${profile.backgroundImage})` : profile.backgroundType === 'video' ? `url(${profile.backgroundVideo})` : 'none',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {profile.backgroundType === 'video' && profile.backgroundVideo && (
              <video
                ref={videoRef}
                src={profile.backgroundVideo}
                autoPlay
                loop
                muted={profile.backgroundVideoMuted !== false}
                className="absolute inset-0 object-cover w-full h-full"
              />
            )}

            {profile.overlay && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: profile.overlayColor,
                  opacity: profile.overlayOpacity,
                }}
              ></div>
            )}

            {profile.visualEffect !== 'none' && (
              <VisualEffect profile={profile} />
            )}

            {profile.showProfileInfo && renderProfileInfo()}
            
            <div className="flex-1 p-4">
              {pageStyle.type === 'traditional' && renderTraditionalLinks()}
              {pageStyle.type === 'magazine' && renderMagazineLinks()}
              {pageStyle.type === 'netflix' && renderNetflixLinks()}
              {pageStyle.type === 'polaroid' && renderPolaroidLinks()}
              {pageStyle.type === 'arcade' && renderArcadeLinks()}
            </div>

            {audioSettings.showPlayer && audioSettings.url && (
              <div className="p-4">
                <audio ref={audioRef} src={audioSettings.url} controls className="w-full"></audio>
              </div>
            )}

            {renderSocialIcons()}

            <div className="text-center p-4" style={{ color: profile.footerColor }}>
              <p>© 2024 Meu Link</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
