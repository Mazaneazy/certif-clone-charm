
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyRequestStateProps {
  resetFilters: () => void;
}

const EmptyRequestState: React.FC<EmptyRequestStateProps> = ({ resetFilters }) => {
  return (
    <div className="border rounded-lg bg-white p-8 text-center">
      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">Aucune demande trouvée</h3>
      <p className="text-muted-foreground mb-6">
        Aucune demande ne correspond à vos critères de recherche.
      </p>
      <Button variant="outline" onClick={resetFilters}>
        Réinitialiser les filtres
      </Button>
    </div>
  );
};

export default EmptyRequestState;
