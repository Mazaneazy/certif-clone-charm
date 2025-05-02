
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, File, Eye } from 'lucide-react';

interface DocumentProps {
  document: {
    id: number;
    title: string;
    date: string;
    status: 'pending' | 'review' | 'approved' | 'rejected';
    type: string;
  };
}

const DocumentCard = ({ document }: DocumentProps) => {
  const getStatusBadge = () => {
    switch (document.status) {
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

  const getFileIcon = () => {
    switch (document.type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      default:
        return <File className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
        <div className="flex items-start gap-3">
          {getFileIcon()}
          <div>
            <h3 className="font-medium text-sm">{document.title}</h3>
            <p className="text-xs text-muted-foreground">Ajouté le {document.date}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {getStatusBadge()}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          <span>Voir</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
