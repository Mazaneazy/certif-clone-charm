
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { ChartContainer, ChartLegend, ChartTooltip } from '@/components/ui/chart';
import { CertificationRequest } from '@/types/auth';

interface RequestDashboardProps {
  requests: CertificationRequest[];
}

const RequestDashboard = ({ requests }: RequestDashboardProps) => {
  // Calculate statistics
  const totalRequests = requests.length;
  const pending = requests.filter(req => req.status === 'pending').length;
  const approved = requests.filter(req => req.status === 'approved').length;
  const rejected = requests.filter(req => req.status === 'rejected').length;
  const inProcess = requests.filter(req => req.status === 'in_process').length;
  const correctiveActions = requests.filter(req => req.status === 'corrective_actions').length;
  
  // Calculate percentages
  const pendingPercent = Math.round((pending / totalRequests) * 100) || 0;
  const approvedPercent = Math.round((approved / totalRequests) * 100) || 0;
  const rejectedPercent = Math.round((rejected / totalRequests) * 100) || 0;
  
  // Prepare data for the bar chart
  const barChartData = [
    { name: 'En attente', count: pending },
    { name: 'En cours', count: inProcess },
    { name: 'Approuvées', count: approved },
    { name: 'Rejetées', count: rejected },
    { name: 'Actions correctives', count: correctiveActions },
  ];

  // Prepare data for the pie chart
  const pieChartData = [
    { name: 'En attente', value: pending, color: '#f59e0b' },
    { name: 'En cours', value: inProcess, color: '#3b82f6' },
    { name: 'Approuvées', value: approved, color: '#10b981' },
    { name: 'Rejetées', value: rejected, color: '#ef4444' },
    { name: 'Actions correctives', value: correctiveActions, color: '#f97316' },
  ].filter(item => item.value > 0);

  // Get the most common status
  const mostCommonStatus = [...barChartData]
    .sort((a, b) => b.count - a.count)[0]?.name || 'Aucune demande';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Demandes totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Statut le plus commun: {mostCommonStatus}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{pending}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {pendingPercent}% du total des demandes
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approuvées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{approved}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {approvedPercent}% du total des demandes
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejetées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{rejected}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {rejectedPercent}% du total des demandes
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Aperçu des demandes par statut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Répartition des demandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={{
                  pending: { color: '#f59e0b' },
                  in_process: { color: '#3b82f6' },
                  approved: { color: '#10b981' },
                  rejected: { color: '#ef4444' },
                  corrective_actions: { color: '#f97316' }
                }}
              >
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    labelLine={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <ChartTooltip />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestDashboard;
