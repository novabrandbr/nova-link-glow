
import React from 'react';
import { 
  Home, 
  Link, 
  Users, 
  User, 
  CreditCard, 
  HelpCircle, 
  Bell, 
  Settings 
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePanel: string;
  setActivePanel: (panel: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activePanel, 
  setActivePanel 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'minisite', label: 'Minisite', icon: Link },
    { id: 'stats', label: 'Estatísticas', icon: Users },
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'plans', label: 'Planos', icon: CreditCard },
    { id: 'help', label: 'Ajuda', icon: HelpCircle },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-purple-600">Nova Brand</h1>
        </div>
        
        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePanel === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActivePanel(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#6B46C1] text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {activePanel}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Bem-vindo, João!
              </span>
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
