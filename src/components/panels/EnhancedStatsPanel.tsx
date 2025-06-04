
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const EnhancedStatsPanel = () => {
  const [timeFilter, setTimeFilter] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('clicks');

  // Mock data
  const weeklyData = [
    { date: '01/06', clicks: 45, visitors: 38, conversions: 12 },
    { date: '02/06', clicks: 52, visitors: 42, conversions: 15 },
    { date: '03/06', clicks: 48, visitors: 39, conversions: 11 },
    { date: '04/06', clicks: 61, visitors: 48, conversions: 18 },
    { date: '05/06', clicks: 55, visitors: 45, conversions: 16 },
    { date: '06/06', clicks: 67, visitors: 52, conversions: 20 },
    { date: '07/06', clicks: 43, visitors: 35, conversions: 10 },
  ];

  const monthlyData = [
    { date: 'Sem 1', clicks: 320, visitors: 280, conversions: 85 },
    { date: 'Sem 2', clicks: 385, visitors: 310, conversions: 95 },
    { date: 'Sem 3', clicks: 421, visitors: 342, conversions: 102 },
    { date: 'Sem 4', clicks: 398, visitors: 325, conversions: 98 },
  ];

  const deviceData = [
    { name: 'Mobile', value: 65, color: '#6A0DAD' },
    { name: 'Desktop', value: 25, color: '#C9A0FF' },
    { name: 'Tablet', value: 10, color: '#E6D9FF' },
  ];

  const topLinks = [
    { name: 'Instagram', clicks: 156, ctr: '68%' },
    { name: 'Website', clicks: 134, ctr: '62%' },
    { name: 'YouTube', clicks: 98, ctr: '54%' },
    { name: 'Portfolio', clicks: 87, ctr: '49%' },
    { name: 'LinkedIn', clicks: 72, ctr: '45%' },
  ];

  const currentData = timeFilter === 'week' ? weeklyData : monthlyData;

  const exportToCSV = () => {
    const csvContent = [
      ['Data', 'Cliques', 'Visitantes', 'Conversões'],
      ...currentData.map(row => [row.date, row.clicks, row.visitors, row.conversions])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estatisticas-${timeFilter}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Exportação realizada",
      description: "Dados exportados com sucesso para CSV"
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{`Data: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Estatísticas Detalhadas</h1>
        <div className="flex items-center space-x-4">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportToCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Estatísticas Resumidas */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-900">
              {currentData.reduce((sum, item) => sum + item.clicks, 0)}
            </div>
            <p className="text-sm text-gray-500">Total de Cliques</p>
            <p className="text-xs text-green-600">+12% vs período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-900">
              {currentData.reduce((sum, item) => sum + item.visitors, 0)}
            </div>
            <p className="text-sm text-gray-500">Visitantes Únicos</p>
            <p className="text-xs text-green-600">+8% vs período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-900">
              {Math.round((currentData.reduce((sum, item) => sum + item.clicks, 0) / 
                currentData.reduce((sum, item) => sum + item.visitors, 0)) * 100)}%
            </div>
            <p className="text-sm text-gray-500">Taxa de Cliques (CTR)</p>
            <p className="text-xs text-green-600">+5% vs período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-900">
              {currentData.reduce((sum, item) => sum + item.conversions, 0)}
            </div>
            <p className="text-sm text-gray-500">Conversões</p>
            <p className="text-xs text-green-600">+15% vs período anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="clicks" stroke="#6A0DAD" strokeWidth={2} />
                  <Line type="monotone" dataKey="visitors" stroke="#C9A0FF" strokeWidth={2} />
                  <Line type="monotone" dataKey="conversions" stroke="#E6D9FF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dispositivos dos Visitantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Links */}
      <Card>
        <CardHeader>
          <CardTitle>Links Mais Clicados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#6A0DAD] rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{link.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{link.clicks} cliques</span>
                  <span className="text-sm font-medium text-green-600">{link.ctr} CTR</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedStatsPanel;
