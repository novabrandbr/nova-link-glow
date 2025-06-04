import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PhonePreview from '@/components/preview/PhonePreview';

export type UserProfile = {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  isPremium: boolean;
  
  // Color customizations
  nameColor: string;
  bioColor: string;
  usernameColor: string;
  socialIconsColor: string;
  
  // Profile display settings
  showProfileInfo: boolean;
  profileInfoPosition: 'left' | 'center' | 'right';
  avatarShape: 'circle' | 'square' | 'rounded' | 'triangle' | 'hexagon' | 'banner';
  font: string;
  
  // Social media links - Updated with new platforms
  socialIcons: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
    linkedin?: string;
    spotify?: string;
    whatsapp?: string;
    telegram?: string;
    threads?: string;
    email?: string;
  };
  
  // Background settings
  backgroundType: 'solid' | 'gradient' | 'image' | 'video';
  backgroundColor: string;
  backgroundGradientColor1: string;
  backgroundGradientColor2: string;
  backgroundGradientOpacity: number;
  backgroundImage: string;
  backgroundVideo: string;
  backgroundVideoMuted: boolean;
  backgroundVideoVolume: number;
  backgroundExtendedColor: string;
  
  // Overlay settings
  overlay: boolean;
  overlayColor: string;
  overlayOpacity: number;
  
  // Visual effects
  visualEffect: string;
  visualEffectColor: string;
  visualEffectOpacity: number;
  visualEffectSpeed: number;
  visualEffectSize: number;
  visualEffectCustomUrl: string;
  
  // Page style
  pageStyle: 'traditional' | 'novabrandflix' | 'magazine' | 'polaroid' | 'arcade' | 'recipe' | 'reality' | 'y2k' | 'marketing' | 'political' | 'brazilian' | 'american' | 'stepbystep' | 'vhs' | 'menu' | 'orbit';
};

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState('minisite');
  const [profile, setProfile] = useState<UserProfile>({
    name: 'João Silva',
    username: 'joaosilva',
    bio: 'Desenvolvedor apaixonado por tecnologia',
    avatar: '/placeholder.svg',
    isVerified: false,
    isPremium: false,
    
    // Default colors
    nameColor: '#000000',
    bioColor: '#666666',
    usernameColor: '#666666',
    socialIconsColor: '#6A0DAD',
    
    // Profile display defaults
    showProfileInfo: true,
    profileInfoPosition: 'center',
    avatarShape: 'circle',
    font: 'montserrat',
    
    // Social media - Updated with new platforms
    socialIcons: {
      instagram: '',
      facebook: '',
      twitter: '',
      youtube: '',
      tiktok: '',
      linkedin: '',
      spotify: '',
      whatsapp: '',
      telegram: '',
      threads: '',
      email: ''
    },
    
    // Background defaults
    backgroundType: 'solid',
    backgroundColor: '#ffffff',
    backgroundGradientColor1: '#667eea',
    backgroundGradientColor2: '#764ba2',
    backgroundGradientOpacity: 1,
    backgroundImage: '',
    backgroundVideo: '',
    backgroundVideoMuted: true,
    backgroundVideoVolume: 0,
    backgroundExtendedColor: '#ffffff',
    
    // Overlay defaults
    overlay: false,
    overlayColor: '#000000',
    overlayOpacity: 0.5,
    
    // Visual effects defaults
    visualEffect: 'none',
    visualEffectColor: '#6A0DAD',
    visualEffectOpacity: 0.8,
    visualEffectSpeed: 1,
    visualEffectSize: 1,
    visualEffectCustomUrl: '',
    
    // Page style default
    pageStyle: 'traditional'
  });

  return (
    <DashboardLayout 
      activePanel={activePanel} 
      setActivePanel={setActivePanel}
      profile={profile}
      setProfile={setProfile}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        <div className="order-2 lg:order-1">
          {/* Content area handled by DashboardLayout */}
        </div>
        <div className="order-1 lg:order-2 lg:sticky lg:top-0 lg:h-screen">
          <PhonePreview profile={profile} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
