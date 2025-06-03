
import React, { useState, useRef } from 'react';
import { LinkType } from '@/pages/Dashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Upload, GripVertical } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LinksTabProps {
  links: LinkType[];
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
}

const LinksTab: React.FC<LinksTabProps> = ({ links, setLinks }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const addLink = () => {
    const newLink: LinkType = {
      id: Date.now().toString(),
      title: 'Novo Link',
      url: '',
      active: true,
      color: '#6A0DAD',
      mediaType: 'none',
      textAlign: 'center',
      titleColor: '#000000',
      overlayColor: '#000000',
      overlayOpacity: 0.5
    };
    setLinks([...links, newLink]);
    setEditingId(newLink.id);
  };

  const updateLink = (id: string, updates: Partial<LinkType>) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, ...updates } : link
    ));
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleMediaUpload = (linkId: string, file: File) => {
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
        const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
        updateLink(linkId, {
          mediaType,
          mediaUrl: event.target.result.toString()
        });
        toast({
          title: "Mídia carregada",
          description: "A mídia foi adicionada ao link com sucesso."
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const labelPositions = [
    { value: 'top-left', label: 'Superior Esquerda' },
    { value: 'top-center', label: 'Superior Centro' },
    { value: 'top-right', label: 'Superior Direita' },
    { value: 'center-left', label: 'Centro Esquerda' },
    { value: 'center-center', label: 'Centro' },
    { value: 'center-right', label: 'Centro Direita' },
    { value: 'bottom-left', label: 'Inferior Esquerda' },
    { value: 'bottom-center', label: 'Inferior Centro' },
    { value: 'bottom-right', label: 'Inferior Direita' }
  ];

  const textAlignOptions = [
    { value: 'left', label: 'Esquerda' },
    { value: 'center', label: 'Centro' },
    { value: 'right', label: 'Direita' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Links</h2>
        <Button onClick={addLink} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Link
        </Button>
      </div>

      <div className="space-y-4">
        {links.map((link, index) => (
          <Card key={link.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                  <CardTitle className="text-lg">
                    {editingId === link.id ? (
                      <Input
                        value={link.title}
                        onChange={(e) => updateLink(link.id, { title: e.target.value })}
                        onBlur={() => setEditingId(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingId(null)}
                        autoFocus
                        className="text-lg font-semibold"
                      />
                    ) : (
                      <span 
                        onClick={() => setEditingId(link.id)}
                        className="cursor-pointer hover:text-purple-600"
                      >
                        {link.title}
                      </span>
                    )}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={link.active}
                    onCheckedChange={(checked) => updateLink(link.id, { active: checked })}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteLink(link.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`url-${link.id}`}>URL</Label>
                  <Input
                    id={`url-${link.id}`}
                    value={link.url}
                    onChange={(e) => updateLink(link.id, { url: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`color-${link.id}`}>Cor do botão</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id={`color-${link.id}`}
                      value={link.color}
                      onChange={(e) => updateLink(link.id, { color: e.target.value })}
                      className="w-12 h-8 rounded border"
                    />
                    <Input
                      value={link.color}
                      onChange={(e) => updateLink(link.id, { color: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`titleColor-${link.id}`}>Cor do título</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id={`titleColor-${link.id}`}
                      value={link.titleColor || '#000000'}
                      onChange={(e) => updateLink(link.id, { titleColor: e.target.value })}
                      className="w-12 h-8 rounded border"
                    />
                    <Input
                      value={link.titleColor || '#000000'}
                      onChange={(e) => updateLink(link.id, { titleColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`textAlign-${link.id}`}>Alinhamento do título</Label>
                  <Select
                    value={link.textAlign || 'center'}
                    onValueChange={(value: 'left' | 'center' | 'right') => 
                      updateLink(link.id, { textAlign: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {textAlignOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mídia */}
              <div className="space-y-4">
                <h4 className="font-medium">Mídia</h4>
                <div className="space-y-2">
                  <Label>Tipo de mídia</Label>
                  <Select
                    value={link.mediaType || 'none'}
                    onValueChange={(value: 'none' | 'image' | 'video') => 
                      updateLink(link.id, { mediaType: value, mediaUrl: value === 'none' ? undefined : link.mediaUrl })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma</SelectItem>
                      <SelectItem value="image">Imagem</SelectItem>
                      <SelectItem value="video">Vídeo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {link.mediaType !== 'none' && (
                  <div className="space-y-2">
                    {link.mediaUrl ? (
                      <div className="space-y-2">
                        {link.mediaType === 'image' ? (
                          <img src={link.mediaUrl} alt="Link media" className="w-full h-32 object-cover rounded" />
                        ) : (
                          <video src={link.mediaUrl} className="w-full h-32 object-cover rounded" autoPlay muted loop />
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRefs.current[link.id]?.click()}
                          className="w-full"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Substituir {link.mediaType === 'image' ? 'imagem' : 'vídeo'}
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => fileInputRefs.current[link.id]?.click()}
                        className="w-full h-32 border-dashed"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload {link.mediaType === 'image' ? 'imagem' : 'vídeo'}
                      </Button>
                    )}
                    <input
                      type="file"
                      ref={(el) => fileInputRefs.current[link.id] = el}
                      className="hidden"
                      accept={link.mediaType === 'image' ? 'image/*' : 'video/*'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleMediaUpload(link.id, file);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Rótulo */}
              <div className="space-y-4">
                <h4 className="font-medium">Rótulo</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`label-${link.id}`}>Texto do rótulo</Label>
                    <Input
                      id={`label-${link.id}`}
                      value={link.label || ''}
                      onChange={(e) => updateLink(link.id, { label: e.target.value })}
                      placeholder="Ex: Novo, Top 10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`labelColor-${link.id}`}>Cor do rótulo</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id={`labelColor-${link.id}`}
                        value={link.labelColor || '#FF0000'}
                        onChange={(e) => updateLink(link.id, { labelColor: e.target.value })}
                        className="w-12 h-8 rounded border"
                      />
                      <Input
                        value={link.labelColor || '#FF0000'}
                        onChange={(e) => updateLink(link.id, { labelColor: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {link.label && (
                  <div className="space-y-2">
                    <Label htmlFor={`labelPosition-${link.id}`}>Posição do rótulo</Label>
                    <Select
                      value={link.labelPosition || 'top-center'}
                      onValueChange={(value: any) => updateLink(link.id, { labelPosition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {labelPositions.map(position => (
                          <SelectItem key={position.value} value={position.value}>
                            {position.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Overlay */}
              <div className="space-y-4">
                <h4 className="font-medium">Overlay</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`overlayColor-${link.id}`}>Cor do overlay</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id={`overlayColor-${link.id}`}
                        value={link.overlayColor || '#000000'}
                        onChange={(e) => updateLink(link.id, { overlayColor: e.target.value })}
                        className="w-12 h-8 rounded border"
                      />
                      <Input
                        value={link.overlayColor || '#000000'}
                        onChange={(e) => updateLink(link.id, { overlayColor: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`overlayOpacity-${link.id}`}>
                      Opacidade: {Math.round((link.overlayOpacity || 0.5) * 100)}%
                    </Label>
                    <input
                      type="range"
                      id={`overlayOpacity-${link.id}`}
                      min="0"
                      max="1"
                      step="0.1"
                      value={link.overlayOpacity || 0.5}
                      onChange={(e) => updateLink(link.id, { overlayOpacity: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {links.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Nenhum link criado ainda.</p>
            <p>Clique em "Adicionar Link" para começar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinksTab;
