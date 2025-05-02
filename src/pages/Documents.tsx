
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
import { Search, UploadCloud, Filter, ChevronDown } from 'lucide-react';
import DocumentCard from '@/components/documents/DocumentCard';
import { useToast } from '@/hooks/use-toast';

const Documents = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const documents = [
    {
      id: 1,
      title: "Attestation de formation",
      date: "23 avril 2025",
      status: "approved",
      type: "pdf",
    },
    {
      id: 2,
      title: "Certificat d'expérience professionnelle",
      date: "18 avril 2025",
      status: "pending",
      type: "docx",
    },
    {
      id: 3,
      title: "Diplôme universitaire",
      date: "10 avril 2025",
      status: "review",
      type: "pdf",
    },
    {
      id: 4,
      title: "Attestation de stage",
      date: "5 avril 2025", 
      status: "rejected",
      type: "pdf",
    },
    {
      id: 5,
      title: "Certificat de compétences",
      date: "28 mars 2025",
      status: "approved",
      type: "docx",
    },
    {
      id: 6,
      title: "Lettre de recommandation",
      date: "15 mars 2025",
      status: "approved",
      type: "pdf",
    },
  ];

  const handleUpload = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Le téléchargement de document sera bientôt disponible.",
    });
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select onValueChange={setStatusFilter} defaultValue="all">
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

        {filteredDocuments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
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
              }}>
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Documents;
