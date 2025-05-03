import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle, FileText, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CertificationRequest } from '@/types/auth';

// Données de démonstration pour les demandes
const demoRequests: CertificationRequest[] = [
  {
    id: 1,
    companyName: "SABC (Société Anonyme des Brasseries du Cameroun)",
    promoterName: "Rodrigue Fotso",
    phone: "699123456",
    products: ["Bière 33 Export", "Beaufort Lager", "Castel Beer"],
    registrationDate: "2025-01-15",
    status: "in_process",
    files: {
      businessRegistry: "registre_commerce_sabc.pdf",
      taxpayerCard: "niu_sabc.pdf",
      manufacturingProcess: "processus_sabc.pdf",
      staffList: "personnel_sabc.pdf",
      productsList: "produits_sabc.pdf"
    }
  },
  {
    id: 2,
    companyName: "SOSUCAM (Société Sucrière du Cameroun)",
    promoterName: "Aminata Tchoungui",
    phone: "677889900",
    products: ["Sucre blanc en morceaux", "Sucre roux", "Sucre en poudre"],
    registrationDate: "2025-02-20",
    status: "pending",
    files: {
      businessRegistry: "registre_commerce_sosucam.pdf",
      taxpayerCard: "niu_sosucam.pdf",
      manufacturingProcess: "processus_sosucam.pdf",
      rawMaterialCertificate: "matieres_premieres_sosucam.pdf",
      staffList: "personnel_sosucam.pdf",
      productsList: "produits_sosucam.pdf"
    }
  },
  {
    id: 3,
    companyName: "CHOCOCAM (Chocolaterie Confiserie du Cameroun)",
    promoterName: "Paul Essomba",
    phone: "654321987",
    products: ["Chocolat Mambo", "Bonbons Wick's", "Caramels Kola"],
    registrationDate: "2025-03-05",
    status: "approved",
    files: {
      businessRegistry: "registre_commerce_chococam.pdf",
      taxpayerCard: "niu_chococam.pdf",
      manufacturingProcess: "processus_chococam.pdf",
      staffList: "personnel_chococam.pdf",
      productsList: "produits_chococam.pdf"
    }
  },
  {
    id: 4,
    companyName: "CICAM (Cotonnière Industrielle du Cameroun)",
    promoterName: "Jacqueline Koung",
    phone: "691234567",
    products: ["Pagne écru", "Tissus imprimés", "Serviettes"],
    registrationDate: "2025-03-20",
    status: "corrective_actions",
    files: {
      businessRegistry: "registre_commerce_cicam.pdf",
      taxpayerCard: "niu_cicam.pdf",
      manufacturingProcess: "processus_cicam.pdf",
      staffList: "personnel_cicam.pdf",
      productsList: "produits_cicam.pdf"
    }
  }
];

const CertificationRequests = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<CertificationRequest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filtrage des demandes
  const filteredRequests = demoRequests.filter(req => {
    // Filtrage par statut
    if (statusFilter !== 'all' && req.status !== statusFilter) {
      return false;
    }
    
    // Filtrage par recherche dans le nom de l'entreprise ou du promoteur
    if (searchQuery && !req.companyName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !req.promoterName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleCreateRequest = () => {
    navigate('/certification-request');
  };

  const handleViewDetails = (request: CertificationRequest) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

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
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Demandes de Certification</h1>
            <p className="text-muted-foreground">Gestion des demandes de certification</p>
          </div>
          <Button 
            onClick={handleCreateRequest} 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 self-start sm:self-auto"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Nouvelle demande</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher par entreprise ou promoteur..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select 
            onValueChange={setStatusFilter} 
            defaultValue="all"
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="in_process">En traitement</SelectItem>
              <SelectItem value="approved">Approuvé</SelectItem>
              <SelectItem value="rejected">Rejeté</SelectItem>
              <SelectItem value="corrective_actions">Actions correctives</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredRequests.length > 0 ? (
          <div className="border rounded-lg overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Promoteur</TableHead>
                  <TableHead>Date d'enregistrement</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.companyName}</TableCell>
                    <TableCell>{request.promoterName}</TableCell>
                    <TableCell>{new Date(request.registrationDate).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(request)}
                        className="h-8 w-8 p-0"
                        title="Voir les détails"
                      >
                        <span className="sr-only">Voir les détails</span>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="border rounded-lg bg-white p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune demande trouvée</h3>
            <p className="text-muted-foreground mb-6">
              Aucune demande ne correspond à vos critères de recherche.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
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
    </AppLayout>
  );
};

export default CertificationRequests;
