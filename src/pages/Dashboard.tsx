import React, { useState } from "react";
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
  description?: string;
};

export type UserProfile = {
  name: string;
  username: string;
  bio: string;
  avatar?: string;
  isVerified: boolean;
  backgroundColor: string;
  backgroundType: "solid" | "gradient" | "image" | "video";
  backgroundGradient?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay: boolean;
  overlayColor: string;
  overlayOpacity: number;
  visualEffect: string;
  visualEffectColor: string;
  visualEffectOpacity: number;
  visualEffectSpeed: number;
  visualEffectSize: number;
  buttonColor: string;
  font: "montserrat" | "bebas-neue" | "helvetica-neue" | "poppins" | "burbank";
  socialIcons: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
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
  type: "netflix" | "magazine" | "polaroid" | "traditional";
  buttonColor?: string;
  cardSettings?: {
    showLabels?: boolean;
    showOverlay?: boolean;
    aspectRatio?: 'portrait' | 'square' | 'landscape';
  };
};

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState<string>("minisite");
  const [activeMinisiteTab, setActiveMinisiteTab] = useState<string>("profile");
  
  const [links, setLinks] = useState<LinkType[]>([
    { 
      id: "1", 
      title: "My Website", 
      url: "https://example.com", 
      active: true, 
      color: "#6A0DAD" 
    },
    { 
      id: "2", 
      title: "My Portfolio", 
      url: "https://portfolio.example.com", 
      active: true, 
      color: "#6A0DAD" 
    }
  ]);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    username: "johndoe",
    bio: "Digital creator and web developer",
    isVerified: false,
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
    socialIcons: {}
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
    type: "traditional"
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
          <div className="flex flex-col">
            <MinisiteTabs 
              activeTab={activeMinisiteTab} 
              setActiveTab={setActiveMinisiteTab} 
            />
            <div className="p-6">
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
        <div className="w-3/5 border-r border-gray-200 overflow-y-auto">
          {renderPanel()}
        </div>
        <div className="w-2/5 bg-gray-50 flex justify-center p-6">
          <PhonePreview 
            profile={profile} 
            links={links} 
            audioSettings={audioSettings}
            pageStyle={pageStyle}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
