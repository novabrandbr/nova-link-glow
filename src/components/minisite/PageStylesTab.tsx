
import React from 'react';
import { PageStyle } from '@/pages/Dashboard';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      
      <Tabs defaultValue="popular">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="popular">Populares</TabsTrigger>
          <TabsTrigger value="political">Políticos</TabsTrigger>
          <TabsTrigger value="countries">Países</TabsTrigger>
          <TabsTrigger value="creative">Criativos</TabsTrigger>
        </TabsList>

        <TabsContent value="popular">
          <ScrollArea className="h-[450px] pr-4">
            <RadioGroup
              value={pageStyle.type}
              onValueChange={(value) => handleStyleChange(value as PageStyle['type'])}
              className="grid grid-cols-2 gap-4"
            >
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
                  <div className="text-sm text-gray-500">Layout em grade com cards verticais</div>
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
                      <div className="bg-green-500 border-2 border-white h-8 rounded w-full flex items-center justify-center">
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
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'connected' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="connected" id="connected" className="sr-only" />
                <Label htmlFor="connected" className="cursor-pointer">
                  <div className="aspect-video bg-white rounded mb-2 flex items-center justify-center">
                    <div className="w-full p-2 space-y-8 relative">
                      <div className="h-4 w-full bg-gray-200 rounded-full"></div>
                      <div className="h-4 w-full bg-gray-200 rounded-full"></div>
                      <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l border-dashed border-gray-400 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="font-medium">Linha Conectada</div>
                  <div className="text-sm text-gray-500">Cards unidos por uma linha pontilhada</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'timeline' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="timeline" id="timeline" className="sr-only" />
                <Label htmlFor="timeline" className="cursor-pointer">
                  <div className="aspect-video bg-white rounded mb-2 flex items-center justify-center">
                    <div className="h-full w-8 bg-gray-100 relative flex flex-col items-center">
                      <div className="absolute top-0 h-full w-0 border-l border-dashed border-gray-400"></div>
                      <div className="h-3 w-3 rounded-full bg-blue-500 z-10 my-2"></div>
                      <div className="h-3 w-3 rounded-full bg-blue-500 z-10 my-2"></div>
                      <div className="h-3 w-3 rounded-full bg-blue-500 z-10 my-2"></div>
                    </div>
                    <div className="flex-1 flex flex-col justify-around p-2">
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="font-medium">Linha do Tempo</div>
                  <div className="text-sm text-gray-500">Cards como eventos de uma timeline</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'orbit' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="orbit" id="orbit" className="sr-only" />
                <Label htmlFor="orbit" className="cursor-pointer">
                  <div className="aspect-video bg-indigo-900 rounded mb-2 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full opacity-50"></div>
                      <div className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
                    </div>
                    <div className="absolute bottom-2 w-full flex justify-center">
                      <div className="h-4 w-20 bg-indigo-300 rounded"></div>
                    </div>
                  </div>
                  <div className="font-medium">Órbita Espacial</div>
                  <div className="text-sm text-gray-500">Visual inspirado no universo</div>
                </Label>
              </div>
            </RadioGroup>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="political">
          <ScrollArea className="h-[450px] pr-4">
            <RadioGroup
              value={pageStyle.type}
              onValueChange={(value) => handleStyleChange(value as PageStyle['type'])}
              className="grid grid-cols-2 gap-4"
            >
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'lula' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="lula" id="lula" className="sr-only" />
                <Label htmlFor="lula" className="cursor-pointer">
                  <div className="aspect-video bg-red-600 rounded mb-2 flex items-center justify-center">
                    <div className="flex flex-col w-full p-2 space-y-2 items-center">
                      <div className="w-8 h-8 bg-white text-red-600 flex items-center justify-center font-bold rounded-full">PT</div>
                      <div className="h-4 w-28 bg-white rounded"></div>
                    </div>
                  </div>
                  <div className="font-medium">Lulaverso</div>
                  <div className="text-sm text-gray-500">Estilo vermelho vibrante com estrela do PT</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'bolsonaro' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="bolsonaro" id="bolsonaro" className="sr-only" />
                <Label htmlFor="bolsonaro" className="cursor-pointer">
                  <div className="aspect-video bg-gradient-to-r from-green-600 to-yellow-400 rounded mb-2 flex items-center justify-center">
                    <div className="flex flex-col w-full p-2 space-y-2 items-center">
                      <div className="flex items-center text-xs font-bold">
                        👉👉 MITO 👉👉
                      </div>
                      <div className="h-4 w-28 bg-white rounded"></div>
                    </div>
                  </div>
                  <div className="font-medium">Mito Style</div>
                  <div className="text-sm text-gray-500">Verde e amarelo com elementos de apoio</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'trump' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="trump" id="trump" className="sr-only" />
                <Label htmlFor="trump" className="cursor-pointer">
                  <div className="aspect-video bg-gradient-to-b from-red-500 via-white to-blue-500 rounded mb-2 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 text-blue-800 text-2xl flex items-center justify-center">🇺🇸</div>
                      </div>
                    </div>
                    <div className="w-full px-4 text-center">
                      <div className="h-6 bg-yellow-400 flex items-center justify-center text-xs font-bold">MAKE LINKS GREAT AGAIN</div>
                    </div>
                  </div>
                  <div className="font-medium">Trump Tower</div>
                  <div className="text-sm text-gray-500">Estética dourada com bandeira dos EUA</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'putin' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="putin" id="putin" className="sr-only" />
                <Label htmlFor="putin" className="cursor-pointer">
                  <div className="aspect-video bg-gray-800 rounded mb-2 flex items-center justify-center">
                    <div className="w-full p-2 space-y-2">
                      <div className="h-6 border border-gray-400 flex items-center justify-center bg-gray-700">
                        <span className="text-red-600 text-xs font-bold">ПУТИН</span>
                      </div>
                      <div className="h-6 border border-gray-400 flex items-center justify-center bg-gray-700">
                        <span className="text-gray-100 text-xs">РОССИЯ</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">Putin Power</div>
                  <div className="text-sm text-gray-500">Visual austero e militarizado</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'ballot' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="ballot" id="ballot" className="sr-only" />
                <Label htmlFor="ballot" className="cursor-pointer">
                  <div className="aspect-video bg-green-100 rounded mb-2 flex items-center justify-center relative overflow-hidden">
                    <div className="w-full h-full flex flex-col">
                      <div className="bg-gray-100 h-6 flex items-center justify-between px-2 font-bold text-sm">
                        <span>URNA ELETRÔNICA</span>
                        <span className="text-green-600">TSE</span>
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-2 p-2">
                        <div className="bg-gray-300 flex items-center justify-center">1</div>
                        <div className="bg-gray-300 flex items-center justify-center">2</div>
                        <div className="bg-gray-300 flex items-center justify-center">3</div>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">Urna Eletrônica</div>
                  <div className="text-sm text-gray-500">Cards como botões de urna eleitoral</div>
                </Label>
              </div>
            </RadioGroup>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="countries">
          <ScrollArea className="h-[450px] pr-4">
            <RadioGroup
              value={pageStyle.type}
              onValueChange={(value) => handleStyleChange(value as PageStyle['type'])}
              className="grid grid-cols-2 gap-4"
            >
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'tropical' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="tropical" id="tropical" className="sr-only" />
                <Label htmlFor="tropical" className="cursor-pointer">
                  <div className="aspect-video bg-gradient-to-b from-green-600 via-yellow-400 to-blue-500 rounded mb-2 flex items-center justify-center relative">
                    <div className="absolute right-2 bottom-2 text-xl">🌴</div>
                    <div className="absolute left-2 top-2 text-xl">☀️</div>
                    <div className="h-8 bg-white/80 w-32 flex items-center justify-center rounded">
                      <div className="h-3 w-16 bg-green-600 rounded"></div>
                    </div>
                  </div>
                  <div className="font-medium">Brasil Tropical</div>
                  <div className="text-sm text-gray-500">Cores vibrantes e elementos tropicais</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'usa' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="usa" id="usa" className="sr-only" />
                <Label htmlFor="usa" className="cursor-pointer">
                  <div className="aspect-video bg-blue-900 rounded mb-2 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-12 h-12 bg-blue-800 flex items-center justify-center">
                      <div className="text-white text-xs">⭐⭐⭐</div>
                    </div>
                    <div className="w-full h-4 bg-red-600 my-1"></div>
                    <div className="w-full h-4 bg-white my-1"></div>
                    <div className="w-full h-4 bg-red-600 my-1"></div>
                  </div>
                  <div className="font-medium">EUA Estrelado</div>
                  <div className="text-sm text-gray-500">Águia, bandeira americana e western</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'soviet' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="soviet" id="soviet" className="sr-only" />
                <Label htmlFor="soviet" className="cursor-pointer">
                  <div className="aspect-video bg-red-700 rounded mb-2 flex items-center justify-center">
                    <div className="w-10 h-10 text-yellow-400 text-xl flex items-center justify-center">☭</div>
                  </div>
                  <div className="font-medium">Rússia Soviética</div>
                  <div className="text-sm text-gray-500">Estética retrô com símbolos da URSS</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'france' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="france" id="france" className="sr-only" />
                <Label htmlFor="france" className="cursor-pointer">
                  <div className="aspect-video bg-white rounded mb-2 flex items-center justify-center">
                    <div className="flex flex-col w-full h-full">
                      <div className="flex flex-1">
                        <div className="w-1/3 bg-blue-800"></div>
                        <div className="w-1/3 bg-white"></div>
                        <div className="w-1/3 bg-red-600"></div>
                      </div>
                      <div className="h-8 w-full bg-gray-100 flex items-center justify-center">
                        <span className="font-serif text-xs">Liberté, Égalité, Fraternité</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">França Chic</div>
                  <div className="text-sm text-gray-500">Estilo editorial preto e branco</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'portugal' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="portugal" id="portugal" className="sr-only" />
                <Label htmlFor="portugal" className="cursor-pointer">
                  <div className="aspect-video bg-blue-100 rounded mb-2 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-1 w-full h-full p-1">
                      <div className="bg-blue-500 rounded"></div>
                      <div className="bg-blue-500 rounded"></div>
                      <div className="bg-blue-500 rounded"></div>
                      <div className="bg-blue-500 rounded"></div>
                    </div>
                  </div>
                  <div className="font-medium">Portugal Azulejo</div>
                  <div className="text-sm text-gray-500">Fundo com azulejos portugueses</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'spain' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="spain" id="spain" className="sr-only" />
                <Label htmlFor="spain" className="cursor-pointer">
                  <div className="aspect-video bg-gradient-to-r from-red-600 to-yellow-500 rounded mb-2 flex items-center justify-center">
                    <div className="h-8 bg-white/80 w-32 flex items-center justify-center rounded">
                      <span className="text-xl">💃</span>
                    </div>
                  </div>
                  <div className="font-medium">Espanha Flamenca</div>
                  <div className="text-sm text-gray-500">Cores quentes e ícones de dança</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'china' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="china" id="china" className="sr-only" />
                <Label htmlFor="china" className="cursor-pointer">
                  <div className="aspect-video bg-red-700 rounded mb-2 flex items-center justify-center">
                    <div className="w-full h-full p-2 flex flex-col items-center justify-center">
                      <div className="text-xl text-yellow-500">🏮</div>
                      <div className="h-4 w-16 bg-yellow-500 my-1 rounded"></div>
                    </div>
                  </div>
                  <div className="font-medium">China Tradicional</div>
                  <div className="text-sm text-gray-500">Fundo vermelho e dourado com lanternas</div>
                </Label>
              </div>
            </RadioGroup>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="creative">
          <ScrollArea className="h-[450px] pr-4">
            <RadioGroup
              value={pageStyle.type}
              onValueChange={(value) => handleStyleChange(value as PageStyle['type'])}
              className="grid grid-cols-2 gap-4"
            >
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'notebook' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="notebook" id="notebook" className="sr-only" />
                <Label htmlFor="notebook" className="cursor-pointer">
                  <div className="aspect-video bg-blue-50 rounded mb-2 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-blue-100 bg-[linear-gradient(transparent_calc(100%/24),#edf2f7_calc(100%/24))] bg-[size:100%_calc(100%/12)]"></div>
                    <div className="z-10 bg-yellow-100 transform rotate-2 p-1 shadow-sm w-20 h-10">
                      <div className="h-2 w-12 bg-gray-400 rounded m-1"></div>
                      <div className="h-2 w-8 bg-gray-400 rounded m-1"></div>
                    </div>
                  </div>
                  <div className="font-medium">Caderno de Colégio</div>
                  <div className="text-sm text-gray-500">Fundo de folha pautada com rabiscos</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'meme' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="meme" id="meme" className="sr-only" />
                <Label htmlFor="meme" className="cursor-pointer">
                  <div className="aspect-video bg-white rounded mb-2 flex items-center justify-center">
                    <div className="flex flex-col w-full p-2 space-y-2">
                      <div className="h-8 border-2 border-black p-1 flex items-center">
                        <span className="text-xs">NÃO ACREDITO QUE ELE FEZ ISSO</span>
                      </div>
                      <div className="h-8 border-2 border-black p-1 flex items-center">
                        <span className="text-xs">O BRASIL NÃO É PARA AMADORES</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">Estilo Meme BR</div>
                  <div className="text-sm text-gray-500">Cards com molduras de memes brasileiros</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'windows98' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="windows98" id="windows98" className="sr-only" />
                <Label htmlFor="windows98" className="cursor-pointer">
                  <div className="aspect-video bg-teal-700 rounded mb-2 flex items-center justify-center">
                    <div className="w-32 h-24 bg-gray-300 border-2 border-t-white border-l-white border-b-gray-700 border-r-gray-700 p-1">
                      <div className="h-4 w-full bg-blue-800 flex items-center px-1">
                        <span className="text-white text-[10px]">Meu Computador</span>
                      </div>
                      <div className="p-2 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 bg-gray-100"></div>
                        <div className="h-2 w-12 bg-gray-600 mt-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">Windows 98 Retrô</div>
                  <div className="text-sm text-gray-500">Interface estilo sistema antigo</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'bakery' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="bakery" id="bakery" className="sr-only" />
                <Label htmlFor="bakery" className="cursor-pointer">
                  <div className="aspect-video bg-amber-100 rounded mb-2 flex items-center justify-center">
                    <div className="w-full h-full p-2 flex flex-col items-center justify-center space-y-2">
                      <div className="text-xl">🍞</div>
                      <div className="h-6 w-24 bg-amber-200 border border-dashed border-amber-500 rounded p-1 flex items-center justify-center">
                        <span className="text-amber-800 text-xs">Pão Francês</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">Papel de Pão</div>
                  <div className="text-sm text-gray-500">Textura de saco de padaria</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'linkverse' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="linkverse" id="linkverse" className="sr-only" />
                <Label htmlFor="linkverse" className="cursor-pointer">
                  <div className="aspect-video bg-indigo-900 rounded mb-2 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0">
                      <div className="absolute w-1 h-1 bg-white rounded-full top-2 left-5"></div>
                      <div className="absolute w-2 h-2 bg-white rounded-full top-8 left-10"></div>
                      <div className="absolute w-1 h-1 bg-white rounded-full top-15 right-8"></div>
                    </div>
                    <div className="w-32 h-10 bg-indigo-700/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <div className="w-28 h-6 bg-indigo-600/80 rounded-full"></div>
                    </div>
                  </div>
                  <div className="font-medium">Linkverso</div>
                  <div className="text-sm text-gray-500">Visual galáctico com efeitos flutuantes</div>
                </Label>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${pageStyle.type === 'stepbystep' ? 'border-purple-500' : 'border-gray-200'}`}>
                <RadioGroupItem value="stepbystep" id="stepbystep" className="sr-only" />
                <Label htmlFor="stepbystep" className="cursor-pointer">
                  <div className="aspect-video bg-white rounded mb-2 flex items-center justify-center">
                    <div className="w-full h-full p-3 flex flex-col space-y-2">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">1</div>
                        <div className="h-0 flex-1 border-t border-dashed border-blue-300"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">2</div>
                        <div className="h-0 flex-1 border-t border-dashed border-blue-300"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">3</div>
                        <div className="h-0 flex-1 border-t border-dashed border-blue-300"></div>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">Passo a Passo</div>
                  <div className="text-sm text-gray-500">Linha pontilhada como guia sequencial</div>
                </Label>
              </div>
            </RadioGroup>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
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
                    type="button"
                    className={`p-2 border rounded-md flex items-center justify-center ${pageStyle.cardSettings?.aspectRatio === 'portrait' ? 'bg-purple-100 border-purple-500' : 'border-gray-200'}`}
                    onClick={() => handleCardSettingChange('aspectRatio', 'portrait')}
                  >
                    <div className="w-8 h-12 bg-gray-300 rounded"></div>
                    <span className="text-xs ml-2">Vertical</span>
                  </button>
                  <button 
                    type="button"
                    className={`p-2 border rounded-md flex items-center justify-center ${pageStyle.cardSettings?.aspectRatio === 'square' ? 'bg-purple-100 border-purple-500' : 'border-gray-200'}`}
                    onClick={() => handleCardSettingChange('aspectRatio', 'square')}
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    <span className="text-xs ml-2">Quadrado</span>
                  </button>
                  <button
                    type="button"
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
      
      {/* Magazine Style Settings */}
      {pageStyle.type === 'magazine' && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h4 className="font-medium text-lg mb-4">Configurações do Card Magazine</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showMedia" className="font-medium">Mostrar mídia em tela cheia</Label>
                  <p className="text-sm text-gray-500">Imagem ou vídeo em todo o card</p>
                </div>
                <Switch 
                  id="showMedia" 
                  checked={pageStyle.cardSettings?.showMedia ?? true}
                  onCheckedChange={(checked) => handleCardSettingChange('showMedia', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showGradient" className="font-medium">Usar gradiente</Label>
                  <p className="text-sm text-gray-500">Adiciona gradiente sobre a mídia</p>
                </div>
                <Switch 
                  id="showGradient" 
                  checked={pageStyle.cardSettings?.showGradient ?? false}
                  onCheckedChange={(checked) => handleCardSettingChange('showGradient', checked)}
                />
              </div>
              
              {pageStyle.cardSettings?.showGradient && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="gradientColor" className="font-medium">Cor do gradiente</Label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        id="gradientColor"
                        value={pageStyle.cardSettings?.gradientColor || "#000000"}
                        onChange={(e) => handleCardSettingChange('gradientColor', e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <span>{pageStyle.cardSettings?.gradientColor || "#000000"}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gradientOpacity" className="font-medium">Opacidade do gradiente</Label>
                    <div className="flex items-center gap-4">
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
                      <span>{pageStyle.cardSettings?.gradientOpacity}</span>
                    </div>
                  </div>
                </>
              )}
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
