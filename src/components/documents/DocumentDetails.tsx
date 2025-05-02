
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, File, Clock, CheckCircle, X, Download, Printer } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DocumentDetailsProps {
  document: {
    id: number;
    title: string;
    date: string;
    status: 'pending' | 'review' | 'approved' | 'rejected';
    type: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentDetails = ({ document, isOpen, onClose }: DocumentDetailsProps) => {
  if (!document) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">En attente</Badge>;
      case 'review':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En révision</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejeté</Badge>;
      default:
        return null;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-12 w-12 text-red-500" />;
      default:
        return <File className="h-12 w-12 text-blue-500" />;
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="h-5 w-5 text-yellow-500" />,
          text: "En attente de traitement"
        };
      case 'review':
        return {
          icon: <Clock className="h-5 w-5 text-blue-500" />,
          text: "En cours de révision"
        };
      case 'approved':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          text: "Document approuvé"
        };
      case 'rejected':
        return {
          icon: <X className="h-5 w-5 text-red-500" />,
          text: "Document rejeté"
        };
      default:
        return {
          icon: null,
          text: ""
        };
    }
  };

  const statusInfo = getStatusInfo(document.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Détails du document</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex items-center gap-4">
            {getFileIcon(document.type)}
            <div>
              <h3 className="font-semibold text-lg">{document.title}</h3>
              <p className="text-sm text-muted-foreground">ID: {document.id}</p>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Type:</span>
              <span className="text-sm uppercase">{document.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Date d'ajout:</span>
              <span className="text-sm">{document.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Statut:</span>
              {getStatusBadge(document.status)}
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
            {statusInfo.icon}
            <span className="text-sm">{statusInfo.text}</span>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span>Télécharger</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              <span>Imprimer</span>
            </Button>
          </div>
          <Button variant="default" size="sm" onClick={onClose}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetails;
