
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Eye, EyeOff } from 'lucide-react';

const SettingsPanel = () => {
  const { toast } = useToast();
  const { currentLanguage, changeLanguage, languages, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram atualizadas com sucesso."
    });
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="account">Conta</TabsTrigger>
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
          <TabsTrigger value="display">Exibição</TabsTrigger>
          <TabsTrigger value="domain">Domínio</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário</Label>
            <Input id="username" defaultValue="johndoe" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          
          {/* Seção de Segurança movida para cá */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Segurança</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha atual</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword.current ? "text" : "password"}
                    value={passwordData.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova senha</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword.new ? "text" : "password"}
                    value={passwordData.new}
                    onChange={(e) => handlePasswordChange('new', e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPassword.confirm ? "text" : "password"}
                    value={passwordData.confirm}
                    onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <Button onClick={handleSave}>Salvar alterações</Button>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="public-profile" className="cursor-pointer">
                <div>Perfil público</div>
                <p className="text-sm text-gray-500">Permitir que outros usuários vejam seu perfil</p>
              </Label>
              <Switch id="public-profile" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-stats" className="cursor-pointer">
                <div>Mostrar estatísticas</div>
                <p className="text-sm text-gray-500">Exibir contagem de visitantes na sua página</p>
              </Label>
              <Switch id="show-stats" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="cookies" className="cursor-pointer">
                <div>Cookies e rastreamento</div>
                <p className="text-sm text-gray-500">Habilitar cookies para experiência personalizada</p>
              </Label>
              <Switch id="cookies" defaultChecked />
            </div>
          </div>
          
          <Button onClick={handleSave}>Salvar preferências</Button>
        </TabsContent>
        
        <TabsContent value="display" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="cursor-pointer">
                <div>Modo escuro</div>
                <p className="text-sm text-gray-500">Ativar tema escuro no painel</p>
              </Label>
              <Switch id="dark-mode" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Idioma da plataforma</Label>
              <Select value={currentLanguage} onValueChange={changeLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                Alterar o idioma mudará toda a interface da plataforma
              </p>
            </div>
          </div>
          
          <Button onClick={handleSave}>Salvar configurações</Button>
        </TabsContent>
        
        <TabsContent value="domain" className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Recurso Premium</h3>
            <p className="text-yellow-700 text-sm">
              Domínios personalizados estão disponíveis apenas para usuários premium. 
              <a href="#" className="underline ml-1">Faça upgrade do seu plano</a>.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="custom-domain">Domínio personalizado</Label>
            <Input id="custom-domain" placeholder="seudominio.com" disabled />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subdomain">Subdomínio</Label>
            <div className="flex">
              <Input id="subdomain" defaultValue="johndoe" className="rounded-r-none" />
              <div className="flex items-center px-3 border border-l-0 rounded-r-md bg-gray-50">
                .nova-brand.site
              </div>
            </div>
          </div>
          
          <Button onClick={handleSave} disabled>Conectar domínio</Button>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics" className="cursor-pointer">
                <div>Google Analytics</div>
                <p className="text-sm text-gray-500">Integrar com sua conta do Google Analytics</p>
              </Label>
              <Switch id="analytics" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ga-id">ID do Google Analytics</Label>
              <Input id="ga-id" placeholder="UA-XXXXXXXXX-X ou G-XXXXXXXXXX" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meta-tags">Meta tags personalizadas</Label>
              <textarea
                id="meta-tags"
                className="w-full p-2 border rounded-md min-h-24"
                placeholder="<meta name=&quot;description&quot; content=&quot;Sua descrição&quot;>"
              ></textarea>
            </div>
            
            <div className="pt-4">
              <h3 className="font-medium text-red-600 mb-2">Zona de perigo</h3>
              <Button variant="destructive">Deletar minha conta</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
