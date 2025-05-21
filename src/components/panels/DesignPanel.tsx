
import React from "react";
import { UserProfile } from "@/pages/Dashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";

type DesignPanelProps = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const DesignPanel = ({ profile, setProfile }: DesignPanelProps) => {
  const fontOptions = [
    { value: "montserrat", label: "Montserrat" },
    { value: "bebas-neue", label: "Bebas Neue" },
    { value: "helvetica-neue", label: "Helvetica Neue" },
  ];

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Design da Página</h3>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-medium mb-4">Foto de perfil</h4>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border">
                {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover" 
                  />
                ) : (
                  <ImageIcon className="text-gray-400" />
                )}
              </div>
              <Button>Carregar imagem</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-medium mb-4">Bio</h4>
            <textarea
              value={profile.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Sua bio curta"
              rows={3}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-medium mb-4">Cor dos botões</h4>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={profile.buttonColor}
                onChange={(e) => handleChange("buttonColor", e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <span>{profile.buttonColor}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Cor padrão é roxa (#6A0DAD)</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-medium mb-4">Tipografia</h4>
            <div className="grid grid-cols-3 gap-3">
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  onClick={() => handleChange("font", font.value as any)}
                  className={`p-3 border rounded-md text-center transition-all ${
                    profile.font === font.value
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-200"
                  }`}
                >
                  <span className={`font-${font.value.toLowerCase()}`}>{font.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DesignPanel;
