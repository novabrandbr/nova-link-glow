
import React from "react";
import { LinkType, UserProfile, AudioSettings, PageStyle } from "@/pages/Dashboard";

type PhonePreviewProps = {
  profile: UserProfile;
  links: LinkType[];
  audioSettings: AudioSettings;
  pageStyle: PageStyle;
};

const PhonePreview = ({ profile, links, audioSettings, pageStyle }: PhonePreviewProps) => {
  const activeLinks = links.filter(link => link.active);
  
  // Function to render links based on the selected page style
  const renderLinks = () => {
    switch (pageStyle.type) {
      case "netflix":
        return (
          <div className="w-full mt-6 grid grid-cols-2 gap-3">
            {activeLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-md flex items-center justify-center transition-all transform hover:scale-105"
                style={{ 
                  backgroundColor: link.color,
                  color: "#FFFFFF",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
                }}
              >
                {link.title}
              </a>
            ))}
          </div>
        );
      case "magazine":
        return (
          <div className="w-full mt-6 space-y-4">
            {activeLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 block border-l-4 transition-all hover:translate-x-1"
                style={{ 
                  borderLeftColor: link.color,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <h3 className="font-bold" style={{ color: link.color }}>{link.title}</h3>
              </a>
            ))}
          </div>
        );
      case "polaroid":
        return (
          <div className="w-full mt-6 space-y-5">
            {activeLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-white rotate-1 shadow-lg transition-all hover:rotate-0"
              >
                <div 
                  className="p-3 flex items-center justify-center"
                  style={{ backgroundColor: link.color, color: "#FFFFFF" }}
                >
                  {link.title}
                </div>
                <div className="h-2 bg-white"></div>
              </a>
            ))}
          </div>
        );
      case "traditional":
      default:
        return (
          <div className="w-full mt-6 space-y-3">
            {activeLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-md flex items-center justify-center transition-all transform hover:scale-105"
                style={{ 
                  backgroundColor: link.color,
                  color: "#FFFFFF",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
                }}
              >
                {link.title}
              </a>
            ))}
          </div>
        );
    }
  };

  // Render audio player if enabled
  const renderAudioPlayer = () => {
    if (!audioSettings.showPlayer || !audioSettings.url) return null;
    
    return (
      <div className="mt-4 p-2 bg-gray-100 rounded-full flex items-center justify-center">
        <audio
          controls
          autoPlay={audioSettings.autoplay}
          loop={audioSettings.loop}
          className="h-8 w-full"
          style={{ maxWidth: "200px" }}
        >
          <source src={audioSettings.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  };
  
  // Apply visual effects based on profile settings
  const getVisualEffectsStyle = () => {
    if (profile.visualEffect === 'none') return {};
    
    // Apply different styles based on the visual effect selected
    const baseStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      opacity: profile.visualEffectOpacity,
      zIndex: 1,
    };
    
    return baseStyle;
  };
  
  return (
    <div className="w-[320px]">
      <div className="border-[10px] border-gray-800 rounded-[40px] overflow-hidden shadow-xl">
        <div className="bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-1/3 h-5 rounded-full bg-gray-700"></div>
        </div>
        
        <div 
          className="h-[600px] overflow-y-auto relative"
          style={{ 
            backgroundColor: profile.backgroundColor,
            fontFamily: profile.font
          }}
        >
          {/* Background overlay */}
          {profile.overlay && (
            <div 
              className="absolute inset-0" 
              style={{ 
                backgroundColor: profile.overlayColor,
                opacity: profile.overlayOpacity,
                zIndex: 0
              }}
            ></div>
          )}
          
          {/* Visual effects layer */}
          <div 
            className="visual-effects" 
            style={getVisualEffectsStyle()}
          ></div>
          
          <div className="flex flex-col items-center p-6 relative z-10">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                  {profile.name.substring(0, 1)}
                </span>
              </div>
            )}
            
            <div className="flex items-center mt-4">
              <h2 className="text-xl font-bold">
                {profile.name}
              </h2>
              
              {profile.isVerified && (
                <span className="ml-1 bg-blue-500 text-white rounded-full p-1 flex items-center justify-center" style={{width: "16px", height: "16px"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              )}
            </div>
            
            <p className="text-gray-600 text-sm text-center mt-2">
              {profile.bio}
            </p>
            
            {/* Social icons */}
            <div className="flex gap-3 mt-3">
              {profile.socialIcons && Object.entries(profile.socialIcons).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <a 
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-purple-700"
                  >
                    <span className="text-xs capitalize">{platform}</span>
                  </a>
                );
              })}
            </div>
            
            {/* Links based on selected style */}
            {renderLinks()}
            
            {/* Audio player */}
            {renderAudioPlayer()}
            
            <div className="text-xs text-gray-500 mt-8">
              novabrand.io/{profile.username}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        Pré-visualização em tempo real
      </p>
    </div>
  );
};

export default PhonePreview;
