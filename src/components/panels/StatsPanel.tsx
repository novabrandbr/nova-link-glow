
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatsPanel = () => {
  // Mock data for charts
  const linkClickData = [
    { name: 'Website', clicks: 120 },
    { name: 'Portfolio', clicks: 98 },
    { name: 'Instagram', clicks: 140 },
    { name: 'Twitter', clicks: 75 },
    { name: 'YouTube', clicks: 85 },
  ];

  const visitorData = [
    { date: '01/05', visitors: 45 },
    { date: '02/05', visitors: 52 },
    { date: '03/05', visitors: 49 },
    { date: '04/05', visitors: 63 },
    { date: '05/05', visitors: 58 },
    { date: '06/05', visitors: 72 },
    { date: '07/05', visitors: 80 },
  ];

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Estatísticas</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-900">518</div>
            <p className="text-sm text-gray-500">Cliques totais</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-900">210</div>
            <p className="text-sm text-gray-500">Visitantes únicos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-900">78%</div>
            <p className="text-sm text-gray-500">Taxa de cliques (CTR)</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cliques por link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={linkClickData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#6A0DAD" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Visitantes por dia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={visitorData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#C9A0FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
