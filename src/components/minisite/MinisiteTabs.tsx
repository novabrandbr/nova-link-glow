
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedProfileTab from './EnhancedProfileTab';
import LinksTab from './LinksTab';
import PageStylesTab from './PageStylesTab';
import AudioTab from './AudioTab';
import AITab from './AITab';
import { UserProfile, PageStyle, LinkType, AudioSettings } from '@/pages/Dashboard';

interface MinisiteTabsProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  links: LinkType[];
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
  pageStyle: PageStyle;
  setPageStyle: React.Dispatch<React.SetStateAction<PageStyle>>;
  audioSettings: AudioSettings;
  setAudioSettings: React.Dispatch<React.SetStateAction<AudioSettings>>;
}

const MinisiteTabs: React.FC<MinisiteTabsProps> = ({
  profile,
  setProfile,
  links,
  setLinks,
  pageStyle,
  setPageStyle,
  audioSettings,
  setAudioSettings
}) => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="links">Links</TabsTrigger>
        <TabsTrigger value="styles">Estilos</TabsTrigger>
        <TabsTrigger value="audio">Áudio</TabsTrigger>
        <TabsTrigger value="ai">IA</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="space-y-6">
        <EnhancedProfileTab profile={profile} setProfile={setProfile} />
      </TabsContent>
      
      <TabsContent value="links" className="space-y-6">
        <LinksTab links={links} setLinks={setLinks} />
      </TabsContent>
      
      <TabsContent value="styles" className="space-y-6">
        <PageStylesTab pageStyle={pageStyle} setPageStyle={setPageStyle} />
      </TabsContent>
      
      <TabsContent value="audio" className="space-y-6">
        <AudioTab audioSettings={audioSettings} setAudioSettings={setAudioSettings} />
      </TabsContent>
      
      <TabsContent value="ai" className="space-y-6">
        <AITab pageStyle={pageStyle} setPageStyle={setPageStyle} />
      </TabsContent>
    </Tabs>
  );
};

export default MinisiteTabs;
