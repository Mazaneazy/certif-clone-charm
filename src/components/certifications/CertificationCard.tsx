
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileCheck, Eye, Calendar } from 'lucide-react';

interface CertificationProps {
  certification: {
    id: number;
    title: string;
    issueDate: string;
    expiryDate: string;
    status: 'valid' | 'expired' | 'pending';
    type: string;
  };
  onClick?: () => void;
}

const CertificationCard = ({ certification, onClick }: CertificationProps) => {
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
        <div className="flex items-start gap-3">
          <FileCheck className="h-6 w-6 text-green-500" />
          <div>
            <h3 className="font-medium text-sm">{certification.title}</h3>
            <p className="text-xs text-muted-foreground">Émis le {certification.issueDate}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-2">
        {getStatusBadge()}
        <div className="flex items-center gap-2 mt-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Expire le {certification.expiryDate}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1" 
          onClick={onClick}
        >
          <Eye className="h-3 w-3" />
          <span>Détails</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CertificationCard;
