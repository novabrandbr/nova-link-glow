
import React, { useEffect, useRef } from "react";
import { LinkType, UserProfile, AudioSettings, PageStyle } from "@/pages/Dashboard";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  TikTok, 
  Linkedin, 
  Github, 
  Music, 
  MessageSquare 
} from "lucide-react";

type PhonePreviewProps = {
  profile: UserProfile;
  links: LinkType[];
  audioSettings: AudioSettings;
  pageStyle: PageStyle;
};

const PhonePreview = ({ profile, links, audioSettings, pageStyle }: PhonePreviewProps) => {
  const activeLinks = links.filter(link => link.active);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle background video volume
  useEffect(() => {
    if (profile.backgroundType === 'video' && videoRef.current) {
      if (profile.backgroundVideoMuted) {
        videoRef.current.muted = true;
      } else {
        videoRef.current.muted = false;
        videoRef.current.volume = profile.backgroundVideoVolume || 0.5;
      }
    }
  }, [profile.backgroundVideoMuted, profile.backgroundVideoVolume, profile.backgroundType]);
  
  // Function to get social icon component by platform
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5" style={{ color: profile.socialIconsColor || '#6A0DAD' }} />;
      case 'facebook':
        return <Facebook className="h-5 w-5" style={{ color: profile.socialIconsColor || '#6A0DAD' }} />;
      case 'twitter':
        return <Twitter className="h-5 w-5" style={{ color: profile.socialIconsColor || '#6A0DAD' }} />;
      case 'youtube':
        return <Youtube className="h-5 w-5" style={{ color: profile.socialIconsColor || '#6A0DAD' }} />;
      case 'tiktok':
        return <TikTok className="h-5 w-5" style={{ color: profile.socialIconsColor || '#6A0DAD' }} />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" style={{ color: profile.socialIconsColor || '#6A0DAD' }} />;
      case 'github':
        return <Github className="h-5 w-5" style={{ color: profile.socialIconsColor || '#6A0DAD' }} />;
      case 'spotify':
        return <Music className="h-5 w-5" style={{ color: profile.socialIconsColor || '#6A0DAD' }} />;
      case 'whatsapp':
        return <MessageSquare className="h-5 w-5" style={{ color: profile.socialIconsColor || '#6A0DAD' }} />;
      default:
        return null;
    }
  };

  // Function to render links based on the selected page style
  const renderLinks = () => {
    switch (pageStyle.type) {
      case "netflix":
        return (
          <div className="w-full mt-6 grid grid-cols-2 gap-3">
            {activeLinks.map((link) => {
              // Determine aspect ratio class based on settings
              let aspectRatioClass = "aspect-video"; // Default landscape
              if (pageStyle.cardSettings?.aspectRatio === 'portrait') {
                aspectRatioClass = "aspect-[2/3]";
              } else if (pageStyle.cardSettings?.aspectRatio === 'square') {
                aspectRatioClass = "aspect-square";
              }
              
              return (
                <a 
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block rounded-md overflow-hidden ${aspectRatioClass} transition-all transform hover:scale-105`}
                >
                  <div className="relative w-full h-full">
                    {/* Link media (image or video) */}
                    {link.mediaType === 'image' && link.mediaUrl ? (
                      <img 
                        src={link.mediaUrl} 
                        alt={link.title}
                        className="w-full h-full object-cover"
                      />
                    ) : link.mediaType === 'video' && link.mediaUrl ? (
                      <video
                        src={link.mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: link.color || pageStyle.buttonColor || "#6A0DAD" }}
                      />
                    )}
                    
                    {/* Overlay gradient */}
                    {pageStyle.cardSettings?.showOverlay !== false && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    )}
                    
                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <div className="text-white font-bold text-sm leading-tight">{link.title}</div>
                    </div>
                    
                    {/* Labels (TOP 10, Novidade, etc) */}
                    {pageStyle.cardSettings?.showLabels !== false && link.label && (
                      <div className="absolute top-1 right-1">
                        <div className="px-2 py-0.5 bg-red-600 rounded text-white text-xs font-medium">
                          {link.label}
                        </div>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
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
                  borderLeftColor: link.color || pageStyle.buttonColor || "#6A0DAD",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <div className="flex items-center">
                  {/* Show media if available */}
                  {link.mediaType === 'image' && link.mediaUrl && (
                    <div className="w-16 h-16 mr-3 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={link.mediaUrl} 
                        alt={link.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {link.mediaType === 'video' && link.mediaUrl && (
                    <div className="w-16 h-16 mr-3 rounded overflow-hidden flex-shrink-0">
                      <video
                        src={link.mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ color: link.color || pageStyle.buttonColor || "#6A0DAD" }}>{link.title}</h3>
                    {link.description && <p className="text-sm text-gray-600">{link.description}</p>}
                  </div>
                </div>
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
                <div className="relative">
                  {/* Link media (image or video) */}
                  {link.mediaType === 'image' && link.mediaUrl ? (
                    <img 
                      src={link.mediaUrl} 
                      alt={link.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : link.mediaType === 'video' && link.mediaUrl ? (
                    <video
                      src={link.mediaUrl}
                      className="w-full h-40 object-cover"
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <div 
                      className="w-full h-40"
                      style={{ backgroundColor: link.color || pageStyle.buttonColor || "#6A0DAD" }}
                    />
                  )}
                  <div 
                    className="p-3 flex items-center justify-center"
                    style={{ backgroundColor: "white", color: "black" }}
                  >
                    {link.title}
                  </div>
                </div>
              </a>
            ))}
          </div>
        );
      case "arcade":
        return (
          <div className="w-full mt-6 space-y-3 font-['Press_Start_2P',system-ui]">
            {activeLinks.map((link, index) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 block border-2 border-white rounded-md flex items-center justify-between transition-all transform hover:scale-105 relative overflow-hidden"
                style={{ 
                  backgroundColor: link.color || pageStyle.buttonColor || "#FF0000",
                  color: "#FFFFFF",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"
                }}
              >
                {/* Show media if available */}
                {link.mediaType !== 'none' && link.mediaUrl && (
                  <div className="absolute inset-0 opacity-20">
                    {link.mediaType === 'image' ? (
                      <img 
                        src={link.mediaUrl} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={link.mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                    )}
                  </div>
                )}
                
                {pageStyle.cardSettings?.showLabels && (
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center border-2 border-white text-xs font-bold mr-2">
                    {index + 1}
                  </div>
                )}
                
                <span className="flex-1 text-center text-sm font-pixelated">
                  {link.title.toUpperCase()}
                </span>
                
                {pageStyle.cardSettings?.showLabels && (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="animate-pulse">→</span>
                  </div>
                )}
              </a>
            ))}
          </div>
        );
      case "recipe":
        return (
          <div className="w-full mt-6 space-y-4 font-['Comic_Sans_MS',cursive]">
            <div className="p-3 border-b-2 border-dashed border-amber-800 text-center">
              <h3 className="text-amber-900 font-bold">Receita para o Sucesso Digital</h3>
              <p className="text-xs text-amber-700">Siga esses passos simples</p>
            </div>
            {activeLinks.map((link, index) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 block bg-amber-50 border border-amber-200 rounded-lg flex items-center transition-all hover:bg-amber-100"
              >
                {link.mediaType !== 'none' && link.mediaUrl && (
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    {link.mediaType === 'image' ? (
                      <img 
                        src={link.mediaUrl} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={link.mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                    )}
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-xs mr-2">
                      {index + 1}
                    </span>
                    <span className="font-medium text-amber-900">{link.title}</span>
                  </div>
                  <div className="text-xs text-amber-600 mt-1">Uma colher de chá</div>
                </div>
              </a>
            ))}
            <div className="text-center text-xs text-amber-600 italic mt-2">
              Misture bem e sirva com criatividade!
            </div>
          </div>
        );
      case "reality":
        return (
          <div className="w-full mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-1"></div>
                <span className="text-xs font-bold">AO VIVO</span>
              </div>
              <span className="text-xs text-gray-500">Dia 32 - Votação</span>
            </div>
            {activeLinks.map((link, index) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 block bg-pink-50 border border-pink-200 rounded-lg transition-all hover:bg-pink-100"
              >
                <div className="flex items-center">
                  {link.mediaType !== 'none' && link.mediaUrl && (
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-3 border-2 border-pink-300 flex-shrink-0">
                      {link.mediaType === 'image' ? (
                        <img 
                          src={link.mediaUrl} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={link.mediaUrl}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                        />
                      )}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-bold text-pink-600">{link.title}</div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-xs text-gray-500">#{index + 1} mais votado</div>
                      <div className="text-xs font-bold text-pink-500">
                        {Math.floor(Math.random() * 80) + 20}% de votos
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        );
      case "vhs":
        return (
          <div className="w-full mt-6 space-y-4 relative">
            {/* VHS static effect overlay */}
            {pageStyle.cardSettings?.showOverlay && (
              <div className="absolute inset-0 pointer-events-none bg-noise opacity-10"></div>
            )}
            <div className="p-2 bg-black text-white flex items-center justify-between text-xs">
              <span>PLAY</span>
              <span className="animate-pulse">REC</span>
            </div>
            {activeLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative transition-all hover:brightness-125"
                style={{filter: "brightness(1.1) contrast(1.1)"}}
              >
                <div className="relative">
                  {/* Link media (image or video) */}
                  {link.mediaType !== 'none' && link.mediaUrl ? (
                    <div className="relative">
                      {link.mediaType === 'image' ? (
                        <img 
                          src={link.mediaUrl} 
                          alt={link.title}
                          className="w-full h-20 object-cover"
                        />
                      ) : (
                        <video
                          src={link.mediaUrl}
                          className="w-full h-20 object-cover"
                          muted
                          loop
                          playsInline
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                    </div>
                  ) : (
                    <div className="h-20 relative overflow-hidden" style={{backgroundColor: link.color || '#4169E1'}}>
                      <div className="absolute inset-0 opacity-20">
                        <div className="h-1 bg-white/30 w-full absolute" style={{top: '30%'}}></div>
                        <div className="h-1 bg-white/30 w-full absolute" style={{top: '70%'}}></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-2 bg-gray-900 text-white relative">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
                      <div>{link.title}</div>
                    </div>
                    {/* Tracking lines */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"></div>
                  </div>
                </div>
              </a>
            ))}
            <div className="p-1 bg-black text-white text-xs text-center">
              REWIND · STOP · PAUSE
            </div>
          </div>
        );
      case "y2k":
        return (
          <div className="w-full mt-6 space-y-4">
            {activeLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-xl backdrop-blur-sm border border-white/50 shadow-lg transition-all transform hover:scale-105"
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 flex items-center">
                  {link.mediaType !== 'none' && link.mediaUrl && (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white mr-3 flex-shrink-0">
                      {link.mediaType === 'image' ? (
                        <img 
                          src={link.mediaUrl} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={link.mediaUrl}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                        />
                      )}
                    </div>
                  )}
                  <div 
                    className="font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent"
                    style={{textShadow: '0 0 2px rgba(255,255,255,0.5)'}}
                  >
                    {link.title}
                  </div>
                </div>
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
                className="p-3 rounded-md flex items-center justify-center transition-all transform hover:scale-105 relative overflow-hidden"
                style={{ 
                  backgroundColor: link.color || pageStyle.buttonColor || "#6A0DAD",
                  color: "#FFFFFF",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
                }}
              >
                {/* Show media as background if available */}
                {link.mediaType !== 'none' && link.mediaUrl && (
                  <div className="absolute inset-0">
                    {link.mediaType === 'image' ? (
                      <img 
                        src={link.mediaUrl} 
                        alt="" 
                        className="w-full h-full object-cover opacity-30"
                      />
                    ) : (
                      <video
                        src={link.mediaUrl}
                        className="w-full h-full object-cover opacity-30"
                        muted
                        loop
                        playsInline
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                )}
                <span className="relative z-10">{link.title}</span>
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
      position: 'absolute' as 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none' as 'none',
      opacity: profile.visualEffectOpacity,
      zIndex: 1,
    };
    
    // Custom classes for different effects
    let effectClass = '';
    
    switch(profile.visualEffect) {
      case 'bubbles':
        effectClass = 'bubbles-effect';
        break;
      case 'glitch':
        effectClass = 'glitch-effect';
        break;
      case 'lightleak':
        effectClass = 'light-leak-effect';
        break;
      case 'vintage':
        effectClass = 'vintage-effect';
        break;
      case 'spark':
        effectClass = 'spark-effect';
        break;
      case 'particles':
        effectClass = 'particles-effect';
        break;
      case 'snow':
        effectClass = 'snow-effect';
        break;
      case 'confetti':
        effectClass = 'confetti-effect';
        break;
      case 'matrix':
        effectClass = 'matrix-effect';
        break;
      default:
        break;
    }
    
    return {
      ...baseStyle,
      className: effectClass,
      style: { 
        backgroundColor: profile.visualEffect === 'vintage' ? `${profile.visualEffectColor}` : 'transparent',
        animation: `${profile.visualEffectSpeed}s`,
        backgroundSize: `${profile.visualEffectSize * 100}%`
      }
    };
  };

  // Get appropriate font class based on selected font or theme
  const getFontClass = () => {
    if (pageStyle.type === 'arcade') {
      return 'font-mono'; // Pixel-like font for arcade theme
    }
    
    if (pageStyle.type === 'recipe') {
      return 'font-serif'; // Comic-like font for recipe theme
    }
    
    switch (profile.font) {
      case 'bebas-neue':
        return 'font-sans tracking-wider uppercase';
      case 'helvetica-neue':
        return 'font-sans';
      case 'poppins':
        return 'font-sans';
      case 'burbank':
        return 'font-serif';
      case 'pixelated':
        return 'font-mono';
      case 'handwritten':
        return 'font-serif italic';
      case 'montserrat':
      default:
        return 'font-sans';
    }
  };
  
  return (
    <div className="w-[320px]">
      <div className="border-[10px] border-gray-800 rounded-[40px] overflow-hidden shadow-xl">
        <div className="bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-1/3 h-5 rounded-full bg-gray-700"></div>
        </div>
        
        <div 
          className={`h-[600px] overflow-y-auto relative ${getFontClass()}`}
          style={{ 
            backgroundColor: profile.backgroundColor,
          }}
        >
          {/* Background video if selected */}
          {profile.backgroundType === 'video' && profile.backgroundVideo && (
            <video
              ref={videoRef}
              src={profile.backgroundVideo}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted={profile.backgroundVideoMuted}
              playsInline
            />
          )}
          
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
            {...getVisualEffectsStyle()}
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
              <h2 className="text-xl font-bold" style={{ color: profile.nameColor || "#000000" }}>
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
            
            <p className="text-sm text-center mt-2" style={{ color: profile.bioColor || "#666666" }}>
              {profile.bio}
            </p>
            
            {/* Social icons */}
            {Object.entries(profile.socialIcons).some(([_, value]) => value) && (
              <div className="flex gap-3 mt-3 flex-wrap justify-center">
                {Object.entries(profile.socialIcons).map(([platform, url]) => {
                  if (!url) return null;
                  return (
                    <a 
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80"
                    >
                      {getSocialIcon(platform)}
                    </a>
                  );
                })}
              </div>
            )}
            
            {/* Links based on selected style */}
            {renderLinks()}
            
            {/* Audio player */}
            {renderAudioPlayer()}
            
            <div className="text-xs text-gray-500 mt-8">
              {!profile.isPremium && `novabrand.site/${profile.username}`}
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
