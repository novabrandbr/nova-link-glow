
import React, { useRef } from 'react';
import ProfileImage from '@/components/ProfileImage';
import LinkCard from '@/components/LinkCard';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Music, 
  Users, 
  Linkedin, 
  Github, 
  Headphones, 
  Gamepad2, 
  MessageCircle,
  Mail
} from 'lucide-react';
import { PageStyle, LinkType, UserProfile, AudioSettings } from '@/pages/Dashboard';

interface PhonePreviewProps {
  profile: UserProfile;
  links: LinkType[];
  audioSettings: AudioSettings;
  pageStyle: PageStyle;
}

const PhonePreview = ({ profile, links, audioSettings, pageStyle }: PhonePreviewProps) => {
  const backgroundRef = useRef<HTMLVideoElement>(null);

  const getBackgroundStyle = (): React.CSSProperties => {
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
          ref={backgroundRef}
          src={profile.backgroundVideo}
          autoPlay={true}
          loop={audioSettings.loop}
          muted={profile.backgroundVideoMuted}
          className="absolute inset-0 object-cover w-full h-full z-0"
          onLoadedData={() => {
            if (backgroundRef.current) {
              backgroundRef.current.volume = profile.backgroundVideoVolume || 0.5;
            }
          }}
        />
      );
    } else {
      return null;
    }
  };

  const getSocialIcon = (platform: string) => {
    const color = profile.socialIconsColor || '#6A0DAD';
    const size = 24;

    switch (platform) {
      case 'instagram':
        return profile.socialIcons.instagram ? <a href={profile.socialIcons.instagram} target="_blank" rel="noopener noreferrer"><Instagram color={color} size={size} /></a> : null;
      case 'facebook':
        return profile.socialIcons.facebook ? <a href={profile.socialIcons.facebook} target="_blank" rel="noopener noreferrer"><Facebook color={color} size={size} /></a> : null;
      case 'twitter':
        return profile.socialIcons.twitter ? <a href={profile.socialIcons.twitter} target="_blank" rel="noopener noreferrer">
          <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a> : null;
      case 'youtube':
        return profile.socialIcons.youtube ? <a href={profile.socialIcons.youtube} target="_blank" rel="noopener noreferrer"><Youtube color={color} size={size} /></a> : null;
      case 'tiktok':
        return profile.socialIcons.tiktok ? <a href={profile.socialIcons.tiktok} target="_blank" rel="noopener noreferrer">
          <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.01z"/>
          </svg>
        </a> : null;
      case 'pinterest':
        return profile.socialIcons.pinterest ? <a href={profile.socialIcons.pinterest} target="_blank" rel="noopener noreferrer"><Users color={color} size={size} /></a> : null;
      case 'linkedin':
        return profile.socialIcons.linkedin ? <a href={profile.socialIcons.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin color={color} size={size} /></a> : null;
      case 'github':
        return profile.socialIcons.github ? <a href={profile.socialIcons.github} target="_blank" rel="noopener noreferrer"><Github color={color} size={size} /></a> : null;
      case 'spotify':
        return profile.socialIcons.spotify ? <a href={profile.socialIcons.spotify} target="_blank" rel="noopener noreferrer">
          <svg width={size} height={size} viewBox="0 0 24 24" fill="#1DB954">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </a> : null;
      case 'twitch':
        return profile.socialIcons.twitch ? <a href={profile.socialIcons.twitch} target="_blank" rel="noopener noreferrer"><Gamepad2 color={color} size={size} /></a> : null;
      case 'discord':
        return profile.socialIcons.discord ? <a href={profile.socialIcons.discord} target="_blank" rel="noopener noreferrer"><MessageCircle color={color} size={size} /></a> : null;
      case 'whatsapp':
        return profile.socialIcons.whatsapp ? <a href={`https://wa.me/${profile.socialIcons.whatsapp}`} target="_blank" rel="noopener noreferrer">
          <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.421 3.506z"/>
          </svg>
        </a> : null;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-3xl shadow-lg overflow-hidden">
      {renderBackground()}
      
      <div className="absolute inset-0 z-10" style={getBackgroundStyle()}>
        {profile.overlay && (
          <div
            className="absolute inset-0"
            style={{
              background: profile.overlayColor,
              opacity: profile.overlayOpacity
            }}
          />
        )}
        
        <div className="relative z-20 flex flex-col h-full">
          <header className="pt-12 pb-8 px-6 flex flex-col items-center">
            <ProfileImage 
              src={profile.avatar || "/images/avatar-placeholder.png"} 
              alt={profile.name} 
              shape={profile.avatarShape} 
            />
            
            <div className={`mt-4 text-center ${profile.profileInfoPosition === 'left' ? 'text-left' : profile.profileInfoPosition === 'right' ? 'text-right' : ''}`}>
              <h1 className="text-2xl font-semibold" style={{ color: profile.nameColor }}>
                {profile.name}
              </h1>
              <h2 className="text-sm text-gray-500" style={{ color: profile.usernameColor }}>
                @{profile.username} {profile.isVerified && '✅'}
              </h2>
              <p className="text-gray-600 mt-2" style={{ color: profile.bioColor }}>
                {profile.bio}
              </p>
            </div>
          </header>
          
          <main className="px-6 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {links.map(link => (
                <LinkCard 
                  key={link.id}
                  title={link.title}
                  url={link.url}
                  pageStyle={pageStyle}
                  linkColor={link.color}
                  mediaType={link.mediaType}
                  mediaUrl={link.mediaUrl}
                  label={link.label}
                  labelColor={link.labelColor}
                  textAlign={link.textAlign}
                  overlayColor={link.overlayColor}
                  overlayOpacity={link.overlayOpacity}
                />
              ))}
            </div>
          </main>

          <footer className="p-6">
            <div className="flex justify-center space-x-4">
              {getSocialIcon('instagram')}
              {getSocialIcon('facebook')}
              {getSocialIcon('twitter')}
              {getSocialIcon('youtube')}
              {getSocialIcon('tiktok')}
              {getSocialIcon('pinterest')}
              {getSocialIcon('linkedin')}
              {getSocialIcon('github')}
              {getSocialIcon('spotify')}
              {getSocialIcon('twitch')}
              {getSocialIcon('discord')}
              {getSocialIcon('whatsapp')}
            </div>
            <p className="mt-4 text-center text-gray-500 text-xs" style={{ color: profile.footerColor }}>
              © 2024 Nova Brand
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
