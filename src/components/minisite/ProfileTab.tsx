
import React from "react";
import { UserProfile } from "@/pages/Dashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Image as ImageIcon, Upload } from "lucide-react";

type ProfileTabProps = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const ProfileTab = ({ profile, setProfile }: ProfileTabProps) => {
  const avatarShapeOptions = [
    { value: "circle", label: "Círculo" },
    { value: "square", label: "Quadrado" },
    { value: "rounded", label: "Arredondado" },
    { value: "triangle", label: "Triângulo" },
    { value: "hexagon", label: "Hexágono" },
    { value: "banner", label: "Banner" }
  ];

  const fontOptions = [
    { value: "montserrat", label: "Montserrat" },
    { value: "bebas-neue", label: "Bebas Neue" },
    { value: "helvetica-neue", label: "Helvetica Neue" },
    { value: "inter", label: "Inter" },
    { value: "poppins", label: "Poppins" }
  ];

  const backgroundTypes = [
    { value: "solid", label: "Cor Sólida" },
    { value: "gradient", label: "Gradiente" },
    { value: "image", label: "Imagem" },
    { value: "video", label: "Vídeo" }
  ];

  const visualEffects = [
    { value: "none", label: "Nenhum", description: "Sem efeito visual" },
    { value: "bubbles", label: "Bolha de Sabão", description: "Bolhas flutuantes iridescentes" },
    { value: "glitch", label: "Glitch", description: "Efeito de distorção digital" },
    { value: "lightleak", label: "Light Leak Profissional", description: "Flares de luz suave" },
    { value: "vignette", label: "Vignette", description: "Escurecimento sutil nas bordas" },
    { value: "spark", label: "Spark", description: "Faíscas cintilantes" },
    { value: "fire", label: "Fogo", description: "Chamas animadas" },
    { value: "ocean", label: "Ondas do Mar", description: "Movimento ondulado azul" },
    { value: "aurora", label: "Aurora Boreal", description: "Luzes onduladas translúcidas" },
    { value: "nightsky", label: "Céu Noturno", description: "Estrelas e lua brilhantes" },
    { value: "rainlightning", label: "Chuva com Relâmpagos", description: "Gotas e flashes luminosos" },
    { value: "galaxy", label: "Galáxia", description: "Nebulosas e estrelas em movimento" },
    { value: "prism", label: "Prisma Holográfico", description: "Reflexos multicoloridos" },
    { value: "binary", label: "Códigos Binários", description: "Matrix de números caindo" },
    { value: "vhs", label: "VHS", description: "Linhas de ruído retrô" },
    { value: "fairydust", label: "Pó de Fada", description: "Brilhos flutuantes mágicos" },
    { value: "texture3d", label: "Textura 3D", description: "Formas geométricas com profundidade" },
    { value: "kaleidoscope", label: "Kaleidoscópico", description: "Figuras simétricas girando" },
    { value: "emojirain", label: "Chuva de Emojis", description: "Emojis caindo divertidos" },
    { value: "mosaic", label: "Mosaico de Fotos", description: "Miniaturas flutuantes" },
    { value: "shootingstars", label: "Estrela Cadente", description: "Estrelas cruzando o céu" },
    { value: "smoke", label: "Fumaça", description: "Nuvens leves subindo" },
    { value: "fireworks", label: "Fogos de Artifício", description: "Explosões coloridas" }
  ];

  const profileInfoPositions = [
    { value: "left", label: "Esquerda" },
    { value: "center", label: "Centro" },
    { value: "right", label: "Direita" }
  ];

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialIconChange = (platform: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      socialIcons: {
        ...prev.socialIcons,
        [platform]: value,
      },
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange("avatar", e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Seu nome"
            />
          </div>
          
          <div>
            <Label htmlFor="username">Nome de usuário</Label>
            <Input
              id="username"
              value={profile.username}
              onChange={(e) => handleChange("username", e.target.value)}
              placeholder="@seuusuario"
            />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Sua bio curta"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Foto de Perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Foto de Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border overflow-hidden">
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <ImageIcon className="text-gray-400" />
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="avatar-upload"
              />
              <Button asChild>
                <label htmlFor="avatar-upload" className="cursor-pointer flex items-center gap-2">
                  <Upload size={16} />
                  Carregar imagem
                </label>
              </Button>
            </div>
          </div>

          <div>
            <Label>Formato da foto</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {avatarShapeOptions.map((shape) => (
                <button
                  key={shape.value}
                  onClick={() => handleChange("avatarShape", shape.value as any)}
                  className={`p-2 border rounded-md text-sm transition-all ${
                    profile.avatarShape === shape.value
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-200"
                  }`}
                >
                  {shape.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posicionamento do Perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Posicionamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="show-profile"
              checked={profile.showProfileInfo}
              onCheckedChange={(checked) => handleChange("showProfileInfo", checked)}
            />
            <Label htmlFor="show-profile">Mostrar informações do perfil</Label>
          </div>
          
          {profile.showProfileInfo && (
            <div>
              <Label>Posição das informações</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {profileInfoPositions.map((position) => (
                  <button
                    key={position.value}
                    onClick={() => handleChange("profileInfoPosition", position.value as any)}
                    className={`p-2 border rounded-md text-sm transition-all ${
                      profile.profileInfoPosition === position.value
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-200"
                    }`}
                  >
                    {position.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Background */}
      <Card>
        <CardHeader>
          <CardTitle>Fundo da Página</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Tipo de fundo</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {backgroundTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleChange("backgroundType", type.value as any)}
                  className={`p-2 border rounded-md text-sm transition-all ${
                    profile.backgroundType === type.value
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-200"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {profile.backgroundType === "solid" && (
            <div>
              <Label>Cor de fundo</Label>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="color"
                  value={profile.backgroundColor}
                  onChange={(e) => handleChange("backgroundColor", e.target.value)}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <span className="text-sm">{profile.backgroundColor}</span>
              </div>
            </div>
          )}

          {profile.backgroundType === "gradient" && (
            <div className="space-y-3">
              <div>
                <Label>Primeira cor do gradiente</Label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="color"
                    value={profile.backgroundGradientColor1 || "#667eea"}
                    onChange={(e) => handleChange("backgroundGradientColor1", e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <span className="text-sm">{profile.backgroundGradientColor1 || "#667eea"}</span>
                </div>
              </div>
              
              <div>
                <Label>Segunda cor do gradiente</Label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="color"
                    value={profile.backgroundGradientColor2 || "#764ba2"}
                    onChange={(e) => handleChange("backgroundGradientColor2", e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <span className="text-sm">{profile.backgroundGradientColor2 || "#764ba2"}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Efeitos Visuais - Mostrando 3 linhas completas */}
      <Card>
        <CardHeader>
          <CardTitle>Efeitos Visuais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Escolha um efeito visual</Label>
            <div className="grid grid-cols-2 gap-2 mt-2 max-h-96 overflow-y-auto">
              {visualEffects.map((effect) => (
                <button
                  key={effect.value}
                  onClick={() => handleChange("visualEffect", effect.value)}
                  className={`p-3 border rounded-md text-left transition-all ${
                    profile.visualEffect === effect.value
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-200"
                  }`}
                >
                  <div className="font-medium text-sm">{effect.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{effect.description}</div>
                </button>
              ))}
            </div>
          </div>

          {profile.visualEffect !== "none" && (
            <div className="space-y-3 pt-4 border-t">
              <div>
                <Label>Cor do efeito</Label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="color"
                    value={profile.visualEffectColor}
                    onChange={(e) => handleChange("visualEffectColor", e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <span className="text-sm">{profile.visualEffectColor}</span>
                </div>
              </div>

              <div>
                <Label>Opacidade: {Math.round(profile.visualEffectOpacity * 100)}%</Label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={profile.visualEffectOpacity}
                  onChange={(e) => handleChange("visualEffectOpacity", parseFloat(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              <div>
                <Label>Velocidade: {profile.visualEffectSpeed}x</Label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={profile.visualEffectSpeed}
                  onChange={(e) => handleChange("visualEffectSpeed", parseFloat(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              <div>
                <Label>Tamanho: {Math.round(profile.visualEffectSize * 100)}%</Label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={profile.visualEffectSize}
                  onChange={(e) => handleChange("visualEffectSize", parseFloat(e.target.value))}
                  className="w-full mt-2"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cores */}
      <Card>
        <CardHeader>
          <CardTitle>Cores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Cor dos botões</Label>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="color"
                value={profile.buttonColor}
                onChange={(e) => handleChange("buttonColor", e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <span className="text-sm">{profile.buttonColor}</span>
            </div>
          </div>

          <div>
            <Label>Cor do nome</Label>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="color"
                value={profile.nameColor}
                onChange={(e) => handleChange("nameColor", e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <span className="text-sm">{profile.nameColor}</span>
            </div>
          </div>

          <div>
            <Label>Cor da bio</Label>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="color"
                value={profile.bioColor}
                onChange={(e) => handleChange("bioColor", e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <span className="text-sm">{profile.bioColor}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tipografia */}
      <Card>
        <CardHeader>
          <CardTitle>Tipografia</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Fonte</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
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
          </div>
        </CardContent>
      </Card>

      {/* Ícones Sociais */}
      <Card>
        <CardHeader>
          <CardTitle>Redes Sociais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Cor dos ícones sociais</Label>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="color"
                value={profile.socialIconsColor || "#6A0DAD"}
                onChange={(e) => handleChange("socialIconsColor", e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <span className="text-sm">{profile.socialIconsColor || "#6A0DAD"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {Object.entries({
              instagram: "Instagram",
              facebook: "Facebook", 
              twitter: "Twitter",
              youtube: "YouTube",
              tiktok: "TikTok",
              linkedin: "LinkedIn",
              whatsapp: "WhatsApp",
              github: "GitHub",
              spotify: "Spotify",
              twitch: "Twitch",
              discord: "Discord"
            }).map(([platform, label]) => (
              <div key={platform}>
                <Label>{label}</Label>
                <Input
                  value={profile.socialIcons[platform as keyof typeof profile.socialIcons] || ""}
                  onChange={(e) => handleSocialIconChange(platform, e.target.value)}
                  placeholder={`URL do ${label}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
