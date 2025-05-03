import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, UploadCloud, Filter, ChevronDown, FileText } from 'lucide-react';
import DocumentCard from '@/components/documents/DocumentCard';
import DocumentDetails from '@/components/documents/DocumentDetails';
import { useToast } from '@/hooks/use-toast';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Documents = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState<null | {
    id: number;
    title: string;
    date: string;
    status: 'pending' | 'review' | 'approved' | 'rejected';
    type: string;
  }>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const documents = [
    {
      id: 1,
      title: "Attestation de conformité NC 234 - Bière 33 Export",
      date: "23 avril 2025",
      status: "approved" as "approved",
      type: "pdf",
    },
    {
      id: 2,
      title: "Rapport d'analyse - Sucre blanc SOSUCAM",
      date: "18 avril 2025",
      status: "pending" as "pending",
      type: "docx",
    },
    {
      id: 3,
      title: "Certificat de qualité - Chocolat Mambo",
      date: "10 avril 2025",
      status: "review" as "review",
      type: "pdf",
    },
    {
      id: 4,
      title: "Notification de rejet - Tissus CICAM",
      date: "5 avril 2025", 
      status: "rejected" as "rejected",
      type: "pdf",
    },
    {
      id: 5,
      title: "Rapport d'inspection - Huile de palme Azur",
      date: "28 mars 2025",
      status: "approved" as "approved",
      type: "docx",
    },
    {
      id: 6,
      title: "Attestation d'analyse - Farine de manioc",
      date: "15 mars 2025",
      status: "approved" as "approved",
      type: "pdf",
    },
    {
      id: 7,
      title: "Certificat d'origine - Cacao camerounais",
      date: "10 mars 2025",
      status: "approved" as "approved",
      type: "pdf",
    },
    {
      id: 8,
      title: "Rapport préliminaire - Café torréfié",
      date: "5 mars 2025",
      status: "pending" as "pending",
      type: "docx",
    },
    {
      id: 9,
      title: "Certificat sanitaire - Poisson fumé",
      date: "28 février 2025",
      status: "review" as "review",
      type: "pdf",
    },
    {
      id: 10,
      title: "Rapport de laboratoire - Eau minérale Supermont",
      date: "20 février 2025",
      status: "approved" as "approved",
      type: "pdf",
    },
    {
      id: 11,
      title: "Notification de non-conformité - Yaourt Camlait",
      date: "15 février 2025",
      status: "rejected" as "rejected",
      type: "docx",
    },
    {
      id: 12,
      title: "Certificat NC 089 - Bonbons Wick's",
      date: "10 février 2025",
      status: "approved" as "approved",
      type: "pdf",
    },
  ];

  const handleUpload = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Le téléchargement de document sera bientôt disponible.",
    });
  };

  const viewDocumentDetails = (document: typeof documents[0]) => {
    setSelectedDocument(document);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
  };

  const filteredDocuments = documents.filter(doc => {
    // Filter by status
    if (statusFilter !== 'all' && doc.status !== statusFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !doc.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Pagination logic
  const documentsPerPage = 6;
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);
  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mes Documents</h1>
            <p className="text-muted-foreground">Gérez tous vos documents de certification.</p>
          </div>
          <Button onClick={handleUpload} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <UploadCloud className="h-4 w-4" />
            <span>Ajouter un document</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un document..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          <Select 
            onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1); // Reset to first page on filter change
            }} 
            defaultValue="all"
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="review">En révision</SelectItem>
              <SelectItem value="approved">Approuvé</SelectItem>
              <SelectItem value="rejected">Rejeté</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {currentDocuments.length > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentDocuments.map((doc) => (
                <DocumentCard 
                  key={doc.id} 
                  document={doc} 
                  onClick={() => viewDocumentDetails(doc)}
                />
              ))}
            </div>
            
            {totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first page, last page, and pages around current page
                    if (
                      pageNumber === 1 || 
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink 
                            href="#" 
                            isActive={pageNumber === currentPage}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNumber);
                            }}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      (pageNumber === 2 && currentPage > 3) ||
                      (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Aucun document trouvé</h3>
              <p className="text-muted-foreground text-center mb-6">
                Aucun document ne correspond à vos critères de recherche.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setCurrentPage(1);
              }}>
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      <DocumentDetails 
        document={selectedDocument}
        isOpen={isDetailsOpen}
        onClose={closeDetails}
      />
    </AppLayout>
  );
};

export default Documents;
