
import React, { useRef, useState } from 'react';
import { LinkType } from '@/pages/Dashboard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical, Image, Video, Link as LinkIcon, ArrowDown, ArrowUp, X, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';

type LinksTabProps = {
  links: LinkType[];
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
};

const LinksTab: React.FC<LinksTabProps> = ({ links, setLinks }) => {
  const { toast } = useToast();
  const [draggedItem, setDraggedItem] = React.useState<number | null>(null);
  const [customLabel, setCustomLabel] = React.useState<string>('');
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [overlaySettings, setOverlaySettings] = useState<{[key: string]: {color: string, opacity: number}}>({});

  const addNewLink = () => {
    const newLink: LinkType = {
      id: Date.now().toString(),
      title: '',
      url: '',
      active: true,
      color: '#6A0DAD',
      label: 'Novidade',
      labelColor: '#FF0000',
      labelPosition: 'top',
      textAlign: 'center',
      mediaType: 'none',
      description: '',
      titleColor: '#000000' // Add default title color
    };
    
    setLinks([...links, newLink]);
  };

  const updateLink = (id: string, field: keyof LinkType, value: any) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    toast({
      title: "Link removido",
      description: "O link foi removido com sucesso.",
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;
    
    const newLinks = [...links];
    const draggedLink = newLinks[draggedItem];
    
    // Remove the dragged item
    newLinks.splice(draggedItem, 1);
    // Insert it at the new position
    newLinks.splice(index, 0, draggedLink);
    
    setLinks(newLinks);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB for images, 20MB for videos)
    const maxSize = type === 'image' ? 5 * 1024 * 1024 : 20 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "Arquivo muito grande",
        description: `O tamanho máximo permitido é ${type === 'image' ? '5MB' : '20MB'}.`,
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateLink(id, 'mediaType', type);
        updateLink(id, 'mediaUrl', event.target.result.toString());
        toast({
          title: "Upload concluído",
          description: `${type === 'image' ? 'Imagem' : 'Vídeo'} carregado com sucesso.`
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCustomLabelAdd = (id: string) => {
    if (customLabel.trim()) {
      updateLink(id, 'label', customLabel.trim());
      setCustomLabel('');
    }
  };

  const triggerFileInput = (id: string, type: string) => {
    if (fileInputRefs.current[`${type}-${id}`]) {
      fileInputRefs.current[`${type}-${id}`]?.click();
    }
  };
  
  const handleOverlayChange = (id: string, field: 'color' | 'opacity', value: string | number) => {
    setOverlaySettings(prev => ({
      ...prev,
      [id]: {
        ...prev[id] || { color: '#000000', opacity: 0.5 },
        [field]: value
      }
    }));
    
    // Update link with overlay settings
    if (field === 'color') {
      updateLink(id, 'overlayColor', value as string);
    } else if (field === 'opacity') {
      updateLink(id, 'overlayOpacity', value as number);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Meus Links</h3>
        <Button onClick={addNewLink}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar novo link
        </Button>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Arraste para reordenar os links. A aparência visual será configurada na aba "Estilos da Página".
        </p>
        
        {links.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Você ainda não tem links. Adicione seu primeiro link!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link, index) => (
              <div
                key={link.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`p-4 border rounded-lg ${draggedItem === index ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
              >
                <div className="flex items-start space-x-3">
                  <div 
                    className="cursor-move p-2 text-gray-400 hover:text-gray-600 mt-1"
                    draggable
                  >
                    <GripVertical className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor={`title-${link.id}`}>Título do link</Label>
                        <Input
                          id={`title-${link.id}`}
                          value={link.title}
                          onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                          placeholder="Ex: Meu Site"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`url-${link.id}`}>URL</Label>
                        <Input
                          id={`url-${link.id}`}
                          value={link.url}
                          onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                          placeholder="https://exemplo.com"
                        />
                      </div>
                    </div>
                    
                    {/* Media settings */}
                    <div className="space-y-2">
                      <Label>Mídia</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Select 
                            value={link.mediaType || 'none'} 
                            onValueChange={(value) => updateLink(link.id, 'mediaType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Tipo de mídia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Sem mídia</SelectItem>
                              <SelectItem value="image">Imagem</SelectItem>
                              <SelectItem value="video">Vídeo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {link.mediaType === 'image' && (
                          <div className="col-span-2 flex items-center space-x-2">
                            {!link.mediaUrl ? (
                              <Button 
                                variant="outline" 
                                className="flex items-center space-x-2"
                                onClick={() => triggerFileInput(link.id, 'image')}
                                type="button"
                              >
                                <Image className="h-4 w-4" />
                                <span>Escolher imagem</span>
                              </Button>
                            ) : (
                              <div className="flex items-center space-x-2 flex-1">
                                <div className="w-10 h-10 border rounded overflow-hidden">
                                  <img 
                                    src={link.mediaUrl} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => triggerFileInput(link.id, 'image')}
                                  type="button"
                                >
                                  Substituir
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    updateLink(link.id, 'mediaUrl', '');
                                    updateLink(link.id, 'mediaType', 'none');
                                  }}
                                  className="text-red-500"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                            <Input
                              id={`image-${link.id}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(link.id, e, 'image')}
                              ref={el => fileInputRefs.current[`image-${link.id}`] = el}
                            />
                          </div>
                        )}
                        
                        {link.mediaType === 'video' && (
                          <div className="col-span-2 flex items-center space-x-2">
                            {!link.mediaUrl ? (
                              <Button 
                                variant="outline" 
                                className="flex items-center space-x-2"
                                onClick={() => triggerFileInput(link.id, 'video')}
                                type="button"
                              >
                                <Video className="h-4 w-4" />
                                <span>Escolher vídeo</span>
                              </Button>
                            ) : (
                              <div className="flex items-center space-x-2 flex-1">
                                <video 
                                  src={link.mediaUrl} 
                                  className="w-10 h-10 object-cover border rounded" 
                                  muted 
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => triggerFileInput(link.id, 'video')}
                                  type="button"
                                >
                                  Substituir
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    updateLink(link.id, 'mediaUrl', '');
                                    updateLink(link.id, 'mediaType', 'none');
                                  }}
                                  className="text-red-500"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                            <Input
                              id={`video-${link.id}`}
                              type="file"
                              accept="video/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(link.id, e, 'video')}
                              ref={el => fileInputRefs.current[`video-${link.id}`] = el}
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Media overlay settings */}
                      {(link.mediaType === 'image' || link.mediaType === 'video') && link.mediaUrl && (
                        <div className="mt-3 p-3 border rounded-md space-y-3">
                          <Label>Configurações de overlay</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label htmlFor={`overlay-color-${link.id}`}>Cor do overlay</Label>
                              <div className="flex items-center space-x-2">
                                <input
                                  id={`overlay-color-${link.id}`}
                                  type="color"
                                  value={link.overlayColor || '#000000'}
                                  onChange={(e) => handleOverlayChange(link.id, 'color', e.target.value)}
                                  className="w-10 h-8 rounded border border-gray-300 p-0"
                                />
                                <span className="text-sm">{link.overlayColor || '#000000'}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor={`overlay-opacity-${link.id}`}>Opacidade: {(link.overlayOpacity || 0.5) * 100}%</Label>
                              <Slider
                                id={`overlay-opacity-${link.id}`}
                                min={0}
                                max={1}
                                step={0.01}
                                value={[link.overlayOpacity || 0.5]}
                                onValueChange={(vals) => handleOverlayChange(link.id, 'opacity', vals[0])}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Title color and alignment */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor={`title-color-${link.id}`}>Cor do título</Label>
                        <div className="flex items-center space-x-2">
                          <input
                            id={`title-color-${link.id}`}
                            type="color"
                            value={link.titleColor || '#000000'}
                            onChange={(e) => updateLink(link.id, 'titleColor', e.target.value)}
                            className="w-10 h-8 rounded border border-gray-300 p-0"
                          />
                          <span className="text-sm">{link.titleColor || '#000000'}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label>Alinhamento do título</Label>
                        <div className="flex items-center space-x-4">
                          <Button 
                            type="button" 
                            variant={link.textAlign === 'left' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => updateLink(link.id, 'textAlign', 'left')}
                            className="flex-1"
                          >
                            <AlignLeft className="h-4 w-4 mr-1" /> Esquerda
                          </Button>
                          <Button 
                            type="button" 
                            variant={link.textAlign === 'center' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => updateLink(link.id, 'textAlign', 'center')}
                            className="flex-1"
                          >
                            <AlignCenter className="h-4 w-4 mr-1" /> Centro
                          </Button>
                          <Button 
                            type="button" 
                            variant={link.textAlign === 'right' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => updateLink(link.id, 'textAlign', 'right')}
                            className="flex-1"
                          >
                            <AlignRight className="h-4 w-4 mr-1" /> Direita
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor={`color-${link.id}`}>Cor do botão</Label>
                        <div className="flex items-center space-x-2">
                          <input
                            id={`color-${link.id}`}
                            type="color"
                            value={link.color}
                            onChange={(e) => updateLink(link.id, 'color', e.target.value)}
                            className="w-10 h-8 rounded border border-gray-300 p-0"
                          />
                          <span className="text-sm">{link.color}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`label-${link.id}`}>Rótulo</Label>
                        <Select 
                          value={link.label || 'no-label'} 
                          onValueChange={(value) => {
                            if (value === 'custom') {
                              // Show custom input field but don't change label yet
                              updateLink(link.id, 'label', '');
                            } else {
                              updateLink(link.id, 'label', value === 'no-label' ? '' : value);
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um rótulo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no-label">Sem rótulo</SelectItem>
                            <SelectItem value="Novidade">Novidade</SelectItem>
                            <SelectItem value="TOP 10">TOP 10</SelectItem>
                            <SelectItem value="Nova temporada">Nova temporada</SelectItem>
                            <SelectItem value="Em alta">Em alta</SelectItem>
                            <SelectItem value="Clique aqui">Clique aqui</SelectItem>
                            <SelectItem value="Novo curso">Novo curso</SelectItem>
                            <SelectItem value="custom">Rótulo personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {link.label === '' && (
                          <div className="mt-2 flex space-x-2">
                            <Input 
                              value={customLabel} 
                              onChange={(e) => setCustomLabel(e.target.value)}
                              placeholder="Rótulo personalizado"
                              className="flex-1"
                            />
                            <Button 
                              type="button" 
                              size="sm" 
                              onClick={() => handleCustomLabelAdd(link.id)}
                            >
                              Aplicar
                            </Button>
                          </div>
                        )}
                        
                        {link.label && (
                          <div className="mt-2 flex items-center space-x-2">
                            <Label htmlFor={`labelColor-${link.id}`} className="text-xs">Cor:</Label>
                            <input
                              id={`labelColor-${link.id}`}
                              type="color"
                              value={link.labelColor || '#FF0000'}
                              onChange={(e) => updateLink(link.id, 'labelColor', e.target.value)}
                              className="w-6 h-6 rounded border border-gray-300 p-0"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor={`position-${link.id}`}>Posição do rótulo</Label>
                        <div className="flex items-center space-x-4">
                          <Button 
                            type="button" 
                            variant={link.labelPosition === 'top' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => updateLink(link.id, 'labelPosition', 'top')}
                            className="flex-1"
                          >
                            Topo
                          </Button>
                          <Button 
                            type="button" 
                            variant={link.labelPosition === 'center' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => updateLink(link.id, 'labelPosition', 'center')}
                            className="flex-1"
                          >
                            Centro
                          </Button>
                          <Button 
                            type="button" 
                            variant={link.labelPosition === 'bottom' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => updateLink(link.id, 'labelPosition', 'bottom')}
                            className="flex-1"
                          >
                            Embaixo
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Label>Descrição (opcional)</Label>
                        <Textarea
                          placeholder="Adicione uma descrição para o link"
                          value={link.description || ''}
                          onChange={(e) => updateLink(link.id, 'description', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`active-${link.id}`} className="text-sm">Ativo</Label>
                        <Switch
                          id={`active-${link.id}`}
                          checked={link.active}
                          onCheckedChange={(checked) => updateLink(link.id, 'active', checked)}
                        />
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeLink(link.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remover
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinksTab;
