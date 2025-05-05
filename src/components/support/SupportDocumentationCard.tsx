
import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const SupportDocumentationCard: React.FC = () => {
  const { toast } = useToast();
  
  const handleDocumentClick = (documentName: string) => {
    toast({
      title: "Téléchargement du document",
      description: `Le document "${documentName}" sera bientôt disponible.`,
      duration: 3000,
    });
  };

  const documents = [
    {
      title: "Guide de l'utilisateur",
      description: "Manuel complet du système",
      fileSize: "2.4 MB"
    },
    {
      title: "Procédures de certification",
      description: "Processus et exigences",
      fileSize: "1.8 MB"
    },
    {
      title: "Tarification",
      description: "Grille tarifaire des services",
      fileSize: "645 KB"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <CardTitle>Documentation</CardTitle>
        </div>
        <CardDescription>
          Ressources et guides d'utilisation
        </CardDescription>
      </CardHeader>
      <div className="p-6 space-y-3">
        {documents.map((doc, index) => (
          <div 
            key={index} 
            className="p-3 bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer flex justify-between items-center"
            onClick={() => handleDocumentClick(doc.title)}
          >
            <div>
              <div className="font-medium">{doc.title}</div>
              <div className="text-sm text-gray-500">{doc.description}</div>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-2">{doc.fileSize}</span>
              <Download className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SupportDocumentationCard;
