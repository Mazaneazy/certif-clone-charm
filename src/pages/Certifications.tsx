
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useToast } from '@/hooks/use-toast';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CertificationDetails from '@/components/certifications/CertificationDetails';
import CertificationStatistics from '@/components/certifications/CertificationStatistics';
import CertificationHeader from '@/components/certifications/CertificationHeader';
import CertificationFilters from '@/components/certifications/CertificationFilters';
import CertificationList from '@/components/certifications/CertificationList';
import { certifications, Certification } from '@/data/certificationData';

const CertificationsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('liste');
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const handleCreateCertification = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La création de certification sera bientôt disponible.",
    });
  };

  const viewCertificationDetails = (certification: Certification) => {
    setSelectedCertification(certification);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCurrentPage(1);
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

  return (
    <AppLayout>
      <div className="space-y-6">
        <CertificationHeader 
          filteredCertifications={filteredCertifications}
          onCreateCertification={handleCreateCertification}
        />

        <Tabs defaultValue="liste" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="liste">Liste des certifications</TabsTrigger>
            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          </TabsList>
          
          <TabsContent value="liste" className="space-y-6">
            <CertificationFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              setCurrentPage={setCurrentPage}
            />

            <CertificationList 
              certifications={filteredCertifications}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              viewCertificationDetails={viewCertificationDetails}
              resetFilters={resetFilters}
            />
          </TabsContent>
          
          <TabsContent value="statistiques">
            <CertificationStatistics certifications={certifications} />
          </TabsContent>
        </Tabs>
      </div>
      
      <CertificationDetails 
        certification={selectedCertification}
        isOpen={isDetailsOpen}
        onClose={closeDetails}
      />
    </AppLayout>
  );
};

export default CertificationsPage;
