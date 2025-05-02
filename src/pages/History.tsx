
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FileText, Download, Eye, Search, Filter, Calendar, FileOutput } from 'lucide-react';

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentMonth, setCurrentMonth] = useState('Avril 2025');

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

  const months = [
    { name: "Avril 2025", count: 6 },
    { name: "Mars 2025", count: 8 },
    { name: "Février 2025", count: 3 },
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

  // Filter activities based on search term and status filter
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.document.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          activity.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    // In a real application, this would generate and download a CSV file
    console.log('Exporting activities as CSV');
    // Mock implementation - in real app this would create and trigger download of a CSV file
    alert('Export CSV fonctionnalité sera bientôt disponible');
  };

  const handleExportPDF = () => {
    // In a real application, this would generate and download a PDF file
    console.log('Exporting activities as PDF');
    // Mock implementation - in real app this would create and trigger download of a PDF file
    alert('Export PDF fonctionnalité sera bientôt disponible');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-anor-blue">Historique</h1>
            <p className="text-muted-foreground">Consultez toutes les activités récentes concernant vos documents.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1" 
                    onClick={handleExportCSV}
                    aria-label="Exporter au format CSV"
                  >
                    <FileOutput className="h-4 w-4" />
                    <span className="hidden sm:inline">Exporter CSV</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Exporter au format CSV</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={handleExportPDF}
                    aria-label="Exporter au format PDF"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Exporter PDF</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Exporter au format PDF</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="text-xl text-anor-blue">Périodes</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="flex flex-col space-y-1">
                {months.map((month) => (
                  <Button 
                    key={month.name} 
                    variant={currentMonth === month.name ? "default" : "ghost"}
                    className={`justify-start h-9 ${currentMonth === month.name ? 'bg-anor-blue' : ''}`}
                    onClick={() => setCurrentMonth(month.name)}
                    aria-label={`Afficher l'historique de ${month.name}`}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{month.name}</span>
                    <Badge variant={currentMonth === month.name ? "secondary" : "outline"} className="ml-auto">
                      {month.count}
                    </Badge>
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="text-xl text-anor-blue">Activités récentes</CardTitle>
              <CardDescription>
                Un total de {filteredActivities.length} activités pour le mois d'{currentMonth.split(' ')[0]}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher des documents..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Rechercher des documents"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Label htmlFor="status-filter" className="sr-only">Filtrer par statut</Label>
                  <Select 
                    value={statusFilter} 
                    onValueChange={setStatusFilter}
                    aria-label="Filtrer par statut"
                  >
                    <SelectTrigger className="w-[180px]" id="status-filter">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="completed">Complété</SelectItem>
                      <SelectItem value="pending">En cours</SelectItem>
                      <SelectItem value="rejected">Refusé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border">
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
                    {filteredActivities.length > 0 ? (
                      filteredActivities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-medium">{activity.document}</TableCell>
                          <TableCell>{activity.type}</TableCell>
                          <TableCell>{activity.date} à {activity.time}</TableCell>
                          <TableCell>{getStatusBadge(activity.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" aria-label={`Voir le document ${activity.document}`}>
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Voir le document</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" aria-label={`Télécharger le document ${activity.document}`}>
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Télécharger</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          Aucun résultat trouvé.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Affichage de {filteredActivities.length} sur {activities.length} activités
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default History;
