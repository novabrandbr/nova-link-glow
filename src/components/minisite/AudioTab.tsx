
import React from 'react';
import { AudioSettings } from '@/pages/Dashboard';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, Volume2 } from 'lucide-react';

type AudioTabProps = {
  audioSettings: AudioSettings;
  setAudioSettings: React.Dispatch<React.SetStateAction<AudioSettings>>;
};

const AudioTab: React.FC<AudioTabProps> = ({ audioSettings, setAudioSettings }) => {
  const handleChange = (field: keyof AudioSettings, value: any) => {
    setAudioSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">Música de Fundo</h3>
        <p className="text-sm text-gray-500">
          Adicione música de fundo à sua página para criar uma experiência mais envolvente.
        </p>
      </div>
      
      <RadioGroup
        value={audioSettings.source}
        onValueChange={(value) => handleChange('source', value)}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="upload" id="upload" />
          <Label htmlFor="upload">Fazer upload de arquivo MP3 (máximo 10MB)</Label>
        </div>
        
        {audioSettings.source === 'upload' && (
          <div className="ml-6 space-y-2">
            <Button variant="outline" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Selecionar arquivo
            </Button>
            <p className="text-xs text-gray-500">Formatos suportados: MP3, WAV. Tamanho máximo: 10MB.</p>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="gallery" id="gallery" />
          <Label htmlFor="gallery">Escolher da galeria</Label>
        </div>
        
        {audioSettings.source === 'gallery' && (
          <div className="ml-6 grid grid-cols-2 gap-3">
            <div className="border rounded-lg p-3 hover:border-purple-500 cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Volume2 className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <div className="font-medium">Lo-Fi Beats</div>
                  <div className="text-xs text-gray-500">2:34</div>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-3 hover:border-purple-500 cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Volume2 className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <div className="font-medium">Ambient</div>
                  <div className="text-xs text-gray-500">3:12</div>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-3 hover:border-purple-500 cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Volume2 className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <div className="font-medium">Pop Beat</div>
                  <div className="text-xs text-gray-500">1:45</div>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-3 hover:border-purple-500 cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Volume2 className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <div className="font-medium">Acoustic</div>
                  <div className="text-xs text-gray-500">2:20</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="external" id="external" />
          <Label htmlFor="external">Inserir link externo</Label>
        </div>
        
        {audioSettings.source === 'external' && (
          <div className="ml-6 space-y-2">
            <Input 
              value={audioSettings.url}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="https://example.com/audio.mp3 ou SoundCloud URL"
            />
            <p className="text-xs text-gray-500">Cole o link direto para um arquivo de áudio ou URL do SoundCloud.</p>
          </div>
        )}
      </RadioGroup>
      
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h4 className="font-medium">Configurações de reprodução</h4>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="autoplay" className="cursor-pointer">Auto-play (iniciar ao abrir a página)</Label>
          <Switch 
            id="autoplay"
            checked={audioSettings.autoplay}
            onCheckedChange={(checked) => handleChange('autoplay', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="loop" className="cursor-pointer">Repetição (loop)</Label>
          <Switch 
            id="loop"
            checked={audioSettings.loop}
            onCheckedChange={(checked) => handleChange('loop', checked)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="volume">Volume: {Math.round(audioSettings.volume * 100)}%</Label>
          </div>
          <Input 
            type="range"
            id="volume"
            min="0"
            max="1"
            step="0.01"
            value={audioSettings.volume}
            onChange={(e) => handleChange('volume', parseFloat(e.target.value))}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showPlayer" className="cursor-pointer">Exibir player</Label>
          <Switch 
            id="showPlayer"
            checked={audioSettings.showPlayer}
            onCheckedChange={(checked) => handleChange('showPlayer', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioTab;
