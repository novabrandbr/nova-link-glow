import React, { useRef } from 'react';
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
  Twitter, 
  Youtube, 
  Music, 
  Linkedin, 
  Github, 
  MessageSquare, 
  X 
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type ProfileTabProps = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const ProfileTab: React.FC<ProfileTabProps> = ({ profile, setProfile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const backgroundImageRef = useRef<HTMLInputElement>(null);
  const effectUploadRef = useRef<HTMLInputElement>(null);

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
    { value: 'bubbles', label: 'Bolha de Sabão' },
    { value: 'glitch', label: 'Glitch' },
    { value: 'lightleak', label: 'Light Leak Profissional' },
    { value: 'vignette', label: 'Vignette' },
    { value: 'spark', label: 'Spark (Brilhos)' },
    { value: 'fire', label: 'Fogo' },
    { value: 'ocean', label: 'Ondas do Mar' },
    { value: 'aurora', label: 'Aurora Boreal' },
    { value: 'nightsky', label: 'Céu Noturno com Lua e Estrelas' },
    { value: 'rainlightning', label: 'Chuva com Relâmpagos' },
    { value: 'galaxy', label: 'Galáxia / Espaço Sideral' },
    { value: 'prism', label: 'Prisma Holográfico' },
    { value: 'binary', label: 'Códigos Binários (Matrix)' },
    { value: 'vhs', label: 'VHS com Linhas de Ruído' },
    { value: 'fairydust', label: 'Pó de Fada / Brilho Flutuante' },
    { value: 'texture3d', label: 'Textura 3D' },
    { value: 'kaleidoscope', label: 'Kaleidoscópico' },
    { value: 'emojirain', label: 'Chuva de Emojis' },
    { value: 'photomosaic', label: 'Mosaico de Fotos' },
    { value: 'shootingstars', label: 'Estrelas Cadentes' },
    { value: 'smoke', label: 'Fumaça' },
    { value: 'fireworks', label: 'Fogos de Artifício' },
    { value: 'custom', label: 'Upload Personalizado' }
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

  return (
    <div className="space-y-8">
      {/* Perfil */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Perfil</h3>
        
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
        
        <div className="flex items-center space-x-4">
          <Avatar className={`h-24 w-24 ${
            profile.avatarShape === 'square' ? 'rounded-none' : 
            profile.avatarShape === 'rounded' ? 'rounded-lg' : 
            profile.avatarShape === 'triangle' ? 'clip-path-triangle' :
            profile.avatarShape === 'hexagon' ? 'clip-path-hexagon' :
            profile.avatarShape === 'banner' ? 'w-full h-16 rounded-none' :
            'rounded-full'
          }`}>
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
            <div className="flex items-center space-x-2 mt-2">
              <Label htmlFor="usernameColor">Cor do link:</Label>
              <input 
                type="color"
                id="usernameColor"
                value={profile.usernameColor || "#666666"}
                onChange={(e) => handleChange('usernameColor', e.target.value)}
                className="w-8 h-8 rounded p-0"
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
      </div>
      
      {/* Background */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Background</h3>
        
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
                <div className="space-y-2">
                  <Label htmlFor="gradientColor2">Segunda cor</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="color"
                      id="gradientColor2"
                      value={profile.backgroundGradient || "#6A0DAD"}
                      onChange={(e) => handleChange('backgroundGradient', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input 
                      value={profile.backgroundGradient || "#6A0DAD"}
                      onChange={(e) => handleChange('backgroundGradient', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gradientOpacity">Opacidade do degradê: {Math.round((profile.overlayOpacity || 1) * 100)}%</Label>
                <Input 
                  type="range"
                  id="gradientOpacity"
                  min="0"
                  max="1"
                  step="0.01"
                  value={profile.overlayOpacity || 1}
                  onChange={(e) => handleChange('overlayOpacity', parseFloat(e.target.value))}
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
          
          {/* Grid com 3 linhas iniciais visíveis - 9 efeitos por vez */}
          <div className="grid grid-cols-3 gap-3 h-80 overflow-y-auto border rounded-lg p-3">
            {visualEffects.filter(e => e.value !== 'custom').map(effect => (
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
                  {effect.value === 'none' && '✕'}
                  {effect.value === 'bubbles' && '○○○'}
                  {effect.value === 'glitch' && '▓▒░'}
                  {effect.value === 'lightleak' && '☀️'}
                  {effect.value === 'vignette' && '◐'}
                  {effect.value === 'spark' && '✨'}
                  {effect.value === 'fire' && '🔥'}
                  {effect.value === 'ocean' && '🌊'}
                  {effect.value === 'aurora' && '💫'}
                  {effect.value === 'nightsky' && '🌙'}
                  {effect.value === 'rainlightning' && '⚡'}
                  {effect.value === 'galaxy' && '🌌'}
                  {effect.value === 'prism' && '🔮'}
                  {effect.value === 'binary' && '1010'}
                  {effect.value === 'vhs' && '📼'}
                  {effect.value === 'fairydust' && '⭐'}
                  {effect.value === 'texture3d' && '🔳'}
                  {effect.value === 'kaleidoscope' && '🎨'}
                  {effect.value === 'emojirain' && '😊'}
                  {effect.value === 'photomosaic' && '🖼️'}
                  {effect.value === 'shootingstars' && '☄️'}
                  {effect.value === 'smoke' && '💨'}
                  {effect.value === 'fireworks' && '🎆'}
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
  );
};

export default ProfileTab;
