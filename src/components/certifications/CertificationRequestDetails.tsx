
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CertificationRequest } from '@/types/auth';

interface CertificationRequestDetailsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedRequest: CertificationRequest | null;
}

const CertificationRequestDetails: React.FC<CertificationRequestDetailsProps> = ({
  isOpen,
  setIsOpen,
  selectedRequest
}) => {
  const { toast } = useToast();

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Détails de la demande</DialogTitle>
          <DialogDescription>
            Informations complètes sur la demande de certification
          </DialogDescription>
        </DialogHeader>

        {selectedRequest && (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Entreprise</h4>
                <p className="text-base font-semibold">{selectedRequest.companyName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Promoteur</h4>
                <p>{selectedRequest.promoterName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Téléphone</h4>
                <p>{selectedRequest.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Date d'enregistrement</h4>
                <p>{new Date(selectedRequest.registrationDate).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Statut</h4>
                <div>{getStatusBadge(selectedRequest.status)}</div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">ID</h4>
                <p>{selectedRequest.id}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Produits</h4>
              <ul className="list-disc pl-5 space-y-1">
                {selectedRequest.products.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Documents</h4>
              <div className="space-y-2">
                {Object.entries(selectedRequest.files).map(([key, filename]) => (
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
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CertificationRequestDetails;
