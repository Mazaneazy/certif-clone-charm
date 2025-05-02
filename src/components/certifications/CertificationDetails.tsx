
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileCheck, Clock, User, Briefcase } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CertificationDetailsProps {
  certification: {
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
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificationDetails = ({ certification, isOpen, onClose }: CertificationDetailsProps) => {
  if (!certification) return null;

  const getStatusBadge = () => {
    switch (certification.status) {
      case 'valid':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Valide</Badge>;
      case 'expired':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Expiré</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">En attente</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-green-500" />
            <DialogTitle>{certification.title}</DialogTitle>
          </div>
          <DialogDescription>
            Détails du certificat #{certification.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              {getStatusBadge()}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Émis le {certification.issueDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Expire le {certification.expiryDate}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Informations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {certification.issuer && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Émetteur: {certification.issuer}</span>
                </div>
              )}
              {certification.inspector && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Inspecteur: {certification.inspector}</span>
                </div>
              )}
              {certification.inspectionDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Date d'inspection: {certification.inspectionDate}</span>
                </div>
              )}
            </div>
          </div>
          
          {certification.standards && certification.standards.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Normes applicables</h4>
              <div className="flex flex-wrap gap-2">
                {certification.standards.map((standard, index) => (
                  <Badge key={index} variant="secondary">{standard}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {certification.history && certification.history.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Historique</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Utilisateur</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certification.history.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="py-2">{item.date}</TableCell>
                      <TableCell className="py-2">{item.action}</TableCell>
                      <TableCell className="py-2">{item.user}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificationDetails;
