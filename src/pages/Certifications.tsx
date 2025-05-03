import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { FileCheck, Search, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CertificationCard from '@/components/certifications/CertificationCard';
import CertificationDetails from '@/components/certifications/CertificationDetails';

const Certifications = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCertification, setSelectedCertification] = useState<null | {
    id: number;
    title: string;
    issueDate: string;
    expiryDate: string;
    status: 'valid' | 'expired' | 'pending';
    type: string;
    issuer?: string;
    inspectionDate?: string;
    inspector?: string;
    standards?: string[];
    history?: Array<{
      date: string;
      action: string;
      user: string;
    }>;
  }>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Données de démonstration pour les certifications
  const certifications = [
    {
      id: 1,
      title: "Certification NC 234 - Bière 33 Export",
      issueDate: "15 mars 2025",
      expiryDate: "15 mars 2028",
      status: "valid" as "valid",
      type: "boisson",
      issuer: "ANOR",
      inspector: "Jean-Pierre Mbarga",
      inspectionDate: "10 mars 2025",
      standards: ["NC 234-2023 - Bières"],
      history: [
        {
          date: "15 mars 2025",
          action: "Émission du certificat",
          user: "Catherine Mvogo"
        },
        {
          date: "10 mars 2025",
          action: "Inspection réalisée",
          user: "Jean-Pierre Mbarga"
        },
        {
          date: "1 mars 2025",
          action: "Demande soumise",
          user: "Rodrigue Fotso"
        }
      ]
    },
    {
      id: 2,
      title: "Certification NC 132 - Sucre blanc en morceaux",
      issueDate: "20 février 2025",
      expiryDate: "20 février 2028",
      status: "valid" as "valid",
      type: "alimentaire",
      issuer: "ANOR",
      inspector: "Alice Ndongo",
      inspectionDate: "15 février 2025",
      standards: ["NC 132-2022 - Sucre et produits sucrés"],
      history: [
        {
          date: "20 février 2025",
          action: "Émission du certificat",
          user: "Catherine Mvogo"
        },
        {
          date: "15 février 2025",
          action: "Inspection réalisée",
          user: "Alice Ndongo"
        }
      ]
    },
    {
      id: 3,
      title: "Certification NC 089 - Chocolat Mambo",
      issueDate: "10 janvier 2025",
      expiryDate: "10 janvier 2026",
      status: "valid" as "valid",
      type: "confiserie",
      issuer: "ANOR",
      inspector: "Pierre Essomba",
      inspectionDate: "5 janvier 2025",
      standards: ["NC 089-2023 - Confiseries et chocolats"],
      history: [
        {
          date: "10 janvier 2025",
          action: "Émission du certificat",
          user: "Catherine Mvogo"
        }
      ]
    },
    {
      id: 4,
      title: "Certification NC 178 - Pagne écru CICAM",
      issueDate: "5 décembre 2024",
      expiryDate: "5 décembre 2024",
      status: "expired" as "expired",
      type: "textile",
      issuer: "ANOR",
      inspector: "Claude Ekani",
      inspectionDate: "1 décembre 2024",
      standards: ["NC 178-2022 - Textiles et tissus"],
      history: [
        {
          date: "6 décembre 2024",
          action: "Certification expirée",
          user: "Système"
        },
        {
          date: "5 décembre 2024",
          action: "Émission du certificat",
          user: "Catherine Mvogo"
        }
      ]
    },
    {
      id: 5,
      title: "Certification NC 256 - Huile de palme Azur",
      issueDate: "25 avril 2025",
      expiryDate: "25 avril 2027",
      status: "valid" as "valid",
      type: "huile",
      issuer: "ANOR",
      inspector: "Émilie Minkeng",
      inspectionDate: "20 avril 2025",
      standards: ["NC 256-2023 - Huiles végétales"],
      history: [
        {
          date: "25 avril 2025",
          action: "Émission du certificat",
          user: "Catherine Mvogo"
        }
      ]
    },
    {
      id: 6,
      title: "Certification NC 305 - Tomates en boîte SCAN",
      issueDate: "10 mai 2025",
      expiryDate: "N/A",
      status: "pending" as "pending",
      type: "conserve",
      issuer: "En attente",
      inspector: "Marc Ondobo",
      inspectionDate: "5 mai 2025",
      standards: ["NC 305-2024 - Conserves alimentaires"],
      history: [
        {
          date: "5 mai 2025",
          action: "Inspection réalisée",
          user: "Marc Ondobo"
        },
        {
          date: "1 mai 2025",
          action: "Demande soumise",
          user: "Charles Mballa"
        }
      ]
    },
  ];

  const handleCreateCertification = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La création de certification sera bientôt disponible.",
    });
  };

  const viewCertificationDetails = (certification: typeof certifications[0]) => {
    setSelectedCertification(certification);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
  };

  // Filtrage des certifications
  const filteredCertifications = certifications.filter(cert => {
    // Filtrage par statut
    if (statusFilter !== 'all' && cert.status !== statusFilter) {
      return false;
    }
    
    // Filtrage par recherche dans le titre
    if (searchQuery && !cert.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Pagination
  const certificationsPerPage = 6;
  const indexOfLastCertification = currentPage * certificationsPerPage;
  const indexOfFirstCertification = indexOfLastCertification - certificationsPerPage;
  const currentCertifications = filteredCertifications.slice(indexOfFirstCertification, indexOfLastCertification);
  const totalPages = Math.ceil(filteredCertifications.length / certificationsPerPage);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
            <p className="text-muted-foreground">Gestion des certifications et standards.</p>
          </div>
          <Button onClick={handleCreateCertification} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 self-start sm:self-auto">
            <PlusCircle className="h-4 w-4" />
            <span>Nouvelle certification</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher une certification..."
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
              <SelectItem value="valid">Valide</SelectItem>
              <SelectItem value="expired">Expiré</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {currentCertifications.length > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentCertifications.map((cert) => (
                <CertificationCard 
                  key={cert.id} 
                  certification={cert} 
                  onClick={() => viewCertificationDetails(cert)}
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
              <FileCheck className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Aucune certification trouvée</h3>
              <p className="text-muted-foreground text-center mb-6">
                Aucune certification ne correspond à vos critères de recherche.
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
      
      <CertificationDetails 
        certification={selectedCertification}
        isOpen={isDetailsOpen}
        onClose={closeDetails}
      />
    </AppLayout>
  );
};

export default Certifications;
