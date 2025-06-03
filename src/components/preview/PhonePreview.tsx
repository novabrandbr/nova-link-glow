import React, { useEffect, useRef } from "react";
import { LinkType, UserProfile, AudioSettings, PageStyle } from "@/pages/Dashboard";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Music, 
  Linkedin, 
  Github, 
  MessageSquare,
  Volume2,
  Volume,
  VolumeX
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
  const audioRef = useRef<HTMLAudioElement>(null);
  
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
  
  // Handle audio playback
  useEffect(() => {
    if (audioRef.current && audioSettings.url) {
      audioRef.current.volume = audioSettings.volume;
      
      if (audioSettings.autoplay) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Auto-play prevented by browser:', error);
          });
        }
      }
    }
  }, [audioSettings]);
  
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
        return <Music className="h-5 w-5" style={{ color: profile.socialIconsColor || '#6A0DAD' }} />;
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
              return (
                <a 
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md overflow-hidden aspect-[2/3] transition-all transform hover:scale-105"
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
                className="relative block transition-all hover:translate-x-1"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                {/* Background image or video */}
                {link.mediaType !== 'none' && link.mediaUrl && pageStyle.cardSettings?.showMedia !== false && (
                  <div className="w-full h-24 overflow-hidden">
                    {link.mediaType === 'image' ? (
                      <img 
                        src={link.mediaUrl} 
                        alt={link.title}
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
                    
                    {/* Gradient overlay */}
                    {pageStyle.cardSettings?.showGradient && (
                      <div 
                        className="absolute inset-0 bg-gradient-to-r" 
                        style={{ 
                          backgroundImage: `linear-gradient(to right, ${pageStyle.cardSettings.gradientColor || '#000'}, transparent)`,
                          opacity: pageStyle.cardSettings.gradientOpacity || 0.5
                        }}
                      />
                    )}
                  </div>
                )}
                
                <div className="p-4 border-l-4" style={{ borderLeftColor: link.color || pageStyle.buttonColor || "#6A0DAD" }}>
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="font-bold" style={{ color: link.color || pageStyle.buttonColor || "#6A0DAD" }}>{link.title}</h3>
                    </div>
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
      case "marketing":
        return (
          <div className="w-full mt-6 space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-bold text-lg">Estratégias de Marketing</h3>
              <p className="text-xs text-gray-500">As melhores táticas para seu negócio</p>
            </div>
            {activeLinks.map((link, index) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg"
              >
                {link.mediaType !== 'none' && link.mediaUrl && (
                  <div className="h-32 overflow-hidden">
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
                <div className="p-3">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">{link.title}</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Estratégia #{index + 1}</div>
                        <div className="text-sm text-gray-600">Ver mais →</div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        );
      case "political":
        return (
          <div className="w-full mt-6 space-y-4">
            <div className="text-center bg-blue-900 text-white py-2 rounded-t-lg">
              <h3 className="font-bold">Propostas & Projetos</h3>
            </div>
            {activeLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-gray-200 transition-all hover:bg-gray-50"
              >
                <div className="flex items-center">
                  {link.mediaType !== 'none' && link.mediaUrl ? (
                    <div className="w-20 h-20 overflow-hidden flex-shrink-0">
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
                  ) : (
                    <div className="w-20 h-20 bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <div className="text-2xl font-bold text-blue-800">{link.title.charAt(0)}</div>
                    </div>
                  )}
                  <div className="p-3 flex-1">
                    <div className="font-bold">{link.title}</div>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Saiba mais</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
            <div className="text-center bg-blue-900 text-white py-1 rounded-b-lg text-xs">
              Vote consciente
            </div>
          </div>
        );
      case "brazilian":
        return (
          <div className="w-full mt-6 space-y-4">
            <div className="bg-green-500 p-2 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-700 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-center font-bold text-white relative z-10">BRASIL</h3>
            </div>
            {activeLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white shadow-md overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="h-4 bg-gradient-to-r from-green-500 via-yellow-400 to-blue-700"></div>
                <div className="p-3">
                  <div className="font-bold text-gray-800">{link.title}</div>
                </div>
              </a>
            ))}
          </div>
        );
      case "american":
        return (
          <div className="w-full mt-6 space-y-4">
            <div className="bg-blue-900 p-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-12 h-12 bg-blue-900">
                <div className="grid grid-cols-5 gap-0.5">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="h-0.5 w-0.5 bg-white rounded-full"></div>
                  ))}
                </div>
              </div>
              <div className="h-4 bg-red-600 my-0.5"></div>
              <div className="h-4 bg-white my-0.5"></div>
              <div className="h-4 bg-red-600 my-0.5"></div>
              <h3 className="text-center font-bold text-white relative z-10 mt-1">USA</h3>
            </div>
            {activeLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="flex items-center p-3">
                  <div className="flex-1">
                    <div className="font-bold text-gray-800">{link.title}</div>
                  </div>
                  <div className="ml-2 w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        );
      case "stepbystep":
        return (
          <div className="w-full mt-6 space-y-4">
            <div className="text-center mb-2">
              <h3 className="font-bold">Passo a Passo</h3>
              <p className="text-xs text-gray-500">Siga o roteiro para o sucesso</p>
            </div>
            <div className="border-l-2 border-dashed border-gray-300 pl-4 ml-3 py-2">
              {activeLinks.map((link, index) => (
                <a 
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-6 relative transition-all hover:translate-x-1"
                >
                  <div className="absolute -left-6 w-5 h-5 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                    <h4 className="font-bold">{link.title}</h4>
                  </div>
                </a>
              ))}
              <div className="absolute -left-3 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
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
    
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const volume = parseFloat(e.target.value);
      if (audioRef.current) {
        audioRef.current.volume = volume;
      }
    };
    
    const getVolumeIcon = () => {
      const volume = audioSettings.volume;
      if (volume === 0) return <VolumeX className="h-4 w-4" />;
      if (volume < 0.5) return <Volume className="h-4 w-4" />;
      return <Volume2 className="h-4 w-4" />;
    };
    
    return (
      <div className="mt-4 p-2 bg-gray-100 rounded-full">
        <div className="flex items-center space-x-2">
          <audio
            ref={audioRef}
            controls
            autoPlay={audioSettings.autoplay}
            loop={audioSettings.loop}
            src={audioSettings.url}
            className="h-8 hidden"
          />
          <button 
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
            onClick={() => {
              if (audioRef.current) {
                if (audioRef.current.paused) {
                  audioRef.current.play();
                } else {
                  audioRef.current.pause();
                }
              }
            }}
          >
            {getVolumeIcon()}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={audioSettings.volume}
            onChange={handleVolumeChange}
            className="flex-1 h-2"
          />
        </div>
      </div>
    );
  };
  
  // Apply visual effects based on profile settings
  const renderVisualEffects = () => {
    if (profile.visualEffect === 'none') return null;
    
    // Apply different styles based on the visual effect selected
    const baseStyle = {
      position: 'absolute' as 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none' as 'none',
      opacity: profile.visualEffectOpacity,
      zIndex: 5,
    };
    
    // Show different effects based on selection
    switch(profile.visualEffect) {
      case 'bubbles':
        return (
          <div 
            style={{
              ...baseStyle,
              backgroundImage: `radial-gradient(circle, ${profile.visualEffectColor} 10%, transparent 10%)`,
              backgroundSize: `${profile.visualEffectSize * 20}px ${profile.visualEffectSize * 20}px`,
              animation: `bubbleRise ${4 / profile.visualEffectSpeed}s linear infinite`
            }}
            className="bubbles-effect"
          />
        );
      case 'glitch':
        return (
          <div 
            style={{
              ...baseStyle,
              backgroundColor: 'transparent',
              backgroundImage: `repeating-linear-gradient(to right, ${profile.visualEffectColor}, transparent 2px)`,
              backgroundSize: `${profile.visualEffectSize * 10}px 100%`,
              animation: `glitch ${0.5 / profile.visualEffectSpeed}s linear infinite`
            }}
            className="glitch-effect"
          />
        );
      case 'lightleak':
        return (
          <div 
            style={{
              ...baseStyle,
              background: `linear-gradient(45deg, transparent, ${profile.visualEffectColor} 50%, transparent)`,
              backgroundSize: `${profile.visualEffectSize * 300}%`,
              animation: `lightleak ${8 / profile.visualEffectSpeed}s ease infinite`
            }}
            className="light-leak-effect"
          />
        );
      case 'vintage':
        return (
          <div 
            style={{
              ...baseStyle,
              backgroundColor: profile.visualEffectColor,
              mixBlendMode: 'multiply'
            }}
            className="vintage-effect"
          />
        );
      case 'spark':
        return (
          <div className="relative w-full h-full">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                style={{
                  position: 'absolute',
                  backgroundColor: profile.visualEffectColor,
                  width: `${profile.visualEffectSize * 3}px`,
                  height: `${profile.visualEffectSize * 3}px`,
                  borderRadius: '50%',
                  opacity: profile.visualEffectOpacity * (Math.random() * 0.5 + 0.5),
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `spark ${(3 / profile.visualEffectSpeed) + Math.random()}s linear infinite`
                }}
              />
            ))}
          </div>
        );
      case 'particles':
        return (
          <div style={{...baseStyle, overflow: 'hidden'}}>
            {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                style={{
                  position: 'absolute',
                  backgroundColor: profile.visualEffectColor,
                  width: `${profile.visualEffectSize * 2}px`,
                  height: `${profile.visualEffectSize * 2}px`,
                  borderRadius: '50%',
                  opacity: profile.visualEffectOpacity * 0.7,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${5 / profile.visualEffectSpeed}s linear infinite`
                }}
              />
            ))}
          </div>
        );
      case 'snow':
        return (
          <div style={{...baseStyle, overflow: 'hidden'}}>
            {[...Array(50)].map((_, i) => (
              <div 
                key={i}
                style={{
                  position: 'absolute',
                  backgroundColor: profile.visualEffectColor,
                  width: `${profile.visualEffectSize * (Math.random() + 0.5)}px`,
                  height: `${profile.visualEffectSize * (Math.random() + 0.5)}px`,
                  borderRadius: '50%',
                  opacity: profile.visualEffectOpacity * (Math.random() * 0.5 + 0.5),
                  top: `${-10 + Math.random() * 10}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `snowfall ${(10 / profile.visualEffectSpeed) + Math.random() * 5}s linear infinite`
                }}
              />
            ))}
          </div>
        );
      case 'confetti':
        return (
          <div style={{...baseStyle, overflow: 'hidden'}}>
            {[...Array(40)].map((_, i) => {
              const size = profile.visualEffectSize * (Math.random() * 3 + 2);
              return (
                <div 
                  key={i}
                  style={{
                    position: 'absolute',
                    backgroundColor: i % 2 === 0 ? profile.visualEffectColor : `hsl(${Math.random() * 360}, 80%, 60%)`,
                    width: `${size}px`,
                    height: `${size / 2}px`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    opacity: profile.visualEffectOpacity * (Math.random() * 0.5 + 0.5),
                    top: `${-10 + Math.random() * 10}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `confetti ${(8 / profile.visualEffectSpeed) + Math.random() * 4}s linear infinite`
                  }}
                />
              );
            })}
          </div>
        );
      case 'matrix':
        return (
          <div style={{
            ...baseStyle, 
            fontFamily: 'monospace',
            fontSize: `${profile.visualEffectSize * 10}px`,
            color: profile.visualEffectColor,
            overflow: 'hidden'
          }}>
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `${i * 10}%`,
                  animation: `matrixDrop ${(10 / profile.visualEffectSpeed) + Math.random() * 5}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                {[...Array(20)].map((_, j) => (
                  <div key={j} className="opacity-70">
                    {String.fromCharCode(33 + Math.floor(Math.random() * 93))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      case 'flames':
        return (
          <div style={{
            ...baseStyle,
            background: `linear-gradient(0deg, ${profile.visualEffectColor}, transparent)`,
            backgroundSize: `${profile.visualEffectSize * 100}% 100%`,
            animation: `flames ${1 / profile.visualEffectSpeed}s ease-in-out infinite alternate`,
            filter: 'blur(5px)'
          }} />
        );
      case 'stars':
        return (
          <div style={{...baseStyle, overflow: 'hidden'}}>
            {[...Array(50)].map((_, i) => {
              const size = profile.visualEffectSize * (Math.random() * 2 + 1);
              return (
                <div 
                  key={i}
                  style={{
                    position: 'absolute',
                    backgroundColor: profile.visualEffectColor,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    boxShadow: `0 0 ${size * 2}px ${size}px ${profile.visualEffectColor}`,
                    opacity: profile.visualEffectOpacity * (Math.random() * 0.7 + 0.3),
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `twinkle ${(3 / profile.visualEffectSpeed) + Math.random() * 2}s ease-in-out infinite alternate`
                  }}
                />
              );
            })}
          </div>
        );
      case 'waves':
        return (
          <div style={{
            ...baseStyle,
            background: `linear-gradient(90deg, transparent, ${profile.visualEffectColor}, transparent)`,
            backgroundSize: `200% 100%`,
            animation: `waves ${5 / profile.visualEffectSpeed}s ease infinite`,
            filter: 'blur(10px)'
          }} />
        );
      case 'smoke':
        return (
          <div style={{
            ...baseStyle,
            background: `radial-gradient(ellipse at center, ${profile.visualEffectColor} 0%, transparent 70%)`,
            backgroundSize: `${profile.visualEffectSize * 200}% ${profile.visualEffectSize * 200}%`,
            animation: `smoke ${8 / profile.visualEffectSpeed}s ease infinite`,
            filter: 'blur(15px)'
          }} />
        );
      case 'fireworks':
        return (
          <div style={{...baseStyle, overflow: 'hidden'}}>
            {[...Array(5)].map((_, i) => {
              const size = profile.visualEffectSize * 100;
              return (
                <div 
                  key={i}
                  style={{
                    position: 'absolute',
                    top: `${50 + (Math.random() * 40 - 20)}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${profile.visualEffectColor} 0%, transparent 70%)`,
                    transform: 'scale(0)',
                    opacity: 0,
                    animation: `firework ${(3 / profile.visualEffectSpeed) + Math.random() * 2}s ease-out infinite`,
                    animationDelay: `${i * (3 / profile.visualEffectSpeed)}s`
                  }}
                />
              );
            })}
          </div>
        );
      case 'custom':
        if (profile.visualEffectCustomUrl) {
          if (profile.visualEffectCustomUrl.startsWith('data:image')) {
            return (
              <div style={{
                ...baseStyle,
                backgroundImage: `url(${profile.visualEffectCustomUrl})`,
                backgroundSize: `${profile.visualEffectSize * 100}%`,
                backgroundRepeat: 'repeat',
                animation: `customEffect ${10 / profile.visualEffectSpeed}s linear infinite`
              }} />
            );
          } else if (profile.visualEffectCustomUrl.startsWith('data:video')) {
            return (
              <video
                src={profile.visualEffectCustomUrl}
                style={{
                  ...baseStyle,
                  objectFit: 'cover',
                  transform: `scale(${profile.visualEffectSize})`,
                }}
                autoPlay
                loop
                muted
              />
            );
          }
        }
        return null;
      default:
        return null;
    }
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
      case 'roboto':
        return 'font-sans';
      case 'open-sans':
        return 'font-sans';
      case 'lato':
        return 'font-sans';
      case 'playfair':
        return 'font-serif';
      case 'merriweather':
        return 'font-serif';
      case 'courier':
        return 'font-mono';
      case 'georgia':
        return 'font-serif';
      case 'verdana':
        return 'font-sans';
      case 'impact':
        return 'font-sans font-bold tracking-tight';
      case 'montserrat':
      default:
        return 'font-sans';
    }
  };

  // Get the appropriate avatar shape class
  const getAvatarShapeClass = () => {
    switch(profile.avatarShape) {
      case 'square':
        return 'rounded-none';
      case 'rounded':
        return 'rounded-lg';
      case 'triangle':
        return 'clip-path-triangle';
      case 'hexagon':
        return 'clip-path-hexagon';
      case 'banner':
        return 'w-full h-16 rounded-none';
      case 'circle':
      default:
        return 'rounded-full';
    }
  };
  
  // Get profile position class
  const getProfilePositionClass = () => {
    switch(profile.profileInfoPosition) {
      case 'left':
        return 'items-start text-left';
      case 'right':
        return 'items-end text-right';
      case 'center':
      default:
        return 'items-center text-center';
    }
  };
  
  // Create a style for CSS animations
  const animationStyles = `
    @keyframes bubbleRise {
      0% { background-position: 0% 100%; }
      100% { background-position: 0% 0%; }
    }
    @keyframes glitch {
      0% { opacity: 1; }
      50% { opacity: 0.5; transform: translateX(2px); }
      51% { opacity: 0.5; transform: translateX(-2px); }
      100% { opacity: 1; }
    }
    @keyframes lightleak {
      0% { background-position: 0% 0%; }
      50% { background-position: 100% 0%; }
      100% { background-position: 0% 0%; }
    }
    @keyframes spark {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1); opacity: 1; }
      100% { transform: scale(0); opacity: 0; }
    }
    @keyframes float {
      0% { transform: translateY(0) translateX(0); }
      25% { transform: translateY(-30px) translateX(10px); }
      50% { transform: translateY(-10px) translateX(20px); }
      75% { transform: translateY(-20px) translateX(-10px); }
      100% { transform: translateY(0) translateX(0); }
    }
    @keyframes snowfall {
      0% { transform: translateY(-10px); }
      100% { transform: translateY(600px); }
    }
    @keyframes confetti {
      0% { transform: translateY(-10px) rotate(0deg); }
      100% { transform: translateY(600px) rotate(360deg); }
    }
    @keyframes matrixDrop {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(600px); }
    }
    @keyframes flames {
      0% { transform: scaleY(0.8); }
      100% { transform: scaleY(1.1); }
    }
    @keyframes twinkle {
      0% { opacity: 0.3; }
      100% { opacity: 1; }
    }
    @keyframes waves {
      0% { background-position: 0% 0%; }
      50% { background-position: 100% 0%; }
      100% { background-position: 0% 0%; }
    }
    @keyframes smoke {
      0% { background-position: center 0%; }
      50% { background-position: center 50%; }
      100% { background-position: center 0%; }
    }
    @keyframes firework {
      0% { transform: scale(0); opacity: 0; }
      25% { transform: scale(1); opacity: ${profile.visualEffectOpacity}; }
      50% { transform: scale(0.8); opacity: ${profile.visualEffectOpacity * 0.8}; }
      75% { transform: scale(1.2); opacity: ${profile.visualEffectOpacity * 0.5}; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    @keyframes customEffect {
      0% { background-position: 0% 0%; }
      100% { background-position: 100% 100%; }
    }
    .clip-path-triangle {
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
    .clip-path-hexagon {
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    }
  `;
  
  return (
    <div className="w-[280px] h-[560px] mx-auto flex-shrink-0">
      <style>{animationStyles}</style>
      <div className="w-full h-full border-[8px] border-gray-800 rounded-[32px] overflow-hidden shadow-xl bg-black">
        {/* iPhone notch */}
        <div className="bg-gray-800 h-6 flex items-center justify-center relative">
          <div className="w-20 h-4 rounded-full bg-gray-700"></div>
        </div>
        
        <div 
          className={`h-[calc(100%-1.5rem)] overflow-y-auto relative ${getFontClass()}`}
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
                zIndex: 1
              }}
            ></div>
          )}
          
          {/* Visual effects layer */}
          {renderVisualEffects()}
          
          <div className={`flex flex-col p-4 relative z-10 ${getProfilePositionClass()}`}>
            {/* Profile info section (conditionally rendered) */}
            {profile.showProfileInfo && (
              <>
                {profile.avatarShape === 'banner' ? (
                  <div className="w-full mb-3">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-20 object-cover"
                      />
                    ) : (
                      <div className="w-full h-20 bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-400">
                          {profile.name.substring(0, 1)}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`w-16 h-16 ${getAvatarShapeClass()} overflow-hidden border-2 border-gray-200 bg-gray-200`}>
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-400">
                          {profile.name.substring(0, 1)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center mt-3">
                  <h2 className="text-lg font-bold" style={{ color: profile.nameColor || "#000000" }}>
                    {profile.name}
                  </h2>
                  
                  {profile.isVerified && (
                    <span className="ml-1 bg-blue-500 text-white rounded-full p-1 flex items-center justify-center" style={{width: "14px", height: "14px"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  )}
                </div>
                
                <p className="text-xs mt-2" style={{ color: profile.bioColor || "#666666" }}>
                  {profile.bio}
                </p>
                
                {/* Social icons */}
                {Object.entries(profile.socialIcons).some(([_, value]) => value) && (
                  <div className="flex gap-2 mt-2 flex-wrap justify-center">
                    {Object.entries(profile.socialIcons).map(([platform, url]) => {
                      if (!url) return null;
                      
                      // Special case for WhatsApp to create a proper link
                      if (platform === 'whatsapp') {
                        const cleanNumber = url.replace(/\D/g, '');
                        const whatsappUrl = `https://wa.me/${cleanNumber}`;
                        
                        return (
                          <a 
                            key={platform}
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80"
                          >
                            {getSocialIcon(platform)}
                          </a>
                        );
                      }
                      
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
              </>
            )}
            
            {/* Links based on selected style */}
            {renderLinks()}
            
            {/* Audio player */}
            {renderAudioPlayer()}
            
            <div className="text-xs mt-6" style={{ color: profile.footerColor || "#666666" }}>
              {!profile.isPremium && `novabrand.site/${profile.username}`}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-2">
        Pré-visualização em tempo real
      </p>
    </div>
  );
};

export default PhonePreview;
