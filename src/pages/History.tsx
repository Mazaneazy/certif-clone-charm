
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye } from 'lucide-react';

const History = () => {
  const activities = [
    {
      id: 1,
      document: "Attestation de formation",
      type: "Document téléchargé",
      status: "completed",
      date: "23 avril 2025",
      time: "14:30",
      user: "Vous",
    },
    {
      id: 2,
      document: "Certificat professionnel",
      type: "Document validé",
      status: "completed",
      date: "22 avril 2025",
      time: "10:15",
      user: "Admin",
    },
    {
      id: 3,
      document: "Diplôme universitaire",
      type: "Document refusé",
      status: "rejected",
      date: "20 avril 2025",
      time: "09:45",
      user: "Admin",
      message: "Le document nécessite une signature officielle",
    },
    {
      id: 4,
      document: "Attestation de stage",
      type: "Document téléchargé",
      status: "completed",
      date: "15 avril 2025",
      time: "16:20",
      user: "Vous",
    },
    {
      id: 5,
      document: "Certificat de compétences",
      type: "Document en révision",
      status: "pending",
      date: "10 avril 2025",
      time: "11:00",
      user: "Admin",
    },
    {
      id: 6,
      document: "Attestation de formation",
      type: "Document modifié",
      status: "completed",
      date: "5 avril 2025",
      time: "14:30",
      user: "Vous",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Complété</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En cours</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Refusé</Badge>;
      default:
        return null;
    }
  };

  const months = [
    { name: "Avril 2025", count: 5 },
    { name: "Mars 2025", count: 8 },
    { name: "Février 2025", count: 3 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Historique</h1>
          <p className="text-muted-foreground">Consultez toutes les activités récentes concernant vos documents.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Périodes</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="flex flex-col space-y-1">
                {months.map((month) => (
                  <Button 
                    key={month.name} 
                    variant="ghost" 
                    className="justify-start h-9"
                  >
                    <span>{month.name}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {month.count}
                    </Badge>
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
              <CardDescription>
                Un total de {activities.length} activités pour le mois d'Avril 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.document}</TableCell>
                      <TableCell>{activity.type}</TableCell>
                      <TableCell>{activity.date} à {activity.time}</TableCell>
                      <TableCell>{getStatusBadge(activity.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default History;
