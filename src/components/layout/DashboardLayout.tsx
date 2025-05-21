
import React from "react";
import { 
  LayoutDashboard, 
  Link, 
  Palette, 
  Activity, 
  User, 
  Star, 
  LogOut 
} from "lucide-react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from "@/components/ui/sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
  activePanel: string;
  setActivePanel: (panel: string) => void;
};

const DashboardLayout = ({ 
  children, 
  activePanel, 
  setActivePanel 
}: DashboardLayoutProps) => {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "links", icon: Link, label: "Meus Links" },
    { id: "design", icon: Palette, label: "Design da Página" },
    { id: "stats", icon: Activity, label: "Estatísticas" },
    { id: "profile", icon: User, label: "Conta/Perfil" },
    { id: "plans", icon: Star, label: "Plano / Assinatura" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-white">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center p-4">
            <h1 className="text-2xl font-bold text-purple-900">NOVABRAND</h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activePanel === item.id}
                    onClick={() => setActivePanel(item.id)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LogOut />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="h-16 border-b border-gray-200 flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <h2 className="text-xl font-bold">
              {menuItems.find(item => item.id === activePanel)?.label || "Dashboard"}
            </h2>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
