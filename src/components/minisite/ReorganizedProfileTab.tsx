
import React from 'react';
import { UserProfile } from '@/pages/Dashboard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReorganizedProfileTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const ReorganizedProfileTab: React.FC<ReorganizedProfileTabProps> = ({ profile, setProfile }) => {
  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleChange('avatar', url);
    }
  };

  const handleSocialIconChange = (platform: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      socialIcons: {
        ...prev.socialIcons,
        [platform]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configuração do Perfil</h2>

      {/* Informações Básicas */}
      <Card className="border-2 border-[#6A0DAD] border-opacity-20">
        <CardHeader className="bg-[#6A0DAD] bg-opacity-5">
          <CardTitle className="text-[#6A0DAD]">Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Seu nome"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                value={profile.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="seuusuario"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Conte um pouco sobre você..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Foto/Vídeo de Perfil */}
      <Card className="border-2 border-[#6A0DAD] border-opacity-20">
        <CardHeader className="bg-[#6A0DAD] bg-opacity-5">
          <CardTitle className="text-[#6A0DAD]">Foto ou Vídeo de Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Formato da foto</Label>
              <Select value={profile.avatarShape} onValueChange={(value: any) => handleChange('avatarShape', value)}>
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
            <div className="space-y-2">
              <Label>Posição do perfil</Label>
              <Select value={profile.profileInfoPosition} onValueChange={(value: any) => handleChange('profileInfoPosition', value)}>
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
          </div>

          {/* Upload de mídia sempre visível para formato banner */}
          <div className="space-y-2">
            <Label>Upload de imagem/vídeo</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {profile.avatar ? (
                <div className="relative">
                  {profile.avatar.includes('video') || profile.avatar.includes('.mp4') ? (
                    <video
                      src={profile.avatar}
                      className="max-w-full h-32 mx-auto rounded"
                      controls
                    />
                  ) : (
                    <img
                      src={profile.avatar}
                      alt="Preview"
                      className="max-w-full h-32 mx-auto rounded"
                    />
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleChange('avatar', '')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Clique para fazer upload
                      </span>
                      <span className="text-xs text-gray-500">
                        PNG, JPG, GIF, MP4 até 10MB
                      </span>
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="verified"
              checked={profile.isVerified}
              onCheckedChange={(checked) => handleChange('isVerified', checked)}
            />
            <Label htmlFor="verified">Perfil verificado</Label>
          </div>
        </CardContent>
      </Card>

      {/* Cores e Estilo */}
      <Card className="border-2 border-[#6A0DAD] border-opacity-20">
        <CardHeader className="bg-[#6A0DAD] bg-opacity-5">
          <CardTitle className="text-[#6A0DAD]">Cores e Estilo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cor do nome</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={profile.nameColor}
                  onChange={(e) => handleChange('nameColor', e.target.value)}
                  className="w-12 h-8 rounded border"
                />
                <span className="text-sm">{profile.nameColor}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cor da biografia</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={profile.bioColor}
                  onChange={(e) => handleChange('bioColor', e.target.value)}
                  className="w-12 h-8 rounded border"
                />
                <span className="text-sm">{profile.bioColor}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cor do username</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={profile.usernameColor || '#888888'}
                  onChange={(e) => handleChange('usernameColor', e.target.value)}
                  className="w-12 h-8 rounded border"
                />
                <span className="text-sm">{profile.usernameColor || '#888888'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cor dos botões</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={profile.buttonColor}
                  onChange={(e) => handleChange('buttonColor', e.target.value)}
                  className="w-12 h-8 rounded border"
                />
                <span className="text-sm">{profile.buttonColor}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Fonte</Label>
            <Select value={profile.font} onValueChange={(value) => handleChange('font', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="montserrat">Montserrat</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="open-sans">Open Sans</SelectItem>
                <SelectItem value="lato">Lato</SelectItem>
                <SelectItem value="poppins">Poppins</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Redes Sociais */}
      <Card className="border-2 border-[#6A0DAD] border-opacity-20">
        <CardHeader className="bg-[#6A0DAD] bg-opacity-5">
          <CardTitle className="text-[#6A0DAD]">Redes Sociais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries({
              instagram: 'Instagram',
              facebook: 'Facebook',
              twitter: 'X (Twitter)',
              youtube: 'YouTube',
              tiktok: 'TikTok',
              linkedin: 'LinkedIn',
              whatsapp: 'WhatsApp',
              spotify: 'Spotify'
            }).map(([key, label]) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                <Input
                  value={profile.socialIcons[key as keyof typeof profile.socialIcons] || ''}
                  onChange={(e) => handleSocialIconChange(key, e.target.value)}
                  placeholder={`URL do ${label}`}
                />
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label>Cor dos ícones sociais</Label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={profile.socialIconsColor || '#6A0DAD'}
                onChange={(e) => handleChange('socialIconsColor', e.target.value)}
                className="w-12 h-8 rounded border"
              />
              <span className="text-sm">{profile.socialIconsColor || '#6A0DAD'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReorganizedProfileTab;
