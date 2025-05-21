
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LinksPanel from "@/components/panels/LinksPanel";
import DesignPanel from "@/components/panels/DesignPanel";
import StatsPanel from "@/components/panels/StatsPanel";
import ProfilePanel from "@/components/panels/ProfilePanel";
import PlansPanel from "@/components/panels/PlansPanel";
import PhonePreview from "@/components/preview/PhonePreview";

export type LinkType = {
  id: string;
  title: string;
  url: string;
  icon?: string;
  active: boolean;
  color: string;
};

export type UserProfile = {
  name: string;
  username: string;
  bio: string;
  avatar?: string;
  backgroundColor: string;
  buttonColor: string;
  font: "montserrat" | "bebas-neue" | "helvetica-neue";
};

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState<string>("links");
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
    backgroundColor: "#FFFFFF",
    buttonColor: "#6A0DAD",
    font: "montserrat"
  });

  const renderPanel = () => {
    switch (activePanel) {
      case "dashboard":
        return <div className="p-6">Dashboard overview content</div>;
      case "links":
        return <LinksPanel links={links} setLinks={setLinks} />;
      case "design":
        return <DesignPanel profile={profile} setProfile={setProfile} />;
      case "stats":
        return <StatsPanel />;
      case "profile":
        return <ProfilePanel profile={profile} setProfile={setProfile} />;
      case "plans":
        return <PlansPanel />;
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
          <PhonePreview profile={profile} links={links} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
