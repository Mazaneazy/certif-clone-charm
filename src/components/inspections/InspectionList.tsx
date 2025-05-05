
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Inspection {
  id: string;
  title: string;
  company: string;
  location: string;
  date: Date;
  inspectorName: string;
  notes?: string;
  status: 'planned' | 'completed' | 'cancelled';
}

interface InspectionListProps {
  inspections: Inspection[];
  updateInspectionStatus: (id: string, status: 'planned' | 'completed' | 'cancelled') => void;
}

const InspectionList: React.FC<InspectionListProps> = ({ inspections, updateInspectionStatus }) => {
  // Trier les inspections par date (les plus récentes en premier)
  const sortedInspections = [...inspections].sort((a, b) => a.date.getTime() - b.date.getTime());

  // Fonction pour obtenir la couleur de la badge selon le statut
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'planned':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  // Fonction pour traduire le statut en français
  const translateStatus = (status: string) => {
    switch (status) {
      case 'planned':
        return 'Planifiée';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Entreprise</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Inspecteur</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedInspections.map((inspection) => (
            <TableRow key={inspection.id}>
              <TableCell className="font-medium">{inspection.title}</TableCell>
              <TableCell>{inspection.company}</TableCell>
              <TableCell>{format(new Date(inspection.date), 'dd/MM/yyyy', { locale: fr })}</TableCell>
              <TableCell>{inspection.inspectorName}</TableCell>
              <TableCell>
                <Badge className={getStatusBadgeStyle(inspection.status)}>
                  {translateStatus(inspection.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => updateInspectionStatus(inspection.id, 'planned')}
                    className={inspection.status === 'planned' ? 'bg-yellow-100' : ''}
                  >
                    Planifiée
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => updateInspectionStatus(inspection.id, 'completed')}
                    className={inspection.status === 'completed' ? 'bg-green-100' : ''}
                  >
                    Terminée
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => updateInspectionStatus(inspection.id, 'cancelled')}
                    className={inspection.status === 'cancelled' ? 'bg-red-100' : ''}
                  >
                    Annulée
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InspectionList;
