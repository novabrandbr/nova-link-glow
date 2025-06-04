
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/pages/Dashboard";
import { Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProfileTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ profile, setProfile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfile(prev => ({
          ...prev,
          avatar: result
        }));
        toast({
          title: "Upload realizado",
          description: "Foto/vídeo de perfil atualizado com sucesso!",
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Formato não suportado",
        description: "Por favor, faça upload de uma imagem ou vídeo.",
        variant: "destructive",
      });
    }
  };

  const removeAvatar = () => {
    setProfile(prev => ({
      ...prev,
      avatar: undefined
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações do Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Seu nome"
            />
          </div>

          <div>
            <Label htmlFor="username">Nome de usuário</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                novabrand.io/
              </span>
              <Input
                id="username"
                value={profile.username}
                onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                className="rounded-l-none"
                placeholder="seuusuario"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Conte um pouco sobre você..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Foto de Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Formato da foto</Label>
            <Select 
              value={profile.avatarShape} 
              onValueChange={(value: 'circle' | 'square' | 'rounded' | 'triangle' | 'hexagon' | 'banner') => 
                setProfile(prev => ({ ...prev, avatarShape: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="circle">Círculo</SelectItem>
                <SelectItem value="square">Quadrado</SelectItem>
                <SelectItem value="rounded">Arredondado</SelectItem>
                <SelectItem value="triangle">Triângulo</SelectItem>
                <SelectItem value="hexagon">Hexágono</SelectItem>
                <SelectItem value="banner">Banner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Upload de foto/vídeo</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {profile.avatar ? (
                <div className="relative">
                  {profile.avatar.startsWith('data:video/') ? (
                    <video 
                      src={profile.avatar} 
                      className="w-24 h-24 mx-auto rounded-lg object-cover"
                      muted
                      autoPlay
                      loop
                    />
                  ) : (
                    <img 
                      src={profile.avatar} 
                      alt="Avatar" 
                      className="w-24 h-24 mx-auto rounded-lg object-cover"
                    />
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                    onClick={removeAvatar}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Arraste uma imagem/vídeo ou clique para fazer upload
                  </p>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    id="avatar-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    Selecionar arquivo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de Exibição</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="verified">Verificado</Label>
            <Switch
              id="verified"
              checked={profile.isVerified}
              onCheckedChange={(checked) => setProfile(prev => ({ ...prev, isVerified: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showProfile">Mostrar informações do perfil</Label>
            <Switch
              id="showProfile"
              checked={profile.showProfileInfo}
              onCheckedChange={(checked) => setProfile(prev => ({ ...prev, showProfileInfo: checked }))}
            />
          </div>

          <div>
            <Label>Posição das informações</Label>
            <Select 
              value={profile.profileInfoPosition} 
              onValueChange={(value: 'left' | 'center' | 'right') => 
                setProfile(prev => ({ ...prev, profileInfoPosition: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Esquerda</SelectItem>
                <SelectItem value="center">Centro</SelectItem>
                <SelectItem value="right">Direita</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cores do Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nameColor">Cor do nome</Label>
            <div className="flex gap-2">
              <Input
                id="nameColor"
                type="color"
                value={profile.nameColor}
                onChange={(e) => setProfile(prev => ({ ...prev, nameColor: e.target.value }))}
                className="w-12 h-10 p-1 border-2"
              />
              <Input
                value={profile.nameColor}
                onChange={(e) => setProfile(prev => ({ ...prev, nameColor: e.target.value }))}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="usernameColor">Cor do username</Label>
            <div className="flex gap-2">
              <Input
                id="usernameColor"
                type="color"
                value={profile.usernameColor || '#888888'}
                onChange={(e) => setProfile(prev => ({ ...prev, usernameColor: e.target.value }))}
                className="w-12 h-10 p-1 border-2"
              />
              <Input
                value={profile.usernameColor || '#888888'}
                onChange={(e) => setProfile(prev => ({ ...prev, usernameColor: e.target.value }))}
                placeholder="#888888"
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bioColor">Cor da bio</Label>
            <div className="flex gap-2">
              <Input
                id="bioColor"
                type="color"
                value={profile.bioColor}
                onChange={(e) => setProfile(prev => ({ ...prev, bioColor: e.target.value }))}
                className="w-12 h-10 p-1 border-2"
              />
              <Input
                value={profile.bioColor}
                onChange={(e) => setProfile(prev => ({ ...prev, bioColor: e.target.value }))}
                placeholder="#666666"
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="buttonColor">Cor dos botões</Label>
            <div className="flex gap-2">
              <Input
                id="buttonColor"
                type="color"
                value={profile.buttonColor}
                onChange={(e) => setProfile(prev => ({ ...prev, buttonColor: e.target.value }))}
                className="w-12 h-10 p-1 border-2"
              />
              <Input
                value={profile.buttonColor}
                onChange={(e) => setProfile(prev => ({ ...prev, buttonColor: e.target.value }))}
                placeholder="#6A0DAD"
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
