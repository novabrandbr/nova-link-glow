
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageStyle } from "@/pages/Dashboard";
import { toast } from "@/hooks/use-toast";
import { Sparkles, LoaderCircle } from "lucide-react";

interface AITabProps {
  pageStyle: PageStyle;
  setPageStyle: React.Dispatch<React.SetStateAction<PageStyle>>;
}

const AITab: React.FC<AITabProps> = ({ pageStyle, setPageStyle }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateStyle = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt vazio",
        description: "Por favor, descreva o estilo que você deseja gerar.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random style based on the prompt keywords
      const newStyle = processPrompt(prompt);
      
      setPageStyle(prevStyle => ({
        ...prevStyle,
        ...newStyle
      }));
      
      toast({
        title: "Estilo gerado com sucesso!",
        description: "O novo estilo foi aplicado à sua página.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar estilo",
        description: "Ocorreu um erro ao processar seu prompt. Tente novamente.",
        variant: "destructive",
      });
      console.error("Error generating style:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const processPrompt = (promptText: string) => {
    // This is a simple keyword-based style generator
    // In a real implementation, this would call an actual AI service
    const promptLower = promptText.toLowerCase();
    
    let newStyle: Partial<PageStyle> = {};
    
    // Style type detection based on keywords
    if (promptLower.includes('netflix') || promptLower.includes('filme') || promptLower.includes('série')) {
      newStyle.type = 'netflix';
    } else if (promptLower.includes('revista') || promptLower.includes('magazine')) {
      newStyle.type = 'magazine';
    } else if (promptLower.includes('polaroid') || promptLower.includes('foto') || promptLower.includes('instantânea')) {
      newStyle.type = 'polaroid';
    } else if (promptLower.includes('arcade') || promptLower.includes('game') || promptLower.includes('jogo')) {
      newStyle.type = 'arcade';
    } else if (promptLower.includes('vintage') || promptLower.includes('retrô') || promptLower.includes('vhs')) {
      newStyle.type = 'vhs';
    } else if (promptLower.includes('y2k') || promptLower.includes('2000')) {
      newStyle.type = 'y2k';
    } else if (promptLower.includes('meme') || promptLower.includes('humor')) {
      newStyle.type = 'meme';
    } else if (promptLower.includes('windows') || promptLower.includes('98') || promptLower.includes('retro')) {
      newStyle.type = 'windows98';
    }
    
    // Political styles
    if (promptLower.includes('lula') || promptLower.includes('pt') || promptLower.includes('vermelho')) {
      newStyle.type = 'lula';
    } else if (promptLower.includes('bolsonaro') || promptLower.includes('mito') || promptLower.includes('verde e amarelo')) {
      newStyle.type = 'bolsonaro';
    } else if (promptLower.includes('trump') || promptLower.includes('américa') || promptLower.includes('eua')) {
      newStyle.type = 'trump';
    } else if (promptLower.includes('putin') || promptLower.includes('rússia')) {
      newStyle.type = 'putin';
    }
    
    // Countries
    if (promptLower.includes('brasil') || promptLower.includes('tropical')) {
      newStyle.type = 'tropical';
    } else if (promptLower.includes('eua') || promptLower.includes('estados unidos')) {
      newStyle.type = 'usa';
    } else if (promptLower.includes('soviética') || promptLower.includes('comunismo')) {
      newStyle.type = 'soviet';
    } else if (promptLower.includes('frança') || promptLower.includes('paris')) {
      newStyle.type = 'france';
    } else if (promptLower.includes('portugal') || promptLower.includes('azulejo')) {
      newStyle.type = 'portugal';
    } else if (promptLower.includes('espanha') || promptLower.includes('flamenco')) {
      newStyle.type = 'spain';
    } else if (promptLower.includes('china') || promptLower.includes('tradicional')) {
      newStyle.type = 'china';
    }
    
    // Card settings based on keywords
    if (promptLower.includes('label') || promptLower.includes('rótulo')) {
      newStyle.cardSettings = {
        ...newStyle.cardSettings,
        showLabels: true
      };
    }
    
    if (promptLower.includes('overlay') || promptLower.includes('sobreposição')) {
      newStyle.cardSettings = {
        ...newStyle.cardSettings,
        showOverlay: true,
        showGradient: true,
        gradientColor: '#000000',
        gradientOpacity: 0.5
      };
    }
    
    if (promptLower.includes('vertical')) {
      newStyle.cardSettings = {
        ...newStyle.cardSettings,
        aspectRatio: 'portrait'
      };
    } else if (promptLower.includes('quadrado')) {
      newStyle.cardSettings = {
        ...newStyle.cardSettings,
        aspectRatio: 'square'
      };
    } else if (promptLower.includes('horizontal')) {
      newStyle.cardSettings = {
        ...newStyle.cardSettings,
        aspectRatio: 'landscape'
      };
    }
    
    // Button color based on keywords
    if (promptLower.includes('vermelho')) {
      newStyle.buttonColor = '#FF0000';
    } else if (promptLower.includes('azul')) {
      newStyle.buttonColor = '#0000FF';
    } else if (promptLower.includes('verde')) {
      newStyle.buttonColor = '#00FF00';
    } else if (promptLower.includes('roxo') || promptLower.includes('violeta')) {
      newStyle.buttonColor = '#800080';
    } else if (promptLower.includes('laranja')) {
      newStyle.buttonColor = '#FFA500';
    } else if (promptLower.includes('amarelo')) {
      newStyle.buttonColor = '#FFFF00';
    } else if (promptLower.includes('preto')) {
      newStyle.buttonColor = '#000000';
    } else if (promptLower.includes('branco')) {
      newStyle.buttonColor = '#FFFFFF';
    }
    
    return newStyle;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Geração de Estilo com IA</h2>
        <p className="text-gray-600 mb-6">
          Descreva o estilo de página que você deseja criar e a Inteligência Artificial
          irá gerar um layout personalizado baseado na sua descrição.
        </p>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Ex: Quero um estilo inspirado em games arcade dos anos 80, com cores neon e aspecto retrô..."
          className="min-h-[150px]"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <Button 
          onClick={generateStyle} 
          className="w-full bg-[#6A0DAD] hover:bg-[#C9A0FF] hover:bg-gradient-to-r from-[#C9A0FF] to-[#6A0DAD]"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Gerando estilo...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Gerar Estilo com IA
            </>
          )}
        </Button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-semibold mb-2">Sugestões de prompts:</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• "Crie um estilo Netflix com cards horizontais e overlay gradiente escuro"</li>
          <li>• "Quero um tema brasileiro tropical com cores vibrantes"</li>
          <li>• "Estilo Y2K com elementos brilhantes e cores dos anos 2000"</li>
          <li>• "Layout Windows 98 retrô com aparência de sistema operacional antigo"</li>
          <li>• "Design de revista de moda com imagens grandes e elegantes"</li>
        </ul>
      </div>
    </div>
  );
};

export default AITab;
