
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, UploadCloud, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import DocumentCard from '@/components/documents/DocumentCard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();

  const recentDocuments = [
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
  ];

  const handleUpload = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "Le téléchargement de document sera bientôt disponible.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue sur votre espace de certification.</p>
          </div>
          <Button onClick={handleUpload} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <UploadCloud className="h-4 w-4" />
            <span>Ajouter un document</span>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Documents totaux</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 ce mois-ci</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Dernière mise à jour: 2h</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Certifications</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 ce mois-ci</p>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Progression de certification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Certification professionnelle</span>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Certification technique</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Documents récents</h2>
            <Button variant="outline" size="sm" asChild>
              <a href="/documents">Voir tous</a>
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
