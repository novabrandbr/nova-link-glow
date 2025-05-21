
import React from 'react';
import { UserProfile } from '@/pages/Dashboard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Upload, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

type ProfileTabProps = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const ProfileTab: React.FC<ProfileTabProps> = ({ profile, setProfile }) => {
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

  const backgroundOptions = [
    { value: 'solid', label: 'Cor sólida' },
    { value: 'gradient', label: 'Degradê personalizado' },
    { value: 'image', label: 'Imagem' },
    { value: 'video', label: 'Vídeo' }
  ];

  const visualEffects = [
    { value: 'none', label: 'Nenhum' },
    { value: 'bubbles', label: 'Bubbles' },
    { value: 'glitch', label: 'Glitch Effect' },
    { value: 'lightleak', label: 'Light Leak' },
    { value: 'vintage', label: 'Vintage Effect' },
    { value: 'spark', label: 'Spark Effect' }
  ];

  const fontOptions = [
    { value: 'montserrat', label: 'Montserrat' },
    { value: 'bebas-neue', label: 'Bebas Neue' },
    { value: 'helvetica-neue', label: 'Helvetica Neue' },
    { value: 'poppins', label: 'Poppins' },
    { value: 'burbank', label: 'Burbank' }
  ];

  return (
    <div className="space-y-8">
      {/* Perfil */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Perfil</h3>
        
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Carregar foto
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="name">Nome de exibição</Label>
              <div className="flex items-center">
                <Switch 
                  id="verified"
                  checked={profile.isVerified}
                  onCheckedChange={(checked) => handleChange('isVerified', checked)}
                  className="mr-2"
                />
                <Label htmlFor="verified" className="flex items-center cursor-pointer">
                  <Check className="h-4 w-4 text-blue-500 mr-1" /> Verificado
                </Label>
              </div>
            </div>
            <Input 
              id="name"
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Seu nome"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">nova-brand.site/</span>
              <Input 
                id="username"
                value={profile.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="seu-username"
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="bio">Descrição</Label>
              <span className="text-sm text-gray-500">{profile.bio.length}/60</span>
            </div>
            <Input 
              id="bio"
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value.substring(0, 60))}
              placeholder="Uma breve descrição sobre você"
              maxLength={60}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Redes sociais</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Instagram className="h-5 w-5 text-pink-600" />
              <Input 
                value={profile.socialIcons.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                placeholder="@seuinstagram"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Facebook className="h-5 w-5 text-blue-600" />
              <Input 
                value={profile.socialIcons.facebook || ''}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                placeholder="@seufacebook"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Twitter className="h-5 w-5 text-blue-400" />
              <Input 
                value={profile.socialIcons.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="@seutwitter"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Youtube className="h-5 w-5 text-red-600" />
              <Input 
                value={profile.socialIcons.youtube || ''}
                onChange={(e) => handleSocialChange('youtube', e.target.value)}
                placeholder="@seuyoutube"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="font">Fonte</Label>
          <Select 
            value={profile.font}
            onValueChange={(value) => handleChange('font', value)}
          >
            <SelectTrigger id="font">
              <SelectValue placeholder="Selecione uma fonte" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map(font => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Background */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Background</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backgroundType">Tipo de fundo</Label>
            <Select 
              value={profile.backgroundType}
              onValueChange={(value) => handleChange('backgroundType', value)}
            >
              <SelectTrigger id="backgroundType">
                <SelectValue placeholder="Selecione o tipo de fundo" />
              </SelectTrigger>
              <SelectContent>
                {backgroundOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {profile.backgroundType === 'solid' && (
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Cor de fundo</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  type="color"
                  id="backgroundColor"
                  value={profile.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input 
                  value={profile.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          )}
          
          {profile.backgroundType === 'gradient' && (
            <div className="space-y-2">
              <Label>Degradê</Label>
              <p className="text-sm text-gray-500">Configurações de degradê seriam aqui</p>
            </div>
          )}
          
          {profile.backgroundType === 'image' && (
            <div className="space-y-2">
              <Label>Imagem de fundo</Label>
              <Button variant="outline" className="w-full h-32 border-dashed">
                <Upload className="mr-2 h-4 w-4" />
                Fazer upload de imagem
              </Button>
            </div>
          )}
          
          {profile.backgroundType === 'video' && (
            <div className="space-y-2">
              <Label>Vídeo de fundo</Label>
              <div className="space-y-2">
                <Button variant="outline" className="w-full h-20 border-dashed">
                  <Upload className="mr-2 h-4 w-4" />
                  Fazer upload de vídeo
                </Button>
                <p className="text-xs text-gray-500">Ou insira um link do YouTube:</p>
                <Input placeholder="https://youtube.com/watch?v=..." />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="overlay"
                checked={profile.overlay}
                onCheckedChange={(checked) => handleChange('overlay', checked)}
              />
              <Label htmlFor="overlay">Overlay (camada sobre o fundo)</Label>
            </div>
            
            {profile.overlay && (
              <div className="space-y-4 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="overlayColor">Cor do overlay</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="color"
                      id="overlayColor"
                      value={profile.overlayColor}
                      onChange={(e) => handleChange('overlayColor', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input 
                      value={profile.overlayColor}
                      onChange={(e) => handleChange('overlayColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="overlayOpacity">Opacidade: {Math.round(profile.overlayOpacity * 100)}%</Label>
                  <Input 
                    type="range"
                    id="overlayOpacity"
                    min="0"
                    max="1"
                    step="0.01"
                    value={profile.overlayOpacity}
                    onChange={(e) => handleChange('overlayOpacity', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Efeitos Visuais */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Efeitos Visuais</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visualEffect">Tipo de efeito</Label>
            <Select 
              value={profile.visualEffect}
              onValueChange={(value) => handleChange('visualEffect', value)}
            >
              <SelectTrigger id="visualEffect">
                <SelectValue placeholder="Selecione um efeito" />
              </SelectTrigger>
              <SelectContent>
                {visualEffects.map(effect => (
                  <SelectItem key={effect.value} value={effect.value}>
                    {effect.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {profile.visualEffect !== 'none' && (
            <div className="space-y-4 pl-6">
              <div className="space-y-2">
                <Label htmlFor="visualEffectColor">Cor do efeito</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="color"
                    id="visualEffectColor"
                    value={profile.visualEffectColor}
                    onChange={(e) => handleChange('visualEffectColor', e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input 
                    value={profile.visualEffectColor}
                    onChange={(e) => handleChange('visualEffectColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="visualEffectOpacity">Opacidade: {Math.round(profile.visualEffectOpacity * 100)}%</Label>
                <Input 
                  type="range"
                  id="visualEffectOpacity"
                  min="0"
                  max="1"
                  step="0.01"
                  value={profile.visualEffectOpacity}
                  onChange={(e) => handleChange('visualEffectOpacity', parseFloat(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="visualEffectSpeed">Velocidade: {profile.visualEffectSpeed}x</Label>
                <Input 
                  type="range"
                  id="visualEffectSpeed"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={profile.visualEffectSpeed}
                  onChange={(e) => handleChange('visualEffectSpeed', parseFloat(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="visualEffectSize">Tamanho: {profile.visualEffectSize}x</Label>
                <Input 
                  type="range"
                  id="visualEffectSize"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={profile.visualEffectSize}
                  onChange={(e) => handleChange('visualEffectSize', parseFloat(e.target.value))}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
