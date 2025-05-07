
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getRequests, filterRequests, updateWorkflowStatus } from '@/services/requestService';
import RequestTable from '@/components/certifications/RequestTable';
import { CertificationRequest } from '@/types/auth';

const EvaluationPreliminary = () => {
  const [requests, setRequests] = useState<CertificationRequest[]>(
    getRequests().filter(req => req.workflowStatus === 'evaluation_preliminary')
  );
  const { toast } = useToast();
  
  const handleApprove = (request: CertificationRequest) => {
    try {
      const updated = updateWorkflowStatus(request.id, 'approve_preliminary');
      setRequests(requests.filter(r => r.id !== request.id));
      
      toast({
        title: "Évaluation préliminaire approuvée",
        description: `La demande ${request.id} est passée en revue technique`,
      });
    } catch (error) {
      console.error("Erreur lors de l'approbation:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'approbation de la demande",
        variant: "destructive",
      });
    }
  };
  
  const handleRequestAdditionalInfo = (request: CertificationRequest) => {
    try {
      const updated = updateWorkflowStatus(request.id, 'request_additional_info', 
        "Veuillez fournir des informations complémentaires pour poursuivre l'évaluation de votre dossier.");
      
      setRequests(requests.filter(r => r.id !== request.id));
      
      toast({
        title: "Informations complémentaires demandées",
        description: `La demande ${request.id} a été renvoyée pour informations complémentaires`,
      });
    } catch (error) {
      console.error("Erreur lors de la demande d'informations:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la demande d'informations complémentaires",
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dossiers à évaluer</h1>
          <p className="text-muted-foreground">
            Évaluation préliminaire des demandes de certification
          </p>
        </div>

        {requests.length > 0 ? (
          <div className="grid gap-6">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{request.companyName}</CardTitle>
                      <CardDescription>Demande #{request.id} - {new Date(request.registrationDate).toLocaleDateString('fr-FR')}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Évaluation préliminaire
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Promoteur</h4>
                      <p>{request.promoterName}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Téléphone</h4>
                      <p>{request.phone}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Produits</h4>
                    <ul className="list-disc pl-5">
                      {request.products.map((product, index) => (
                        <li key={index}>{product}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleRequestAdditionalInfo(request)}
                  >
                    Demander informations complémentaires
                  </Button>
                  <Button
                    onClick={() => handleApprove(request)}
                  >
                    Approuver évaluation préliminaire
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 border rounded-md">
            <h3 className="text-lg font-medium">Aucun dossier en attente d'évaluation</h3>
            <p className="text-muted-foreground mt-1">Tous les dossiers ont été traités</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default EvaluationPreliminary;
