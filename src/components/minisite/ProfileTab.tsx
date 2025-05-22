import React from 'react';
import { UserProfile } from '@/pages/Dashboard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Upload, Instagram, Facebook, Twitter, Youtube, Linkedin, Github, Music, MessageSquare } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type ProfileTabProps = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const ProfileTab: React.FC<ProfileTabProps> = ({ profile, setProfile }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);

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
    { value: 'bubbles', label: 'Bolhas' },
    { value: 'glitch', label: 'Efeito Glitch' },
    { value: 'lightleak', label: 'Light Leak Profissional' },
    { value: 'vintage', label: 'Efeito Vintage' },
    { value: 'spark', label: 'Efeito Spark' },
    { value: 'particles', label: 'Partículas' },
    { value: 'snow', label: 'Neve' },
    { value: 'confetti', label: 'Confete' },
    { value: 'matrix', label: 'Efeito Matrix' }
  ];

  const fontOptions = [
    { value: 'montserrat', label: 'Montserrat' },
    { value: 'bebas-neue', label: 'Bebas Neue' },
    { value: 'helvetica-neue', label: 'Helvetica Neue' },
    { value: 'poppins', label: 'Poppins' },
    { value: 'burbank', label: 'Burbank' },
    { value: 'pixelated', label: 'Pixelated (Arcade)' },
    { value: 'handwritten', label: 'Handwritten' }
  ];

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 2MB.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        handleChange('avatar', event.target.result.toString());
        toast({
          title: "Avatar atualizado",
          description: "Sua foto de perfil foi atualizada com sucesso."
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 10MB.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        handleChange('backgroundVideo', event.target.result.toString());
        toast({
          title: "Vídeo de fundo adicionado",
          description: "O vídeo de fundo foi atualizado com sucesso."
        });
      }
    };
    reader.readAsDataURL(file);
  };

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
          <Button 
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Carregar foto
          </Button>
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleAvatarUpload}
          />
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
            <div className="flex items-center space-x-2 mt-1">
              <Label htmlFor="nameColor">Cor do nome:</Label>
              <input 
                type="color"
                id="nameColor"
                value={profile.nameColor || "#000000"}
                onChange={(e) => handleChange('nameColor', e.target.value)}
                className="w-8 h-8 rounded p-0"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">novabrand.site/</span>
              <Input 
                id="username"
                value={profile.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="seu-username"
                className="flex-1"
              />
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm text-gray-400">A URL do seu perfil será: novabrand.site/{profile.username}</span>
              <div className="flex items-center">
                <Switch 
                  id="premium"
                  checked={profile.isPremium}
                  onCheckedChange={(checked) => handleChange('isPremium', checked)}
                  className="mr-2"
                />
                <Label htmlFor="premium" className="text-sm">Remover marca (Premium)</Label>
              </div>
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
            <div className="flex items-center space-x-2 mt-1">
              <Label htmlFor="bioColor">Cor da descrição:</Label>
              <input 
                type="color"
                id="bioColor"
                value={profile.bioColor || "#666666"}
                onChange={(e) => handleChange('bioColor', e.target.value)}
                className="w-8 h-8 rounded p-0"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Redes sociais</Label>
            <div className="flex items-center space-x-2">
              <Label htmlFor="socialColor">Cor dos ícones:</Label>
              <input 
                type="color"
                id="socialColor"
                value={profile.socialIconsColor || "#6A0DAD"}
                onChange={(e) => handleChange('socialIconsColor', e.target.value)}
                className="w-8 h-8 rounded p-0"
              />
            </div>
          </div>
          
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
            <div className="flex items-center space-x-2">
              <Music className="h-5 w-5 text-black" />
              <Input 
                value={profile.socialIcons.tiktok || ''}
                onChange={(e) => handleSocialChange('tiktok', e.target.value)}
                placeholder="@seutiktok"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Linkedin className="h-5 w-5 text-blue-700" />
              <Input 
                value={profile.socialIcons.linkedin || ''}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                placeholder="@seulinkedin"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Github className="h-5 w-5" />
              <Input 
                value={profile.socialIcons.github || ''}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                placeholder="@seugithub"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Music className="h-5 w-5 text-green-500" />
              <Input 
                value={profile.socialIcons.spotify || ''}
                onChange={(e) => handleSocialChange('spotify', e.target.value)}
                placeholder="@seuspotify"
              />
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <Input 
                value={profile.socialIcons.whatsapp || ''}
                onChange={(e) => handleSocialChange('whatsapp', e.target.value)}
                placeholder="+5511999999999"
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
            <div className="space-y-4">
              <Label>Vídeo de fundo</Label>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full h-20 border-dashed"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Fazer upload de vídeo
                </Button>
                <Input
                  type="file"
                  ref={videoInputRef}
                  className="hidden"
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
                <p className="text-xs text-gray-500">Ou insira um link do YouTube:</p>
                <Input 
                  placeholder="https://youtube.com/watch?v=..."
                  value={profile.backgroundVideo || ''}
                  onChange={(e) => handleChange('backgroundVideo', e.target.value)}
                />
              </div>
              
              {profile.backgroundVideo && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="videoVolume">Volume: {Math.round((profile.backgroundVideoVolume || 0) * 100)}%</Label>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="videoMuted"
                        checked={profile.backgroundVideoMuted || false}
                        onCheckedChange={(checked) => handleChange('backgroundVideoMuted', checked)}
                      />
                      <Label htmlFor="videoMuted">Silenciar</Label>
                    </div>
                  </div>
                  <Input 
                    type="range"
                    id="videoVolume"
                    min="0"
                    max="1"
                    step="0.01"
                    disabled={profile.backgroundVideoMuted}
                    value={profile.backgroundVideoVolume || 0.5}
                    onChange={(e) => handleChange('backgroundVideoVolume', parseFloat(e.target.value))}
                  />
                </div>
              )}
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
          
          <div className="grid grid-cols-3 gap-3">
            {visualEffects.filter(e => e.value !== 'none').map(effect => (
              <div 
                key={effect.value}
                className={`border rounded-lg p-3 cursor-pointer ${profile.visualEffect === effect.value ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                onClick={() => handleChange('visualEffect', effect.value)}
              >
                <div className="aspect-video bg-gray-100 mb-2 rounded-sm flex items-center justify-center text-sm text-gray-500">
                  {effect.label}
                </div>
                <p className="text-xs text-center">{effect.label}</p>
              </div>
            ))}
          </div>
          
          {profile.visualEffect !== 'none' && (
            <div className="space-y-4 pl-2 border-l-2 border-purple-200 mt-4">
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
