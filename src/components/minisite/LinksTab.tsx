
import React from 'react';
import { LinkType } from '@/pages/Dashboard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type LinksTabProps = {
  links: LinkType[];
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
};

const LinksTab: React.FC<LinksTabProps> = ({ links, setLinks }) => {
  const { toast } = useToast();
  const [draggedItem, setDraggedItem] = React.useState<number | null>(null);

  const addNewLink = () => {
    const newLink: LinkType = {
      id: Date.now().toString(),
      title: '',
      url: '',
      active: true,
      color: '#6A0DAD'
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
          Arraste para reordenar os links. A aparência visual será configurada na aba "Page Styles".
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
                <div className="flex items-center space-x-3">
                  <div 
                    className="cursor-move p-2 text-gray-400 hover:text-gray-600"
                    draggable
                  >
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-3">
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
                  <div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeLink(link.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
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
