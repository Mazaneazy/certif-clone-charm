
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import RequestHeader from '@/components/certifications/RequestHeader';
import RequestFilters from '@/components/certifications/RequestFilters';
import RequestTable from '@/components/certifications/RequestTable';
import RequestDashboard from '@/components/certifications/RequestDashboard';
import EmptyRequestState from '@/components/certifications/EmptyRequestState';
import CertificationRequestDetails from '@/components/certifications/CertificationRequestDetails';
import { CertificationRequest } from '@/types/auth';
import { getRequests, filterRequests, addRequest } from '@/services/requestService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CertificationRequests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<CertificationRequest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [requests, setRequests] = useState<CertificationRequest[]>([]);
  const [activeTab, setActiveTab] = useState('tableau');

  // Charger les demandes au démarrage
  useEffect(() => {
    const loadedRequests = getRequests();
    setRequests(loadedRequests);

    // Écouter les événements de storage pour mettre à jour en temps réel
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'certification-requests' && e.newValue) {
        try {
          setRequests(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Erreur lors de la mise à jour des demandes:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Écouter l'événement personnalisé pour les mises à jour locales
    const handleLocalUpdate = (e: CustomEvent) => {
      if (e.detail) {
        setRequests(e.detail);
      }
    };

    window.addEventListener('certification-request-added', handleLocalUpdate as EventListener);

    // Exposer la fonction globalement pour permettre l'ajout depuis d'autres composants
    // @ts-ignore - Ajouter à window pour permettre l'accès global
    window.addCertificationRequest = (newRequest: Omit<CertificationRequest, 'id'>) => {
      try {
        const savedRequest = addRequest(newRequest);
        // Mettre à jour l'état local pour une mise à jour immédiate
        setRequests(getRequests());
        return savedRequest;
      } catch (error) {
        console.error("Erreur lors de l'ajout de la demande:", error);
        throw error;
      }
    };

    // Nettoyage
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('certification-request-added', handleLocalUpdate as EventListener);
      // @ts-ignore - Nettoyer lors du démontage
      delete window.addCertificationRequest;
    };
  }, []);

  // Filtrage des demandes
  const filteredRequests = filterRequests(requests, searchQuery, statusFilter);

  const handleViewDetails = (request: CertificationRequest) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <RequestHeader />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="tableau">Tableau</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>
          
          <RequestFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          
          <TabsContent value="tableau" className="mt-6">
            {filteredRequests.length > 0 ? (
              <RequestTable 
                requests={filteredRequests} 
                onViewDetails={handleViewDetails} 
              />
            ) : (
              <EmptyRequestState resetFilters={resetFilters} />
            )}
          </TabsContent>
          
          <TabsContent value="dashboard" className="mt-6">
            {requests.length > 0 ? (
              <RequestDashboard requests={requests} />
            ) : (
              <EmptyRequestState resetFilters={resetFilters} />
            )}
          </TabsContent>
        </Tabs>

        <CertificationRequestDetails 
          isOpen={isDetailsOpen}
          setIsOpen={setIsDetailsOpen}
          selectedRequest={selectedRequest}
        />
      </div>
    </AppLayout>
  );
};

export default CertificationRequests;
