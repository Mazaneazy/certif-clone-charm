
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
  
  // Prepare data for the chart
  const chartData = [
    { name: 'En attente', count: pending },
    { name: 'En cours', count: inProcess },
    { name: 'Approuvées', count: approved },
    { name: 'Rejetées', count: rejected },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Demandes totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{pending}</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approuvées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{approved}</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejetées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{rejected}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Aperçu des demandes par statut</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
    </div>
  );
};

export default RequestDashboard;
