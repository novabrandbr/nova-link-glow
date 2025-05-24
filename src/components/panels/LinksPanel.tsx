import React, { useState } from "react";
import { Plus, Edit, Trash2, Move, AlignLeft, AlignCenter, AlignRight, Image, Video, Link as LinkIcon, X } from "lucide-react";
import { LinkType } from "@/pages/Dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type LinksPanelProps = {
  links: LinkType[];
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
};

const LinksPanel = ({ links, setLinks }: LinksPanelProps) => {
  const [newLink, setNewLink] = useState({ 
    title: "", 
    url: "", 
    color: "#6A0DAD", 
    label: "",
    labelColor: "#FF0000",
    labelPosition: "top-center",
    textAlign: "center",
    mediaType: "none" as 'none' | 'image' | 'video',
    mediaUrl: ""
  });
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [showCustomLabel, setShowCustomLabel] = useState<{ [key: string]: boolean }>({});
  const [customLabelText, setCustomLabelText] = useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);
  const editFileInputRefs = React.useRef<{[key: string]: HTMLInputElement | null}>({});

  const addLink = () => {
    if (!newLink.title || !newLink.url) {
      toast({
        title: "Erro",
        description: "Título e URL são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const link: LinkType = {
      id: Date.now().toString(),
      title: newLink.title,
      url: newLink.url,
      active: true,
      color: newLink.color,
      label: newLink.label || undefined,
      labelColor: newLink.labelColor,
      labelPosition: newLink.labelPosition as 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right',
      textAlign: newLink.textAlign as 'left' | 'center' | 'right',
      mediaType: newLink.mediaType,
      mediaUrl: newLink.mediaUrl
    };

    setLinks([...links, link]);
    setNewLink({ 
      title: "", 
      url: "", 
      color: "#6A0DAD", 
      label: "",
      labelColor: "#FF0000",
      labelPosition: "top-center",
      textAlign: "center",
      mediaType: "none",
      mediaUrl: ""
    });
    toast({
      title: "Link adicionado",
      description: "Seu link foi adicionado com sucesso",
    });
  };

  const updateLink = (id: string, data: Partial<LinkType>) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, ...data } : link)));
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
    toast({
      title: "Link removido",
      description: "Seu link foi removido com sucesso",
    });
  };

  const moveLink = (fromIndex: number, toIndex: number) => {
    const updatedLinks = [...links];
    const [movedItem] = updatedLinks.splice(fromIndex, 1);
    updatedLinks.splice(toIndex, 0, movedItem);
    setLinks(updatedLinks);
  };

  const handleLabelTypeChange = (id: string, labelType: string) => {
    const newShowCustomState = {...showCustomLabel};
    
    if (labelType === "custom") {
      newShowCustomState[id] = true;
      updateLink(id, { label: "" });
    } else {
      newShowCustomState[id] = false;
      updateLink(id, { label: labelType === "none" ? undefined : labelType });
    }
    
    setShowCustomLabel(newShowCustomState);
  };

  const handleNewLinkLabelTypeChange = (labelType: string) => {
    if (labelType === "custom") {
      setNewLink({...newLink, label: ""});
    } else {
      setNewLink({...newLink, label: labelType === "none" ? "" : labelType});
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
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
        setNewLink({
          ...newLink, 
          mediaType: type, 
          mediaUrl: event.target.result.toString()
        });
        
        toast({
          title: "Upload concluído",
          description: `${type === 'image' ? 'Imagem' : 'Vídeo'} carregado com sucesso.`
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEditFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
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
        updateLink(id, {
          mediaType: type,
          mediaUrl: event.target.result.toString()
        });
        
        toast({
          title: "Upload concluído",
          description: `${type === 'image' ? 'Imagem' : 'Vídeo'} substituído com sucesso.`
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Adicionar novo link</h3>
      
      <div className="space-y-4 mb-8">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Título
          </label>
          <Input
            id="title"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            placeholder="Ex: Meu Website"
          />
        </div>
        
        <div>
          <label htmlFor="url" className="block text-sm font-medium mb-1">
            URL
          </label>
          <Input
            id="url"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="Ex: https://meusite.com"
          />
        </div>
        
        <div>
          <label htmlFor="color" className="block text-sm font-medium mb-1">
            Cor do botão
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={newLink.color}
              onChange={(e) => setNewLink({ ...newLink, color: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <span>{newLink.color}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">
            Mídia
          </label>
          <Select 
            onValueChange={(value: 'none' | 'image' | 'video') => setNewLink({...newLink, mediaType: value})}
            defaultValue="none"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de mídia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sem mídia</SelectItem>
              <SelectItem value="image">Imagem</SelectItem>
              <SelectItem value="video">Vídeo</SelectItem>
            </SelectContent>
          </Select>

          {newLink.mediaType === 'image' && (
            <div className="mt-2">
              {!newLink.mediaUrl ? (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Escolher imagem
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-16 border rounded overflow-hidden">
                    <img 
                      src={newLink.mediaUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Substituir
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setNewLink({...newLink, mediaUrl: "", mediaType: "none"})}
                    className="text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'image')}
              />
            </div>
          )}

          {newLink.mediaType === 'video' && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Upload de vídeo
                </Button>
                
                {newLink.mediaUrl && newLink.mediaUrl.startsWith('data:') && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setNewLink({...newLink, mediaUrl: "", mediaType: "none"})}
                    className="text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <Input
                type="file"
                ref={videoInputRef}
                className="hidden"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
              />
              
              <div className="flex items-center space-x-2">
                <LinkIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <Input
                  placeholder="Ou cole URL do vídeo"
                  value={newLink.mediaUrl}
                  onChange={(e) => setNewLink({...newLink, mediaUrl: e.target.value, mediaType: 'video'})}
                  className="flex-1"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">
            Rótulo
          </label>
          <Select 
            onValueChange={(value) => handleNewLinkLabelTypeChange(value)}
            defaultValue="none"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolha um rótulo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sem rótulo</SelectItem>
              <SelectItem value="Novidade">Novidade</SelectItem>
              <SelectItem value="TOP 10">TOP 10</SelectItem>
              <SelectItem value="Destaque">Destaque</SelectItem>
              <SelectItem value="Promoção">Promoção</SelectItem>
              <SelectItem value="custom">Rótulo personalizado</SelectItem>
            </SelectContent>
          </Select>
          
          {newLink.label === "" && (
            <Input
              placeholder="Digite seu rótulo personalizado"
              value={newLink.label}
              onChange={(e) => setNewLink({...newLink, label: e.target.value})}
              className="mt-2"
            />
          )}
          
          <div className="mt-2">
            <label htmlFor="labelColor" className="block text-sm font-medium mb-1">
              Cor do rótulo
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                id="labelColor"
                value={newLink.labelColor}
                onChange={(e) => setNewLink({ ...newLink, labelColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <span>{newLink.labelColor}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Posição do rótulo</label>
          <Select 
            onValueChange={(value: string) => setNewLink({...newLink, labelPosition: value})}
            defaultValue={newLink.labelPosition}
          >
            <SelectTrigger>
              <SelectValue placeholder="Posição do rótulo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top-left">Topo Esquerda</SelectItem>
              <SelectItem value="top-center">Topo Centro</SelectItem>
              <SelectItem value="top-right">Topo Direita</SelectItem>
              <SelectItem value="center-left">Centro Esquerda</SelectItem>
              <SelectItem value="center-center">Centro Centro</SelectItem>
              <SelectItem value="center-right">Centro Direita</SelectItem>
              <SelectItem value="bottom-left">Inferior Esquerda</SelectItem>
              <SelectItem value="bottom-center">Inferior Centro</SelectItem>
              <SelectItem value="bottom-right">Inferior Direita</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Alinhamento do texto</label>
          <RadioGroup 
            className="flex space-x-4 items-center" 
            defaultValue={newLink.textAlign} 
            onValueChange={(value) => setNewLink({...newLink, textAlign: value})}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="left" id="left-new" />
              <Label htmlFor="left-new" className="cursor-pointer"><AlignLeft size={16} /></Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="center" id="center-new" />
              <Label htmlFor="center-new" className="cursor-pointer"><AlignCenter size={16} /></Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="right" id="right-new" />
              <Label htmlFor="right-new" className="cursor-pointer"><AlignRight size={16} /></Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          onClick={addLink}
          className="bg-[#6A0DAD] hover:bg-[#C9A0FF] hover:bg-gradient-to-r from-[#C9A0FF] to-[#6A0DAD]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar novo link
        </Button>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Seus links ({links.length})</h3>
      
      {links.length === 0 ? (
        <p className="text-gray-500">Você ainda não tem links. Adicione um link acima.</p>
      ) : (
        <div className="space-y-3">
          {links.map((link, index) => (
            <Card key={link.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Move className="text-gray-400 cursor-move" />
                    <div>
                      <h4 className="font-medium">{link.title}</h4>
                      <p className="text-sm text-gray-500">{link.url}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={link.active}
                      onCheckedChange={(checked) => updateLink(link.id, { active: checked })}
                    />
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setEditingLinkId(editingLinkId === link.id ? null : link.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteLink(link.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                
                {editingLinkId === link.id && (
                  <div className="mt-4 space-y-3 pt-3 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Título
                      </label>
                      <Input
                        value={link.title}
                        onChange={(e) => updateLink(link.id, { title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        URL
                      </label>
                      <Input
                        value={link.url}
                        onChange={(e) => updateLink(link.id, { url: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Cor do botão
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={link.color}
                          onChange={(e) => updateLink(link.id, { color: e.target.value })}
                          className="w-10 h-10 rounded cursor-pointer"
                        />
                        <span>{link.color}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium mb-1">
                        Rótulo
                      </label>
                      <Select 
                        onValueChange={(value) => handleLabelTypeChange(link.id, value)}
                        defaultValue={link.label || "none"}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Escolha um rótulo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Sem rótulo</SelectItem>
                          <SelectItem value="Novidade">Novidade</SelectItem>
                          <SelectItem value="TOP 10">TOP 10</SelectItem>
                          <SelectItem value="Destaque">Destaque</SelectItem>
                          <SelectItem value="Promoção">Promoção</SelectItem>
                          <SelectItem value="custom">Rótulo personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {showCustomLabel[link.id] && (
                        <Input
                          placeholder="Digite seu rótulo personalizado"
                          value={link.label || ""}
                          onChange={(e) => updateLink(link.id, { label: e.target.value })}
                          className="mt-2"
                        />
                      )}
                      
                      <div className="mt-2">
                        <label className="block text-sm font-medium mb-1">
                          Cor do rótulo
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={link.labelColor || "#FF0000"}
                            onChange={(e) => updateLink(link.id, { labelColor: e.target.value })}
                            className="w-10 h-10 rounded cursor-pointer"
                          />
                          <span>{link.labelColor || "#FF0000"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Posição do rótulo</label>
                      <Select 
                        onValueChange={(value: string) => updateLink(link.id, { labelPosition: value as 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' })}
                        defaultValue={link.labelPosition || "top-center"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Posição do rótulo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top-left">Topo Esquerda</SelectItem>
                          <SelectItem value="top-center">Topo Centro</SelectItem>
                          <SelectItem value="top-right">Topo Direita</SelectItem>
                          <SelectItem value="center-left">Centro Esquerda</SelectItem>
                          <SelectItem value="center-center">Centro Centro</SelectItem>
                          <SelectItem value="center-right">Centro Direita</SelectItem>
                          <SelectItem value="bottom-left">Inferior Esquerda</SelectItem>
                          <SelectItem value="bottom-center">Inferior Centro</SelectItem>
                          <SelectItem value="bottom-right">Inferior Direita</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Alinhamento do texto</label>
                      <RadioGroup 
                        className="flex space-x-4 items-center" 
                        value={link.textAlign || "center"} 
                        onValueChange={(value) => updateLink(link.id, { textAlign: value as 'left' | 'center' | 'right' })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="left" id={`left-${link.id}`} />
                          <Label htmlFor={`left-${link.id}`} className="cursor-pointer"><AlignLeft size={16} /></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="center" id={`center-${link.id}`} />
                          <Label htmlFor={`center-${link.id}`} className="cursor-pointer"><AlignCenter size={16} /></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="right" id={`right-${link.id}`} />
                          <Label htmlFor={`right-${link.id}`} className="cursor-pointer"><AlignRight size={16} /></Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium mb-1">
                        Mídia
                      </label>
                      <Select 
                        value={link.mediaType || 'none'} 
                        onValueChange={(value: 'none' | 'image' | 'video') => updateLink(link.id, { mediaType: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Tipo de mídia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Sem mídia</SelectItem>
                          <SelectItem value="image">Imagem</SelectItem>
                          <SelectItem value="video">Vídeo</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {link.mediaType === 'image' && (
                        <div className="mt-2">
                          {!link.mediaUrl ? (
                            <Button 
                              variant="outline" 
                              className="w-full flex items-center justify-center"
                              onClick={() => editFileInputRefs.current[`image-${link.id}`]?.click()}
                            >
                              <Image className="mr-2 h-4 w-4" />
                              Escolher imagem
                            </Button>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-16 border rounded overflow-hidden">
                                <img 
                                  src={link.mediaUrl} 
                                  alt="Preview" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => editFileInputRefs.current[`image-${link.id}`]?.click()}
                              >
                                Substituir
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => updateLink(link.id, { mediaUrl: "", mediaType: "none" })}
                                className="text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                          <Input
                            type="file"
                            ref={el => editFileInputRefs.current[`image-${link.id}`] = el}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleEditFileUpload(link.id, e, 'image')}
                          />
                        </div>
                      )}

                      {link.mediaType === 'video' && (
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              className="flex items-center"
                              onClick={() => editFileInputRefs.current[`video-${link.id}`]?.click()}
                            >
                              <Video className="mr-2 h-4 w-4" />
                              Upload de vídeo
                            </Button>
                            
                            {link.mediaUrl && link.mediaUrl.startsWith('data:') && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => updateLink(link.id, { mediaUrl: "", mediaType: "none" })}
                                className="text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          
                          <Input
                            type="file"
                            ref={el => editFileInputRefs.current[`video-${link.id}`] = el}
                            className="hidden"
                            accept="video/*"
                            onChange={(e) => handleEditFileUpload(link.id, e, 'video')}
                          />
                          
                          <div className="flex items-center space-x-2">
                            <LinkIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            <Input
                              placeholder="Ou cole URL do vídeo"
                              value={link.mediaUrl || ''}
                              onChange={(e) => updateLink(link.id, { 
                                mediaUrl: e.target.value, 
                                mediaType: e.target.value ? 'video' : 'none' 
                              })}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinksPanel;
