
import React, { useState } from "react";
import { Plus, Edit, Trash2, Move, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { LinkType } from "@/pages/Dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
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
    labelPosition: "top",
    textAlign: "center"
  });
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [showCustomLabel, setShowCustomLabel] = useState<{ [key: string]: boolean }>({});

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
      labelPosition: newLink.labelPosition as 'top' | 'center' | 'bottom',
      textAlign: newLink.textAlign as 'left' | 'center' | 'right'
    };

    setLinks([...links, link]);
    setNewLink({ 
      title: "", 
      url: "", 
      color: "#6A0DAD", 
      label: "",
      labelColor: "#FF0000",
      labelPosition: "top",
      textAlign: "center" 
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
              <SelectItem value="top">No topo</SelectItem>
              <SelectItem value="center">No centro</SelectItem>
              <SelectItem value="bottom">Em baixo</SelectItem>
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
                        onValueChange={(value: string) => updateLink(link.id, { labelPosition: value as 'top' | 'center' | 'bottom' })}
                        defaultValue={link.labelPosition || "top"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Posição do rótulo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">No topo</SelectItem>
                          <SelectItem value="center">No centro</SelectItem>
                          <SelectItem value="bottom">Em baixo</SelectItem>
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
