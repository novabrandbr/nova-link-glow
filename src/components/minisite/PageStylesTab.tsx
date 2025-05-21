
import React from 'react';
import { PageStyle } from '@/pages/Dashboard';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';

type PageStylesTabProps = {
  pageStyle: PageStyle;
  setPageStyle: React.Dispatch<React.SetStateAction<PageStyle>>;
};

const PageStylesTab: React.FC<PageStylesTabProps> = ({ pageStyle, setPageStyle }) => {
  const handleStyleChange = (type: PageStyle['type']) => {
    setPageStyle(prev => ({ ...prev, type }));
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
              <div className="grid grid-cols-2 gap-2 p-2 w-full">
                <div className="bg-purple-600 h-8 rounded"></div>
                <div className="bg-purple-600 h-8 rounded"></div>
                <div className="bg-purple-600 h-8 rounded"></div>
                <div className="bg-purple-600 h-8 rounded"></div>
              </div>
            </div>
            <div className="font-medium">Estilo Netflix</div>
            <div className="text-sm text-gray-500">Layout em grade com 2 links por linha</div>
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
      </RadioGroup>
      
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h4 className="font-medium">Personalização de botões</h4>
        <div className="space-y-2">
          <Label htmlFor="buttonColor">Cor dos botões</Label>
          <Input 
            type="color"
            id="buttonColor"
            defaultValue="#6A0DAD"
            className="w-16 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default PageStylesTab;
