
import React, { useState } from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CertificationRequest } from '@/types/auth';
import WorkflowStepper from './WorkflowStepper';
import WorkflowActions from './WorkflowActions';
import WorkflowHistory from './WorkflowHistory';
import CommentSection from './CommentSection';
import { getWorkflowSteps, workflowActions } from '@/services/workflowService';
import { updateWorkflowStatus, addCommentToRequest } from '@/services/requestService';
import { CommentItem } from '@/types/workflow';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/contexts/AuthContext';

interface CertificationRequestDetailsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedRequest: CertificationRequest | null;
  onRequestUpdated?: (request: CertificationRequest) => void;
}

const CertificationRequestDetails: React.FC<CertificationRequestDetailsProps> = ({
  isOpen,
  setIsOpen,
  selectedRequest,
  onRequestUpdated
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  const [updatedRequest, setUpdatedRequest] = useState<CertificationRequest | null>(selectedRequest);

  // Mettre à jour la référence locale quand selectedRequest change
  React.useEffect(() => {
    setUpdatedRequest(selectedRequest);
  }, [selectedRequest]);

  const handleDownloadFile = (filename: string) => {
    toast({
      title: "Téléchargement simulé",
      description: `Le fichier ${filename} serait téléchargé dans un environnement réel.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">En attente</Badge>;
      case 'in_process':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En traitement</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejeté</Badge>;
      case 'corrective_actions':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Actions correctives</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handlePerformAction = (actionId: string, comment?: string) => {
    if (!selectedRequest || !user) return;

    try {
      // Mettre à jour le statut du workflow
      const updated = updateWorkflowStatus(selectedRequest.id, actionId, comment);
      setUpdatedRequest(updated);
      
      // Notifier le composant parent
      if (onRequestUpdated) {
        onRequestUpdated(updated);
      }

      // Notification de succès
      toast({
        title: "Action effectuée",
        description: "Le statut de la demande a été mis à jour avec succès.",
      });

    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut.",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = (text: string, isInternal: boolean) => {
    if (!updatedRequest || !user) return;

    try {
      const newComment: CommentItem = {
        id: uuidv4(),
        userId: user.id,
        userName: user.name,
        userRole: getUserRoleName(user.role),
        text,
        timestamp: new Date().toISOString(),
        isInternal
      };

      const updated = addCommentToRequest(updatedRequest.id, newComment);
      // Fix: Now we're correctly setting the updated request that's returned from the addCommentToRequest function
      setUpdatedRequest(updated);
      
      if (onRequestUpdated) {
        // Fix: Also correctly passing the updated request to the parent component callback
        onRequestUpdated(updated);
      }

      toast({
        title: "Commentaire ajouté",
        description: isInternal 
          ? "Votre commentaire interne a été ajouté avec succès" 
          : "Votre commentaire a été ajouté avec succès",
      });

    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du commentaire.",
        variant: "destructive",
      });
    }
  };

  const handleSendToReception = () => {
    if (!updatedRequest || !user) return;

    try {
      // Mettre à jour le statut du workflow
      const updated = updateWorkflowStatus(
        updatedRequest.id, 
        'request_additional_info',
        "Dossier renvoyé à l'accueil pour traitement complémentaire."
      );
      
      setUpdatedRequest(updated);
      
      // Notifier le composant parent
      if (onRequestUpdated) {
        onRequestUpdated(updated);
      }

      // Notification de succès
      toast({
        title: "Dossier renvoyé",
        description: "Le dossier a été renvoyé à l'accueil avec succès.",
      });

    } catch (error) {
      console.error("Erreur lors du renvoi du dossier:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du renvoi du dossier.",
        variant: "destructive",
      });
    }
  };

  // Si aucune demande n'est sélectionnée, ne rien afficher
  if (!updatedRequest) {
    return null;
  }

  const workflowSteps = getWorkflowSteps(updatedRequest.workflowStatus as any || 'reception');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails de la demande</DialogTitle>
          <DialogDescription>
            Informations complètes sur la demande de certification
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="comments">Commentaires</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Entreprise</h4>
                <p className="text-base font-semibold">{updatedRequest.companyName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Promoteur</h4>
                <p>{updatedRequest.promoterName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Téléphone</h4>
                <p>{updatedRequest.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Date d'enregistrement</h4>
                <p>{new Date(updatedRequest.registrationDate).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Statut</h4>
                <div>{getStatusBadge(updatedRequest.status)}</div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">ID</h4>
                <p>{updatedRequest.id}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Produits</h4>
              <ul className="list-disc pl-5 space-y-1">
                {updatedRequest.products.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Documents</h4>
              <div className="space-y-2">
                {Object.entries(updatedRequest.files).map(([key, filename]) => (
                  filename && (
                    <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">
                        {key === 'businessRegistry' && 'Registre de Commerce'}
                        {key === 'taxpayerCard' && 'Carte de contribuable (NIU)'}
                        {key === 'manufacturingProcess' && 'Processus de fabrication'}
                        {key === 'rawMaterialCertificate' && 'Certificat matière première'}
                        {key === 'staffList' && 'Liste du personnel'}
                        {key === 'productsList' && 'Liste des produits'}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDownloadFile(filename)}
                        className="h-8"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                  )
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="workflow" className="space-y-6">
            <WorkflowStepper steps={workflowSteps} />
            
            <div className="border-t pt-6">
              <WorkflowActions 
                currentStatus={updatedRequest.workflowStatus || 'reception'} 
                actions={workflowActions}
                onPerformAction={handlePerformAction}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="space-y-6">
            <CommentSection 
              comments={updatedRequest.comments || []}
              onAddComment={handleAddComment}
            />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <WorkflowHistory history={updatedRequest.workflowHistory || []} />
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6 flex items-center justify-between">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={handleSendToReception}
          >
            <ArrowLeft className="h-4 w-4" />
            Renvoyer à l'accueil
          </Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Fonction pour obtenir le nom convivial du rôle de l'utilisateur
const getUserRoleName = (role: string): string => {
  const roleNames: Record<string, string> = {
    'accueil': "Service d'Accueil",
    'gestionnaire': "Gestionnaire des Dossiers",
    'responsable_technique': "Responsable Technique",
    'chef_comite': "Chef de Comité Technique",
    'directeur_evaluation': "Directeur de l'Évaluation",
    'chef_inspections': "Chef des Inspections",
    'inspecteur': "Inspecteur",
    'laboratoire': "Laboratoire",
    'comptable': "Service Comptabilité",
    'producteur': "Opérateur Économique",
    'admin': "Administrateur",
    'directeur': "Directeur Général"
  };
  
  return roleNames[role] || role;
};

export default CertificationRequestDetails;
