import React, { useRef } from 'react';
import ProfileImage from '@/components/ProfileImage';
import LinkCard from '@/components/LinkCard';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Tiktok, 
  Pinterest, 
  Linkedin, 
  Github, 
  Spotify, 
  Twitch, 
  Discord,
  Mail
} from 'lucide-react';
import { PageStyle, LinkType, UserProfile, AudioSettings } from '@/pages/Dashboard';

interface PhonePreviewProps {
  profile: UserProfile;
  links: LinkType[];
  audioSettings: AudioSettings;
  pageStyle: PageStyle;
}

const PhonePreview = ({ profile, links, audioSettings, pageStyle }) => {
  const backgroundRef = useRef(null);

  const getBackgroundStyle = () => {
    const baseStyle = {};
    
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
          volume={profile.backgroundVideoVolume || 0.5}
          className="absolute inset-0 object-cover w-full h-full z-0"
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
        return profile.socialIcons.twitter ? <a href={profile.socialIcons.twitter} target="_blank" rel="noopener noreferrer"><Twitter color={color} size={size} /></a> : null;
      case 'youtube':
        return profile.socialIcons.youtube ? <a href={profile.socialIcons.youtube} target="_blank" rel="noopener noreferrer"><Youtube color={color} size={size} /></a> : null;
      case 'tiktok':
        return profile.socialIcons.tiktok ? <a href={profile.socialIcons.tiktok} target="_blank" rel="noopener noreferrer"><Tiktok color={color} size={size} /></a> : null;
      case 'pinterest':
        return profile.socialIcons.pinterest ? <a href={profile.socialIcons.pinterest} target="_blank" rel="noopener noreferrer"><Pinterest color={color} size={size} /></a> : null;
      case 'linkedin':
        return profile.socialIcons.linkedin ? <a href={profile.socialIcons.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin color={color} size={size} /></a> : null;
      case 'github':
        return profile.socialIcons.github ? <a href={profile.socialIcons.github} target="_blank" rel="noopener noreferrer"><Github color={color} size={size} /></a> : null;
      case 'spotify':
        return profile.socialIcons.spotify ? <a href={profile.socialIcons.spotify} target="_blank" rel="noopener noreferrer"><Spotify color={color} size={size} /></a> : null;
      case 'twitch':
        return profile.socialIcons.twitch ? <a href={profile.socialIcons.twitch} target="_blank" rel="noopener noreferrer"><Twitch color={color} size={size} /></a> : null;
      case 'discord':
        return profile.socialIcons.discord ? <a href={profile.socialIcons.discord} target="_blank" rel="noopener noreferrer"><Discord color={color} size={size} /></a> : null;
      case 'whatsapp':
        return profile.socialIcons.whatsapp ? <a href={`https://wa.me/${profile.socialIcons.whatsapp}`} target="_blank" rel="noopener noreferrer"><Mail color={color} size={size} /></a> : null;
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
