import React, { useRef, useState } from 'react';
import { UserProfile } from '@/pages/Dashboard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Check, 
  Upload, 
  Instagram, 
  Facebook, 
  Youtube, 
  Music, 
  Linkedin, 
  Github, 
  MessageSquare, 
  X,
  Mail,
  Send
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import MediaAdjuster from '@/components/ui/MediaAdjuster';

type ProfileTabProps = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const ProfileTab: React.FC<ProfileTabProps> = ({ profile, setProfile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const backgroundImageRef = useRef<HTMLInputElement>(null);
  const effectUploadRef = useRef<HTMLInputElement>(null);
  
  const [showMediaAdjuster, setShowMediaAdjuster] = useState(false);
  const [mediaAdjustment, setMediaAdjustment] = useState({ x: 0, y: 0, scale: 1 });

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
    { value: 'none', label: 'Nenhum', icon: '✕' },
    { value: 'bubbles', label: 'Bolha de Sabão', icon: '○○○' },
    { value: 'glitch', label: 'Glitch', icon: '▓▒░' },
    { value: 'lightleak', label: 'Light Leak Profissional', icon: '☀️' },
    { value: 'vignette', label: 'Vignette', icon: '◐' },
    { value: 'fire', label: 'Fogo', icon: '🔥' },
    { value: 'ocean', label: 'Ondas do Mar', icon: '🌊' },
    { value: 'aurora', label: 'Aurora Boreal', icon: '💫' },
    { value: 'nightsky', label: 'Céu Noturno com Lua e Estrelas', icon: '🌙' },
    { value: 'rainlightning', label: 'Chuva com Relâmpagos', icon: '⚡' },
    { value: 'galaxy', label: 'Galáxia / Espaço Sideral', icon: '🌌' },
    { value: 'prism', label: 'Prisma Holográfico', icon: '🔮' },
    { value: 'binary', label: 'Códigos Binários (Matrix)', icon: '1010' },
    { value: 'vhs', label: 'VHS com Linhas de Ruído', icon: '📼' },
    { value: 'fairydust', label: 'Pó de Fada / Brilho Flutuante', icon: '⭐' },
    { value: 'texture3d', label: 'Textura 3D', icon: '🔳' },
    { value: 'kaleidoscope', label: 'Kaleidoscópico', icon: '🎨' },
    { value: 'emojirain', label: 'Chuva de Emojis', icon: '😊' },
    { value: 'photomosaic', label: 'Mosaico de Fotos', icon: '🖼️' },
    { value: 'shootingstars', label: 'Estrelas Cadentes', icon: '☄️' },
    { value: 'smoke', label: 'Fumaça', icon: '💨' },
    { value: 'fireworks', label: 'Fogos de Artifício', icon: '🎆' },
    { value: 'custom', label: 'Upload Personalizado', icon: '📤' }
  ];

  const avatarShapes = [
    { value: 'circle', label: 'Círculo' },
    { value: 'square', label: 'Quadrado' },
    { value: 'rounded', label: 'Arredondado' },
    { value: 'triangle', label: 'Triângulo' }, 
    { value: 'hexagon', label: 'Hexágono' },
    { value: 'banner', label: 'Banner' }
  ];

  const profilePositions = [
    { value: 'left', label: 'Esquerda' },
    { value: 'center', label: 'Centro' },
    { value: 'right', label: 'Direita' }
  ];

  const fontOptions = [
    { value: 'montserrat', label: 'Montserrat' },
    { value: 'bebas-neue', label: 'Bebas Neue' },
    { value: 'helvetica-neue', label: 'Helvetica Neue' },
    { value: 'poppins', label: 'Poppins' },
    { value: 'burbank', label: 'Burbank' },
    { value: 'pixelated', label: 'Pixelated (Arcade)' },
    { value: 'handwritten', label: 'Handwritten' },
    { value: 'roboto', label: 'Roboto' },
    { value: 'open-sans', label: 'Open Sans' },
    { value: 'lato', label: 'Lato' },
    { value: 'playfair', label: 'Playfair Display' },
    { value: 'merriweather', label: 'Merriweather' },
    { value: 'courier-new', label: 'Courier New' },
    { value: 'georgia', label: 'Georgia' },
    { value: 'verdana', label: 'Verdana' },
    { value: 'impact', label: 'Impact' },
    { value: 'times-new-roman', label: 'Times New Roman' },
    { value: 'arial', label: 'Arial' },
    { value: 'comic-sans', label: 'Comic Sans MS' },
    { value: 'tahoma', label: 'Tahoma' },
    { value: 'trebuchet', label: 'Trebuchet MS' },
    { value: 'nunito', label: 'Nunito' },
    { value: 'raleway', label: 'Raleway' },
    { value: 'oswald', label: 'Oswald' },
    { value: 'pacifico', label: 'Pacifico' },
    { value: 'dancing-script', label: 'Dancing Script' },
    { value: 'quicksand', label: 'Quicksand' }
  ];

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const maxSize = isVideo ? 10 * 1024 * 1024 : 2 * 1024 * 1024;

    if (file.size > maxSize) {
      toast({
        title: "Arquivo muito grande",
        description: `O tamanho máximo permitido é ${isVideo ? '10MB' : '2MB'}.`,
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        handleChange('avatar', event.target.result.toString());
        setShowMediaAdjuster(true);
        toast({
          title: `${isVideo ? 'Vídeo' : 'Avatar'} atualizado`,
          description: `Sua foto de perfil foi atualizada com sucesso.`
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMediaAdjustmentChange = (adjustment: { x: number; y: number; scale: number }) => {
    setMediaAdjustment(adjustment);
    // Apply adjustment to avatar
    handleChange('avatarAdjustment', adjustment);
  };

  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        handleChange('backgroundImage', event.target.result.toString());
        toast({
          title: "Imagem de fundo atualizada",
          description: "A imagem de fundo foi atualizada com sucesso."
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

  const handleEffectUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        handleChange('visualEffectCustomUrl', event.target.result.toString());
        handleChange('visualEffect', 'custom');
        toast({
          title: "Efeito personalizado adicionado",
          description: "O efeito visual foi atualizado com sucesso."
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleVideoReplace = () => {
    videoInputRef.current?.click();
  };

  const renderAvatarPreview = () => {
    const baseClasses = "h-24 w-24";
    let shapeClasses = "";
    
    switch (profile.avatarShape) {
      case 'square':
        shapeClasses = "rounded-none";
        break;
      case 'rounded':
        shapeClasses = "rounded-lg";
        break;
      case 'triangle':
        shapeClasses = "clip-path-triangle";
        break;
      case 'hexagon':
        shapeClasses = "clip-path-hexagon";
        break;
      case 'banner':
        shapeClasses = "w-full h-16 rounded-none";
        break;
      default:
        shapeClasses = "rounded-full";
    }

    const isVideo = profile.avatar?.startsWith('data:video/') || profile.avatar?.endsWith('.mp4') || profile.avatar?.endsWith('.webm') || profile.avatar?.endsWith('.mov');

    if (isVideo && profile.avatar) {
      return (
        <video 
          className={`${baseClasses} ${shapeClasses} object-cover`}
          src={profile.avatar}
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }

    return (
      <Avatar className={`${baseClasses} ${shapeClasses}`}>
        <AvatarImage src={profile.avatar} />
        <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    );
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col items-start">
      <h3 className="text-xl font-semibold">{children}</h3>
      <div className="h-0.5 bg-[#6B46C1] mt-1" style={{ width: 'fit-content', minWidth: '100px' }}></div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Perfil */}
      <div className="space-y-6">
        <SectionTitle>Perfil</SectionTitle>
        
        <div className="space-y-4 p-4 border rounded-lg bg-white">
          <div className="flex items-center justify-between">
            <Label htmlFor="showProfileInfo">Mostrar informações do perfil</Label>
            <Switch 
              id="showProfileInfo"
              checked={profile.showProfileInfo}
              onCheckedChange={(checked) => handleChange('showProfileInfo', checked)}
            />
          </div>
          
          {profile.showProfileInfo && (
            <>
              <div className="space-y-2">
                <Label htmlFor="profilePosition">Posição das informações</Label>
                <Select 
                  value={profile.profileInfoPosition}
                  onValueChange={(value: 'left' | 'center' | 'right') => handleChange('profileInfoPosition', value)}
                >
                  <SelectTrigger id="profilePosition">
                    <SelectValue placeholder="Posição das informações" />
                  </SelectTrigger>
                  <SelectContent>
                    {profilePositions.map(position => (
                      <SelectItem key={position.value} value={position.value}>
                        {position.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            
              <div className="space-y-2">
                <Label htmlFor="avatarShape">Formato da foto de perfil</Label>
                <Select 
                  value={profile.avatarShape}
                  onValueChange={(value: 'circle' | 'square' | 'rounded' | 'triangle' | 'hexagon' | 'banner') => handleChange('avatarShape', value)}
                >
                  <SelectTrigger id="avatarShape">
                    <SelectValue placeholder="Escolha o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    {avatarShapes.map(shape => (
                      <SelectItem key={shape.value} value={shape.value}>
                        {shape.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
        
        {/* Upload de avatar */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            {renderAvatarPreview()}
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
            <div className="flex flex-col items-center space-y-3">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                Arraste uma imagem/vídeo ou clique para fazer upload
              </p>
              <Button 
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2"
              >
                {profile.avatar ? 'Substituir arquivo' : 'Selecionar arquivo'}
              </Button>
            </div>
          </div>
          
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpg,image/jpeg,image/png,image/webp,video/mp4,video/webm,video/mov"
            onChange={handleAvatarUpload}
          />

          {/* Media Adjuster */}
          {showMediaAdjuster && profile.avatar && (
            <div className="mt-4">
              <Label className="text-sm font-medium mb-2 block">Ajustar mídia</Label>
              <MediaAdjuster
                src={profile.avatar}
                isVideo={profile.avatar.startsWith('data:video/')}
                onAdjustmentChange={handleMediaAdjustmentChange}
              />
            </div>
          )}
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
            <Label htmlFor="nameColor">Cor do nome</Label>
            <div className="flex items-center space-x-2">
              <input 
                type="color"
                id="nameColor"
                value={profile.nameColor || "#000000"}
                onChange={(e) => handleChange('nameColor', e.target.value)}
                className="w-12 h-10 rounded border"
              />
              <Input 
                value={profile.nameColor || "#000000"}
                onChange={(e) => handleChange('nameColor', e.target.value)}
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

          <div className="space-y-2">
            <Label htmlFor="bioColor">Cor da descrição</Label>
            <div className="flex items-center space-x-2">
              <input 
                type="color"
                id="bioColor"
                value={profile.bioColor || "#666666"}
                onChange={(e) => handleChange('bioColor', e.target.value)}
                className="w-12 h-10 rounded border"
              />
              <Input 
                value={profile.bioColor || "#666666"}
                onChange={(e) => handleChange('bioColor', e.target.value)}
                className="flex-1"
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
                onChange={(e) => handleChange('username', e.target.value.substring(0, 25))}
                placeholder="seu-username"
                className="flex-1"
                maxLength={25}
              />
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                A URL do seu perfil será: novabrand.site/{profile.username} ({profile.username.length}/25)
              </span>
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
            <Label htmlFor="usernameColor">Cor do link</Label>
            <div className="flex items-center space-x-2">
              <input 
                type="color"
                id="usernameColor"
                value={profile.usernameColor || "#666666"}
                onChange={(e) => handleChange('usernameColor', e.target.value)}
                className="w-12 h-10 rounded border"
              />
              <Input 
                value={profile.usernameColor || "#666666"}
                onChange={(e) => handleChange('usernameColor', e.target.value)}
                className="flex-1"
              />
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
        
        {/* Redes sociais */}
        <div className="space-y-6">
          <SectionTitle>Redes Sociais</SectionTitle>
          
          <div className="space-y-2">
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
              <X className="h-5 w-5 text-black" />
              <Input 
                value={profile.socialIcons.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="@seuX"
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
              <div className="h-5 w-5 rounded bg-black flex items-center justify-center text-white text-xs font-bold">
                TT
              </div>
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
              <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                <div className="h-2 w-2 bg-black rounded-full"></div>
              </div>
              <Input 
                value={profile.socialIcons.spotify || ''}
                onChange={(e) => handleSocialChange('spotify', e.target.value)}
                placeholder="@seuspotify"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 rounded bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                W
              </div>
              <Input 
                value={profile.socialIcons.whatsapp || ''}
                onChange={(e) => handleSocialChange('whatsapp', e.target.value)}
                placeholder="+5511999999999"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-blue-500" />
              <Input 
                value={profile.socialIcons.telegram || ''}
                onChange={(e) => handleSocialChange('telegram', e.target.value)}
                placeholder="@seutelegram"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-600" />
              <Input 
                value={profile.socialIcons.email || ''}
                onChange={(e) => handleSocialChange('email', e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Background */}
      <div className="space-y-6">
        <SectionTitle>Background</SectionTitle>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backgroundType">Tipo de fundo</Label>
            <Select 
              value={profile.backgroundType}
              onValueChange={(value: "solid" | "gradient" | "image" | "video") => handleChange('backgroundType', value)}
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
            <div className="space-y-4">
              <Label>Degradê Personalizado</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gradientColor1">Primeira cor</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="color"
                      id="gradientColor1"
                      value={profile.backgroundGradientColor1 || "#667eea"}
                      onChange={(e) => {
                        handleChange('backgroundGradientColor1', e.target.value);
                        // Update gradient immediately
                        const color2 = profile.backgroundGradientColor2 || "#764ba2";
                        handleChange('backgroundGradient', `linear-gradient(135deg, ${e.target.value} 0%, ${color2} 100%)`);
                      }}
                      className="w-16 h-10"
                    />
                    <Input 
                      value={profile.backgroundGradientColor1 || "#667eea"}
                      onChange={(e) => {
                        handleChange('backgroundGradientColor1', e.target.value);
                        const color2 = profile.backgroundGradientColor2 || "#764ba2";
                        handleChange('backgroundGradient', `linear-gradient(135deg, ${e.target.value} 0%, ${color2} 100%)`);
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradientColor2">Segunda cor</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="color"
                      id="gradientColor2"
                      value={profile.backgroundGradientColor2 || "#764ba2"}
                      onChange={(e) => {
                        handleChange('backgroundGradientColor2', e.target.value);
                        // Update gradient immediately
                        const color1 = profile.backgroundGradientColor1 || "#667eea";
                        handleChange('backgroundGradient', `linear-gradient(135deg, ${color1} 0%, ${e.target.value} 100%)`);
                      }}
                      className="w-16 h-10"
                    />
                    <Input 
                      value={profile.backgroundGradientColor2 || "#764ba2"}
                      onChange={(e) => {
                        handleChange('backgroundGradientColor2', e.target.value);
                        const color1 = profile.backgroundGradientColor1 || "#667eea";
                        handleChange('backgroundGradient', `linear-gradient(135deg, ${color1} 0%, ${e.target.value} 100%)`);
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gradientOpacity">Opacidade do degradê: {Math.round((profile.backgroundGradientOpacity || 1) * 100)}%</Label>
                <Input 
                  type="range"
                  id="gradientOpacity"
                  min="0"
                  max="1"
                  step="0.01"
                  value={profile.backgroundGradientOpacity || 1}
                  onChange={(e) => handleChange('backgroundGradientOpacity', parseFloat(e.target.value))}
                  className="block w-full"
                />
              </div>
            </div>
          )}
          
          {profile.backgroundType === 'image' && (
            <div className="space-y-2">
              <Label>Imagem de fundo</Label>
              {profile.backgroundImage ? (
                <div className="space-y-2">
                  <img 
                    src={profile.backgroundImage} 
                    alt="Background" 
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => backgroundImageRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Substituir imagem
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full h-32 border-dashed"
                  onClick={() => backgroundImageRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Fazer upload de imagem
                </Button>
              )}
              <Input
                type="file"
                ref={backgroundImageRef}
                className="hidden"
                accept="image/*"
                onChange={handleBackgroundImageUpload}
              />
            </div>
          )}
          
          {profile.backgroundType === 'video' && (
            <div className="space-y-4">
              <Label>Vídeo de fundo</Label>
              <div className="space-y-2">
                {profile.backgroundVideo ? (
                  <div className="space-y-2">
                    {profile.backgroundVideo.includes('youtube.com') || profile.backgroundVideo.includes('youtu.be') ? (
                      <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-gray-500">Vídeo do YouTube: {profile.backgroundVideo}</span>
                      </div>
                    ) : (
                      <video 
                        src={profile.backgroundVideo} 
                        className="w-full h-32 object-cover rounded-md"
                        autoPlay
                        muted={profile.backgroundVideoMuted}
                        loop
                        controls={false}
                      />
                    )}
                    <Button 
                      variant="outline" 
                      onClick={handleVideoReplace}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Substituir vídeo
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full h-20 border-dashed"
                    onClick={() => videoInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Fazer upload de vídeo
                  </Button>
                )}
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
                  value={profile.backgroundVideo?.includes('youtube.com') || profile.backgroundVideo?.includes('youtu.be') ? profile.backgroundVideo : ''}
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
                    className="block w-full"
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
                    className="block w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <SectionTitle>Efeitos Visuais</SectionTitle>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visualEffect">Efeitos disponíveis</Label>
            
            <div className="grid grid-cols-3 gap-3 min-h-[300px]">
              {visualEffects.map(effect => (
                <div 
                  key={effect.value}
                  className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                    profile.visualEffect === effect.value 
                      ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => handleChange('visualEffect', effect.value)}
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 mb-2 rounded-sm flex items-center justify-center text-xs text-gray-500 font-medium">
                    {effect.icon}
                  </div>
                  <p className="text-xs text-center font-medium">{effect.label}</p>
                </div>
              ))}
            </div>
            
            {profile.visualEffect !== 'none' && (
              <div className="space-y-4 pl-2 border-l-2 border-purple-200 mt-4">
                {profile.visualEffect === 'custom' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Efeito personalizado</Label>
                      {profile.visualEffectCustomUrl ? (
                        <div>
                          <div className="aspect-video bg-gray-100 mb-2 rounded-sm flex items-center justify-center">
                            {profile.visualEffectCustomUrl.startsWith('data:image') ? (
                              <img src={profile.visualEffectCustomUrl} className="max-h-full max-w-full" alt="Efeito personalizado" />
                            ) : (
                              <video src={profile.visualEffectCustomUrl} className="max-h-full max-w-full" autoPlay muted loop />
                            )}
                          </div>
                          <Button 
                            variant="outline"
                            onClick={() => effectUploadRef.current?.click()}
                            className="w-full"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Substituir efeito
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            className="w-full h-20 border-dashed"
                            onClick={() => effectUploadRef.current?.click()}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload de efeito personalizado
                          </Button>
                          <Input
                            type="file"
                            ref={effectUploadRef}
                            className="hidden"
                            accept="image/*,video/*"
                            onChange={handleEffectUpload}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
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
                    className="block w-full"
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
                    className="block w-full"
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
                    className="block w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
