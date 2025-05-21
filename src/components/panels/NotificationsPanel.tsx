
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const NotificationsPanel = () => {
  const notifications = [
    {
      id: 1,
      title: "Novo recurso disponível",
      description: "Agora você pode adicionar música ao seu mini-site!",
      date: "Hoje",
      read: false
    },
    {
      id: 2,
      title: "Seu mini-site está em alta!",
      description: "Você recebeu 50 visitas nas últimas 24 horas.",
      date: "Ontem",
      read: true
    },
    {
      id: 3,
      title: "Dica da semana",
      description: "Adicione ícones de redes sociais para aumentar suas conexões.",
      date: "3 dias atrás",
      read: true
    }
  ];

  const notificationSettings = [
    { id: "email", label: "Notificações por e-mail", enabled: true },
    { id: "app", label: "Notificações no aplicativo", enabled: true },
    { id: "stats", label: "Alertas de estatísticas", enabled: false },
    { id: "updates", label: "Atualizações e novos recursos", enabled: true },
    { id: "marketing", label: "Comunicações de marketing", enabled: false }
  ];

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Notificações</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <h2 className="text-lg font-semibold">Notificações recentes</h2>
          
          {notifications.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <Bell className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Você não tem notificações.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border rounded-lg ${notification.read ? 'bg-white' : 'bg-purple-50 border-purple-200'}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">
                        {!notification.read && (
                          <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        )}
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.date}</p>
                    </div>
                    {!notification.read && (
                      <Button variant="ghost" size="sm" className="text-xs">
                        Marcar como lida
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  Ver todas as notificações
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-6">
          <h2 className="text-lg font-semibold">Configurações de notificação</h2>
          
          <div className="space-y-4">
            {notificationSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between">
                <Label htmlFor={setting.id} className="cursor-pointer">
                  {setting.label}
                </Label>
                <Switch 
                  id={setting.id}
                  defaultChecked={setting.enabled}
                />
              </div>
            ))}
          </div>
          
          <div className="pt-4">
            <Button>Salvar preferências</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
