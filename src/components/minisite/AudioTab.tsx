
import React, { useRef } from 'react';
import { AudioSettings } from '@/pages/Dashboard';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, Volume2, Link, Music } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type AudioTabProps = {
  audioSettings: AudioSettings;
  setAudioSettings: React.Dispatch<React.SetStateAction<AudioSettings>>;
};

const AudioTab: React.FC<AudioTabProps> = ({ audioSettings, setAudioSettings }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (field: keyof AudioSettings, value: any) => {
    setAudioSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 10MB.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAudioSettings(prev => ({
          ...prev,
          source: 'upload',
          url: event.target.result.toString()
        }));
        toast({
          title: "Áudio carregado",
          description: "Seu áudio foi carregado com sucesso."
        });
      }
    };
    reader.readAsDataURL(file);
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
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Selecionar arquivo
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="audio/*"
              onChange={handleAudioUpload}
            />
            <p className="text-xs text-gray-500">Formatos suportados: MP3, WAV, OGG. Tamanho máximo: 10MB.</p>
            
            {audioSettings.url && audioSettings.source === 'upload' && (
              <div className="mt-4 p-2 bg-gray-50 rounded border flex items-center">
                <Music className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-sm truncate">Arquivo carregado</span>
                <audio controls className="ml-auto h-8 w-28">
                  <source src={audioSettings.url} type="audio/mpeg" />
                </audio>
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="gallery" id="gallery" />
          <Label htmlFor="gallery">Escolher da galeria</Label>
        </div>
        
        {audioSettings.source === 'gallery' && (
          <div className="ml-6 grid grid-cols-2 gap-3">
            <div 
              className="border rounded-lg p-3 hover:border-purple-500 cursor-pointer"
              onClick={() => {
                setAudioSettings(prev => ({
                  ...prev,
                  url: "https://example.com/lofi-beats.mp3"
                }));
                toast({
                  title: "Música selecionada",
                  description: "Lo-Fi Beats selecionada com sucesso"
                });
              }}
            >
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
            <div 
              className="border rounded-lg p-3 hover:border-purple-500 cursor-pointer"
              onClick={() => {
                setAudioSettings(prev => ({
                  ...prev,
                  url: "https://example.com/ambient.mp3"
                }));
                toast({
                  title: "Música selecionada",
                  description: "Ambient selecionada com sucesso"
                });
              }}
            >
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
            <div 
              className="border rounded-lg p-3 hover:border-purple-500 cursor-pointer"
              onClick={() => {
                setAudioSettings(prev => ({
                  ...prev,
                  url: "https://example.com/pop-beat.mp3"
                }));
                toast({
                  title: "Música selecionada",
                  description: "Pop Beat selecionada com sucesso"
                });
              }}
            >
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
            <div 
              className="border rounded-lg p-3 hover:border-purple-500 cursor-pointer"
              onClick={() => {
                setAudioSettings(prev => ({
                  ...prev,
                  url: "https://example.com/acoustic.mp3"
                }));
                toast({
                  title: "Música selecionada",
                  description: "Acoustic selecionada com sucesso"
                });
              }}
            >
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
            <div className="flex items-center space-x-2">
              <Link className="h-4 w-4 text-gray-500" />
              <Input 
                value={audioSettings.url}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://example.com/audio.mp3 ou SoundCloud URL"
              />
            </div>
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
