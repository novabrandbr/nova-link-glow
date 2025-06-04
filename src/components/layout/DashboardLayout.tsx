
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Link, 
  Palette, 
  BarChart3, 
  User, 
  CreditCard, 
  HelpCircle, 
  Bell, 
  Settings,
  Smartphone
} from "lucide-react";

type DashboardLayoutProps = {
  children: React.ReactNode;
  activePanel: string;
  setActivePanel: (panel: string) => void;
};

const DashboardLayout = ({ children, activePanel, setActivePanel }: DashboardLayoutProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "minisite", label: "Meu MiniSite", icon: Smartphone },
    { id: "stats", label: "Estatísticas", icon: BarChart3 },
    { id: "profile", label: "Perfil", icon: User },
    { id: "plans", label: "Planos", icon: CreditCard },
    { id: "help", label: "Ajuda", icon: HelpCircle },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-purple-600">Nova Brand</h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActivePanel(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  isActive 
                    ? "bg-purple-600 text-white shadow-md" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5",
                  isActive ? "text-white" : "text-gray-500"
                )} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* User info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Plano Gratuito</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {menuItems.find(item => item.id === activePanel)?.label || "Dashboard"}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
