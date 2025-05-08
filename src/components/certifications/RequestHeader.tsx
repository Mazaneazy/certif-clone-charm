
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RequestHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCreateRequest = () => {
    navigate('/certification-request');
  };
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Demandes de Certification</h1>
        <p className="text-muted-foreground">Gestion des demandes de certification</p>
      </div>
      <Button 
        onClick={handleCreateRequest} 
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 self-start sm:self-auto"
      >
        <PlusCircle className="h-4 w-4" />
        <span>Nouvelle demande</span>
      </Button>
    </div>
  );
};

export default RequestHeader;
