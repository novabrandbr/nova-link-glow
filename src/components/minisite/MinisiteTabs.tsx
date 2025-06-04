import React, { useState } from 'react';
import { UserProfile } from '@/pages/Dashboard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ImprovedProfileTab from './ImprovedProfileTab';
import LinksTab from './LinksTab';
import PageStylesTab from './PageStylesTab';
import AudioTab from './AudioTab';
import AITab from './AITab';

type MinisiteTabsProps = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const MinisiteTabs: React.FC<MinisiteTabsProps> = ({ profile, setProfile }) => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="styles">Estilos</TabsTrigger>
          <TabsTrigger value="audio">Áudio</TabsTrigger>
          <TabsTrigger value="ai">IA</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="profile">
            <ImprovedProfileTab profile={profile} setProfile={setProfile} />
          </TabsContent>
          
          <TabsContent value="links">
            <LinksTab profile={profile} setProfile={setProfile} />
          </TabsContent>
          
          <TabsContent value="styles">
            <PageStylesTab profile={profile} setProfile={setProfile} />
          </TabsContent>
          
          <TabsContent value="audio">
            <AudioTab profile={profile} setProfile={setProfile} />
          </TabsContent>
          
          <TabsContent value="ai">
            <AITab profile={profile} setProfile={setProfile} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MinisiteTabs;
