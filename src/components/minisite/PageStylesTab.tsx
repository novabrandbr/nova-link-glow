
import React, { useState } from 'react';
import { PageStyle } from '@/pages/Dashboard';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PageStylesTabProps {
  pageStyle: PageStyle;
  setPageStyle: React.Dispatch<React.SetStateAction<PageStyle>>;
}

const PageStylesTab: React.FC<PageStylesTabProps> = ({ pageStyle, setPageStyle }) => {
  const [activeTab, setActiveTab] = useState('popular');

  const handleStyleChange = (newType: PageStyle['type']) => {
    setPageStyle(prev => ({
      ...prev,
      type: newType
    }));
  };

  const handleCardSettingChange = (setting: keyof NonNullable<PageStyle['cardSettings']>, value: any) => {
    setPageStyle(prev => ({
      ...prev,
      cardSettings: {
        ...prev.cardSettings,
        [setting]: value
      }
    }));
  };

  const popularStyles = [
    { 
      id: 'traditional' as const, 
      name: 'Tradicional', 
      description: 'Layout clássico com botões simples e limpos' 
    },
    { 
      id: 'novabrandflix' as const, 
      name: 'NovaBrandFlix', 
      description: 'Layout em grade com cartas verticais. Parecido com aquele streaming famoso que termina com Flix.' 
    },
    { 
      id: 'magazine' as const, 
      name: 'Magazine', 
      description: 'Estilo revista com layout em grade e imagens destacadas' 
    },
    { 
      id: 'polaroid' as const, 
      name: 'Polaroid', 
      description: 'Fotos instantâneas com moldura branca característica' 
    },
    { 
      id: 'arcade' as const, 
      name: 'Arcade Retro', 
      description: 'Fundo escuro com neon e tipografia pixelada dos anos 80' 
    },
    { 
      id: 'recipe' as const, 
      name: 'Receita de Bolo', 
      description: 'Visual tipo receita com ingredientes como links' 
    }
  ];

  const politicalStyles = [
    { 
      id: 'traditional' as const, 
      name: 'Lula Verso', 
      description: 'Fundo vermelho vibrante com estrela branca do PT' 
    },
    { 
      id: 'novabrandflix' as const, 
      name: 'Mytho Style', 
      description: 'Fundo verde e amarelo com elementos patrióticos' 
    },
    { 
      id: 'magazine' as const, 
      name: 'Trump Tower', 
      description: 'Fundo dourado e azul com águia americana' 
    },
    { 
      id: 'polaroid' as const, 
      name: 'Putin Power', 
      description: 'Fundo escuro com símbolos da Rússia' 
    }
  ];

  const countryStyles = [
    { 
      id: 'traditional' as const, 
      name: 'Brasil Tropical', 
      description: 'Fundo com coqueiros, céu azul e cores vivas' 
    },
    { 
      id: 'novabrandflix' as const, 
      name: 'Estados Unidos Estrelado', 
      description: 'Fundo com bandeira dos EUA e estrelas animadas' 
    },
    { 
      id: 'magazine' as const, 
      name: 'Rússia Soviética', 
      description: 'Fundo vermelho escuro com estética vintage' 
    },
    { 
      id: 'polaroid' as const, 
      name: 'França Chique', 
      description: 'Fundo com torre Eiffel e tipografia serifada' 
    },
    { 
      id: 'arcade' as const, 
      name: 'Portugal Azulejos', 
      description: 'Padrão tradicional de azulejos portugueses' 
    },
    { 
      id: 'recipe' as const, 
      name: 'Espanha Flamenca', 
      description: 'Cores quentes com ícones de dança flamenca' 
    }
  ];

  const creativeStyles = [
    { 
      id: 'traditional' as const, 
      name: 'Caderno de Colégio', 
      description: 'Fundo com linhas azuis e rabiscos escolares' 
    },
    { 
      id: 'novabrandflix' as const, 
      name: 'Meme BR', 
      description: 'Molduras de memes com tipografia impact bold' 
    },
    { 
      id: 'magazine' as const, 
      name: 'Windows 98 Retro', 
      description: 'Layout com janelas cinza e ícones pixelados' 
    },
    { 
      id: 'polaroid' as const, 
      name: 'Papel de Pão', 
      description: 'Fundo bege texturizado de saco de padaria' 
    },
    { 
      id: 'arcade' as const, 
      name: 'Link Verso', 
      description: 'Fundo cósmico com partículas e efeitos flutuantes' 
    },
    { 
      id: 'recipe' as const, 
      name: 'Passo a Passo', 
      description: 'Fundo com linhas pontilhadas e cards numerados' 
    }
  ];

  const renderStyleGrid = (styles: typeof popularStyles) => (
    <div className="grid grid-cols-2 gap-4">
      {styles.map((style) => (
        <div
          key={style.id}
          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
            pageStyle.type === style.id
              ? 'border-purple-500 bg-purple-50 shadow-md'
              : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
          }`}
          onClick={() => handleStyleChange(style.id)}
        >
          <h3 className="font-semibold text-sm mb-2">{style.name}</h3>
          <p className="text-xs text-gray-600">{style.description}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Estilos de Página</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="popular">Populares</TabsTrigger>
          <TabsTrigger value="political">Políticos</TabsTrigger>
          <TabsTrigger value="countries">Países</TabsTrigger>
          <TabsTrigger value="creative">Criativos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="popular" className="space-y-4">
          {renderStyleGrid(popularStyles)}
        </TabsContent>
        
        <TabsContent value="political" className="space-y-4">
          {renderStyleGrid(politicalStyles)}
        </TabsContent>
        
        <TabsContent value="countries" className="space-y-4">
          {renderStyleGrid(countryStyles)}
        </TabsContent>
        
        <TabsContent value="creative" className="space-y-4">
          {renderStyleGrid(creativeStyles)}
        </TabsContent>
      </Tabs>

      {/* Configurações específicas do estilo */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-semibold">Configurações do Card</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {pageStyle.type !== 'traditional' && (
            <div className="flex items-center justify-between">
              <Label htmlFor="showLabels">Mostrar rótulos</Label>
              <Switch
                id="showLabels"
                checked={pageStyle.cardSettings?.showLabels || false}
                onCheckedChange={(checked) => handleCardSettingChange('showLabels', checked)}
              />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Label htmlFor="showOverlay">Mostrar overlay</Label>
            <Switch
              id="showOverlay"
              checked={pageStyle.cardSettings?.showOverlay || false}
              onCheckedChange={(checked) => handleCardSettingChange('showOverlay', checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="aspectRatio">Proporção</Label>
            <Select
              value={pageStyle.cardSettings?.aspectRatio || 'landscape'}
              onValueChange={(value: 'portrait' | 'square' | 'landscape') => 
                handleCardSettingChange('aspectRatio', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">Vertical</SelectItem>
                <SelectItem value="square">Quadrado</SelectItem>
                <SelectItem value="landscape">Horizontal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="textAlign">Alinhamento do texto</Label>
            <Select
              value={pageStyle.cardSettings?.textAlign || 'center'}
              onValueChange={(value: 'left' | 'center' | 'right') => 
                handleCardSettingChange('textAlign', value)
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
        </div>

        {pageStyle.cardSettings?.showOverlay && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium">Configurações do Overlay</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gradientColor">Cor do gradiente</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    id="gradientColor"
                    value={pageStyle.cardSettings?.gradientColor || '#000000'}
                    onChange={(e) => handleCardSettingChange('gradientColor', e.target.value)}
                    className="w-12 h-8 rounded border"
                  />
                  <span className="text-sm text-gray-600">
                    {pageStyle.cardSettings?.gradientColor || '#000000'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gradientOpacity">
                  Opacidade: {Math.round((pageStyle.cardSettings?.gradientOpacity || 0.5) * 100)}%
                </Label>
                <input
                  type="range"
                  id="gradientOpacity"
                  min="0"
                  max="1"
                  step="0.1"
                  value={pageStyle.cardSettings?.gradientOpacity || 0.5}
                  onChange={(e) => handleCardSettingChange('gradientOpacity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageStylesTab;
