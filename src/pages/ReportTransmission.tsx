
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { FileCheck, FileText, FilePlus, Send } from 'lucide-react';
import { TechnicalReport, createTechnicalReport, getTechnicalReports, updateTechnicalReport } from '@/services/paymentValidationService';
import { getRequestById } from '@/services/requestService';

const ReportTransmission = () => {
  const [reports, setReports] = useState<TechnicalReport[]>(getTechnicalReports());
  const [activeTab, setActiveTab] = useState('draft');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<TechnicalReport | null>(null);
  const [formData, setFormData] = useState({
    certificationRequestId: '',
    inspectionReportId: '',
    laboratoryReportId: '',
    technicalOpinion: '',
    recommendationForDirector: ''
  });
  
  const { toast } = useToast();

  const handleCreateReport = () => {
    setFormData({
      certificationRequestId: '',
      inspectionReportId: '',
      laboratoryReportId: '',
      technicalOpinion: '',
      recommendationForDirector: ''
    });
    setCreateDialogOpen(true);
  };

  const handleViewReport = (report: TechnicalReport) => {
    setSelectedReport(report);
    setViewDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitReport = () => {
    try {
      // Vérifier que la demande de certification existe
      const certId = parseInt(formData.certificationRequestId);
      const request = getRequestById(certId);
      
      if (!request) {
        toast({
          title: "Erreur",
          description: `La demande #${certId} n'existe pas`,
          variant: "destructive",
        });
        return;
      }

      // Créer le nouveau rapport
      const newReport = createTechnicalReport({
        certificationRequestId: certId,
        inspectionReportId: formData.inspectionReportId ? parseInt(formData.inspectionReportId) : undefined,
        laboratoryReportId: formData.laboratoryReportId ? parseInt(formData.laboratoryReportId) : undefined,
        technicalOpinion: formData.technicalOpinion,
        recommendationForDirector: formData.recommendationForDirector,
        status: 'draft',
        createdDate: new Date().toISOString(),
        createdBy: 3, // ID de l'utilisateur connecté (responsable technique)
      });
      
      setReports(getTechnicalReports());
      setCreateDialogOpen(false);
      
      toast({
        title: "Rapport créé",
        description: `Le rapport technique pour la demande #${certId} a été créé`,
      });
    } catch (error) {
      console.error("Erreur lors de la création du rapport:", error);
      
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du rapport",
        variant: "destructive",
      });
    }
  };

  const handleSubmitToDirector = (reportId: number) => {
    try {
      updateTechnicalReport(reportId, {
        status: 'submitted',
        submittedDate: new Date().toISOString()
      });
      
      setReports(getTechnicalReports());
      setViewDialogOpen(false);
      
      toast({
        title: "Rapport transmis",
        description: "Le rapport a été transmis au Directeur d'Évaluation",
      });
    } catch (error) {
      console.error("Erreur lors de la transmission du rapport:", error);
      
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la transmission",
        variant: "destructive",
      });
    }
  };

  const filteredReports = reports.filter(report => {
    if (activeTab === 'draft') {
      return report.status === 'draft';
    } else if (activeTab === 'submitted') {
      return report.status === 'submitted';
    } else if (activeTab === 'processed') {
      return report.status === 'approved' || report.status === 'rejected';
    }
    return true;
  });

  return (
    <AppLayout requiredPermission="view_reports">
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rapports techniques</h1>
            <p className="text-muted-foreground">
              Rédigez et transmettez des rapports techniques au Directeur d'Évaluation
            </p>
          </div>
          <Button onClick={handleCreateReport}>
            <FilePlus className="mr-2 h-4 w-4" />
            Nouveau rapport
          </Button>
        </div>

        <Tabs defaultValue="draft" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="draft">Brouillons</TabsTrigger>
            <TabsTrigger value="submitted">Transmis</TabsTrigger>
            <TabsTrigger value="processed">Traités</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {filteredReports.length > 0 ? (
              <div className="grid gap-6">
                {filteredReports.map((report) => (
                  <Card key={report.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>Rapport technique #{report.id}</CardTitle>
                          <CardDescription>
                            Pour la demande #{report.certificationRequestId}
                          </CardDescription>
                        </div>
                        <Badge variant={
                          report.status === 'approved' ? 'default' : 
                          report.status === 'rejected' ? 'destructive' : 
                          report.status === 'submitted' ? 'secondary' :
                          'outline'
                        }>
                          {report.status === 'approved' ? 'Approuvé' : 
                           report.status === 'rejected' ? 'Rejeté' : 
                           report.status === 'submitted' ? 'Transmis' : 
                           'Brouillon'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Date de création:</p>
                          <p className="text-sm">{new Date(report.createdDate).toLocaleDateString('fr-FR')}</p>
                        </div>
                        
                        {report.submittedDate && (
                          <div>
                            <p className="text-sm font-medium">Date de transmission:</p>
                            <p className="text-sm">{new Date(report.submittedDate).toLocaleDateString('fr-FR')}</p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm font-medium">Avis technique:</p>
                          <p className="text-sm line-clamp-2">{report.technicalOpinion}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 justify-end space-x-2">
                      <Button variant="outline" onClick={() => handleViewReport(report)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Voir le rapport
                      </Button>
                      {report.status === 'draft' && (
                        <Button onClick={() => handleSubmitToDirector(report.id)}>
                          <Send className="mr-2 h-4 w-4" />
                          Transmettre au Directeur
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 border rounded-md">
                <FileText className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  Aucun rapport {activeTab === 'draft' ? 'en brouillon' : activeTab === 'submitted' ? 'transmis' : 'traité'}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {activeTab === 'draft' 
                    ? "Commencez par créer un nouveau rapport technique" 
                    : activeTab === 'submitted' 
                      ? "Aucun rapport n'a encore été transmis au Directeur" 
                      : "Aucun rapport n'a encore été traité par le Directeur"
                  }
                </p>
                {activeTab === 'draft' && (
                  <Button className="mt-4" onClick={handleCreateReport}>
                    Créer un rapport
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogue de création de rapport */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Créer un nouveau rapport technique</DialogTitle>
            <DialogDescription>
              Compilez les résultats d'inspection et d'analyses pour formuler un avis technique
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="certificationRequestId" className="text-sm font-medium">
                  N° de demande de certification
                </label>
                <input
                  id="certificationRequestId"
                  name="certificationRequestId"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.certificationRequestId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="inspectionReportId" className="text-sm font-medium">
                  N° de rapport d'inspection (optionnel)
                </label>
                <input
                  id="inspectionReportId"
                  name="inspectionReportId"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.inspectionReportId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="laboratoryReportId" className="text-sm font-medium">
                N° de rapport d'analyse laboratoire (optionnel)
              </label>
              <input
                id="laboratoryReportId"
                name="laboratoryReportId"
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.laboratoryReportId}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="technicalOpinion" className="text-sm font-medium">
                Avis technique
              </label>
              <Textarea
                id="technicalOpinion"
                name="technicalOpinion"
                placeholder="Formulez votre avis technique basé sur les rapports d'inspection et d'analyse..."
                className="min-h-[100px]"
                value={formData.technicalOpinion}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="recommendationForDirector" className="text-sm font-medium">
                Recommandation au Directeur d'Évaluation
              </label>
              <Textarea
                id="recommendationForDirector"
                name="recommendationForDirector"
                placeholder="Rédigez votre recommandation au Directeur d'Évaluation..."
                className="min-h-[100px]"
                value={formData.recommendationForDirector}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              type="button" 
              onClick={handleSubmitReport}
              disabled={!formData.certificationRequestId || !formData.technicalOpinion || !formData.recommendationForDirector}
            >
              Enregistrer le rapport
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de visualisation de rapport */}
      {selectedReport && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Rapport technique #{selectedReport.id}</DialogTitle>
              <DialogDescription>
                Pour la demande #{selectedReport.certificationRequestId}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Date de création</p>
                  <p className="text-sm">{new Date(selectedReport.createdDate).toLocaleDateString('fr-FR')}</p>
                </div>
                {selectedReport.submittedDate && (
                  <div>
                    <p className="text-sm font-medium">Date de transmission</p>
                    <p className="text-sm">{new Date(selectedReport.submittedDate).toLocaleDateString('fr-FR')}</p>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium">Rapport d'inspection</p>
                <p className="text-sm">
                  {selectedReport.inspectionReportId 
                    ? `Rapport #${selectedReport.inspectionReportId}` 
                    : "Non spécifié"}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Rapport d'analyse laboratoire</p>
                <p className="text-sm">
                  {selectedReport.laboratoryReportId 
                    ? `Rapport #${selectedReport.laboratoryReportId}` 
                    : "Non spécifié"}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Avis technique</p>
                <div className="mt-1 p-3 bg-muted/30 rounded-md text-sm">
                  {selectedReport.technicalOpinion}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium">Recommandation au Directeur</p>
                <div className="mt-1 p-3 bg-muted/30 rounded-md text-sm">
                  {selectedReport.recommendationForDirector}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              {selectedReport.status === 'draft' && (
                <Button 
                  onClick={() => handleSubmitToDirector(selectedReport.id)}
                  className="flex items-center"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Transmettre au Directeur
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AppLayout>
  );
};

export default ReportTransmission;
