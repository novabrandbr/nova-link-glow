
import React, { useState } from 'react';
import { UserProfile } from '@/pages/Dashboard';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type PageStylesTabProps = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
};

type StyleOption = {
  id: string;
  name: string;
  description: string;
};

// Valid style IDs for proper TypeScript compliance
const validStyleIds = [
  "traditional", "novabrandflix", "magazine", "polaroid", "arcade", "recipe", "reality", "y2k", 
  "marketing", "political", "brazilian", "american", "stepbystep", "vhs", "menu", "orbit"
] as const;

const PageStylesTab: React.FC<PageStylesTabProps> = ({ profile, setProfile }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleStyleChange = (styleId: string) => {
    if (validStyleIds.includes(styleId as any)) {
      setProfile(prev => ({ ...prev, pageStyle: styleId as any }));
    }
  };

  const styleCategories = {
    classics: [
      { id: "traditional", name: "Tradicional", description: "Layout clássico e elegante" },
      { id: "novabrandflix", name: "Nova Brand Flix", description: "Estilo cinematográfico" },
      { id: "magazine", name: "Revista", description: "Layout editorial moderno" },
      { id: "polaroid", name: "Polaroid", description: "Estilo vintage fotográfico" }
    ],
    modern: [
      { id: "arcade", name: "Arcade", description: "Visual retrô gaming" },
      { id: "recipe", name: "Receita", description: "Layout culinário" },
      { id: "reality", name: "Reality", description: "Estilo reality show" },
      { id: "y2k", name: "Y2K", description: "Nostalgia dos anos 2000" }
    ],
    business: [
      { id: "marketing", name: "Marketing", description: "Layout profissional" },
      { id: "political", name: "Político", description: "Estilo institucional" },
      { id: "brazilian", name: "Brasileiro", description: "Visual tropical" },
      { id: "american", name: "Americano", description: "Estilo americano" }
    ],
    creative: [
      { id: "stepbystep", name: "Passo a Passo", description: "Layout tutorial" },
      { id: "vhs", name: "VHS", description: "Estética retrô" },
      { id: "menu", name: "Menu", description: "Estilo cardápio" },
      { id: "orbit", name: "Órbita", description: "Design espacial" }
    ]
  };

  const renderStylePreview = (style: StyleOption) => {
    const getPreviewStyle = (styleId: string) => {
      switch (styleId) {
        case 'traditional':
          return 'bg-gradient-to-b from-gray-50 to-gray-100 border-2 border-gray-300';
        case 'novabrandflix':
          return 'bg-gradient-to-br from-red-900 via-black to-red-800';
        case 'magazine':
          return 'bg-gradient-to-r from-blue-500 to-purple-600';
        case 'polaroid':
          return 'bg-gradient-to-b from-yellow-100 to-orange-200 border-4 border-white shadow-lg';
        case 'arcade':
          return 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500';
        case 'recipe':
          return 'bg-gradient-to-b from-orange-100 to-yellow-200';
        case 'reality':
          return 'bg-gradient-to-r from-gold-400 to-yellow-500';
        case 'y2k':
          return 'bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500';
        case 'marketing':
          return 'bg-gradient-to-r from-blue-600 to-indigo-700';
        case 'political':
          return 'bg-gradient-to-b from-red-700 to-blue-700';
        case 'brazilian':
          return 'bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500';
        case 'american':
          return 'bg-gradient-to-r from-red-600 via-white to-blue-600';
        case 'stepbystep':
          return 'bg-gradient-to-b from-gray-200 to-gray-400';
        case 'vhs':
          return 'bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900';
        case 'menu':
          return 'bg-gradient-to-b from-amber-100 to-orange-200';
        case 'orbit':
          return 'bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900';
        default:
          return 'bg-gray-100';
      }
    };

    return (
      <div className="space-y-2">
        <div className={`h-20 w-full rounded-lg ${getPreviewStyle(style.id)} flex items-center justify-center text-xs font-medium text-white shadow-inner`}>
          <div className="text-center">
            <div className="w-8 h-1 bg-white/60 mx-auto mb-1 rounded"></div>
            <div className="w-12 h-1 bg-white/40 mx-auto mb-1 rounded"></div>
            <div className="w-6 h-1 bg-white/60 mx-auto rounded"></div>
          </div>
        </div>
        <div className="text-center">
          <h4 className="font-medium text-sm">{style.name}</h4>
          <p className="text-xs text-gray-500">{style.description}</p>
        </div>
      </div>
    );
  };

  const renderStyleGrid = (styles: StyleOption[]) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {styles.map(style => (
          <div 
            key={style.id}
            className={`cursor-pointer p-3 rounded-lg border-2 transition-all hover:shadow-md ${
              profile.pageStyle === style.id 
                ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => handleStyleChange(style.id)}
          >
            {renderStylePreview(style)}
          </div>
        ))}
      </div>
    );
  };

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'classics', name: 'Clássicos' },
    { id: 'modern', name: 'Modernos' },
    { id: 'business', name: 'Negócios' },
    { id: 'creative', name: 'Criativos' }
  ];

  const getStylesToShow = () => {
    if (selectedCategory === 'all') {
      return [...styleCategories.classics, ...styleCategories.modern, ...styleCategories.business, ...styleCategories.creative];
    }
    return styleCategories[selectedCategory as keyof typeof styleCategories] || [];
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Estilos de Página</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {renderStyleGrid(getStylesToShow())}
        </div>
      </div>
    </div>
  );
};

export default PageStylesTab;
