
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, PlusCircle } from 'lucide-react';

interface EmptyInspectionStateProps {
  onAddInspection: () => void;
}

const EmptyInspectionState: React.FC<EmptyInspectionStateProps> = ({ onAddInspection }) => {
  return (
    <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
      <div className="text-center">
        <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucune inspection planifiée</h3>
        <p className="mt-1 text-sm text-gray-500">Commencez par créer une nouvelle inspection</p>
        <div className="mt-6">
          <Button onClick={onAddInspection}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Planifier une inspection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyInspectionState;
