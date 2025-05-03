
import React from 'react';
import { FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CertificationCard from '@/components/certifications/CertificationCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Certification {
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
}

interface CertificationListProps {
  certifications: Certification[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  viewCertificationDetails: (certification: Certification) => void;
  resetFilters: () => void;
  certificationsPerPage?: number;
}

const CertificationList: React.FC<CertificationListProps> = ({
  certifications,
  currentPage,
  setCurrentPage,
  viewCertificationDetails,
  resetFilters,
  certificationsPerPage = 6,
}) => {
  const indexOfLastCertification = currentPage * certificationsPerPage;
  const indexOfFirstCertification = indexOfLastCertification - certificationsPerPage;
  const currentCertifications = certifications.slice(indexOfFirstCertification, indexOfLastCertification);
  const totalPages = Math.ceil(certifications.length / certificationsPerPage);

  return (
    <>
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
            <Button variant="outline" onClick={resetFilters}>
              Réinitialiser les filtres
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CertificationList;
