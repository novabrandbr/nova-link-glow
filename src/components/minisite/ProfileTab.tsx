import React, { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Instagram,
  Facebook,
  X,
  Youtube,
  Send,
  Mail,
  Upload,
} from 'lucide-react';
import { UserProfile } from '@/pages/Dashboard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import MediaAdjuster from './MediaAdjuster';

interface ProfileTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ profile, setProfile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const backgroundImageRef = useRef<HTMLInputElement>(null);
  const effectUploadRef = useRef<HTMLInputElement>(null);
  
  const [avatarAdjustment, setAvatarAdjustment] = useState<{ x: number; y: number; scale: number }>({
    x: 0,
    y: 0,
    scale: 1
  });

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (platform: keyof UserProfile['socialIcons'], value: string) => {
    setProfile(prev => ({
      ...prev,
      socialIcons: {
        ...prev.socialIcons,
        [platform]: value
      }
    }));
  };

  const handleAvatarAdjustmentChange = (adjustment: { x: number; y: number; scale: number }) => {
    setAvatarAdjustment(adjustment);
    // Sync adjustment with profile for real-time preview
    setProfile(prev => ({
      ...prev,
      avatarAdjustment: adjustment
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleChange('avatar', result);
        handleChange('avatarType', 'image');
        // Reset adjustment when new media is uploaded
        const resetAdjustment = { x: 0, y: 0, scale: 1 };
        setAvatarAdjustment(resetAdjustment);
        handleChange('avatarAdjustment', resetAdjustment);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleChange('avatar', result);
        handleChange('avatarType', 'video');
        // Reset adjustment when new media is uploaded
        const resetAdjustment = { x: 0, y: 0, scale: 1 };
        setAvatarAdjustment(resetAdjustment);
        handleChange('avatarAdjustment', resetAdjustment);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleChange('backgroundImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEffectUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleChange('visualEffectCustomImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const backgroundOptions = [
    { value: 'none', label: 'Nenhum' },
    { value: 'gradient', label: 'Gradiente' },
    { value: 'image', label: 'Imagem' },
  ];

  const visualEffects = [
    { value: 'none', label: 'Nenhum' },
    { value: 'blur', label: 'Desfoque' },
    { value: 'vignette', label: 'Vinheta' },
    { value: 'noise', label: 'Ruído' },
    { value: 'custom-image', label: 'Imagem Personalizada' },
  ];

  const avatarShapes = [
    { value: 'circle', label: 'Círculo', icon: '⚪' },
    { value: 'square', label: 'Quadrado', icon: '⬜' },
    { value: 'rounded', label: 'Arredondado', icon: '🔲' },
    { value: 'triangle', label: 'Triângulo', icon: '🔺' },
    { value: 'hexagon', label: 'Hexágono', icon: '⬡' },
    { value: 'banner', label: 'Banner', icon: 'BANNER' },
  ];

  const profilePositions = [
    { value: 'top-left', label: 'Superior Esquerda' },
    { value: 'top-center', label: 'Superior Centro' },
    { value: 'top-right', label: 'Superior Direita' },
    { value: 'middle-left', label: 'Meio Esquerda' },
    { value: 'middle-center', label: 'Meio Centro' },
    { value: 'middle-right', label: 'Meio Direita' },
    { value: 'bottom-left', label: 'Inferior Esquerda' },
    { value: 'bottom-center', label: 'Inferior Centro' },
    { value: 'bottom-right', label: 'Inferior Direita' },
  ];

  const fontOptions = [
    { value: "montserrat", label: "Montserrat" },
    { value: "bebas-neue", label: "Bebas Neue" },
    { value: "helvetica-neue", label: "Helvetica Neue" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informações do Perfil</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Seu nome"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Sua bio"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Formato da Foto de Perfil</h3>
        
        <div>
          <Label>Formato</Label>
          <Select value={profile.avatarShape} onValueChange={(value) => handleChange('avatarShape', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o formato" />
            </SelectTrigger>
            <SelectContent>
              {avatarShapes.map((shape) => (
                <SelectItem key={shape.value} value={shape.value}>
                  <div className="flex items-center gap-2">
                    <span>{shape.icon}</span>
                    <span>{shape.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Carregar Imagem
            </Button>
            <Button 
              onClick={() => videoInputRef.current?.click()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Carregar Vídeo
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />

          {profile.avatar && (
            <MediaAdjuster
              mediaUrl={profile.avatar}
              isVideo={profile.avatarType === 'video'}
              avatarShape={profile.avatarShape}
              onAdjustmentChange={handleAvatarAdjustmentChange}
              initialAdjustment={avatarAdjustment}
            />
          )}
        </div>
      </div>

      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Redes Sociais</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3">
            <Instagram className="h-5 w-5 text-pink-500" />
            <Input
              placeholder="@seuusuario"
              value={profile.socialIcons.instagram}
              onChange={(e) => handleSocialChange('instagram', e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Facebook className="h-5 w-5 text-blue-600" />
            <Input
              placeholder="@seuusuario"
              value={profile.socialIcons.facebook}
              onChange={(e) => handleSocialChange('facebook', e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <X className="h-5 w-5 text-black" />
            <Input
              placeholder="@seuusuario"
              value={profile.socialIcons.twitter}
              onChange={(e) => handleSocialChange('twitter', e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Youtube className="h-5 w-5 text-red-600" />
            <Input
              placeholder="@seuusuario"
              value={profile.socialIcons.youtube}
              onChange={(e) => handleSocialChange('youtube', e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Send className="h-5 w-5 text-blue-500" />
            <Input
              placeholder="@seuusuario"
              value={profile.socialIcons.telegram}
              onChange={(e) => handleSocialChange('telegram', e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-600" />
            <Input
              placeholder="seu@email.com"
              value={profile.socialIcons.email}
              onChange={(e) => handleSocialChange('email', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Fundo da Página</h3>
        
        <div>
          <Label>Tipo de Fundo</Label>
          <Select value={profile.backgroundType} onValueChange={(value) => handleChange('backgroundType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de fundo" />
            </SelectTrigger>
            <SelectContent>
              {backgroundOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {profile.backgroundType === 'gradient' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Cor A</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={profile.gradientColorA}
                    onChange={(e) => handleChange('gradientColorA', e.target.value)}
                    className="w-12 h-10 rounded border cursor-pointer"
                  />
                  <Input
                    value={profile.gradientColorA}
                    onChange={(e) => handleChange('gradientColorA', e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              </div>
              
              <div>
                <Label>Cor B</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={profile.gradientColorB}
                    onChange={(e) => handleChange('gradientColorB', e.target.value)}
                    className="w-12 h-10 rounded border cursor-pointer"
                  />
                  <Input
                    value={profile.gradientColorB}
                    onChange={(e) => handleChange('gradientColorB', e.target.value)}
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label>Opacidade: {profile.gradientOpacity}%</Label>
              <Slider
                value={[profile.gradientOpacity]}
                onValueChange={(value) => handleChange('gradientOpacity', value[0])}
                min={0}
                max={100}
                step={1}
                className="w-full mt-2"
              />
            </div>
          </div>
        )}

        {profile.backgroundType === 'image' && (
          <div>
            <Button 
              onClick={() => backgroundImageRef.current?.click()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Carregar Imagem de Fundo
            </Button>
            <input
              ref={backgroundImageRef}
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
