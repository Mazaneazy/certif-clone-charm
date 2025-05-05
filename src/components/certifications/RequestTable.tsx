
import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CertificationRequest } from '@/types/auth';

interface RequestTableProps {
  requests: CertificationRequest[];
  onViewDetails: (request: CertificationRequest) => void;
}

const RequestTable: React.FC<RequestTableProps> = ({ requests, onViewDetails }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">En attente</Badge>;
      case 'in_process':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En traitement</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejeté</Badge>;
      case 'corrective_actions':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Actions correctives</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getWorkflowStatusName = (status?: string) => {
    if (!status) return "Non défini";
    
    const statusMap: Record<string, string> = {
      'reception': 'Réception',
      'evaluation_preliminary': 'Évaluation préliminaire',
      'technical_review': 'Revue technique',
      'inspection_planning': 'Inspection',
      'laboratory_testing': 'Tests labo',
      'evaluation_final': 'Évaluation finale',
      'decision_committee': 'Comité',
      'certification_issuance': 'Émission certificat',
      'completed': 'Terminé'
    };
    
    return statusMap[status] || status;
  };

  const getWorkflowStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const badgeStyles: Record<string, string> = {
      'reception': 'bg-gray-100 text-gray-800',
      'evaluation_preliminary': 'bg-blue-50 text-blue-800',
      'technical_review': 'bg-indigo-50 text-indigo-800',
      'inspection_planning': 'bg-purple-50 text-purple-800',
      'laboratory_testing': 'bg-amber-50 text-amber-800',
      'evaluation_final': 'bg-cyan-50 text-cyan-800',
      'decision_committee': 'bg-orange-50 text-orange-800',
      'certification_issuance': 'bg-emerald-50 text-emerald-800',
      'completed': 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge variant="outline" className={badgeStyles[status] || 'bg-gray-100 text-gray-800'}>
        {getWorkflowStatusName(status)}
      </Badge>
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Entreprise</TableHead>
            <TableHead>Promoteur</TableHead>
            <TableHead>Date d'enregistrement</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Étape</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id}</TableCell>
              <TableCell>{request.companyName}</TableCell>
              <TableCell>{request.promoterName}</TableCell>
              <TableCell>{new Date(request.registrationDate).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>{getStatusBadge(request.status)}</TableCell>
              <TableCell>{getWorkflowStatusBadge(request.workflowStatus)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(request)}
                  className="h-8 w-8 p-0"
                  title="Voir les détails"
                >
                  <span className="sr-only">Voir les détails</span>
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestTable;
