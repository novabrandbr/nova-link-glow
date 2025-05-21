
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Link, Palette, Music } from "lucide-react";

type MinisiteTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const MinisiteTabs: React.FC<MinisiteTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex justify-start px-6 h-12 bg-transparent">
          <TabsTrigger value="profile" className="flex items-center gap-2 h-full data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:rounded-none">
            <User className="w-4 h-4" />
            <span>Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="links" className="flex items-center gap-2 h-full data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:rounded-none">
            <Link className="w-4 h-4" />
            <span>Meus Links</span>
          </TabsTrigger>
          <TabsTrigger value="styles" className="flex items-center gap-2 h-full data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:rounded-none">
            <Palette className="w-4 h-4" />
            <span>Estilos da Página</span>
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2 h-full data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:rounded-none">
            <Music className="w-4 h-4" />
            <span>Áudio</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MinisiteTabs;
