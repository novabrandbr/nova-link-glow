
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Link2, 
  Palette, 
  BarChart3, 
  User, 
  CreditCard,
  HelpCircle,
  Bell,
  Settings,
  Globe
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePanel: string;
  setActivePanel: (panel: string) => void;
}

const DashboardLayout = ({ children, activePanel, setActivePanel }: DashboardLayoutProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "minisite", label: "Minisite", icon: Globe },
    { id: "stats", label: "Estatísticas", icon: BarChart3 },
    { id: "profile", label: "Perfil", icon: User },
    { id: "plans", label: "Planos", icon: CreditCard },
    { id: "help", label: "Ajuda", icon: HelpCircle },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Nova Brand</h1>
        </div>
        
        <nav className="px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start relative transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#6A0DAD] text-white hover:bg-[#6A0DAD] hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setActivePanel(item.id)}
              >
                <Icon className={`mr-3 h-4 w-4 ${isActive ? 'text-white' : ''}`} />
                <span className={isActive ? 'text-white' : ''}>{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold capitalize">
              {menuItems.find(item => item.id === activePanel)?.label}
            </h2>
          </div>
        </header>
        
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
