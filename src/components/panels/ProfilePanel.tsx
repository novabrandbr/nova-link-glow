
import React, { useState } from "react";
import { UserProfile } from "@/pages/Dashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

type ProfilePanelProps = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const ProfilePanel = ({ profile, setProfile }: ProfilePanelProps) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    username: profile.username,
    email: "user@example.com",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = () => {
    // Update profile
    setProfile((prev) => ({
      ...prev,
      name: formData.name,
      username: formData.username,
    }));
    
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso",
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Perfil</h3>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informações da conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nome completo
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Nome de usuário
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                  novabrand.io/
                </span>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="rounded-l-none"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button 
          onClick={saveChanges}
          className="bg-[#6A0DAD] hover:bg-[#C9A0FF] hover:bg-gradient-to-r from-[#C9A0FF] to-[#6A0DAD]"
        >
          Salvar alterações
        </Button>
      </div>
    </div>
  );
};

export default ProfilePanel;
