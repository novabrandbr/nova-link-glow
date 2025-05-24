import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LinksPanel from "@/components/panels/LinksPanel";
import DesignPanel from "@/components/panels/DesignPanel";
import StatsPanel from "@/components/panels/StatsPanel";
import ProfilePanel from "@/components/panels/ProfilePanel";
import PlansPanel from "@/components/panels/PlansPanel";
import PhonePreview from "@/components/preview/PhonePreview";
import MinisiteTabs from "@/components/minisite/MinisiteTabs";
import ProfileTab from "@/components/minisite/ProfileTab";
import LinksTab from "@/components/minisite/LinksTab";
import PageStylesTab from "@/components/minisite/PageStylesTab";
import AudioTab from "@/components/minisite/AudioTab";
import AITab from "@/components/minisite/AITab";
import HelpPanel from "@/components/panels/HelpPanel";
import NotificationsPanel from "@/components/panels/NotificationsPanel";
import SettingsPanel from "@/components/panels/SettingsPanel";

export type LinkType = {
  id: string;
  title: string;
  url: string;
  icon?: string;
  active: boolean;
  color: string;
  mediaType?: 'none' | 'image' | 'video';
  mediaUrl?: string;
  label?: string;
  labelColor?: string;
  labelPosition?: 'top' | 'center' | 'bottom';
  textAlign?: 'left' | 'center' | 'right';
  description?: string;
  titleColor?: string; // New property for title color
  overlayColor?: string; // New property for overlay color
  overlayOpacity?: number; // New property for overlay opacity
};

export type UserProfile = {
  name: string;
  username: string;
  bio: string;
  avatar?: string;
  avatarShape: 'circle' | 'square' | 'rounded' | 'triangle' | 'hexagon' | 'banner';
  isVerified: boolean;
  showProfileInfo: boolean;
  profileInfoPosition: 'left' | 'center' | 'right';
  backgroundColor: string;
  backgroundType: "solid" | "gradient" | "image" | "video";
  backgroundGradient?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundVideoMuted?: boolean;
  backgroundVideoVolume?: number;
  overlay: boolean;
  overlayColor: string;
  overlayOpacity: number;
  visualEffect: string;
  visualEffectColor: string;
  visualEffectOpacity: number;
  visualEffectSpeed: number;
  visualEffectSize: number;
  visualEffectCustomUrl?: string;
  buttonColor: string;
  font: string;
  nameColor: string;
  bioColor: string;
  socialIcons: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
    pinterest?: string;
    linkedin?: string;
    whatsapp?: string;
    github?: string;
    spotify?: string;
    twitch?: string;
    discord?: string;
  };
  socialIconsColor?: string;
  isPremium: boolean;
  footerColor?: string;
  usernameColor?: string;
};

export type AudioSettings = {
  source: "upload" | "gallery" | "external";
  url: string;
  autoplay: boolean;
  loop: boolean;
  volume: number;
  showPlayer: boolean;
};

