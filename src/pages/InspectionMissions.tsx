
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Download, Upload, FileCheck, Calendar } from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter 
} from '@/components/ui/dialog';

// Types pour les missions d'inspection
interface InspectionMission {
  id: number;
  title: string;
  companyName: string;
  location: string;
  scheduledDate: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  products: string[];
  reportFile?: string;
  inspectorId: number;
}

// Simuler des données pour les missions d'inspection
const mockInspectionMissions: InspectionMission[] = [
  {
    id: 1,
    title: "Inspection initiale pour certification",
    companyName: "Brasseries du Cameroun",
    location: "Douala, Cameroun",
    scheduledDate: "2025-05-10",
    status: "scheduled",
    products: ["Eau minérale", "Boissons gazeuses"],
    inspectorId: 3
  },
  {
    id: 2,
    title: "Inspection de suivi",
    companyName: "SABC",
    location: "Yaoundé, Cameroun",
    scheduledDate: "2025-05-15",
    status: "in_progress",
    products: ["Jus de fruits"],
    inspectorId: 3
  },
  {
    id: 3,
    title: "Inspection finale",
    companyName: "SOCAPALM",
    location: "Edéa, Cameroun",
    scheduledDate: "2025-04-28",
    status: "completed",
    products: ["Huile de palme raffinée"],
    reportFile: "rapport_inspection_socapalm.pdf",
    inspectorId: 11
  }
];

const InspectionMissions: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [missions, setMissions] = useState<InspectionMission[]>([]);
  const [selectedMission, setSelectedMission] = useState<InspectionMission | null>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  useEffect(() => {
    // Dans une application réelle, nous chargerions les données depuis l'API
    // Pour l'instant, utilisons les données simulées filtrées par inspecteur
    if (user) {
      const filteredMissions = mockInspectionMissions.filter(
        mission => mission.inspectorId === user.id
      );
      setMissions(filteredMissions);
    }
  }, [user]);

  const handleUploadReport = (missionId: number) => {
    // Simuler le téléversement d'un rapport
    toast({
      title: "Rapport téléversé",
      description: "Le rapport d'inspection a été téléversé avec succès.",
    });
    
    // Mettre à jour l'état local
    setMissions(missions.map(mission => 
      mission.id === missionId 
        ? { ...mission, reportFile: `rapport_inspection_${missionId}.pdf`, status: 'completed' as const } 
        : mission
    ));
  };

  const handleDownloadReport = (filename: string) => {
    toast({
      title: "Téléchargement simulé",
      description: `Le fichier ${filename} serait téléchargé dans un environnement réel.`,
    });
  };

  const handleStartInspection = (missionId: number) => {
    // Mettre à jour le statut de la mission
    setMissions(missions.map(mission => 
      mission.id === missionId 
        ? { ...mission, status: 'in_progress' as const } 
        : mission
    ));
    
    toast({
      title: "Inspection commencée",
      description: "Le statut de la mission a été mis à jour.",
    });
  };

  const handleViewDetails = (mission: InspectionMission) => {
    setSelectedMission(mission);
    setIsDetailsDialogOpen(true);
  };

  const handleOpenReportDialog = (mission: InspectionMission) => {
    setSelectedMission(mission);
    setIsReportDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Planifiée</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En cours</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Terminée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout requiredPermission="perform_inspection">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Missions d'Inspection</h1>
            <p className="text-muted-foreground">Gérez vos missions d'inspection assignées</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Date prévue</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {missions.length > 0 ? (
                missions.map((mission) => (
                  <TableRow key={mission.id}>
                    <TableCell className="font-medium">{mission.title}</TableCell>
                    <TableCell>{mission.companyName}</TableCell>
                    <TableCell>{new Date(mission.scheduledDate).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{getStatusBadge(mission.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(mission)}>
                          Détails
                        </Button>
                        
                        {mission.status === 'scheduled' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleStartInspection(mission.id)}
                            className="bg-blue-50 hover:bg-blue-100"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Commencer
                          </Button>
                        )}
                        
                        {mission.status === 'in_progress' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleOpenReportDialog(mission)}
                            className="bg-green-50 hover:bg-green-100"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Rapport
                          </Button>
                        )}
                        
                        {mission.reportFile && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDownloadReport(mission.reportFile!)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <p className="text-muted-foreground">Aucune mission d'inspection assignée.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialogue de détails de la mission */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Détails de la mission</DialogTitle>
          </DialogHeader>
          {selectedMission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Entreprise</h4>
                  <p className="text-base font-semibold">{selectedMission.companyName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Lieu</h4>
                  <p>{selectedMission.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Date prévue</h4>
                  <p>{new Date(selectedMission.scheduledDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Statut</h4>
                  <div>{getStatusBadge(selectedMission.status)}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Produits</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedMission.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de téléversement de rapport */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Téléverser un rapport d'inspection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg border-gray-300 p-6 text-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="w-10 h-10 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Cliquez pour sélectionner un fichier ou glissez-déposez</p>
              <p className="text-xs text-gray-400 mt-1">Format PDF uniquement, max 10MB</p>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                onClick={() => {
                  if (selectedMission) {
                    handleUploadReport(selectedMission.id);
                    setIsReportDialogOpen(false);
                  }
                }}
              >
                <FileCheck className="h-4 w-4 mr-2" />
                Soumettre le rapport
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default InspectionMissions;
