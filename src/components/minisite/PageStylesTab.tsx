
import React from 'react';
import { PageStyle } from '@/pages/Dashboard';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

type PageStylesTabProps = {
  pageStyle: PageStyle;
  setPageStyle: React.Dispatch<React.SetStateAction<PageStyle>>;
};

const PageStylesTab: React.FC<PageStylesTabProps> = ({ pageStyle, setPageStyle }) => {
  const handleStyleChange = (type: PageStyle['type']) => {
    setPageStyle(prev => ({ ...prev, type }));
  };

  const handleCardSettingChange = (key: string, value: any) => {
    setPageStyle(prev => ({
      ...prev,
      cardSettings: {
        ...prev.cardSettings,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Estilo da Página</h3>
        <p className="text-sm text-gray-500 mb-6">
          Escolha um estilo visual para sua página de links. Isso afetará como seus links são exibidos.
        </p>
      </div>
      
      <RadioGroup
        value={pageStyle.type}
        onValueChange={(value) => handleStyleChange(value as PageStyle['type'])}
        className="grid grid-cols-2 gap-4"
      >
        <div className="col-span-2">
          <Label className="text-base font-medium mb-4">Escolha um estilo:</Label>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'netflix' ? 'border-purple-500' : 'border-gray-200'}`}>
          <RadioGroupItem value="netflix" id="netflix" className="sr-only" />
          <Label htmlFor="netflix" className="cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
              <div className="w-full p-2">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="bg-red-600 h-24 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 text-white text-xs font-bold">TOP 10</div>
                    <div className="absolute bottom-2 right-2 text-white text-xs">FILME</div>
                  </div>
                  <div className="bg-red-600 h-24 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 text-white text-xs">Novidade</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="font-medium">Estilo Netflix</div>
            <div className="text-sm text-gray-500">Layout em grade com 2 cards por linha</div>
          </Label>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'magazine' ? 'border-purple-500' : 'border-gray-200'}`}>
          <RadioGroupItem value="magazine" id="magazine" className="sr-only" />
          <Label htmlFor="magazine" className="cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
              <div className="flex flex-col w-full p-2 space-y-2">
                <div className="bg-purple-600 h-6 rounded w-full flex items-center px-2">
                  <div className="h-3 w-3 rounded-full bg-white mr-2"></div>
                  <div className="h-2 w-24 bg-white rounded"></div>
                </div>
                <div className="bg-purple-600 h-6 rounded w-full flex items-center px-2">
                  <div className="h-3 w-3 rounded-full bg-white mr-2"></div>
                  <div className="h-2 w-24 bg-white rounded"></div>
                </div>
              </div>
            </div>
            <div className="font-medium">Estilo Magazine</div>
            <div className="text-sm text-gray-500">Aparência sofisticada, estilo editorial</div>
          </Label>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'polaroid' ? 'border-purple-500' : 'border-gray-200'}`}>
          <RadioGroupItem value="polaroid" id="polaroid" className="sr-only" />
          <Label htmlFor="polaroid" className="cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2 p-2 w-full">
                <div className="bg-white border-4 border-gray-300 p-1 flex flex-col">
                  <div className="bg-purple-200 flex-1 mb-1"></div>
                  <div className="h-2 w-full bg-gray-400 rounded"></div>
                </div>
                <div className="bg-white border-4 border-gray-300 p-1 flex flex-col">
                  <div className="bg-purple-200 flex-1 mb-1"></div>
                  <div className="h-2 w-full bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
            <div className="font-medium">Estilo Polaroid</div>
            <div className="text-sm text-gray-500">Estilo descontraído com moldura de foto</div>
          </Label>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'traditional' ? 'border-purple-500' : 'border-gray-200'}`}>
          <RadioGroupItem value="traditional" id="traditional" className="sr-only" />
          <Label htmlFor="traditional" className="cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
              <div className="flex flex-col w-2/3 p-2 space-y-2">
                <div className="bg-purple-600 h-6 rounded w-full"></div>
                <div className="bg-purple-600 h-6 rounded w-full"></div>
                <div className="bg-purple-600 h-6 rounded w-full"></div>
              </div>
            </div>
            <div className="font-medium">Estilo Tradicional</div>
            <div className="text-sm text-gray-500">Botões empilhados verticalmente</div>
          </Label>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'arcade' ? 'border-purple-500' : 'border-gray-200'}`}>
          <RadioGroupItem value="arcade" id="arcade" className="sr-only" />
          <Label htmlFor="arcade" className="cursor-pointer">
            <div className="aspect-video bg-gray-800 rounded mb-2 flex items-center justify-center">
              <div className="flex flex-col w-2/3 p-2 space-y-2">
                <div className="bg-neon-green border-2 border-white h-8 rounded w-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">TOP SCORE</span>
                </div>
                <div className="bg-red-500 border-2 border-white h-8 rounded w-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PLAY NOW</span>
                </div>
              </div>
            </div>
            <div className="font-medium">Arcade Retrô</div>
            <div className="text-sm text-gray-500">Visual inspirado em fliperamas dos anos 80/90</div>
          </Label>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'recipe' ? 'border-purple-500' : 'border-gray-200'}`}>
          <RadioGroupItem value="recipe" id="recipe" className="sr-only" />
          <Label htmlFor="recipe" className="cursor-pointer">
            <div className="aspect-video bg-amber-50 rounded mb-2 flex items-center justify-center">
              <div className="flex flex-col w-full p-2 space-y-2">
                <div className="border-b border-dashed border-amber-800 pb-1 text-xs text-amber-800 font-medium text-center">Receita de Sucesso</div>
                <div className="flex items-center">
                  <div className="h-3 w-3 border border-amber-800 mr-2"></div>
                  <div className="h-2 w-24 bg-amber-200 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 border border-amber-800 mr-2"></div>
                  <div className="h-2 w-24 bg-amber-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="font-medium">Receita de Bolo</div>
            <div className="text-sm text-gray-500">Cada link aparece como um ingrediente</div>
          </Label>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'reality' ? 'border-purple-500' : 'border-gray-200'}`}>
          <RadioGroupItem value="reality" id="reality" className="sr-only" />
          <Label htmlFor="reality" className="cursor-pointer">
            <div className="aspect-video bg-pink-100 rounded mb-2 flex items-center justify-center">
              <div className="w-full p-2 relative">
                <div className="absolute top-0 left-0 text-xs text-red-500 font-bold">REC</div>
                <div className="absolute top-0 right-0 text-xs text-black font-bold">AO VIVO</div>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="h-4 w-24 bg-pink-500 rounded mb-1"></div>
                  <div className="h-4 w-16 bg-pink-500 rounded"></div>
                </div>
              </div>
            </div>
            <div className="font-medium">Reality Show</div>
            <div className="text-sm text-gray-500">Estilo BBB, A Fazenda, interações</div>
          </Label>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'vhs' ? 'border-purple-500' : 'border-gray-200'}`}>
          <RadioGroupItem value="vhs" id="vhs" className="sr-only" />
          <Label htmlFor="vhs" className="cursor-pointer">
            <div className="aspect-video bg-black rounded mb-2 flex items-center justify-center">
              <div className="w-full p-2">
                <div className="bg-blue-500 h-6 w-full mb-1 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs">PLAY</span>
                  </div>
                  <div className="absolute top-0 right-0 h-full w-8 bg-gray-200 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  </div>
                </div>
                <div className="bg-gray-200 h-12 w-full rounded-sm flex items-center px-4">
                  <div className="h-2 w-3/4 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
            <div className="font-medium">Cassete/VHS</div>
            <div className="text-sm text-gray-500">Aparência de uma fita VHS antiga</div>
          </Label>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'y2k' ? 'border-purple-500' : 'border-gray-200'}`}>
          <RadioGroupItem value="y2k" id="y2k" className="sr-only" />
          <Label htmlFor="y2k" className="cursor-pointer">
            <div className="aspect-video bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded mb-2 flex items-center justify-center">
              <div className="w-full p-2 space-y-2">
                <div className="bg-white/50 backdrop-blur-sm border border-white rounded-full h-6 flex items-center justify-center">
                  <span className="text-xs font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">SUPER COOL</span>
                </div>
                <div className="bg-white/50 backdrop-blur-sm border border-white rounded-full h-6 flex items-center justify-center">
                  <span className="text-xs font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">AMAZING</span>
                </div>
              </div>
            </div>
            <div className="font-medium">Estética Y2K</div>
            <div className="text-sm text-gray-500">Estilo anos 2000 com brilhos e cores</div>
          </Label>
        </div>
      </RadioGroup>
      
      {/* Netflix Card Settings */}
      {pageStyle.type === 'netflix' && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h4 className="font-medium text-lg mb-4">Configurações do Card Netflix</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showLabel" className="font-medium">Mostrar etiquetas</Label>
                  <p className="text-sm text-gray-500">Ex: "TOP 10", "Novidade"</p>
                </div>
                <Switch 
                  id="showLabel"
                  checked={pageStyle.cardSettings?.showLabels ?? true}
                  onCheckedChange={(checked) => handleCardSettingChange('showLabels', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showOverlay" className="font-medium">Usar overlay escuro</Label>
                  <p className="text-sm text-gray-500">Gradiente escuro sobre as imagens</p>
                </div>
                <Switch 
                  id="showOverlay" 
                  checked={pageStyle.cardSettings?.showOverlay ?? true}
                  onCheckedChange={(checked) => handleCardSettingChange('showOverlay', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardAspectRatio" className="font-medium">Proporção dos cards</Label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    className={`p-2 border rounded-md flex items-center justify-center ${pageStyle.cardSettings?.aspectRatio === 'portrait' ? 'bg-purple-100 border-purple-500' : 'border-gray-200'}`}
                    onClick={() => handleCardSettingChange('aspectRatio', 'portrait')}
                  >
                    <div className="w-8 h-12 bg-gray-300 rounded"></div>
                    <span className="text-xs ml-2">Vertical</span>
                  </button>
                  <button 
                    className={`p-2 border rounded-md flex items-center justify-center ${pageStyle.cardSettings?.aspectRatio === 'square' ? 'bg-purple-100 border-purple-500' : 'border-gray-200'}`}
                    onClick={() => handleCardSettingChange('aspectRatio', 'square')}
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    <span className="text-xs ml-2">Quadrado</span>
                  </button>
                  <button 
                    className={`p-2 border rounded-md flex items-center justify-center ${(!pageStyle.cardSettings?.aspectRatio || pageStyle.cardSettings?.aspectRatio === 'landscape') ? 'bg-purple-100 border-purple-500' : 'border-gray-200'}`}
                    onClick={() => handleCardSettingChange('aspectRatio', 'landscape')}
                  >
                    <div className="w-12 h-8 bg-gray-300 rounded"></div>
                    <span className="text-xs ml-2">Horizontal</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Arcade Theme Settings */}
      {pageStyle.type === 'arcade' && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h4 className="font-medium text-lg mb-4">Configurações do Tema Arcade</h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="arcadeBtnColor">Cor dos botões</Label>
                <Input 
                  type="color"
                  id="arcadeBtnColor"
                  defaultValue={pageStyle.buttonColor || "#FF0000"}
                  onChange={(e) => setPageStyle(prev => ({ ...prev, buttonColor: e.target.value }))}
                  className="w-16 h-10"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showRanking" className="font-medium">Mostrar ranking</Label>
                  <p className="text-sm text-gray-500">Adiciona números nos links como se fossem fases</p>
                </div>
                <Switch 
                  id="showRanking" 
                  checked={pageStyle.cardSettings?.showLabels ?? true}
                  onCheckedChange={(checked) => handleCardSettingChange('showLabels', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* VHS Theme Settings */}
      {pageStyle.type === 'vhs' && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h4 className="font-medium text-lg mb-4">Configurações do Tema VHS</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showVHSeffect" className="font-medium">Efeito de TV antiga</Label>
                  <p className="text-sm text-gray-500">Adiciona ruídos e linhas de TV</p>
                </div>
                <Switch 
                  id="showVHSeffect" 
                  checked={pageStyle.cardSettings?.showOverlay ?? true}
                  onCheckedChange={(checked) => handleCardSettingChange('showOverlay', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vhsColor">Cor principal</Label>
                <Input 
                  type="color"
                  id="vhsColor"
                  defaultValue={pageStyle.buttonColor || "#4169E1"}
                  onChange={(e) => setPageStyle(prev => ({ ...prev, buttonColor: e.target.value }))}
                  className="w-16 h-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h4 className="font-medium">Personalização de botões</h4>
        <div className="space-y-2">
          <Label htmlFor="buttonColor">Cor dos botões</Label>
          <Input 
            type="color"
            id="buttonColor"
            defaultValue={pageStyle.buttonColor || "#6A0DAD"}
            onChange={(e) => setPageStyle(prev => ({ ...prev, buttonColor: e.target.value }))}
            className="w-16 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default PageStylesTab;
