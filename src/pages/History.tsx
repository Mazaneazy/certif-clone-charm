
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import DocumentDetails from '@/components/documents/DocumentDetails';
import HistoryHeader from '@/components/history/HistoryHeader';
import MonthSelector from '@/components/history/MonthSelector';
import FilterBar from '@/components/history/FilterBar';
import ActivitiesTable from '@/components/history/ActivitiesTable';

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentMonth, setCurrentMonth] = useState('Avril 2025');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentDetailsOpen, setDocumentDetailsOpen] = useState(false);

  const activities = [
    {
      id: 1,
      document: "Attestation de formation",
      type: "Document téléchargé",
      docType: "pdf",
      status: "completed",
      date: "23 avril 2025",
      time: "14:30",
      user: "Vous",
    },
    {
      id: 2,
      document: "Certificat professionnel",
      type: "Document validé",
      docType: "pdf",
      status: "completed",
      date: "22 avril 2025",
      time: "10:15",
      user: "Admin",
    },
    {
      id: 3,
      document: "Diplôme universitaire",
      type: "Document refusé",
      docType: "doc",
      status: "rejected",
      date: "20 avril 2025",
      time: "09:45",
      user: "Admin",
      message: "Le document nécessite une signature officielle",
    },
    {
      id: 4,
      document: "Attestation de stage",
      type: "Document téléchargé",
      docType: "pdf",
      status: "completed",
      date: "15 avril 2025",
      time: "16:20",
      user: "Vous",
    },
    {
      id: 5,
      document: "Certificat de compétences",
      type: "Document en révision",
      docType: "doc",
      status: "pending",
      date: "10 avril 2025",
      time: "11:00",
      user: "Admin",
    },
    {
      id: 6,
      document: "Attestation de formation",
      type: "Document modifié",
      docType: "xls",
      status: "completed",
      date: "5 avril 2025",
      time: "14:30",
      user: "Vous",
    },
  ];

  const months = [
    { name: "Avril 2025", count: 6 },
    { name: "Mars 2025", count: 8 },
    { name: "Février 2025", count: 3 },
  ];

  // Filter activities based on search term, status filter, and document type filter
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.document.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          activity.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    const matchesType = typeFilter === 'all' || activity.docType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDocument = (document) => {
    setSelectedDocument({
      id: document.id,
      title: document.document,
      date: document.date,
      status: document.status === 'completed' ? 'approved' : 
             document.status === 'pending' ? 'review' : 'rejected',
      type: document.docType,
    });
    setDocumentDetailsOpen(true);
  };

  const handleCloseDocumentDetails = () => {
    setDocumentDetailsOpen(false);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <HistoryHeader 
          title="Historique" 
          description="Consultez toutes les activités récentes concernant vos documents." 
        />

        <div className="grid gap-6 md:grid-cols-4">
          <MonthSelector 
            months={months} 
            currentMonth={currentMonth} 
            setCurrentMonth={setCurrentMonth} 
          />
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="text-xl text-anor-blue">Activités récentes</CardTitle>
              <CardDescription>
                Un total de {filteredActivities.length} sur {activities.length} activités pour le mois d'{currentMonth.split(' ')[0]}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FilterBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
              />
              
              <ActivitiesTable 
                activities={filteredActivities} 
                onViewDocument={handleViewDocument}
              />
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Affichage de {filteredActivities.length} sur {activities.length} activités
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <DocumentDetails 
        document={selectedDocument}
        isOpen={documentDetailsOpen}
        onClose={handleCloseDocumentDetails}
      />
    </AppLayout>
  );
};

export default History;
