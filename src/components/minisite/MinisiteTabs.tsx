
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Link2, Palette, Music, Sparkles } from "lucide-react";

interface MinisiteTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const MinisiteTabs: React.FC<MinisiteTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b border-gray-200 px-4 py-2">
          <TabsTrigger value="profile" className="data-[state=active]:border-b-2 data-[state=active]:border-[#6A0DAD]">
            <UserCircle className="mr-2 h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="links" className="data-[state=active]:border-b-2 data-[state=active]:border-[#6A0DAD]">
            <Link2 className="mr-2 h-4 w-4" />
            Links
          </TabsTrigger>
          <TabsTrigger value="styles" className="data-[state=active]:border-b-2 data-[state=active]:border-[#6A0DAD]">
            <Palette className="mr-2 h-4 w-4" />
            Estilos
          </TabsTrigger>
          <TabsTrigger value="audio" className="data-[state=active]:border-b-2 data-[state=active]:border-[#6A0DAD]">
            <Music className="mr-2 h-4 w-4" />
            Áudio
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:border-b-2 data-[state=active]:border-[#6A0DAD]">
            <Sparkles className="mr-2 h-4 w-4" />
            IA
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MinisiteTabs;
