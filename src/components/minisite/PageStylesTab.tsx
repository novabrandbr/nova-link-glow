
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageStyle } from "@/pages/Dashboard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface PageStylesTabProps {
  pageStyle: PageStyle;
  setPageStyle: React.Dispatch<React.SetStateAction<PageStyle>>;
}

const PageStylesTab: React.FC<PageStylesTabProps> = ({ pageStyle, setPageStyle }) => {
  const styles = [
    { 
      id: 'traditional', 
      name: 'Tradicional', 
      description: 'Design clássico e limpo com botões simples' 
    },
    { 
      id: 'novabrandflix', 
      name: 'Nova Brand Flix', 
      description: 'Layout em grade com cartas verticais. Lembra aquele streaming famoso que termina com Flix.' 
    },
    { 
      id: 'magazine', 
      name: 'Revista', 
      description: 'Estilo editorial com layout de revista' 
    },
    { 
      id: 'polaroid', 
      name: 'Polaroid', 
      description: 'Fotos instantâneas com moldura vintage' 
    },
    { 
      id: 'arcade', 
      name: 'Arcade Retro', 
      description: 'Fundo escuro, neon, fontes pixeladas, botões estilo fliperama' 
    },
    { 
      id: 'recipe', 
      name: 'Receita de Bolo', 
      description: 'Visual tipo receita, ingredientes como links, fundo papel/lousa' 
    },
    { 
      id: 'reality', 
      name: 'Reality Show', 
      description: 'Cards grandes, destaque visual, estilo LED, emojis, "AO VIVO"' 
    },
    { 
      id: 'vhs', 
      name: 'K7/VHS', 
      description: 'Efeito VHS, glitch, visual retrô, tipografia grossa' 
    },
    { 
      id: 'y2k', 
      name: 'Y2K', 
      description: 'Chrome, metálico, cores anos 2000, brilhos e ícones nostálgicos' 
    },
    { 
      id: 'connected', 
      name: 'Linha Conectada', 
      description: 'Cards ligados por linha animada, layout contínuo' 
    },
    { 
      id: 'timeline', 
      name: 'Linha do Tempo', 
      description: 'Eventos em timeline vertical com datas e ícones' 
    },
    { 
      id: 'orbit', 
      name: 'Órbita Espacial', 
      description: 'Links como planetas girando, fundo estelar, efeitos de órbita' 
    }
  ];

  const handleStyleChange = (styleId: string) => {
    setPageStyle(prev => ({
      ...prev,
      type: styleId as PageStyle['type']
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Estilos Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {styles.map((style) => (
              <div
                key={style.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  pageStyle.type === style.id
                    ? 'border-[#6A0DAD] bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleStyleChange(style.id)}
              >
                <h3 className="font-semibold text-lg">{style.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{style.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações do Estilo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="buttonColor">Cor dos botões</Label>
            <div className="flex gap-2">
              <Input
                id="buttonColor"
                type="color"
                value={pageStyle.buttonColor || '#6A0DAD'}
                onChange={(e) => setPageStyle(prev => ({ 
                  ...prev, 
                  buttonColor: e.target.value 
                }))}
                className="w-12 h-10 p-1 border-2"
              />
              <Input
                value={pageStyle.buttonColor || '#6A0DAD'}
                onChange={(e) => setPageStyle(prev => ({ 
                  ...prev, 
                  buttonColor: e.target.value 
                }))}
                placeholder="#6A0DAD"
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label>Proporção dos cards</Label>
            <Select 
              value={pageStyle.cardSettings?.aspectRatio || 'landscape'} 
              onValueChange={(value: 'portrait' | 'square' | 'landscape') => 
                setPageStyle(prev => ({ 
                  ...prev, 
                  cardSettings: { 
                    ...prev.cardSettings, 
                    aspectRatio: value 
                  } 
                }))
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

          <div>
            <Label>Alinhamento do texto</Label>
            <Select 
              value={pageStyle.cardSettings?.textAlign || 'center'} 
              onValueChange={(value: 'left' | 'center' | 'right') => 
                setPageStyle(prev => ({ 
                  ...prev, 
                  cardSettings: { 
                    ...prev.cardSettings, 
                    textAlign: value 
                  } 
                }))
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

          {pageStyle.type !== 'traditional' && (
            <div className="flex items-center justify-between">
              <Label htmlFor="showLabels">Mostrar rótulos</Label>
              <Switch
                id="showLabels"
                checked={pageStyle.cardSettings?.showLabels || false}
                onCheckedChange={(checked) => setPageStyle(prev => ({ 
                  ...prev, 
                  cardSettings: { 
                    ...prev.cardSettings, 
                    showLabels: checked 
                  } 
                }))}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="showOverlay">Mostrar overlay</Label>
            <Switch
              id="showOverlay"
              checked={pageStyle.cardSettings?.showOverlay || false}
              onCheckedChange={(checked) => setPageStyle(prev => ({ 
                ...prev, 
                cardSettings: { 
                  ...prev.cardSettings, 
                  showOverlay: checked 
                } 
              }))}
            />
          </div>

          {pageStyle.cardSettings?.showOverlay && (
            <>
              <div>
                <Label htmlFor="gradientColor">Cor do gradiente</Label>
                <div className="flex gap-2">
                  <Input
                    id="gradientColor"
                    type="color"
                    value={pageStyle.cardSettings?.gradientColor || '#000000'}
                    onChange={(e) => setPageStyle(prev => ({ 
                      ...prev, 
                      cardSettings: { 
                        ...prev.cardSettings, 
                        gradientColor: e.target.value 
                      } 
                    }))}
                    className="w-12 h-10 p-1 border-2"
                  />
                  <Input
                    value={pageStyle.cardSettings?.gradientColor || '#000000'}
                    onChange={(e) => setPageStyle(prev => ({ 
                      ...prev, 
                      cardSettings: { 
                        ...prev.cardSettings, 
                        gradientColor: e.target.value 
                      } 
                    }))}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gradientOpacity">Opacidade do gradiente</Label>
                <Input
                  id="gradientOpacity"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={pageStyle.cardSettings?.gradientOpacity || 0.5}
                  onChange={(e) => setPageStyle(prev => ({ 
                    ...prev, 
                    cardSettings: { 
                      ...prev.cardSettings, 
                      gradientOpacity: parseFloat(e.target.value) 
                    } 
                  }))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600">
                  {Math.round((pageStyle.cardSettings?.gradientOpacity || 0.5) * 100)}%
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PageStylesTab;