export type PageStyle = {
  type: "netflix" | "magazine" | "polaroid" | "traditional" | "arcade" | "recipe" | "reality" | "vhs" | "y2k" | 
         "marketing" | "political" | "brazilian" | "american" | "stepbystep" | "connected" | "timeline" | "orbit" | 
         "notebook" | "meme" | "windows98" | "bakery" | "linkverse" | "lula" | "bolsonaro" | "trump" | "putin" | 
         "ballot" | "tropical" | "usa" | "soviet" | "france" | "portugal" | "spain" | "china" | "aesthetic" | 
         "dental" | "health" | "skincare" | "fashion" | "vintage" | "mall" | "streetwear" | "menu" | "foodtruck" | 
         "gourmet" | "cassette" | "anime" | "realityshow" | "netflixHorizontal" | "y2kstyle" | "recipeSuccess" | "arcadeRetro";
  buttonColor?: string;
  cardSettings?: {
    showLabels?: boolean;
    showOverlay?: boolean;
    aspectRatio?: 'portrait' | 'square' | 'landscape';
    showMedia?: boolean;
    showGradient?: boolean;
    gradientColor?: string; 
    gradientOpacity?: number;
    labelPosition?: 'top' | 'center' | 'bottom';
    textAlign?: 'left' | 'center' | 'right';
  };
};

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState<string>("minisite");
  const [activeMinisiteTab, setActiveMinisiteTab] = useState<string>("profile");
  const previewRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  
  // Improved phone preview positioning - now stays truly centered
  useEffect(() => {
    const handleScroll = () => {
      if (previewContainerRef.current) {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const previewHeight = previewContainerRef.current.offsetHeight;
        
        // Keep preview always centered vertically
        const headerHeight = 64;
        const availableHeight = windowHeight - headerHeight;
        const centeredPosition = headerHeight + (availableHeight - previewHeight) / 2;
        
        // Apply positioning
        previewContainerRef.current.style.position = 'fixed';
        previewContainerRef.current.style.top = `${Math.max(headerHeight, centeredPosition)}px`;
        previewContainerRef.current.style.right = '0';
        previewContainerRef.current.style.width = '40%';
        previewContainerRef.current.style.height = 'auto';
        previewContainerRef.current.style.maxHeight = `${availableHeight}px`;
        previewContainerRef.current.style.zIndex = '10';
        previewContainerRef.current.style.transition = 'none'; // Remove transition for smoother experience
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial positioning
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activePanel, activeMinisiteTab]);
  
  // Enhanced scroll synchronization between panel and preview
  useEffect(() => {
    const handlePanelScroll = () => {
      if (panelRef.current && previewRef.current) {
        const panel = panelRef.current;
        const preview = previewRef.current;
        
        const panelScrollTop = panel.scrollTop;
        const panelScrollHeight = panel.scrollHeight - panel.clientHeight;
        const previewScrollHeight = preview.scrollHeight - preview.clientHeight;
        
        if (panelScrollHeight > 0 && previewScrollHeight > 0) {
          const scrollPercentage = panelScrollTop / panelScrollHeight;
          const previewScrollPosition = scrollPercentage * previewScrollHeight;
          
          preview.scrollTo({
            top: previewScrollPosition,
            behavior: 'smooth'
          });
        }
      }
    };
    
    let scrollTimeout: number | null = null;
    const debouncedScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(handlePanelScroll, 10);
    };
    
    const panelElement = panelRef.current;
    if (panelElement) {
      panelElement.addEventListener('scroll', debouncedScroll);
      
      return () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        panelElement.removeEventListener('scroll', debouncedScroll);
      };
    }
  }, [activePanel, activeMinisiteTab]);
  
  // Window scroll to follow the panel with improved behavior
  useEffect(() => {
    const handleWindowScroll = () => {
      if (previewRef.current) {
        const windowScroll = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll > 0) {
          const scrollRatio = windowScroll / maxScroll;
          const previewMaxScroll = previewRef.current.scrollHeight - previewRef.current.clientHeight;
          if (previewMaxScroll > 0) {
            previewRef.current.scrollTop = scrollRatio * previewMaxScroll;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [activeMinisiteTab]);
  
  const [links, setLinks] = useState<LinkType[]>([
    { 
      id: "1", 
      title: "Meu Website", 
      url: "https://example.com", 
      active: true, 
      color: "#6A0DAD",
      label: "Novidade",
      labelColor: "#FF0000",
      labelPosition: "top",
      textAlign: "center",
      mediaType: "none",
      titleColor: "#FF0000",
      overlayColor: "#000000",
      overlayOpacity: 0.5
    },
    { 
      id: "2", 
      title: "Meu Portfolio", 
      url: "https://portfolio.example.com", 
      active: true, 
      color: "#6A0DAD",
      label: "TOP 10",
      labelColor: "#FF0000",
      labelPosition: "top",
      textAlign: "center",
      mediaType: "none",
      titleColor: "#FF0000",
      overlayColor: "#000000",
      overlayOpacity: 0.5
    }
  ]);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    username: "johndoe",
    bio: "Digital creator and web developer",
    avatarShape: "circle",
    isVerified: false,
    showProfileInfo: true,
    profileInfoPosition: "center",
    backgroundColor: "#FFFFFF",
    backgroundType: "solid",
    overlay: false,
    overlayColor: "#000000",
    overlayOpacity: 0.5,
    visualEffect: "none",
    visualEffectColor: "#6A0DAD",
    visualEffectOpacity: 0.7,
    visualEffectSpeed: 1,
    visualEffectSize: 1,
    buttonColor: "#6A0DAD",
    font: "montserrat",
    nameColor: "#000000",
    bioColor: "#666666",
    socialIcons: {},
    socialIconsColor: "#6A0DAD",
    isPremium: false,
    footerColor: "#666666",
    usernameColor: "#888888"
  });

  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    source: "external",
    url: "",
    autoplay: false,
    loop: true,
    volume: 0.5,
    showPlayer: true
  });

  const [pageStyle, setPageStyle] = useState<PageStyle>({
    type: "traditional",
    cardSettings: {
      showMedia: true,
      showGradient: false,
      gradientColor: "#000000",
      gradientOpacity: 0.5,
      labelPosition: "top",
      textAlign: "center"
    }
  });

  const renderMinisiteTab = () => {
    switch (activeMinisiteTab) {
      case "profile":
        return <ProfileTab profile={profile} setProfile={setProfile} />;
      case "links":
        return <LinksTab links={links} setLinks={setLinks} />;
      case "styles":
        return <PageStylesTab pageStyle={pageStyle} setPageStyle={setPageStyle} />;
      case "audio":
        return <AudioTab audioSettings={audioSettings} setAudioSettings={setAudioSettings} />;
      case "ai":
        return <AITab pageStyle={pageStyle} setPageStyle={setPageStyle} />;
      default:
        return <ProfileTab profile={profile} setProfile={setProfile} />;
    }
  };

  const renderPanel = () => {
    switch (activePanel) {
      case "dashboard":
        return <div className="p-6">Dashboard overview content</div>;
      case "minisite":
        return (
          <div className="flex flex-col h-full">
            <MinisiteTabs 
              activeTab={activeMinisiteTab} 
              setActiveTab={setActiveMinisiteTab} 
            />
            <div className="p-6 flex-1 overflow-auto" ref={panelRef}>
              {renderMinisiteTab()}
            </div>
          </div>
        );
      case "stats":
        return <StatsPanel />;
      case "profile":
        return <ProfilePanel profile={profile} setProfile={setProfile} />;
      case "plans":
        return <PlansPanel />;
      case "help":
        return <HelpPanel />;
      case "notifications":
        return <NotificationsPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <div>Select a panel</div>;
    }
  };

  return (
    <DashboardLayout activePanel={activePanel} setActivePanel={setActivePanel}>
      <div className="flex flex-1">
        <div className="w-3/5 border-r border-gray-200 flex flex-col overflow-hidden">
          {renderPanel()}
        </div>
        <div className="w-2/5 bg-gray-50 flex justify-center p-6 relative">
          <div ref={previewContainerRef} className="w-full max-w-sm">
            <div className="overflow-auto max-h-[80vh]" ref={previewRef}>
              <PhonePreview 
                profile={profile} 
                links={links} 
                audioSettings={audioSettings}
                pageStyle={pageStyle}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
