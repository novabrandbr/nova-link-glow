
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, MousePointer, Eye, Bell } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DashboardOverview = () => {
  // Mock data para o dashboard
  const weeklyData = [
    { day: 'Seg', clicks: 45, visitors: 38 },
    { day: 'Ter', clicks: 52, visitors: 42 },
    { day: 'Qua', clicks: 48, visitors: 39 },
    { day: 'Qui', clicks: 61, visitors: 48 },
    { day: 'Sex', clicks: 55, visitors: 45 },
    { day: 'Sáb', clicks: 67, visitors: 52 },
    { day: 'Dom', clicks: 43, visitors: 35 },
  ];

  const notifications = [
    {
      title: "Novo estilo: Neon Retro",
      description: "Acabamos de adicionar um novo estilo neon retrô para sua página",
      time: "2 horas atrás"
    },
    {
      title: "Melhorias no Analytics",
      description: "Novos filtros e opções de exportação disponíveis",
      time: "1 dia atrás"
    },
    {
      title: "Integração com Instagram",
      description: "Em breve: conecte diretamente com sua conta do Instagram",
      time: "3 dias atrás"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo de volta! Aqui está um resumo da sua performance.</p>
      </div>

      {/* Estatísticas Resumidas */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MousePointer className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Cliques</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                  <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500 ml-1">+12%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Visitantes</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">892</p>
                  <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500 ml-1">+8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taxa de Cliques</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">68%</p>
                  <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500 ml-1">+5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <MousePointer className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Link Top</p>
                <p className="text-lg font-bold text-gray-900">Instagram</p>
                <span className="text-sm text-gray-500">156 cliques</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Semanal */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance desta Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="clicks" stroke="#6A0DAD" strokeWidth={2} />
                  <Line type="monotone" dataKey="visitors" stroke="#C9A0FF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Destaques da Semana</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900">🏆 Link Mais Clicado</h4>
              <p className="text-sm text-purple-700">Instagram - 156 cliques</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">👋 Nova Visita</h4>
              <p className="text-sm text-blue-700">+15% novos visitantes esta semana</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">📈 Melhor Dia</h4>
              <p className="text-sm text-green-700">Sábado com 67 cliques</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Novidades e Implementações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((notification, index) => (
            <Alert key={index}>
              <AlertDescription>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{notification.title}</h4>
                    <p className="text-sm text-gray-600">{notification.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
